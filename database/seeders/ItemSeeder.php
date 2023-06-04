<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create 3 items per user
        User::all()->each(function (User $user) {
            $user->items()->saveMany(Item::factory()->count(3)->make());
        });
    }
}
