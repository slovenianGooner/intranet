<?php

use App\Http\Controllers\Content\NotificationsController;
use App\Http\Controllers\ContentsController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\FileLibraryController;
use App\Http\Controllers\FoldersController;
use App\Http\Controllers\NewsController;
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

    Route::get('/folders', [FoldersController::class, 'index'])->name('folders.index')->can("folders");
    Route::get('/folders/create', [FoldersController::class, 'create'])->name('folders.create')->can("folders.create");
    Route::post('/folders', [FoldersController::class, 'store'])->name('folders.store')->can("folders.create");
    Route::get('/folders/{folder}/edit', [FoldersController::class, 'edit'])->name('folders.edit')->can("folders.edit");
    Route::post('/folders/{folder}/sort', [FoldersController::class, 'sort'])->name('folders.sort')->can("folders.edit");
    Route::patch('/folders/{folder}', [FoldersController::class, 'update'])->name('folders.update')->can("folders.edit");
    Route::delete('/folders/{folder}', [FoldersController::class, 'destroy'])->name('folders.destroy')->can("folders.destroy");

    Route::get('/contents', [ContentsController::class, 'index'])->name('contents.index')->can("contents");
    Route::get('/contents/create', [ContentsController::class, 'create'])->name('contents.create')->can("contents.create");
    Route::post('/contents', [ContentsController::class, 'store'])->name('contents.store')->can("contents.create");
    Route::get('/contents/{content}', [ContentsController::class, 'show'])->name('contents.show')->can("contents.show");
    Route::get('/contents/{content}/edit', [ContentsController::class, 'edit'])->name('contents.edit')->can("contents.edit");
    Route::patch('/contents/{content}', [ContentsController::class, 'update'])->name('contents.update')->can("contents.edit");
    Route::delete('/contents/{content}', [ContentsController::class, 'destroy'])->name('contents.destroy')->can("contents.destroy");

    Route::get('/contents/{content}/notify/recipients', [NotificationsController::class, 'showRecipients'])->name('contents.notifications.showRecipients')->can("contents.create");
    Route::post('/contents/{content}/notify/recipients', [NotificationsController::class, 'storeRecipients'])->name('contents.notifications.storeRecipients')->can("contents.create");
    Route::get('/contents/{content}/notify/preview', [NotificationsController::class, 'preview'])->name('contents.notifications.preview')->can("contents.create");
    Route::post('/contents/{content}/notify/send', [NotificationsController::class, 'send'])->name('contents.notifications.send')->can("contents.create");
    Route::get('/contents/{content}/notify/super-preview', [NotificationsController::class, 'superPreview'])->name('contents.notifications.superPreview');

    Route::get('/documents/create', [DocumentsController::class, 'create'])->name('documents.create')->can("documents.create");
    Route::post('/documents', [DocumentsController::class, 'store'])->name('documents.store')->can("documents.create");
    Route::get('/documents/{document}/edit', [DocumentsController::class, 'edit'])->name('documents.edit')->can("documents.edit");
    Route::patch('/documents/{document}', [DocumentsController::class, 'update'])->name('documents.update')->can("documents.edit");
    Route::delete('/documents/{document}', [DocumentsController::class, 'destroy'])->name('documents.destroy')->can("documents.destroy");

    Route::get('/file-library', [FileLibraryController::class, 'index'])->name('file-library.index');
    Route::get('/file-library/{document}', [FileLibraryController::class, 'show'])->name('file-library.show');

    Route::impersonate();
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
