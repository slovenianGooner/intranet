<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentFormResource;
use App\Http\Resources\DocumentListResource;
use App\Models\Document;
use App\Models\Folder;
use Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Throwable;
use function array_merge;
use function collect;
use function config;
use function count;
use function redirect;
use function request;
use function response;
use function route;

class DocumentsController extends Controller
{
    public Folder $rootFolder;
    public string $currentRoute;

    public function getSharedVariables(Request $request)
    {
        Inertia::share("rootFolder", $this->rootFolder);
        Inertia::share("currentRoute", $this->currentRoute);

        // Get the current folder from the query parameter, if none is set, use the root folder
        $currentFolder = $request->query('folder') ? Folder::find($request->query('folder')) : $this->rootFolder;
        Inertia::share("currentFolder", $currentFolder);
        Inertia::share("pageTitle", $currentFolder->name);

        // If the current folder is the same as root folder, use root folder name, otherwise use the folder name and the root folder name
        $title = $currentFolder->id === $this->rootFolder->id ? $this->rootFolder->name : $currentFolder->name . ' - ' . $this->rootFolder->name;
        Inertia::share("title", $title);

        // Get breadcrumbs with the current folder and all ancestors
        $breadcrumbs = $currentFolder->ancestorsAndSelf()->whereNotNull("parent_id")->with('parent')->get()->map->prepareForNavigation(
            $this->currentRoute . ".index",
            $this->rootFolder,
            $currentFolder
        );
        Inertia::share("breadcrumbs", $breadcrumbs);

        // Get a tree list of all the folders in the root folder
        $folders = $this->rootFolder->descendants()->get()
            ->filter->authorizedToView($request->user())
            ->map->prepareForNavigation(
                $this->currentRoute . ".index",
                $this->rootFolder,
                $currentFolder
            )->toHierarchy()->values();
        Inertia::share("folderNavigation", $folders);

        // Can create folders
        $canCreateFolders = $request->user()->can("create", Folder::class);
        $canCreateDocuments = $request->user()->can("create", Document::class);
        Inertia::share("canCreateFolders", $canCreateFolders);
        Inertia::share("canCreateDocuments", $canCreateDocuments);

        return [$currentFolder, $title, $breadcrumbs, $folders, $canCreateFolders, $canCreateDocuments];
    }

    public function create(Request $request)
    {
        $this->authorize('create', Document::class);

        return Inertia::render('Documents/Create', [
            'document' => new DocumentFormResource(null),
            'roles' => Role::query()->where('name', '!=', 'Super Admin')->get()->map(function (Role $role) {
                return [
                    'value' => $role->name,
                    'name' => $role->name,
                ];
            })->values(),
            'cancelUrl' => route($request->query("route"), collect($request->query())->except('route')->toArray()),
        ]);
    }

    public function store(StoreDocumentRequest $request)
    {
        try {
            $this->authorize('create', Document::class);

            $document = Document::create($request->validated());

            $document->syncRoles($request->validated()['roles']);

            if ($request->hasFile("files")) {
                foreach ($request->file("files") as $file) {
                    $document->addMedia($file)->toMediaCollection('files');
                }
            }

            return redirect()->route($request->query("route"), collect($request->query())->except("route")->toArray())->with('success', 'Document created successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config('app.debug') ? $e->getMessage() : 'Something went wrong! Please try again later.');
        }
    }

    public function edit(Request $request, Document $document)
    {
        $this->authorize('update', Document::class);

        return Inertia::render('Documents/Edit', [
            'document' => new DocumentFormResource($document),
            'canDeleteDocument' => $request->user()->can('update', $document),
            'roles' => Role::query()->where('name', '!=', 'Super Admin')->get()->map(function (Role $role) {
                return [
                    'value' => $role->name,
                    'name' => $role->name,
                ];
            })->values(),
            'cancelUrl' => route($request->query("route") . ".show", array_merge(
                ["document" => $document->id],
                $request->query()
            )),
        ]);
    }

    public function update(UpdateDocumentRequest $request, Document $document)
    {
        try {
            $this->authorize('update', $document);

            $document->update(
                collect($request->validated())->except(['roles'])->toArray()
            );

            $document->syncRoles($request->validated()['roles']);

            if (count($request->validated('delete_files'))) {
                foreach ($request->validated('delete_files') as $file) {
                    $document->getMedia('files')->where('id', $file)->first()->delete();
                }
            }

            if ($request->hasFile("files")) {
                foreach ($request->file("files") as $file) {
                    $document->addMedia($file)->toMediaCollection('files');
                }
            }

            return redirect()->route($request->query("route") . ".show", array_merge(
                ["document" => $document->id],
                collect($request->query())->except(["_method"])->toArray()
            ))->with('success', 'Document updated successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config('app.debug') ? $e->getMessage() : 'Something went wrong! Please try again later.');
        }

    }

    public function destroy(Request $request, Document $document)
    {
        try {
            $this->authorize('delete', $document);

            $document->media()->delete();
            $document->delete();

            return redirect()->route($request->query("route") . ".index", collect($request->query())->except("route")->toArray())->with('success', 'Document updated successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong! Please try again later.");
        }
    }
}
