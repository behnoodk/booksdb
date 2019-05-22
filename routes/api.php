<?php

use Illuminate\Http\Request;

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

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::post('/comment','CommentController@store');
Route::get('/comment', 'CommentController@index');
Route::get('/book','BookController@index');
Route::get('/author','AuthorController@index');

Route::group(['middleware' => 'auth:api'], function () {

    Route::put('/comment/{comment}', 'CommentController@update');
    Route::delete('/comment/{comment}', 'CommentController@destroy');

    Route::post('/book', 'BookController@store');
    Route::put('/book/{book}', 'BookController@update');
    Route::delete('/book', 'BookController@destroy');

    Route::post('/author', 'AuthorController@store');
    Route::put('/author/{author}', 'AuthorController@update');
    Route::delete('/author', 'AuthorController@destroy');

});


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
