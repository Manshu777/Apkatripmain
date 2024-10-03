<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; 
use App\Services\ApiService;

class FlightController extends Controller
{
    protected $apiService;

    public function __construct(ApiService $apiService)
    {
        $this->apiService = $apiService;
    }

    public function searchFlights(Request $request)
    {
      
        $token = $this->apiService->getToken();
        $validatedData = $request->validate([
            'AdultCount' => 'required|integer',
            'Origin' => 'required|string',
            'Destination' => 'required|string',
            'FlightCabinClass' => 'required|integer',
            'PreferredDepartureTime' => 'required',
            'ChildCount' => 'nullable|integer',
            'InfantCount' => 'nullable|integer',
            'DirectFlight' => 'nullable|boolean',
            'OneStopFlight' => 'nullable|boolean',
            'JourneyType' => 'required|integer',
            'PreferredAirlines' => 'nullable|string',

        ]);
        
        // Define the search payload
        $searchPayload = [
            "EndUserIp" => $request->ip(), // Dynamic IP from the request
            "TokenId" => $token,
            "AdultCount" => $validatedData['AdultCount'],
            "ChildCount" => $validatedData['ChildCount'],
            "InfantCount" => $validatedData['InfantCount'],
            "DirectFlight" => $validatedData['DirectFlight'],
                        "OneStopFlight" => $validatedData['OneStopFlight'],
                        "JourneyType" => $validatedData['JourneyType'],
                        "PreferredAirlines" => $validatedData['PreferredAirlines'],
            "Segments" => [
                [
                    "Origin" =>$validatedData['Origin'],
                    "Destination" =>$validatedData['Destination'],
                    "FlightCabinClass" =>$validatedData['FlightCabinClass'],     
                    "PreferredDepartureTime" =>$validatedData['PreferredDepartureTime'],        
                    "PreferredArrivalTime" =>$validatedData['PreferredDepartureTime']                    // "PreferredDepartureTime" =>$validatedData['PreferredDepartureTime'],
                    // "PreferredArrivalTime" =>$validatedData['PreferredDepartureTime']
                ]
            ],
            "Sources" => null
        ];
    
     
        $response = Http::withHeaders([

        ])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search', $searchPayload);
    
        // Check for token expiration or invalid token (error code 6)
        if ($response->json('Response.Error.ErrorCode') === 6) {
         
            $token = $this->apiService->authenticate();
    
            // Retry the request with a new token
            $response = Http::withHeaders([
                // 'Authorization' => "Bearer $token"
            ])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search', $searchPayload);
        }
    
        // Return the search response
        return $response->json();
    }
}