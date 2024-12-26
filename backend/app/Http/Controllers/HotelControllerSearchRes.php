<?php



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
            'page' => 'required|integer',
        ]);
         $client = new Client();

            // 1st API request: Get hotel codes by city
            $response1 = $client->post('http://api.tbotechnology.in/TBOHolidays_HotelAPI/TBOHotelCodeList', [
                'auth' => ['TBOStaticAPITest', 'Tbo@11530818'],
                'json' => [
                    "CityCode" => $validated['cityCode'],
                    "IsDetailedResponse" => false,
                ]
            ]);
            

            $hotelData = json_decode($response1->getBody()->getContents(), true);
            $hotelCodes = array_column($hotelData['Hotels'], 'HotelCode'); // Extract hotel codes

            // Paginate hotel codes
            $pageSize = 10;
            $start = ($validated['page'] - 1) * $pageSize;
            $limitedHotelCodes = array_slice($hotelCodes, $start, $pageSize);
            
//             // $hotelCodesString = implode(',', $limitedHotelCodes); // Convert to string
     
$hotelresult=[];

foreach($limitedHotelCodes as $limitedHotelCode){
    


            $response3 = $client->post('https://affiliate.tektravels.com/HotelAPI/Search', [
                    'auth' => ['Apkatrip', 'Apkatrip@1234'],
                    'json' => [
                        "CheckIn" => $validated['checkIn'],
                        "CheckOut" => $validated['checkOut'],
                        "HotelCodes" => $limitedHotelCode, // Ensure to use the correct string of hotel codes
                        "GuestNationality" => $validated['guestNationality'],
                        "PaxRooms" => [
                            [
                                "Adults" => $validated['adults'],
                                "Children" => $validated['children'],
                                "ChildrenAges" => $validated['children'] > 0 ? [null] : null,
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
                            "HotelName" => null,
                        ]
                    ]
                ]);
                $searchResults = json_decode($response3->getBody()->getContents(), true);

            $response2 = $client->post('http://api.tbotechnology.in/TBOHolidays_HotelAPI/Hoteldetails', [
                                        'auth' => ['TBOStaticAPITest', 'Tbo@11530818'],
                                        'json' => [
                                            "Hotelcodes" => $limitedHotelCode,
                                            "Language" => "EN",
                                        ]]);
                                        $hotelDetails = json_decode($response2->getBody()->getContents(), true);
                        $hotelresult[] =["hotelDetails"=> $hotelDetails,"searchResults"=>$searchResults];

//                 if($searchResults['Status']['Code'] == 200){
//                     $response2 = $client->post('http://api.tbotechnology.in/TBOHolidays_HotelAPI/Hoteldetails', [
//                         'auth' => ['TBOStaticAPITest', 'Tbo@11530818'],
//                         'json' => [
//                             "Hotelcodes" => $limitedHotelCode,
//                             "Language" => "EN",
//                         ]]);
//                         $hotelDetails = json_decode($response2->getBody()->getContents(), true);

//                         $hotelresult[] =["hotelDetails"=> $hotelDetails,"searchResults"=>$searchResults];
//                 }
           
}


 return response()->json([
        'totalHotels' => $hotelresult,
        "count"=>count($hotelCodes)/$pageSize
    ]);


            // 2nd API request: Fetch hotel details
            // $response2 = $client->post('http://api.tbotechnology.in/TBOHolidays_HotelAPI/Hoteldetails', [
            //     'auth' => ['TBOStaticAPITest', 'Tbo@11530818'],
            //     'json' => [
            //         "Hotelcodes" => $hotelCodesString,
            //         "Language" => "EN",
            //     ]
            // ]);

            // $hotelDetails = json_decode($response2->getBody()->getContents(), true);

            // // 3rd API request: Search hotels using the given parameters
            // $response3 = $client->post('https://affiliate.tektravels.com/HotelAPI/Search', [
            //     'auth' => ['Apkatrip', 'Apkatrip@1234'],
            //     'json' => [
            //         "CheckIn" => $validated['checkIn'],
            //         "CheckOut" => $validated['checkOut'],
            //         "HotelCodes" => $hotelCodesString, // Ensure to use the correct string of hotel codes
            //         "GuestNationality" => $validated['guestNationality'],
            //         "PaxRooms" => [
            //             [
            //                 "Adults" => $validated['adults'],
            //                 "Children" => $validated['children'],
            //                 "ChildrenAges" => $validated['children'] > 0 ? [null] : null,
            //             ]
            //         ],
            //         "ResponseTime" => 23.0,
            //         "IsDetailedResponse" => true,
            //         "Filters" => [
            //             "Refundable" => false,
            //             "NoOfRooms" => 1,
            //             "MealType" => 0,
            //             "OrderBy" => 0,
            //             "StarRating" => 0,
            //             "HotelName" => null,
            //         ]
            //     ]
            // ]);



            // $hotelSearchResults = json_decode($response3->getBody()->getContents(), true);

            // Directly return the total hotels search results
            // return response()->json([
            //     'totalHotels' => $hotelDetails,
            //     'hotelSearchResults'=>$hotelSearchResults
            // ]);







    }
    

    function singleHotelget(Request $request)
    {
        $validated = $request->validate([
            'HotelCode' => 'required|string',
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

        $response2 = Http::withBasicAuth('Apkatrip', 'Apkatrip@1234')->post('https://affiliate.tektravels.com/HotelAPI/Search', [


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
        $resp1 = json_decode($response1->getBody()->getContents(), true);
        $resp2 = json_decode($response2->getBody()->getContents(), true);

        $values = ["hoteldetail1" => $resp1['HotelDetails'], "hoteldetail2" => $resp2["HotelResult"]];
        return response()->JSON($values);
        // return $response1;
    }

    
    function preBooking(Request $request)
    {
        $validated = $request->validate([
            'BookingCode' => 'required',



        ]);


        $response1 = Http::withBasicAuth('Apkatrip', 'Apkatrip@1234')->post('https://affiliate.tektravels.com/HotelAPI/PreBook', [
            "BookingCode" => $validated['BookingCode']

        ]);
        $response1 = json_decode($response1->getBody()->getContents(), true);

        return $response1;
    }






}
