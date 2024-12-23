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
            "EndUserIp" => 'required',
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

        // Prepare the search payload with the validated data and token
        $searchPayload = [
            "EndUserIp" => $validatedData['EndUserIp'],
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
                    "Origin" => $validatedData['Destination'],
                    "Destination" => $validatedData['Origin'],
                    "FlightCabinClass" => $validatedData['FlightCabinClass'],
                    "PreferredDepartureTime" => $validatedData['PreferredDepartureTime'],
                    "PreferredArrivalTime" => $validatedData['PreferredDepartureTime']
                    
                ]
            ],
            "Sources" => null
        ];


        $response = Http::timeout(100)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search', $searchPayload);



        if ($response->json('Response.Error.ErrorCode') === 6) {

            $token = $this->apiService->authenticate();


            $response = Http::timeout(90)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search', $searchPayload);
        }

        return     $response;
    }

    public function bookFlight(Request $request)
    {
        $token = $this->apiService->getToken();

        $validatedData = $request->validate([
            'ResultIndex' => 'required|string',
            'Passengers' => 'required|array|min:1',
            'Passengers.*.Title' => 'required|string',
            'Passengers.*.FirstName' => 'required|string',
            'Passengers.*.LastName' => 'required|string',
            'Passengers.*.PaxType' => 'required|integer',
            'Passengers.*.DateOfBirth' => 'required|date',
            'Passengers.*.Gender' => 'required|integer',
            'Passengers.*.PassportNo' => 'nullable|string',
            'Passengers.*.PassportExpiry' => 'nullable|date',
            'Passengers.*.AddressLine1' => 'required|string',
            'Passengers.*.City' => 'required|string',
            'Passengers.*.CountryCode' => 'required|string',
            'Passengers.*.ContactNo' => 'required|string',
            'Passengers.*.Email' => 'required|email',
            'Passengers.*.IsLeadPax' => 'required|boolean',
            'EndUserIp' => 'required|string',
            'TraceId' => 'required|string',
        ]);

        $bookingPayload = [
            "ResultIndex" => $validatedData['ResultIndex'],
            "Passengers" => $validatedData['Passengers'],
            "EndUserIp" => $validatedData['EndUserIp'],
            "TokenId" => $token,
            "TraceId" => $validatedData['TraceId']
        ];

        $response = Http::timeout(100)->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Book', $bookingPayload);

        if ($response->json('Response.Error.ErrorCode') === 6) {
            $token = $this->apiService->authenticate();
            $bookingPayload['TokenId'] = $token;
            $response = Http::timeout(90)->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Book', $bookingPayload);
        }

        return $response;
    }

    public function getCalendarFare(Request $request)
    {
        $token = $this->apiService->getToken();
        try {
           
            $validated = $request->validate([
                'JourneyType' => 'integer',
                'EndUserIp' => 'ip',
               
                'Segments' => 'required|array',
                'Segments.*.Origin' => 'string|max:3',
                'Segments.*.Destination' => 'required|string|max:3',
                'Segments.*.FlightCabinClass' => 'required|integer',
                'Segments.*.PreferredDepartureTime' => 'required|date',
            ]);


            $apiUrl = "http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/GetCalendarFare";


            $response = Http::post($apiUrl, [
                "JourneyType" => $validated['JourneyType'],
                "EndUserIp" => $validated['EndUserIp'],
                "TokenId" => $token,
                "PreferredAirlines" => $request->input('PreferredAirlines', null),
                "Segments" => $validated['Segments'],
                "Sources" => $request->input('Sources', null),
            ]);

            // Check if the response is successful
            if ($response->successful()) {
                return response()->json($response->json());
            }

            // Log error for unsuccessful responses
            Log::error('API returned an error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return response()->json([
                'error' => 'Unable to fetch data from external API',
                'details' => $response->json(),
            ], $response->status());
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Catch any other exceptions
            Log::error('An error occurred', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'An unexpected error occurred',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function generateTicket(Request $request)
{
    $token = $this->apiService->getToken();

    // Validate incoming request data
    $validatedData = $request->validate([
        'PreferredCurrency' => 'nullable|string',
        'AgentReferenceNo' => 'required|string',
        'Passengers' => 'required|array|min:1',
        'Passengers.*.Title' => 'required|string',
        'Passengers.*.FirstName' => 'required|string',
        'Passengers.*.LastName' => 'required|string',
        'Passengers.*.PaxType' => 'required|integer',
        'Passengers.*.DateOfBirth' => 'required|date',
        'Passengers.*.Gender' => 'required|integer',
        'Passengers.*.PassportNo' => 'nullable|string',
        'Passengers.*.PassportExpiry' => 'nullable|date',
        'Passengers.*.AddressLine1' => 'required|string',
        'Passengers.*.City' => 'required|string',
        'Passengers.*.CountryCode' => 'required|string',
        'Passengers.*.ContactNo' => 'required|string',
        'Passengers.*.Email' => 'required|email',
        'Passengers.*.IsLeadPax' => 'required|boolean',
        'Passengers.*.Fare' => 'required|array',
        'Passengers.*.Baggage' => 'nullable|array',
        'Passengers.*.MealDynamic' => 'nullable|array',
        'Passengers.*.SeatDynamic' => 'nullable|array',
        'Passengers.*.SpecialServices' => 'nullable|array',
        'EndUserIp' => 'required|string',
        'TraceId' => 'required|string',
        'ResultIndex' => 'required|string',
    ]);

    // Prepare payload for the Ticket API request
    $ticketPayload = [
        "PreferredCurrency" => $validatedData['PreferredCurrency'] ?? null,
        "AgentReferenceNo" => $validatedData['AgentReferenceNo'],
        "Passengers" => $validatedData['Passengers'],
        "EndUserIp" => $validatedData['EndUserIp'],
        "TokenId" => $token,
        "TraceId" => $validatedData['TraceId'],
        "ResultIndex" => $validatedData['ResultIndex']
    ];

    // Call the Ticket API
    $response = Http::timeout(100)->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Ticket', $ticketPayload);

    // Handle token expiration (Error code 6)
    if ($response->json('Response.Error.ErrorCode') === 6) {
        $token = $this->apiService->authenticate();
        $ticketPayload['TokenId'] = $token;

        $response = Http::timeout(90)->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Ticket', $ticketPayload);
    }

    // Return the API response
    return $response->json();
}






    public function searchreturnflight(Request $request)
    {

        $token = $this->apiService->getToken();

        $validatedData = $request->validate([
            "EndUserIp" => 'required',
            'AdultCount' => 'required|integer',
            'Origin' => 'required|string',
            'Destination' => 'required|string',
            'FlightCabinClass' => 'required|integer',
            'PreferredDepartureTime' => 'required',
            'PreferredDepartureTime2' => 'required',
            'ChildCount' => 'nullable|integer',
            'InfantCount' => 'nullable|integer',
            'DirectFlight' => 'nullable|boolean',
            'OneStopFlight' => 'nullable|boolean',
            'JourneyType' => 'required|integer',
            'PreferredAirlines' => 'nullable|string',

        ]);

        // Prepare the search payload with the validated data and token
        $searchPayload = [
            "EndUserIp" => $validatedData['EndUserIp'],
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
                    "Origin" => $validatedData['Origin'],
                    "Destination" => $validatedData['Destination'],
                    "FlightCabinClass" => $validatedData['FlightCabinClass'],
                    "PreferredDepartureTime" => $validatedData['PreferredDepartureTime'],
                    "PreferredArrivalTime" => $validatedData['PreferredDepartureTime']                 // "PreferredDepartureTime" =>$validatedData['PreferredDepartureTime'],
                    // "PreferredArrivalTime" =>$validatedData['PreferredDepartureTime']
                ],
                [
                    "Origin" => $validatedData['Destination'],
                    "Destination" => $validatedData['Origin'],
                    "FlightCabinClass" => $validatedData['FlightCabinClass'],
                    "PreferredDepartureTime" => $validatedData['PreferredDepartureTime2'],
                    "PreferredArrivalTime" => $validatedData['PreferredDepartureTime2']

                ]
            ],
            "Sources" => null
        ];


        $response = Http::timeout(100)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search', $searchPayload);



        if ($response->json('Response.Error.ErrorCode') === 6) {

            $token = $this->apiService->authenticate();


            $response = Http::timeout(90)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search', $searchPayload);
        }

        //  Return the search response
        return $response->json();
    }







    public function advance_search(Request $request)
    {

        $token = $this->apiService->getToken();

        $validatedData = $request->validate([
            "EndUserIp" => 'required',
            'AdultCount' => 'required|integer',
            'ChildCount' => 'nullable|integer',
            'InfantCount' => 'nullable|integer',
            "TraceId" => "required",
            "ResultIndex" => "required",
            "Source" => "required",
            "IsLCC" => "required",
            "IsRefundable" => "required",
            "AirlineRemark" => "nullable",
            "TripIndicator" => "required",
            "SegmentIndicator" => "required",
            "AirlineCode" => "required",
            "AirlineName" => "required",
            "FlightNumber" => "required",
            "FareClass" => "required",
            "OperatingCarrier" => "nullable"
        ]);

        // Prepare the search payload with the validated data and token
        $searchPayload = [
            'AdultCount' =>  $validatedData['AdultCount'],
            'ChildCount' =>  $validatedData['ChildCount'],
            'InfantCount' =>  $validatedData['InfantCount'],
            'EndUserIp' =>  $validatedData['EndUserIp'],
            'TokenId' =>  $token,
            'TraceId' =>  $validatedData['TraceId'],
            'AirSearchResult' => [
                [
                    'ResultIndex' =>  $validatedData['ResultIndex'],
                    'Source' =>  $validatedData['Source'],
                    'IsLCC' =>  $validatedData['IsLCC'],
                    'IsRefundable' => $validatedData['IsRefundable'],
                    'AirlineRemark' =>  $validatedData['AirlineRemark'],
                    'Segments' => [
                        [
                            [
                                'TripIndicator' => $validatedData['TripIndicator'],
                                'SegmentIndicator' => $validatedData['SegmentIndicator'],
                                'Airline' => [
                                    'AirlineCode' => $validatedData['AirlineCode'],
                                    'AirlineName' => $validatedData['AirlineName'],
                                    'FlightNumber' => $validatedData['FlightNumber'],
                                    'FareClass' => $validatedData['FareClass'],
                                    'OperatingCarrier' => $validatedData['OperatingCarrier'],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];


        $response = Http::timeout(100)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/PriceRBD', $searchPayload);



        if ($response->json('Response.Error.ErrorCode') === 6) {

            $token = $this->apiService->authenticate();


            $response = Http::timeout(90)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/PriceRBD', $searchPayload);
        }

        //  Return the search response
        return $response->json();
    }


    function fareRules(Request  $request)
    {
        $token = $this->apiService->getToken();

        $validatedData = $request->validate([
            "EndUserIp" => "required",
            "TraceId" => "required|string",
            "ResultIndex" => "required|string"

        ]);
        $validatedData["TokenId"] = $token;

        $response = Http::timeout(100)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareRule', $validatedData);
        if ($response->json('Response.Error.ErrorCode') === 6) {

            $token = $this->apiService->authenticate();


            $response = Http::timeout(100)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareRule', $validatedData);
        }
        return $response;
    }







    function ssrrequest(Request $request)
    {
        $token = $this->apiService->getToken();


        $validatedData = $request->validate([
            "EndUserIp" => 'required',
            "TraceId" => "required",
            "ResultIndex" => "required",
        ]);

        $searchpayload = [
            "EndUserIp" => $validatedData["EndUserIp"],
            "TokenId" => $token,
            "TraceId" => $validatedData["TraceId"],
            "ResultIndex" => $validatedData["ResultIndex"]
        ];


        $response = Http::timeout(100)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/SSR', $searchpayload);
        if ($response->json('Response.Error.ErrorCode') === 6) {

            $token = $this->apiService->authenticate();


            $response = Http::timeout(100)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/SSR', $searchpayload);
        }
        return $response;
    }



    function farequate(Request  $request)
    {
        $token = $this->apiService->getToken();

        $validatedData = $request->validate([
            "EndUserIp" => "required",
            "TraceId" => "required|string",
            "ResultIndex" => "required|string"

        ]);
        $validatedData["TokenId"] = $token;
    
        $response = Http::timeout(100)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareQuote', $validatedData);
        if ($response->json('Response.Error.ErrorCode') === 6) {

            $token = $this->apiService->authenticate();


            $response = Http::timeout(100)->withHeaders([])->post('http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareQuote', $validatedData);
        }
        return $response;
    }
}
