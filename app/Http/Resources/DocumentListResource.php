<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Document */
class DocumentListResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource?->id,
            'active' => $this->resource?->active,
            'title' => $this->resource?->title,
            'slug' => $this->resource?->slug,
            'body' => $this->resource?->body,
            'files' => $this->resource?->getMedia('files')->map(fn($file) => [
                'id' => $file->id,
                'name' => $file->file_name,
                'size' => $file->human_readable_size,
                'url' => $file->getUrl(),
            ]),
            'author' => $this->resource?->author?->name,
            'created_by' => $this->resource?->author?->name,
            'created_at' => $this->resource?->created_at->format('d.m.Y H:i'),
        ];
    }
}
