<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
                'name' => 'Behnood Khani',
                'email' => 'behnood@khani.io',
                'password' => bcrypt('behnood'),
            ]);
    }
}
