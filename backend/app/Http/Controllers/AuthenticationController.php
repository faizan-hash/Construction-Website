<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request){
        $validator=Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
            'status'=>false,
            'errors'=>$validator->errors()
        ], 400);

        }else{
            $credentials=['email'=>$request->email,
            'password'=>$request->password];
            if(Auth::attempt($credentials)){
                 $user=User::find(Auth::id());
                 $token=$user->createToken('token')->plainTextToken;
                 return response()->json([
                    'status'=>true,
                    'token'=>$token,
                    'id'=>$user->id,
                 ],200);
                            }
            else{
             return response()->json([
            'status'=>false,
            'message'=>"Either email or password is incorrect"
        ], 400);
            }
        }
    }

    public function logout(){
        $user=User::find(Auth::id());
        $user->tokens()->delete();
          return response()->json([
            'status'=>true,
            'message'=>"Logged out successfully"
        ], 200);
    }
}
