<?php

namespace App\Http\Controllers;

use App\Models\Holidayspackage;
use Illuminate\Http\Request;

class HolidayspackageController extends Controller
{
    //

public function SearchHolidayspackage(string $name){
  
    $package = Holidayspackage::where("name", "LIKE", "%{$name}%")->get();
    return $package;
}


}
