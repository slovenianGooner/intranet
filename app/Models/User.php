<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Lab404\Impersonate\Models\Impersonate;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use function route;
use Route;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, Impersonate;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'custom_data'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'custom_data' => 'array',
    ];

    /**
     * @return bool
     */
    public function getSuperAdminAttribute(): bool
    {
        return $this->hasRole("Super Admin");
    }

    public function getCanBeEditedAttribute(): bool
    {
        return !$this->super_admin;
    }

    public function getCanBeDeletedAttribute(): bool
    {
        return !$this->super_admin;
    }

    public function getCanRolesBeEditedAttribute(): bool
    {
        return !$this->super_admin;
    }

    public function getCanImpersonateAttribute(): bool
    {
        return $this->super_admin;
    }

    public function getCanBeImpersonatedAttribute(): bool
    {
        return !$this->super_admin;
    }

    public function getUserMenu(): array
    {
        // Add other routes here conditionally
        return [
            [
                'name' => 'Profile',
                'href' => route('profile.edit'),
            ],
            [
                'name' => 'Sign Out',
                'href' => route('logout'),
                'method' => 'post',
                'as' => 'button'
            ]
        ];
    }

    public function getNavigation(): array
    {
        $navigation = [
            [
                'name' => 'Dashboard',
                'icon' => 'HomeIcon',
                'href' => route('dashboard'),
                'current' => Route::is('dashboard'),
            ],
        ];

        if ($this->can('users')) {
            $navigation[] = [
                'name' => 'Users',
                'icon' => 'UsersIcon',
                'href' => route('users.index'),
                'current' => Route::is('users.*'),
            ];
        }

        if ($this->can('roles')) {
            $navigation[] = [
                'name' => 'Roles',
                'icon' => 'LockOpenIcon',
                'href' => route('roles.index'),
                'current' => Route::is('roles.*'),
            ];
        }

        return $navigation;
    }
}
