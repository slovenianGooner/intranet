<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\RoleFormResource;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Throwable;
use function redirect;

class RolesController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Role::class);

        $roles = Role::query()->where("name", "!=", "Super Admin")->when(
            $request->input('search'),
            fn($query, $search) => $query->where('name', 'like', "%{$search}%")
        )->orderBy("name")->get()->map(function (Role $role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'can_be_edited' => $role->name !== 'Super Admin',
            ];
        });

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
            'canCreateRole' => $request->user()->can('create', Role::class),
            'canEditRoles' => $request->user()->can('update', Role::class),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Role::class);

        return Inertia::render('Roles/Create', [
            'role' => new RoleFormResource(null)
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
        try {
            $this->authorize('create', Role::class);

            Role::create($request->validated());

            return redirect()->route('roles.index')->with('success', 'Role created successfully.');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong.");
        }
    }

    public function edit(Request $request, Role $role)
    {
        $this->authorize('update', $role);

        return Inertia::render('Roles/Edit', [
            'role' => new RoleFormResource($role),
            'canDeleteRole' => $request->user()->can("delete", Role::class) and $role->name !== 'Super Admin',
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        try {
            $this->authorize('update', $role);

            $role->update($request->validated());

            return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong.");
        }
    }

    public function destroy(Role $role)
    {
        try {
            $this->authorize('delete', $role);

            $role->delete();

            return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong.");
        }
    }
}
