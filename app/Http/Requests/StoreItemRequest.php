<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'numeric', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255', 'min:3'],
            'price' => ['required', 'numeric', 'min:0'],
            'description' => ['required', 'string', 'max:255', 'min:3'],
            'image' => ['required','file','mimes:jpeg,png,jpg','max:2048'],
        ];
    }
}
