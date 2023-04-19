<?php

namespace App\Policies;

use App\Models\Content;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContentPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->can('contents');
    }

    public function view(User $user, Content $content): bool
    {
        // use this later if needed to limit view to specific content
        return true;
    }

    public function create(User $user): bool
    {
        return $user->can('contents.create');
    }

    public function update(User $user, Content $content): bool
    {
        return $user->can('contents.edit');
    }

    public function delete(User $user, Content $content): bool
    {
        return $user->can('contents.destroy');
    }
}
