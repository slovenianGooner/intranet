<?php

namespace App\Http\Resources;

use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Content */
class ContentListResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'active' => $this->active,
            'type' => $this->type,
            'title' => $this->title,
            'body' => $this->body,
            'starts_at' => $this->starts_at?->format('d.m.Y H:i'),
            'ends_at' => $this->ends_at?->format('d.m.Y H:i'),
            'created_by' => $this->author?->name,
            'created_at' => $this->created_at->format('d.m.Y H:i'),
        ];
    }
}
