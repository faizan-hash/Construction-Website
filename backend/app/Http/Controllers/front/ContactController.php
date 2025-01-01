<?php

namespace App\Http\Controllers\front;

use App\Mail\ContactEmail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'errors' => $validator->errors(),
            ]);
        }
        $mailData = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
            'subject' => $request->subject,

        ];
        Mail::to('jexperiment242@gmail.com')->send(new ContactEmail($mailData));
        return response()->json([
            'status' => 'true',
            'message' => "Thanks For Contacting Us",
        ]);
    }
}
