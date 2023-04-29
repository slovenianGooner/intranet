<?php

namespace App\Http\Resources;

use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Folder */
class FolderFormResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource?->id,
            'active' => $this->resource?->active ?? true,
            'parent_id' => $this->resource?->parent_id ?? (int)$request->query("folder") ?? Folder::root()->id,
            'roles' => $this->resource?->roles->pluck("name")->toArray() ?? [],
            'name' => $this->resource?->name ?? '',
            'description' => $this->resource?->description ?? '',
        ];
    }
}
