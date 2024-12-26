<?php

namespace App\Http\Controllers;

use App\Models\TravelPackage;
use Illuminate\Http\Request;

class HolidayspackageController extends Controller
{
    //

    public function SearchHolidayspackage(string $name)
    {

        $package = TravelPackage::where("package_name", "LIKE", "%{$name}%")
        ->orWhere("package_Type", "LIKE", "%{$name}%")
        ->orWhere("city", "LIKE", "%{$name}%")->get();


        if(!$package){
         return response()->json(["success"=>false,"message"=>"package not found"]);
        }
   



        return $package;
    }
}
