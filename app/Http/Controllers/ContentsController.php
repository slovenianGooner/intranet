<?php

namespace App\Http\Controllers;

use App\DTO\ContentType;
use App\Http\Requests\StoreContentRequest;
use App\Http\Resources\ContentFormResource;
use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class ContentsController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Content::class);

        $contents = Content::query()->when(
            request()->query('search'),
            function ($query) {
                $query->where('title', 'like', '%' . request()->query('search') . '%');
            }
        )->when(
            request()->query('type'),
            function ($query) {
                $query->where('type', request()->query('type'));
            }
        )->latest()->paginate(10)->withQueryString()->through(function (Content $content) {
            return [
                'id' => $content->id,
                'title' => $content->title,
                'type' => $content->type
            ];
        });

        return Inertia::render('Content/Index', [
            'contents' => $contents,
            'types' => ContentType::namedCases()->prepend(['value' => null, 'name' => 'No Type'])->values(),
            'canCreateContent' => auth()->user()->can('create', Content::class),
            'canEditContents' => auth()->user()->can('update', Content::class),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Content::class);

        return Inertia::render('Content/Create', [
            'content' => new ContentFormResource(null),
        ]);
    }

    public function store(StoreContentRequest $request)
    {
        try {
            $this->authorize('create', Content::class);

            Content::create($request->validated());

            return redirect()->route('content.index')->with('success', 'Content created successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong! Please try again later.");
        }
    }

    public function edit(Request $request, Content $content)
    {
        $this->authorize('view', $content);

        return Inertia::render('Content/Edit', [
            'content' => new ContentFormResource($content),
            'canDeleteContent' => $request->user()->can('delete', $content)
        ]);
    }

    public function update(StoreContentRequest $request, Content $content)
    {
        try {
            $this->authorize('update', $content);

            $content->update($request->validated());

            return redirect()->route('content.index')->with('success', 'Content updated successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong! Please try again later.");
        }
    }

    public function destroy(Content $content)
    {
        try {
            $this->authorize('delete', $content);

            $content->delete();

            return redirect()->route('content.index')->with('success', 'Content deleted successfully!');
        } catch (Throwable $e) {
            return redirect()->back()->with('error', config("app.debug") ? $e->getMessage() : "Something went wrong! Please try again later.");
        }
    }
}
