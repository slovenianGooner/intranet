<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Str;

class UpdateFolderRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'active' => ['boolean'],
            'parent_id' => ['integer'],
            'name' => ['required'],
            'slug' => ['required'],
            'description' => ['nullable'],
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->input('name')),
        ]);
    }
}
