<?php

namespace App\DTO\CustomDataTypes;

use Illuminate\Contracts\Support\Jsonable;

class CustomData implements Jsonable
{
    public function toJson($options = 0): bool|string
    {
        return json_encode([
            'type' => $this->type,
            'title' => $this->title,
            'values' => $this->values,
        ]);
    }
}
