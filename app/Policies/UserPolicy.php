<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use function dd;

class UserPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->can("users");
    }

    public function create(User $user): bool
    {
        return $user->can("users.create");
    }

    public function update(User $user, User $model): bool
    {
        return $user->can("users.edit") && $model->can_be_edited;
    }

    public function delete(User $user, User $model): bool
    {
        return $user->can("users.destroy") && $model->can_be_deleted;
    }
}
