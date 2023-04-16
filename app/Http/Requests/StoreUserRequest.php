<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "name" => "required|string",
            "email" => "required|email|unique:users,email",
            "password" => "required|string|confirmed",
            "roles" => "array|min:1",
            "custom_data" => "array",
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
