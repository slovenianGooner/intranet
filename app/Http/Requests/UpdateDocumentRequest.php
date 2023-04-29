<?php

namespace App\Http\Requests;

use App\DTO\ContentType;
use Illuminate\Foundation\Http\FormRequest;
use Str;
use function auth;

class UpdateDocumentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'active' => ['required', 'boolean'],
            'title' => ['required'],
            'slug' => ['required'],
            'body' => ['required'],
            'roles' => ['array'],
            'created_by' => ['integer', 'required'],
            'delete_files' => ['present', 'array'],
            'folder_position' => ['required', 'integer'],
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'folder_id' => $this->query('folder') ?? null,
            'slug' => Str::slug($this->input('title')),
            'created_by' => auth()->id(),
            'delete_files' => $this->input('delete_files') ?? [],
            'folder_position' => 1
        ]);
    }
}
