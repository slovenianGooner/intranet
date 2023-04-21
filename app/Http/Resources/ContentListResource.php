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
            'id' => $this->resource?->id,
            'active' => $this->resource?->active,
            'type' => $this->resource?->type,
            'title' => $this->resource?->title,
            'body' => $this->resource?->body,
            'files' => $this->resource?->getMedia('files')->map(fn($file) => [
                'id' => $file->id,
                'name' => $file->file_name,
                'size' => $file->human_readable_size,
                'url' => $file->getUrl(),
            ]),
            'author' => $this->resource?->author?->name,
            'starts_at' => $this->resource?->starts_at?->format('d.m.Y H:i'),
            'ends_at' => $this->resource?->ends_at?->format('d.m.Y H:i'),
            'created_by' => $this->resource?->author?->name,
            'created_at' => $this->resource?->created_at->format('d.m.Y H:i'),
        ];
    }
}
