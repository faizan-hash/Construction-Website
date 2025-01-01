<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'testimonial',
        'citation',
        'status',
        'image',
        'desigination',
    ];
}
