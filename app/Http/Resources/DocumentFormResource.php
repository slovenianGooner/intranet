<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Document */
class DocumentFormResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource?->id,
            'folder_id' => $this->resource?->folder_id,
            'title' => $this->resource?->title ?? '',
            'active' => $this->resource?->active ?? true,
            'body' => $this->resource?->body,
            'roles' => $this->resource?->roles->pluck("name")->toArray() ?? [],
            'file_list' => $this->resource?->getMedia('files')->map(fn($file) => [
                    'id' => $file->id,
                    'name' => $file->file_name,
                    'size' => $file->human_readable_size,
                    'url' => $file->getUrl(),
                ]) ?? [],
        ];
    }
}
