<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'name',
        'description',
        'price',
        'image',
    ];

    /** Items belong to User */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
