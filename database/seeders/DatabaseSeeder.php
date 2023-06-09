<?php

namespace Database\Seeders;

use App\DTO\ContentType;
use App\Models\Content;
use App\Models\Document;
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
        Permission::create(['name' => 'folders.show']);
        Permission::create(['name' => 'folders.edit']);
        Permission::create(['name' => 'folders.destroy']);

        Permission::create(['name' => 'contents']);
        Permission::create(['name' => 'contents.create']);
        Permission::create(['name' => 'contents.edit']);
        Permission::create(['name' => 'contents.destroy']);

        Permission::create(['name' => 'documents.create']);
        Permission::create(['name' => 'documents.edit']);
        Permission::create(['name' => 'documents.destroy']);

        Permission::create(['name' => 'notify']);
        Permission::create(['name' => 'login']);
        Permission::create(['name' => 'preview-in-browser']);

        // Create root folder
        Folder::create([
            'name' => 'Root',
            'slug' => 'root',
            'description' => 'Root folder',
            'active' => true,
            'parent_id' => null,
        ])->makeRoot();

        // Temporary Folders
        $this->usersSeeder();
        $this->foldersSeeder();
        $this->contentsSeeder();
        $this->documentsSeeder();
    }

    public function usersSeeder()
    {
        $adminRole = Role::create(['name' => 'Admin']);
        $adminRole->givePermissionTo(
            'users', 'users.edit', 'users.create', 'users.destroy',
            'roles', 'roles.edit', 'roles.create', 'roles.destroy',
            'folders', 'folders.edit', 'folders.create', 'folders.destroy',
            'contents', 'contents.edit', 'contents.create', 'contents.destroy',
            'documents.create', 'documents.edit', 'documents.destroy',
        );
        $editorRole = Role::create(['name' => 'Editor']);
        $agencyRole = Role::create(['name' => 'Agency']);

        $adminUsers = [
            [
                'name' => 'John Doe',
                'email' => 'johndoe@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'janesmith@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'michaelbrown@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Amanda Johnson',
                'email' => 'amandajohnson@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Robert Lee',
                'email' => 'robertlee@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Karen Davis',
                'email' => 'karendavis@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'David Nguyen',
                'email' => 'davidnguyen@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Sophie Lee',
                'email' => 'sophielee@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'William Chen',
                'email' => 'williamchen@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Emily Kim',
                'email' => 'emilykim@admin.com',
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($adminUsers as $adminUser) {
            $user = User::create([...$adminUser, 'custom_data' => []]);
            $user->assignRole($adminRole);
            $user->assignRole($editorRole);
        }

        $editorUsers = [
            [
                'name' => 'Sarah Lee',
                'email' => 'sarahlee@editor.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Daniel Kim',
                'email' => 'danielkim@editor.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Melissa Chen',
                'email' => 'melissachen@editor.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Kevin Davis',
                'email' => 'kevindavis@editor.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Christine Nguyen',
                'email' => 'christinenguyen@editor.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'William Kim',
                'email' => 'williamkim@editor.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Jessica Lee',
                'email' => 'jessicalee@editor.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Andrew Park',
                'email' => 'andrewpark@editor.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Laura Brown',
                'email' => 'laurabrown@editor.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Brian Johnson',
                'email' => 'brianjohnson@editor.com',
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($editorUsers as $editorUser) {
            $user = User::create([...$editorUser, 'custom_data' => []]);
            $user->assignRole($editorRole);
        }

        $agencyUsers = [
            [
                'name' => 'Jessica Williams',
                'email' => 'jessicawilliams@agency.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Tyler Brown',
                'email' => 'tylerbrown@agency.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Megan Lee',
                'email' => 'meganlee@agency.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Robert Davis',
                'email' => 'robertdavis@agency.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Linda Kim',
                'email' => 'lindakim@agency.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Peter Chen',
                'email' => 'peterchen@agency.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Natalie Park',
                'email' => 'nataliepark@agency.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'David Johnson',
                'email' => 'davidjohnson@agency.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Samantha Nguyen',
                'email' => 'samanthanguyen@agency.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Jonathan Kim',
                'email' => 'jonathankim@agency.com',
                'password' => Hash::make('password'),
            ],
        ];


        foreach ($agencyUsers as $agencyUser) {
            $user = User::create([...$agencyUser, 'custom_data' => []]);
            $user->assignRole($agencyRole);
        }
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
        $articles = [
            [
                'active' => true,
                'title' => 'The Benefits of Yoga for Stress Relief',
                'slug' => 'benefits-of-yoga-for-stress-relief',
                'body' => '<p>Yoga is a practice that has been used for centuries to promote relaxation and reduce stress. One of the main benefits of yoga is that it can help to calm the mind and reduce anxiety. This is achieved through the combination of deep breathing, meditation, and physical postures.</p><p>Another benefit of yoga is that it can help to improve overall physical health. Regular practice can increase flexibility, strengthen muscles, and improve cardiovascular health. Additionally, yoga has been shown to boost the immune system and lower inflammation in the body.</p>',
            ],
            [
                'active' => true,
                'title' => 'The Importance of a Balanced Diet',
                'slug' => 'importance-of-a-balanced-diet',
                'body' => '<p>A balanced diet is essential for good health and wellbeing. It provides the body with the nutrients it needs to function properly and can help to prevent chronic diseases such as heart disease, diabetes, and cancer.</p><p>A balanced diet should include a variety of foods from all the major food groups, including fruits and vegetables, whole grains, lean proteins, and healthy fats. It is important to eat in moderation and avoid processed and sugary foods as much as possible.</p>',
            ],
            [
                'active' => true,
                'title' => '10 Tips for Better Time Management',
                'slug' => '10-tips-for-better-time-management',
                'body' => '<p>Effective time management is essential for success in both personal and professional life. Here are 10 tips to help you manage your time more efficiently:</p><ol><li>Set clear goals and priorities</li><li>Create a schedule and stick to it</li><li>Eliminate distractions</li><li>Delegate tasks when possible</li><li>Take breaks and recharge</li><li>Prioritize self-care and exercise</li><li>Use technology to your advantage</li><li>Learn to say "no"</li><li>Stay organized</li><li>Review and adjust your plan regularly</li></ol>',
            ],
            [
                'active' => true,
                'title' => 'The Benefits of Mindfulness Meditation',
                'slug' => 'benefits-of-mindfulness-meditation',
                'body' => '<p>Mindfulness meditation is a practice that involves focusing on the present moment and observing thoughts and feelings without judgment. It has been shown to have numerous benefits for mental and physical health, including:</p><ul><li>Reduced stress and anxiety</li><li>Improved mood and emotional regulation</li><li>Increased focus and attention</li><li>Better sleep</li><li>Lower blood pressure and heart rate</li><li>Reduced symptoms of depression</li><li>Enhanced immune function</li></ul><p>Practicing mindfulness meditation can be as simple as sitting quietly and focusing on your breath for a few minutes each day. Over time, this practice can lead to significant improvements in overall wellbeing.</p>',
            ],
        ];

        foreach ($articles as $article) {
            Content::create([...$article, 'type' => ContentType::MEMO, 'created_by' => 1]);
        }

        $events = [
            [
                'active' => true,
                'title' => 'Art Exhibition Opening Night',
                'slug' => 'art-exhibition-opening-night',
                'body' => '<p>Join us for the opening night of our latest art exhibition, featuring works by local artists in a variety of media. Meet the artists and enjoy light refreshments while browsing the exhibit.</p><p>Don\'t miss this opportunity to experience the vibrant art scene in our community!</p>',
                'starts_at' => '2023-05-15 18:00:00',
                'ends_at' => '2023-05-15 21:00:00',
                'allow_signups' => false,
                'last_signup_at' => null,
            ],
            [
                'active' => true,
                'title' => 'Charity 5K Run',
                'slug' => 'charity-5k-run',
                'body' => '<p>Get your running shoes on for our annual charity 5K run, benefiting local non-profit organizations. The route winds through scenic city streets, with water stations and cheering crowds along the way.</p><p>Whether you\'re a seasoned runner or just starting out, this is a great opportunity to support a good cause and get some exercise in the process.</p>',
                'starts_at' => '2023-06-12 08:00:00',
                'ends_at' => '2023-06-12 10:00:00',
                'allow_signups' => true,
                'last_signup_at' => '2023-06-05 23:59:59',
            ],
            [
                'active' => true,
                'title' => 'Music in the Park',
                'slug' => 'music-in-the-park',
                'body' => '<p>Bring a blanket and a picnic basket to enjoy an evening of live music in the park. Local musicians will perform a mix of classic and contemporary hits, with something for everyone.</p><p>This is a family-friendly event, so bring the kids and come early to secure a good spot on the lawn!</p>',
                'starts_at' => '2023-07-08 19:00:00',
                'ends_at' => '2023-07-08 21:00:00',
                'allow_signups' => false,
                'last_signup_at' => null,
            ],
            [
                'active' => true,
                'title' => 'Yoga in the Park',
                'slug' => 'yoga-in-the-park',
                'body' => '<p>Start your weekend off right with a free yoga class in the park. Our experienced instructor will lead you through a series of poses to stretch and strengthen your body, while also promoting relaxation and mindfulness.</p><p>All levels are welcome, so bring a mat and join us for this rejuvenating outdoor practice.</p>',
                'starts_at' => '2023-07-15 09:00:00',
                'ends_at' => '2023-07-15 10:00:00',
                'allow_signups' => true,
                'last_signup_at' => '2023-07-08 23:59:59',
            ],
        ];

        foreach ($events as $event) {
            Content::create([...$event, 'type' => ContentType::EVENT, 'created_by' => 1]);
        }
    }

    private function documentsSeeder()
    {
        $documents = [
            [
                'active' => true,
                'title' => 'Employee Handbook',
                'slug' => 'employee-handbook',
                'body' => '<p>This handbook is intended to provide employees with a general overview of the company\'s policies and procedures. It is not intended to be a comprehensive guide, nor does it constitute legal advice.</p><p>Employees should consult their supervisor or HR representative if they have any questions about the information contained in this handbook.</p>',
            ],
            [
                'active' => true,
                'title' => 'Code of Conduct',
                'slug' => 'code-of-conduct',
                'body' => '<p>All employees are expected to conduct themselves in a professional manner at all times. This includes treating others with respect and dignity, maintaining confidentiality, and complying with all applicable laws and regulations.</p><p>Employees who violate this code of conduct may be subject to disciplinary action, up to and including termination of employment.</p>',
            ],
            [
                'active' => true,
                'title' => 'Employee Benefits',
                'slug' => 'employee-benefits',
                'body' => '<p>Employees are eligible for a variety of benefits, including:</p><ul><li>Health insurance</li><li>Dental insurance</li><li>Life insurance</li><li>401(k) plan</li><li>Paid time off</li><li>Flexible spending accounts</li><li>Employee assistance program</li></ul><p>For more information about these benefits, please refer to the employee handbook or contact HR.</p>',
            ],
            [
                'active' => true,
                'title' => 'Paid Time Off Policy',
                'slug' => 'paid-time-off-policy',
                'body' => '<p>All employees are eligible for paid time off, which may be used for vacation, sick leave, or personal days. Employees accrue PTO at a rate of 1.25 days per month, up to a maximum of 15 days per year.</p><p>Employees must submit a request for PTO at least two weeks in advance. Requests will be approved on a first-come, first-served basis, subject to manager approval.</p>',
            ],
            [
                'active' => true,
                'title' => 'Employee Referral Program',
                'slug' => 'employee',
                'body' => '<p>Employees who refer a candidate who is hired and remains employed for at least 90 days will receive a $500 bonus. There is no limit to the number of referrals an employee may make.</p><p>Employees should submit referrals through the company\'s online referral portal. Referrals submitted by other means will not be eligible for the bonus.</p>',
            ],
            [
                'active' => true,
                'title' => 'Employee Recognition Program',
                'slug' => 'employee-recognition-program',
                'body' => '<p>Employees who go above and beyond in their work may be recognized through the company\'s employee recognition program. This program is designed to reward employees for their contributions to the company\'s success.</p><p>Employees may be nominated for recognition by their manager or a peer. Nominations are reviewed by a committee, which selects the winners each month.</p>',
            ],
            [
                'active' => true,
                'title' => 'Employee Training Program',
                'slug' => 'employee-training-program',
                'body' => '<p>All employees are required to complete a training program upon hire. This program covers topics such as workplace safety, sexual harassment prevention, and diversity awareness.</p><p>Employees must complete the training program within 30 days of hire. Failure to do so may result in disciplinary action, up to and including termination of employment.</p>',
            ],
            [
                'active' => true,
                'title' => 'Employee Wellness Program',
                'slug' => 'employee-wellness-program',
                'body' => '<p>The company offers a variety of wellness programs to help employees maintain a healthy lifestyle. These programs include:</p><ul><li>On-site fitness center</li><li>Weight loss program</li><li>Smoking cessation program</li><li>Stress management program</li><li>Health screenings</li><li>Flu shots</li></ul><p>For more information about these programs, please contact HR.</p>',
            ],
            [
                'active' => true,
                'title' => 'Employee Assistance Program',
                'slug' => 'employee-assistance-program',
                'body' => '<p>The company offers an employee assistance program to help employees deal with personal problems that may affect their work performance. This program provides confidential counseling services, as well as referrals to community resources.</p><p>Employees may contact the EAP at any time, 24 hours a day, 7 days a week. All calls are confidential and will not be shared with the company.</p>',
            ],
        ];

        foreach ($documents as $document) {
            Document::create([
                ...$document,
                'created_by' => 1,
                // random folder id
                'folder_id' => Folder::whereName("File Library")->first()->descendants()->inRandomOrder()->first()->id,
                'folder_position' => 1
            ]);
        }
    }
}
