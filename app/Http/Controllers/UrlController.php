<?php

namespace App\Http\Controllers;

use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUrlRequest;
use App\Models\Url;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Gate;


class UrlController extends Controller
{
    public function store(StoreUrlRequest $request)
    {
        //url shorttening 
        // do {
        //     $shortCode = Str::random(5);
        // } while (Url::where('short_code', $shortCode)->exists());

        $shortCode = $request->validated()['short_code'] ?? null;

        if ($shortCode) {
            if (Url::where('short_code', $shortCode)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'This custom code already exists.',
                ], 422);
            }
        } 
 
        else {
            do {
                $shortCode = Str::random(5);
            } while (Url::where('short_code', $shortCode)->exists());
        }

        $url = Url::create([
            'user_id' => $request->user()->id,
            'original_url' => $request->validated()['url'],
            'short_code' => $shortCode,
            'click_count' => 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'URL shortened successfully',
            'data' => [
                'id' => $url->id,
                'original_url' => $url->original_url,
                'short_code' => $url->short_code,
                'click_count' => $url->click_count,
            ],
        ], 201);
    }

    public function index(Request $request)
    {
        $urls = $request->user()
            ->urls()
            ->latest()
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'message' => 'URLs retrieved successfully',
            'data' => $urls,
        ]);
    }

    // both show and destroy is protected by the policy 
    public function show(Url $url)
    {
        Gate::authorize('view', $url);

        return response()->json([
            'success' => true,
            'message' => 'URL retrieved successfully',
            'data' => $url,
        ]);
    }
    public function destroy(Url $url)
    {
        Gate::authorize('delete', $url);

        $url->delete();

        return response()->json([
            'success' => true,
            'message' => 'URL deleted successfully',
            'data' => null,
        ]);
    }
    public function stats(Url $url)
    {
        Gate::authorize('view', $url);

        return response()->json([
            'success' => true,
            'message' => 'URL statistics retrieved successfully',
            'data' => [
                'short_code' => $url->short_code,
                'original_url' => $url->original_url,
                'click_count' => $url->click_count,
            ],
        ]);
    }

    // for guest URL
    public function storeGuest(StoreUrlRequest $request)
    {
        if (auth('sanctum')->check()){
            return response()->json([
                'success' => false,
                'message' => 'Logged-in users cannot create guest URLs.',
            ], 403);
        }
        do {
            $shortCode = Str::random(5);
        } while (Url::where('short_code', $shortCode)->exists());

        $url = Url::create([
            'original_url' => $request->validated()['url'],
            'short_code' => $shortCode,
            'click_count' => 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'URL shortened successfully',
            'data' => [
                'id' => $url->id,
                'original_url' => $url->original_url,
                'short_code' => $url->short_code,
                'click_count' => $url->click_count,
            ],
        ], 201);
    }
}
