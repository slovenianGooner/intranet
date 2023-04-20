<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserFormResource;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Throwable;
use function collect;
use function config;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        $users = User::with("roles")->when(
            $request->query('search'),
            function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->query('search') . '%')
                    ->orWhere('email', 'like', '%' . $request->query('search') . '%');
            }
        )->when(
            $request->query('role'),
            function ($query) use ($request) {
                $query->whereHas('roles', function ($query) use ($request) {
                    $query->where('name', $request->query('role'));
                });
            }
        )->whereHas('roles', function ($query) use ($request) {
            $query->where('name', '!=', 'Super Admin');
        })->paginate(10)->withQueryString()->through(function (User $user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name'),
                'can_be_edited' => $user->can_be_edited,
                'can_be_impersonated' => $user->can_be_impersonated,
            ];
        });

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => Role::query()->where('name', '!=', 'Super Admin')->get()->map(function (Role $role) {
                return [
                    'value' => $role->name,
                    'name' => $role->name,
                ];
            })->prepend(['value' => null, 'name' => 'No Role'])->values(),
            'canCreateUser' => $request->user()->can('create', User::class),
            'canEditUsers' => $request->user()->can('edit', User::class),
        ]);
    }

    public function create(Request $request)
    {
        $this->authorize('create', User::class);

        return Inertia::render('Users/Create', [
            'user' => new UserFormResource(null),
            'roles' => Role::query()->where('name', '!=', 'Super Admin')->get()->map(function (Role $role) {
                return [
                    'value' => $role->name,
                    'name' => $role->name,
                ];
            })->values(),
            'customDataTypes' => collect(config('app.custom_data_types'))->mapWithKeys(function ($value, $key) {
                return [$key => new $value];
            })->values()
        ]);
    }

    public function store(StoreUserRequest $request)
    {
       try {
            $this->authorize('create', User::class);

            $user = User::create([
                'name' => $request->validated()['name'],
                'email' => $request->validated()['email'],
                'password' => Hash::make($request->validated()['password']),
                'custom_data' => $request->validated()['custom_data'],
            ]);

            $user->syncRoles($request->validated()['roles']);

            $permissions = [];
            if ($request->input("can_login")) {
                $permissions[] = "login";
            }

            if ($request->input("can_notify")) {
                $permissions[] = "notify";
            }

            $user->syncPermissions($permissions);

            return redirect()->route('users.index', $request->query())->with('success', 'User created successfully.');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong.");
       }
    }

    public function edit(Request $request, User $user)
    {
        $this->authorize('update', $user);

        return Inertia::render('Users/Edit', [
            'user' => new UserFormResource($user),
            'roles' => Role::query()->where('name', '!=', 'Super Admin')->get()->map(function (Role $role) {
                return [
                    'value' => $role->name,
                    'name' => $role->name,
                ];
            })->values(),
            'customDataTypes' => collect(config('app.custom_data_types'))->mapWithKeys(function ($value, $key) {
                return [$key => new $value];
            })->values(),
            'canDeleteUser' => $user->can_be_deleted,
            'canEditUserRoles' => $user->can_roles_be_edited,
            'canBeImpersonated' => $user->can_be_impersonated
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $this->authorize('update', $user);

            $user->update([
                'name' => $request->validated()['name'],
                'email' => $request->validated()['email'],
                'custom_data' => $request->validated()['custom_data'],
            ]);

            if ($request->input()['password']) {
                $user->update([
                    'password' => Hash::make($request->validated()['password']),
                ]);
            }

            if ($user->can_roles_be_edited) {
                $user->syncRoles($request->validated()['roles']);
            }

            $permissions = [];
            if ($request->input("can_login")) {
                $permissions[] = "login";
            }

            if ($request->input("can_notify")) {
                $permissions[] = "notify";
            }

            $user->syncPermissions($permissions);

            return redirect()->route('users.index', $request->query())->with('success', 'User updated successfully.');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong.");
        }
    }

    public function destroy(Request $request, User $user)
    {
       try {
            $this->authorize('delete', $user);

            $user->delete();

           return redirect()->route('users.index', $request->query())->with('success', 'User deleted successfully.');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong.");
       }
    }
}
