<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Session;
use Tightenco\Ziggy\Ziggy;
use function is_impersonating;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'query' => $request->query(),
            'app_name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
                'is_impersonating' => is_impersonating(),
            ],
            'flash' => function () {
                $error = null;
                if (Session::has('error')) {
                    $error = Session::get('error');
                }
                return [
                    'success' => Session::get('success'),
                    'error' => $error,
                ];
            },
            'userMenu' => $request->user()?->getUserMenu() ?? [],
            'navigation' => $request->user()?->getNavigation() ?? [],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },

        ]);
    }
}
