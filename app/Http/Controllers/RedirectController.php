<?php

namespace App\Http\Controllers;

use App\Models\Url;

class RedirectController extends Controller
{
    public function redirect(string $shortCode)
    {
        $url = Url::where('short_code', $shortCode)->firstOrFail();

        if($url->isGuest() && $url->click_count >=5){
            $url->delete();
        }

        $url->increment('click_count');

        return redirect()->away($url->original_url);
    }
    public function check(string $shortCode)
    {
        $exists = Url::where('short_code', $shortCode)->exists();
        return response()->json(['exists' => $exists]);
    }
}