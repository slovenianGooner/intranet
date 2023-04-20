<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentListResource;
use App\Models\Content;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class NotificationsController extends Controller
{
    public function showRecipients(Request $request, Content $content)
    {
        // Get a list of roles in the system (excluding the Super Admin role)
        $roles = Role::where("name", "!=", "Super Admin")->with("users")->get()->map(function ($role) {
            return [
                "id" => $role->id,
                "name" => $role->name,
                "users" => $role->users->filter(function ($user) {
                    return $user->has("permissions", "notify");
                })->map(function ($user) {
                    return [
                        "id" => $user->id,
                        "name" => $user->name,
                        "email" => $user->email,
                    ];
                }),
            ];
        });

        return Inertia::render("Content/Notifications/Recipients", [
            "content" => new ContentListResource($content),
            "roles" => $roles,
        ]);
    }

    public function preview(Request $request, Content $content)
    {

    }

    public function send(Request $request, Content $content)
    {

    }
}
