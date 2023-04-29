<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentListResource;
use App\Models\Document;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function collect;
use function request;
use function route;

class FileLibraryController extends DocumentsController
{

    public function __construct()
    {
        $this->rootFolder = Folder::where('name', 'File Library')->first();
        $this->currentRoute = "file-library";
    }

    public function index(Request $request)
    {
        $this->authorize('view', $this->rootFolder);

        [$currentFolder] = parent::getSharedVariables($request);
        $this->authorize('view', $currentFolder);

        // Get the paginated list of documents in the current folder and all the folder descendants
        $descendantIds = $currentFolder->descendantsAndSelf()->pluck('id')->toArray();
        $documents = Document::whereIn('folder_id', $descendantIds)->with("author")->when(
            request()->query('search'),
            function ($query) {
                $query->where('title', 'like', '%' . request()->query('search') . '%');
            }
        )->authorizedToView($request->user())->latest()->paginate(10)->withQueryString()->through(fn(Document $document) => new DocumentListResource($document));

        return Inertia::render('Documents/Index', [
            'documents' => $documents,
        ]);
    }

    public function show(Request $request, Document $document)
    {
        $this->authorize('view', $document);
        $this->getSharedVariables($request);

        return Inertia::render('Documents/Show', [
            'document' => new DocumentListResource($document),
            'cancelUrl' => route($request->query("route") . ".index", collect($request->query())->except('route')->toArray()),
            'canEditDocument' => $request->user()->can('update', $document),
        ]);
    }
}
