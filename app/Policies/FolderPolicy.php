<?php

namespace App\Policies;

use App\Models\Folder;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FolderPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->can('folders');
    }

    public function view(User $user, Folder $folder): bool
    {
        // use this later for any permissions when
        // displaying the file library
        return true;
    }

    public function create(User $user): bool
    {
        return $user->can('folders.create');
    }

    public function update(User $user, Folder $folder): bool
    {
        return $user->can('folders.edit');
    }

    public function delete(User $user, Folder $folder): bool
    {
        return $user->can('folders.destroy');
    }
}
