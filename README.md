# intraNET

## Installation

Copy the `.env.example` file to `.env` and fill in the database credentials with:
```bash
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=intranet
DB_USERNAME=root
DB_PASSWORD=
```

Set the `APP_URL` to the URL of your application.

Set the `SUPER_ADMIN_PASSWORD` to the password you want to use for the super admin account.

Then run the following commands:
```bash
composer install
yarn install
yarn run dev
php artisan key:generate
php artisan migrate:fresh --seed
```

You can now log in with the super admin account using the email `super-admin@intranet.dev` and the password you set in the `.env` file.

If at any point you want to reset the database, you can run `php artisan migrate:fresh --seed` again.

## Development
### To-do list
