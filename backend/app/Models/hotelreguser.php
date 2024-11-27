<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;

class hotelreguser extends Authenticatable
{
    protected $table = 'hotel_regs';
    use HasFactory;
    protected $fillable = [
        "name",
        "email",
        "password",

        "useractive"
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
    protected $casts = [
        'useractive' => 'boolean',
    ];
}