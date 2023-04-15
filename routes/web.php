<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::group(["middleware" => ["auth", "verified"]], function () {
    Route::get('/users', [UsersController::class, 'index'])->name('users.index')->can("users");
    Route::get('/users/create', [UsersController::class, 'create'])->name('users.create')->can("users.create");
    Route::post('/users', [UsersController::class, 'store'])->name('users.store')->can("users.create");
    Route::get('/users/{user}/edit', [UsersController::class, 'edit'])->name('users.edit')->can("users.edit");
    Route::patch('/users/{user}', [UsersController::class, 'update'])->name('users.update')->can("users.edit");
    Route::delete('/users/{user}', [UsersController::class, 'destroy'])->name('users.destroy')->can("users.destroy");

    Route::get('/roles', [RolesController::class, 'index'])->name('roles.index')->can("roles");
    Route::get('/roles/create', [RolesController::class, 'create'])->name('roles.create')->can("roles.create");
    Route::post('/roles', [RolesController::class, 'store'])->name('roles.store')->can("roles.create");
    Route::get('/roles/{role}/edit', [RolesController::class, 'edit'])->name('roles.edit')->can("roles.edit");
    Route::patch('/roles/{role}', [RolesController::class, 'update'])->name('roles.update')->can("roles.edit");
    Route::delete('/roles/{role}', [RolesController::class, 'destroy'])->name('roles.destroy')->can("roles.destroy");

    Route::impersonate();
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
