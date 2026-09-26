<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\RedirectController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/check/{shortCode}', [RedirectController::class, 'check']);

// guest URL creation
Route::post('/guest-urls', [UrlController::class, 'storeGuest']);

//protected routes 
Route::middleware('auth:sanctum')->group(function () {

    // for authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    //for urls 
    Route::get('/urls', [UrlController::class, 'index']);
    Route::post('/urls', [UrlController::class, 'store']);
    Route::get('/urls/{url}', [UrlController::class, 'show']);
    Route::delete('/urls/{url}', [UrlController::class, 'destroy']);
    Route::get('/urls/{url}/stats', [UrlController::class, 'stats']);
    });