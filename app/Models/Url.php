<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Url extends Model
{
    protected $fillable = [
        'user_id',
        'original_url',
        'short_code',
        'click_count',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function isGuest(): bool
    {
        return $this->user_id === null;
    }
}