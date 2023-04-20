<?php

namespace App\Models;

use App\DTO\ContentType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Content extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'active',
        'type',
        'title',
        'slug',
        'body',
        'starts_at',
        'ends_at',
        'created_by',
        'allow_signups',
        'last_signup_at',
    ];

    protected $casts = [
        'active' => 'boolean',
        'type' => ContentType::class,
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'allow_signups' => 'boolean',
        'last_signup_at' => 'datetime',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }


}
