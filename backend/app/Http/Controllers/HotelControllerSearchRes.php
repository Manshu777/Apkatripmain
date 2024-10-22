<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;


class HotelControllerSearchRes extends Controller
{
    public function searchHotels(Request $request)
    {
        $validated = $request->validate([
            'cityCode' => 'required|string',
            'checkIn' => 'required|date',
            'checkOut' => 'required|date',
            'adults' => 'required|integer|min:1',
            'children' => 'required|integer|min:0',
            'guestNationality' => 'required|string',
            "page"=>'required|integer',
           
        ]);
    
        try {
            $client = new \GuzzleHttp\Client();
    
            // First API request to get hotel codes by city
            $response1 = $client->post('http://api.tbotechnology.in/TBOHolidays_HotelAPI/TBOHotelCodeList', [
                'auth' => ['TBOStaticAPITest', 'Tbo@11530818'],
                'json' => [
                    "CityCode" => $validated['cityCode'],
                    "IsDetailedResponse" => false
                ]
            ]);
    
            $hotelData = json_decode($response1->getBody()->getContents(), true);
            
            // Extract only HotelCodes from the response
            $hotelCodes = array_column($hotelData['Hotels'], 'HotelCode');

            // Convert array to a comma-separated string
            $limitedHotelCodes = array_slice($hotelCodes, 0, 20);
    
            $hotelCodesString = implode(',', $limitedHotelCodes);
    
            // Second API request to fetch hotel details
            $response2 = $client->post('http://api.tbotechnology.in/TBOHolidays_HotelAPI/Hoteldetails', [
                'auth' => ['TBOStaticAPITest', 'Tbo@11530818'],
                'json' => [
                    "Hotelcodes" => $hotelCodesString,
                    "Language" => "EN"
                ]
            ]);
    
            $hotelDetails = json_decode($response2->getBody()->getContents(), true);
    
            // Third API request with user-provided input
            $response3 = $client->post('https://affiliate.tektravels.com/HotelAPI/Search', [
                'auth' => ['Apkatrip', 'Apkatrip@1234'],
                'json' => [
                    "CheckIn" => $validated['checkIn'],
                    "CheckOut" => $validated['checkOut'],
                    "HotelCodes" => $hotelCodesString,
                    "GuestNationality" => $validated['guestNationality'],
                    "PaxRooms" => [
                        [
                            "Adults" => $validated['adults'],
                            "Children" => $validated['children'],
                            "ChildrenAges" => $validated['children'] > 0 ? [null] : null
                        ]
                    ],
                    "ResponseTime" => 23.0,
                    "IsDetailedResponse" => true,
                    "Filters" => [
                        "Refundable" => false,
                        "NoOfRooms" => 1,
                        "MealType" => 0,
                        "OrderBy" => 0,
                        "StarRating" => 0,
                        "HotelName" => null
                    ]
                ]
            ]);
    
            $hotelSearchResults = json_decode($response3->getBody()->getContents(), true);

            $filteredResults = array_filter($hotelSearchResults['HotelResult'], function ($hotelResult) use ($hotelDetails) {
                // Extract hotel codes from the hotel details
                $hotelDetailCodes = array_column($hotelDetails['HotelDetails'], 'HotelCode');
            
                // Check if the hotel result's code matches any from the hotel details
                return in_array($hotelResult['HotelCode'], $hotelDetailCodes);
            });
            
            // Map the filtered results to include additional hotel details
            $enrichedResults = array_map(function ($hotelResult) use ($hotelDetails) {
                // Find the matching hotel details based on HotelCode
                $hotelDetail = current(array_filter($hotelDetails['HotelDetails'], function ($detail) use ($hotelResult) {
                    return $detail['HotelCode'] === $hotelResult['HotelCode'];
                }));
            
                // Merge hotel details into the hotel result
                return array_merge($hotelResult, ['HotelDetails' => $hotelDetail]);
            }, $filteredResults);
            
            // Return the enriched results with both search and detail information
            return response()->json([
                'filteredResults' => $enrichedResults
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }




    
    function singleHotelget(Request $request){
        $validated = $request->validate([
          'HotelCode'=>'required|string',
            'checkIn' => 'required|date',
            'checkOut' => 'required|date',
            'adults' => 'required|integer|min:1',
            'children' => 'required|integer|min:0',
            'guestNationality' => 'required|string',
            
           
        ]);
        $client = new \GuzzleHttp\Client();
    
    
        $response1 = Http::withBasicAuth('TBOStaticAPITest', 'Tbo@11530818')->post('http://api.tbotechnology.in/TBOHolidays_HotelAPI/Hoteldetails', [
            "Hotelcodes" => $validated['HotelCode'],
            "Language" => "EN"
        ]);

        $response2 =Http::withBasicAuth('Apkatrip', 'Apkatrip@1234')->post('https://affiliate.tektravels.com/HotelAPI/Search', [
                    
                       
                            "CheckIn" => $validated['checkIn'],
                            "CheckOut" => $validated['checkOut'],
                            "HotelCodes" => $validated['HotelCode'],
                            "GuestNationality" => $validated['guestNationality'],
                            "PaxRooms" => [
                                [
                                    "Adults" => $validated['adults'],
                                    "Children" => $validated['children'],
                                    "ChildrenAges" => $validated['children'] > 0 ? [null] : null
                                ]
                            ],
                            "ResponseTime" => 23.0,
                            "IsDetailedResponse" => true,
                            "Filters" => [
                                "Refundable" => false,
                                "NoOfRooms" => 1,
                                "MealType" => 0,
                                "OrderBy" => 0,
                                "StarRating" => 0,
                                "HotelName" => null
                            
                        ]
                    ]);





    
    
    
                    //     try {
           
    
    //         $hotelDetails = json_decode($response2->getBody()->getContents(), true);
    
    //         // Third API request with user-provided input
    //         $response3 = $client->post('https://affiliate.tektravels.com/HotelAPI/Search', [
    //             'auth' => ['Apkatrip', 'Apkatrip@1234'],
    //             'json' => [
    //                 "CheckIn" => $validated['checkIn'],
    //                 "CheckOut" => $validated['checkOut'],
    //                 "HotelCodes" => $validated['HotelCodes'],
    //                 "GuestNationality" => $validated['guestNationality'],
    //                 "PaxRooms" => [
    //                     [
    //                         "Adults" => $validated['adults'],
    //                         "Children" => $validated['children'],
    //                         "ChildrenAges" => $validated['children'] > 0 ? [null] : null
    //                     ]
    //                 ],
    //                 "ResponseTime" => 23.0,
    //                 "IsDetailedResponse" => true,
    //                 "Filters" => [
    //                     "Refundable" => false,
    //                     "NoOfRooms" => 1,
    //                     "MealType" => 0,
    //                     "OrderBy" => 0,
    //                     "StarRating" => 0,
    //                     "HotelName" => null
    //                 ]
    //             ]
    //         ]);
    
    //         $hotelSearchResults = json_decode($response3->getBody()->getContents(), true);

    //         $filteredResults = array_filter($hotelSearchResults['HotelResult'], function ($hotelResult) use ($hotelDetails) {
    //             // Extract hotel codes from the hotel details
    //             $hotelDetailCodes = array_column($hotelDetails['HotelDetails'], 'HotelCode');
            
    //             // Check if the hotel result's code matches any from the hotel details
    //             return in_array($hotelResult['HotelCode'], $hotelDetailCodes);
    //         });
            
    //         // Map the filtered results to include additional hotel details
    //         $enrichedResults = array_map(function ($hotelResult) use ($hotelDetails) {
    //             // Find the matching hotel details based on HotelCode
    //             $hotelDetail = current(array_filter($hotelDetails['HotelDetails'], function ($detail) use ($hotelResult) {
    //                 return $detail['HotelCode'] === $hotelResult['HotelCode'];
    //             }));
            
    //             // Merge hotel details into the hotel result
    //             return array_merge($hotelResult, ['HotelDetails' => $hotelDetail]);
    //         }, $filteredResults);
            
    //         // Return the enriched results with both search and detail information
    //         return response()->json([
    //             'filteredResults' => $enrichedResults
    //         ]);
            
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
   $resp1= json_decode($response1->getBody()->getContents(), true);
   $resp2= json_decode($response2->getBody()->getContents(), true);

    $values=["hoteldetail1"=>$resp1['HotelDetails'],"hoteldetail2"=>$resp2["HotelResult"]];
    return response()->JSON($values);
    // return $response1;
     }
    

}
