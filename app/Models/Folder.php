<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Baum\NestedSet\Node as WorksAsNestedSet;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Request;
use Spatie\Permission\Traits\HasRoles;

class Folder extends Model
{
    use WorksAsNestedSet, HasRoles;

    protected string $guard_name = 'web';

    protected $fillable = [
        'active',
        'parent_id',
        'name',
        'slug',
        'description',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function authorizedToView(User $user): bool
    {
        // If the folder's parent is not authorized to view, then return false
        if ($this->parent && !$this->parent->authorizedToView($user)) {
            return false;
        }

        // If the folder is authorized to view, then return true
        if ($user->can('view', $this)) {
            return true;
        }

        return false;
    }

    public function insertAtPosition(int $position): bool|int
    {
        return $this->insertAt($position);
    }

    public function reduceDepthBy(int $depth): static
    {
        $this->depth -= $depth;
        return $this;
    }

    public function setUrl(string $url): static
    {
        $this->url = str_replace(':id', $this->id, $url);
        return $this;
    }

    public function isOpen(Folder $currentFolder): static
    {
        // The folder is considered open if it's the current folder or if it's a parent of the current folder
        $this->open = $this->id === $currentFolder->id || $this->isAncestorOf($currentFolder);
        return $this;
    }

    public function isCurrent(Folder $currentFolder): static
    {
        $this->current = $this->id === $currentFolder->id;
        return $this;
    }

    public function prepareForNavigation(string $route, Folder $rootFolder, Folder $currentFolder)
    {
        return $this->setUrl(route($route) . '?folder=:id')
            ->reduceDepthBy($rootFolder->depth + 1)
            ->isCurrent($currentFolder)
            ->isOpen($currentFolder);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }
}
