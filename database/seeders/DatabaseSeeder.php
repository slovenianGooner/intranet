<?php

namespace Database\Seeders;

use App\DTO\ContentType;
use App\Models\Content;
use App\Models\Folder;
use App\Models\User;
use Carbon\Carbon;
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
        $this->foldersSeeder();
        $this->contentsSeeder();
    }

    public function foldersSeeder()
    {
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

    public function contentsSeeder()
    {
        Content::create([
            'active' => true,
            'type' => ContentType::MEMO,
            'title' => 'Test Memo',
            'slug' => 'test-memo',
            'body' => '<p>This is a test memo</p>',
            'created_by' => 1
        ]);

        Content::create([
            'active' => true,
            'type' => ContentType::MEMO,
            'title' => 'Test Memo 2',
            'slug' => 'test-memo-2',
            'body' => '<p>This is a test memo 2</p>',
            'created_by' => 1
        ]);

        Content::create([
            'active' => true,
            'type' => ContentType::MEMO,
            'title' => 'Test Memo 3',
            'slug' => 'test-memo-3',
            'body' => '<p>This is a test memo 3</p>',
            'created_by' => 1
        ]);

        Content::create([
            'active' => true,
            'type' => ContentType::EVENT,
            'title' => 'Test Event',
            'slug' => 'test-event',
            'body' => '<p>This is a test event</p>',
            'created_by' => 1,
            'starts_at' => Carbon::now(),
            'ends_at' => Carbon::now()->addDays(2),
            'allow_signups' => true,
            'last_signup_at' => Carbon::now()->addDays(1),
        ]);

        Content::create([
            'active' => true,
            'type' => ContentType::EVENT,
            'title' => 'Test Event 2',
            'slug' => 'test-event-2',
            'body' => '<p>This is a test event 2</p>',
            'created_by' => 1,
            'starts_at' => Carbon::now()->addDays(2),
            'ends_at' => Carbon::now()->addDays(4),
            'allow_signups' => true,
            'last_signup_at' => Carbon::now()->addDays(3),
        ]);

        Content::create([
            'active' => true,
            'type' => ContentType::EVENT,
            'title' => 'Test Event 3',
            'slug' => 'test-event-3',
            'body' => '<p>This is a test event 3</p>',
            'created_by' => 1,
            'starts_at' => Carbon::now()->addDays(4),
            'ends_at' => Carbon::now()->addDays(6),
            'allow_signups' => true,
            'last_signup_at' => Carbon::now()->addDays(5),
        ]);

        Content::create([
            'active' => true,
            'type' => ContentType::EVENT,
            'title' => 'Test Event 4',
            'slug' => 'test-event-4',
            'body' => '<p>This is a test event 4</p>',
            'created_by' => 1,
            'starts_at' => Carbon::now()->addDays(6),
            'ends_at' => Carbon::now()->addDays(8),
            'allow_signups' => true,
            'last_signup_at' => Carbon::now()->addDays(7),
        ]);
    }
}
