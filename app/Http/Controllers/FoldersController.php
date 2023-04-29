<?php

namespace App\Http\Controllers;

use App\Http\Requests\SortFoldersRequest;
use App\Http\Requests\StoreFolderRequest;
use App\Http\Requests\UpdateFolderRequest;
use App\Http\Resources\FolderFormResource;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Throwable;
use function collect;
use function config;
use function dd;
use function redirect;

class FoldersController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Folder::class);

        return Inertia::render('Folders/Index', [
            'folders' => Folder::root()->descendants()->get()->toHierarchy()->values(),
            'canCreateFolder' => $request->user()->can('create', Folder::class),
            'canEditFolders' => $request->user()->can('update', Folder::class),
        ]);
    }

    public function create(Request $request)
    {
        $this->authorize('create', Folder::class);

        return Inertia::render('Folders/Create', [
            "folder" => new FolderFormResource(null),
            "parentFolders" => Folder::get()->values(),
            'roles' => Role::query()->where('name', '!=', 'Super Admin')->get()->map(function (Role $role) {
                return [
                    'value' => $role->name,
                    'name' => $role->name,
                ];
            })->values(),
            'backUrl' => $request->query('route') ? route($request->query('route'), collect($request->query())->except(['route'])->toArray()) : route('folders.index', $request->query()),
        ]);
    }

    public function store(StoreFolderRequest $request)
    {
        try {
            $this->authorize('create', Folder::class);

            $folder = Folder::create($request->validated());

            $folder->syncRoles($request->validated()['roles']);

            // Redirect back to the route with the folder id in the query string if the folder was created from the document list page
            if ($request->query('folder') and $request->query('route')) {
                return redirect()->route($request->query('route'), collect($request->query())->except(['route'])->toArray())->with('success', 'Folder created successfully!');
            }

            return redirect()->route('folders.index', $request->query())->with('success', 'Folder created successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong! Please try again later.");
        }
    }

    public function edit(Request $request, Folder $folder)
    {
        $this->authorize('update', $folder);

        return Inertia::render('Folders/Edit', [
            'folder' => new FolderFormResource($folder),
            "parentFolders" => Folder::get()->values(),
            "canDeleteFolder" => $request->user()->can('delete', $folder),
            'roles' => Role::query()->where('name', '!=', 'Super Admin')->get()->map(function (Role $role) {
                return [
                    'value' => $role->name,
                    'name' => $role->name,
                ];
            })->values(),
        ]);
    }

    public function sort(SortFoldersRequest $request, Folder $folder)
    {
        try {
            $this->authorize('update', Folder::class);
            $neighbour = Folder::find($request->input('neighbour_id'));

            if ($request->input('direction') === 'left') {
                $folder->moveToLeftOf($neighbour);
            } else {
                $folder->moveToRightOf($neighbour);
            }

            return redirect()->route('folders.index', $request->query())->with('success', 'Folders sorted successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong! Please try again later.");
        }
    }

    public function update(UpdateFolderRequest $request, Folder $folder)
    {
        try {
            $this->authorize('update', $folder);

            $folder->update(
                collect($request->validated())->except(['roles'])->toArray()
            );

            $folder->syncRoles($request->validated()['roles']);

            return redirect()->route('folders.index', collect($request->query())->except(['_method'])->toArray())->with('success', 'Folder updated successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong! Please try again later.");
        }
    }

    public function destroy(Request $request, Folder $folder)
    {
        try {
            $this->authorize('delete', $folder);

            $folder->delete();

            return redirect()->route('folders.index', $request->query())->with('success', 'Folder deleted successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong! Please try again later.");
        }
    }
}
