<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Folder;
use App\Models\User;
use App\Policies\FolderPolicy;
use App\Policies\RolePolicy;
use App\Policies\UserPolicy;
use Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Spatie\Permission\Models\Role;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Role::class => RolePolicy::class,
        Folder::class => FolderPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole("Super Admin") ? true : null;
        });
    }
}
