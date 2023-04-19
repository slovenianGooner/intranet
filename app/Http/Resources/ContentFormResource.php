<?php

namespace App\Http\Resources;

use App\DTO\ContentType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Content */
class ContentFormResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource?->id,
            'active' => $this->resource?->active ?? true,
            'type' => $this->resource?->type ?? ContentType::MEMO,
            'title' => $this->resource?->title ?? '',
            'body' => $this->resource?->body ?? '',
            'starts_at' => $this->resource?->starts_at ?? null,
            'ends_at' => $this->resource?->ends_at ?? null,
            'allow_signups' => $this->resource?->allow_signups ?? false,
            'last_signup_at' => $this->resource?->last_signup_at ?? null,
        ];
    }
}
