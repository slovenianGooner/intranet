<?php

namespace App\DTO;

use Illuminate\Support\Collection;
use Str;

enum ContentType: string
{
    case MEMO = 'memo';
    case EVENT = 'event';

    public static function namedCases(): Collection
    {
        return collect(self::cases())
            ->map(fn (self $case) => [
                'value' => $case->value,
                'name' => Str::title($case->name),
            ]);
    }
}
