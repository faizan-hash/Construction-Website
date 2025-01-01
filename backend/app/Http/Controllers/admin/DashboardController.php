<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        return response()->json([
            'status'=>true,
            'message'=>'Welcome to the admin dashboard'
        ],200);
    }
}
