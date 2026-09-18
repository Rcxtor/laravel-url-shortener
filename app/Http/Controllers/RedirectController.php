<?php

namespace App\Http\Controllers;

use App\Models\Url;

class RedirectController extends Controller
{
    public function redirect(string $shortCode)
    {
        $url = Url::where('short_code', $shortCode)->firstOrFail();

        $url->increment('click_count');

        return redirect()->away($url->original_url);
    }
}