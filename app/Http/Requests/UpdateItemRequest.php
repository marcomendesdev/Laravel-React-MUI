<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
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
            'name' => ['string', 'max:255', 'min:3'],
            'price' => ['numeric', 'min:0'],
            'description' => ['string', 'max:255', 'min:3'],
            'image' => ['file','mimes:jpeg,png,jpg','max:2048'],
        ];
    }
}
