<?php

namespace Database\Seeders;

use App\Models\Folder;
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
            'custom_data' => []
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

        Permission::create(['name' => 'folders']);
        Permission::create(['name' => 'folders.create']);
        Permission::create(['name' => 'folders.edit']);
        Permission::create(['name' => 'folders.destroy']);

        Permission::create(['name' => 'notify']);
        Permission::create(['name' => 'login']);

        // Create root folder
        Folder::create([
            'name' => 'Root',
            'slug' => 'root',
            'description' => 'Root folder',
            'active' => true,
            'parent_id' => null,
        ])->makeRoot();

        // Temporary seeder stuff for testing
        $adminRole = Role::create(['name' => 'Admin']);
        $adminRole->givePermissionTo('users', 'users.edit', 'users.create', 'users.destroy', 'roles', 'roles.edit', 'roles.create', 'roles.destroy');
        $editorRole = Role::create(['name' => 'Editor']);
        $agencyRole = Role::create(['name' => 'Agency']);

        $adminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@intranet.dev',
            'password' => Hash::make('password'),
            'custom_data' => []
        ]);
        $adminUser->assignRole($adminRole);
        $adminUser->assignRole($editorRole);

        $editorUser = User::create([
            'name' => 'Editor',
            'email' => 'editor@intranet.dev',
            'password' => Hash::make('password'),
            'custom_data' => []
        ]);
        $editorUser->assignRole($editorRole);

        $agencyUser = User::create([
            'name' => 'Agency',
            'email' => 'agency@intranet.dev',
            'password' => Hash::make('password'),
            'custom_data' => []
        ]);
        $agencyUser->assignRole($agencyRole);

        // Temporary Folders
        $rootFolder = Folder::root();

        $fileLibrary = $rootFolder->children()->create([
            'name' => 'File Library',
            'slug' => 'file-library',
            'description' => null,
            'active' => true,
            'parent_id' => $rootFolder->id,
        ]);
        $images = $fileLibrary->children()->create([
            'name' => 'Images',
            'slug' => 'images',
            'description' => null,
            'active' => true,
            'parent_id' => $fileLibrary->id,
        ]);
        $images->children()->create([
            'name' => 'Logos',
            'slug' => 'logos',
            'description' => null,
            'active' => true,
            'parent_id' => $images->id,
        ]);
        $images->children()->create([
            'name' => 'Icons',
            'slug' => 'icons',
            'description' => null,
            'active' => true,
            'parent_id' => $images->id,
        ]);
        $images->children()->create([
            'name' => 'Banners',
            'slug' => 'banners',
            'description' => null,
            'active' => true,
            'parent_id' => $images->id,
        ]);
        $fileLibrary->children()->create([
            'name' => 'Documents',
            'slug' => 'documents',
            'description' => null,
            'active' => true,
            'parent_id' => $fileLibrary->id,
        ]);
        $fileLibrary->children()->create([
            'name' => 'Videos',
            'slug' => 'videos',
            'description' => null,
            'active' => true,
            'parent_id' => $fileLibrary->id,
        ]);

        $news = $rootFolder->children()->create([
            'name' => 'News',
            'slug' => 'news',
            'description' => null,
            'active' => true,
            'parent_id' => $rootFolder->id,
        ]);
        $news->children()->create([
            'name' => 'Press Releases',
            'slug' => 'press-releases',
            'description' => null,
            'active' => true,
            'parent_id' => $news->id,
        ]);
        $news->children()->create([
            'name' => 'Blog Posts',
            'slug' => 'blog-posts',
            'description' => null,
            'active' => true,
            'parent_id' => $news->id,
        ]);

        $events = $rootFolder->children()->create([
            'name' => 'Events',
            'slug' => 'events',
            'description' => null,
            'active' => true,
            'parent_id' => $rootFolder->id,
        ]);
        $events->children()->create([
            'name' => 'Conferences',
            'slug' => 'conferences',
            'description' => null,
            'active' => true,
            'parent_id' => $events->id,
        ]);
        $events->children()->create([
            'name' => 'Meetings',
            'slug' => 'meetings',
            'description' => null,
            'active' => true,
            'parent_id' => $events->id,
        ]);
        $events->children()->create([
            'name' => 'Seminars',
            'slug' => 'seminars',
            'description' => null,
            'active' => true,
            'parent_id' => $events->id,
        ]);
    }
}
