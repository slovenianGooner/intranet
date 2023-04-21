<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentListResource;
use App\Models\Content;
use App\Models\User;
use App\Notifications\ContentNotification;
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

        // Get a list of recipients from the session if they exist
        $recipients = $request->session()->get("content.{$content->id}.recipients", []);

        return Inertia::render("Content/Notifications/Recipients", [
            "content" => new ContentListResource($content),
            "roles" => $roles,
            "session_recipients" => $recipients,
        ]);
    }

    public function storeRecipients(Request $request, Content $content)
    {
        $request->validate([
            "recipients" => ["required", "array"],
            "recipients.*" => ["required", "integer", "exists:users,id"],
        ]);

        // Store the recipients in the session so we can access them later for this content
        $request->session()->put("content.{$content->id}.recipients", $request->input("recipients"));

        // Redirect to the preview page
        return redirect()->route("contents.notifications.preview", $content);
    }

    public function preview(Request $request, Content $content)
    {
        // Retrieve the recipients from the session
        $recipients = $request->session()->get("content.{$content->id}.recipients", []);

        // If no recipients found, redirect back to the recipients page
        if (count($recipients) === 0) {
            return redirect()->route("contents.notifications.recipients", $content);
        }

        // Get the users from the database
        $users = User::whereIn("id", $recipients)->get();

        return Inertia::render("Content/Notifications/Preview", [
            "content" => new ContentListResource($content),
            "users" => $users,
            "session_recipients" => $recipients,
        ]);
    }

    public function superPreview(Request $request, Content $content)
    {
        return (new ContentNotification($content))->toMail($request->user());
    }

    public function send(Request $request, Content $content)
    {

    }
}
