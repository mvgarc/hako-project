<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::attempt($request->only('email', 'password'))) {
            if (Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Login exitoso']);
            }
    
            return response()->json(['message' => 'Las credenciales no coinciden.'], 401);
        }
    }
        public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logout exitoso']);
    }
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
