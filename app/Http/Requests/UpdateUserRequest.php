<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "name" => "required",
            "email" => "required|email",
            'password_confirmation' => 'required_with:password',
            'roles' => 'required|array',
            'custom_data' => 'array',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
