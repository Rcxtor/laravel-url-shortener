<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Url;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);
        $user2 = User::create([
            'name' => 'Test User2',
            'email' => 'test2@example.com',
            'password' => Hash::make('password123'),
        ]);

        Url::create([
            'user_id' => $user->id,
            'original_url' => 'https://www.google.com',
            'short_code' => 'mewmew',
            'click_count' => 5,
        ]);

        Url::create([
            'user_id' => $user2->id,
            'original_url' => 'https://www.github.com',
            'short_code' => 'flipflop',
            'click_count' => 10,
        ]);
        Url::create([
            'user_id' => $user->id,
            'original_url' => 'https://youtu.be/OmXgIHHSMdM',
            'short_code' => 'nemesis',
            'click_count' => 2,
        ]);
    }
}
