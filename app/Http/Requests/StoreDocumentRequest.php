<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Str;
use function auth;

class StoreDocumentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'active' => ['required', 'boolean'],
            'folder_id' => ['required', 'integer'],
            'title' => ['required'],
            'slug' => ['required'],
            'body' => ['required'],
            'roles' => ['array'],
            'created_by' => ['integer', 'required'],
            'folder_position' => ['integer', 'required'],
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'folder_id' => $this->query('folder') ?? null,
            'slug' => Str::slug($this->input('title')),
            'created_by' => auth()->id(),
            'folder_position' => 1
        ]);
    }
}
