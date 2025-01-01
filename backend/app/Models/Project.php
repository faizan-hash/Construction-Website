<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'short_desc',
        'content',
        'status',
        'image',
        'location',
        'construction_type',
        'sector',
    ];
}
