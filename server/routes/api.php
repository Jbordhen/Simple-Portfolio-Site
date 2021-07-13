<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkExperienceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/signup', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user}', [UserController::class, 'show']);

Route::get('/educations/{education}', [EducationController::class, 'show']);
Route::get('/work_experiences/{work_experience}', [WorkExperienceController::class, 'show']);
Route::get('/references/{reference}', [ReferenceController::class, 'show']);
Route::get('/skills/{skill}', [SkillController::class, 'show']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

// Route::group(['middleware' => ['auth:api'], function () {
//   Route::get('/logout', [AuthController::class, 'logout']);
// }]);

Route::middleware(['auth:api'])->group(function () {
  Route::get('/logout', [AuthController::class, 'logout'])->middleware(('auth:api'));

  Route::post('/educations', [EducationController::class, 'store']);
  Route::put('/educations/{education}', [EducationController::class, 'update']);
  Route::delete('/educations/{education}', [EducationController::class, 'destroy']);

  Route::post('/work_experiences', [WorkExperienceController::class, 'store']);
  Route::put('/work_experiences/{work_experience}', [WorkExperienceController::class, 'update']);
  Route::delete('/work_experiences/{work_experience}', [WorkExperienceController::class, 'destroy']);

  Route::post('/references', [ReferenceController::class, 'store']);
  Route::put('/references/{reference}', [ReferenceController::class, 'update']);
  Route::delete('/references/{reference}', [ReferenceController::class, 'destroy']);

  Route::post('/skills', [SkillController::class, 'store']);
  Route::put('/skills/{skill}', [SkillController::class, 'update']);
  Route::delete('/skills/{skill}', [SkillController::class, 'destroy']);

  Route::post('/projects', [ProjectController::class, 'store']);
  Route::put('/projects/{project}', [ProjectController::class, 'update']);
  Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

  Route::put('/users/update', [UserController::class, 'update']);
});
