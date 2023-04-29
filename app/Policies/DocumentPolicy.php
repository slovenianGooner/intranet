<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DocumentPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Document $document): bool
    {
        if ($document->roles()->count() === 0) {
            return true;
        }

        if ($user->hasAnyRole($document->roles)) {
            return true;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('documents.create');
    }

    public function update(User $user, Document $document): bool
    {
        return $user->can('documents.edit');
    }

    public function delete(User $user, Document $document): bool
    {
        return $user->can('documents.destroy');
    }

}
