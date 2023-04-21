<?php

namespace App\Http\Controllers;

use App\Http\Requests\SortFoldersRequest;
use App\Http\Requests\StoreFolderRequest;
use App\Http\Requests\UpdateFolderRequest;
use App\Http\Resources\FolderFormResource;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;
use function collect;
use function config;
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

    public function create()
    {
        $this->authorize('create', Folder::class);

        return Inertia::render('Folders/Create', [
            "folder" => new FolderFormResource(null),
            "parentFolders" => Folder::get()->values()
        ]);
    }

    public function store(StoreFolderRequest $request)
    {
        try {
            $this->authorize('create', Folder::class);

            Folder::create($request->validated());

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
            "canDeleteFolder" => $request->user()->can('delete', $folder)
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

            $folder->update($request->validated());

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
