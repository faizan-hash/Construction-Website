<?php

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\MemberController;
use App\Http\Controllers\admin\ArticleController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\admin\TestimonialController;
use App\Http\Controllers\front\ArticleController as FrontArticleController;
use App\Http\Controllers\front\ContactController;
use App\Http\Controllers\front\ProjectController as FrontProjectController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Http\Controllers\front\TestimonialController as FrontTestimonialController;
use App\Http\Controllers\front\MemberController as FrontMemberController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('authenticate', [AuthenticationController::class, 'authenticate']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']);
    Route::post('temp-images', [TempImageController::class, 'store']);
    Route::resource('services', ServiceController::class);
    Route::resource('projects', ProjectController::class);
    Route::resource('articles', ArticleController::class);
    Route::resource('testimonials', TestimonialController::class);
    Route::resource('members', MemberController::class);
});
Route::get('get-services', [FrontServiceController::class, 'index']);
Route::get('get-latest-services', [FrontServiceController::class, 'latestServices']);
Route::get('get-projects', [FrontProjectController::class, 'index']);
Route::get('get-latest-projects', [FrontProjectController::class, 'latestProjects']);
Route::get('get-articles', [FrontArticleController::class, 'index']);
Route::get('get-latest-articles', [FrontArticleController::class, 'latestarticles']);
Route::get('get-testomanials', [FrontArticleController::class, 'index']);
Route::get('get-latest-testimonials', [FrontTestimonialController::class, 'latesttestimonials']);
Route::get('get-members', [FrontMemberController::class, 'index']);
Route::post('contact-now', [ContactController::class, 'index']);
