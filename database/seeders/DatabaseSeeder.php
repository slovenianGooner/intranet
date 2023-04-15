<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Permanent seeder stuff for super admin
        $superAdminRole = Role::create(['name' => 'Super Admin']);
        $superAdminUser = User::create([
            'name' => 'Super Admin',
            'email' => 'super-admin@intranet.dev',
            'password' => Hash::make(config('app.super_admin_password')),
        ]);
        $superAdminUser->assignRole($superAdminRole);

        Permission::create(['name' => 'users']);
        Permission::create(['name' => 'users.create']);
        Permission::create(['name' => 'users.edit']);
        Permission::create(['name' => 'users.destroy']);

        Permission::create(['name' => 'roles']);
        Permission::create(['name' => 'roles.create']);
        Permission::create(['name' => 'roles.edit']);
        Permission::create(['name' => 'roles.destroy']);

        // Temporary seeder stuff for testing
        $adminRole = Role::create(['name' => 'Admin']);
        $adminRole->givePermissionTo('users', 'users.edit', 'users.create', 'users.destroy', 'roles', 'roles.edit', 'roles.create', 'roles.destroy');
        $editorRole = Role::create(['name' => 'Editor']);
        $agencyRole = Role::create(['name' => 'Agency']);

        $adminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@intranet.dev',
            'password' => Hash::make('password'),
        ]);
        $adminUser->assignRole($adminRole);
        $adminUser->assignRole($editorRole);

        $editorUser = User::create([
            'name' => 'Editor',
            'email' => 'editor@intranet.dev',
            'password' => Hash::make('password'),
        ]);
        $editorUser->assignRole($editorRole);

        $agencyUser = User::create([
            'name' => 'Agency',
            'email' => 'agency@intranet.dev',
            'password' => Hash::make('password'),
        ]);
        $agencyUser->assignRole($agencyRole);
    }
}
