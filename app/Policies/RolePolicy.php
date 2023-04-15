<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Spatie\Permission\Models\Role;

class RolePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->can('roles');
    }

    public function create(User $user): bool
    {
        return $user->can('roles.create');
    }

    public function update(User $user, Role $role): bool
    {
        return $user->can('roles.edit') && $role->name !== 'Super Admin';
    }

    public function delete(User $user, Role $role): bool
    {
        return $user->can('roles.destroy') && $role->name !== 'Super Admin';
    }
}
