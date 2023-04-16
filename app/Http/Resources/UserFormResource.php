<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin User */
class UserFormResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource?->id,
            'name' => $this->resource?->name ?? '',
            'email' => $this->resource?->email ?? '',
            'roles' => $this->resource?->roles->pluck("name")->toArray() ?? [],
            'custom_data' => $this->resource?->custom_data ?? [],
        ];
    }
}
