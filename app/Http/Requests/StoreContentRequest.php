<?php

namespace App\Http\Requests;

use App\DTO\ContentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'active' => ['required', 'boolean'],
            'type' => ['required', Rule::in(ContentType::cases())],
            'title' => ['required'],
            'slug' => ['required'],
            'body' => ['required'],
            'starts_at' => ['present', 'datetime'],
            'ends_at' => ['present', 'datetime'],
            'allow_signups' => ['present', 'boolean'],
            'last_signup_at' => ['present', 'datetime'],
        ];
    }
}
