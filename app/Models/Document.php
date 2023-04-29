<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Permission\Traits\HasRoles;

class Document extends Model implements HasMedia
{
    use InteractsWithMedia, HasRoles;

    protected string $guard_name = 'web';

    protected $fillable = [
        'folder_id',
        'title',
        'slug',
        'active',
        'body',
        'folder_position',
        'created_by',
    ];

    protected $casts = [
        'folder_id' => 'integer',
        'active' => 'boolean',
        'folder_position' => 'integer',
        'created_by' => 'integer',
    ];

    public function scopeAuthorizedToView(Builder $query, User $user): Builder
    {
        // Only show documents that have no roles defined or the user has roles that the document has
        return $query->whereHas('roles', function (Builder $query) use ($user) {
            $query->where('roles.id', '=', $user->roles->pluck('id'));
        })->orWhereDoesntHave('roles');
    }

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

}
