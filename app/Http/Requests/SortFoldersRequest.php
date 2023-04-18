<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SortFoldersRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'neighbour_id' => 'required|integer',
            'direction' => 'required|string',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
