<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TravelPackage extends Model
{
    //
  protected $fillable=[
"package_name",
"package_Type",
"banner_image",
"rating",
"country",
"state",
"city",
"duration",
"des",
"price",
"images",

"activite",
"terms",
"slug",];


protected $casts=[
    'image' => 'array',
    'activite' => 'array',
    'terms' => 'array',
];



    // Automatically generate unique slug on model creation
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = $model->generateUniqueSlug($model->package_name);
        });
    }

    private function generateUniqueSlug($packageName)
    {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $packageName), '-'));
        $originalSlug = $slug;
        $count = 1;

        while (self::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }


}
