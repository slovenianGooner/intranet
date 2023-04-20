<?php

namespace App\Http\Requests;

use App\DTO\ContentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Str;
use function auth;

class UpdateContentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'active' => ['required', 'boolean'],
            'type' => ['required', Rule::in(ContentType::namedCases()->pluck("value")->toArray())],
            'title' => ['required'],
            'slug' => ['required'],
            'body' => ['required'],
            'starts_at' => ['date', 'nullable', 'after_or_equal:now', 'required_if:type,' . ContentType::EVENT->value],
            'ends_at' => ['date', 'nullable', 'required_with:starts_at', 'after_or_equal:starts_at', 'required_if:type,' . ContentType::EVENT->value],
            'created_by' => ['integer', 'required'],
            'allow_signups' => ['boolean'],
            'last_signup_at' => ['present', 'date', 'nullable', 'required_if:allow_signups,==,true', 'before_or_equal:starts_at', 'after_or_equal:now'],
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->input('title')),
            'created_by' => auth()->id(),
            'starts_at' => $this->input('type') === ContentType::EVENT->value ? $this->input('starts_at') : null,
            'ends_at' => $this->input('type') === ContentType::EVENT->value ? $this->input('ends_at') : null,
            'allow_signups' => $this->input('type') === ContentType::EVENT->value ? $this->input('allow_signups') : false,
            'last_signup_at' => $this->input('allow_signups') ? $this->input('last_signup_at') : null,
        ]);
    }
}
