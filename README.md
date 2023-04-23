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

You can now log in with the super admin account using the email `super-admin@intranet.dev` and the password you set in
the `.env` file.

If at any point you want to reset the database, you can run `php artisan migrate:fresh --seed` again.

## Sending notifications

To allow sending notifications, you need to set up the mail driver in the `.env` file. Please set the following
variables:

```bash
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

Change the variables accordingly.

### Queue setup

You can use multiple drivers to send notifications via queue, but the easiest way is to enable the database driver.

You need to change the queue driver in the .env file to database.

```bash
QUEUE_DRIVER=database
```

Please see the [Laravel documentation](https://laravel.com/docs/8.x/notifications#queueing-notifications) for more
information.

## Development

### To-do list

- [ ] Add search on recipient list
