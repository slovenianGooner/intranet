@php use App\DTO\ContentType; @endphp
<x-mail::message>
    <div>
        <h1>{{ $content["title"] }}</h1>
        <div>
            @if ($content["type"] === ContentType::EVENT)
                <p class="whitespace-nowrap">
                    Starts at:
                    {{$content["starts_at"]}}
                </p>
                <p class="whitespace-nowrap">
                    Ends at:
                    {{$content["ends_at"]}}
                </p>
            @elseif ($content["type"] === ContentType::MEMO)
                <p class="whitespace-nowrap">
                    Created at:
                    {{ $content["created_at"] }}
                </p>
            @endif
            <p>
                Created by:
                {{$content["author"]}}
            </p>
        </div>
    </div>
    <div class="mt-4 prose prose-sm">
        {!! $content["body"] !!}
    </div>
    @if ($content["files"]->count())
        <div class="mt-4">
            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                @foreach($content["files"] as $file)
                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <a href="{{ $file["url"] }}" target="_blank"
                           class="font-medium text-indigo-600 hover:text-indigo-500">
                            {{ $file["name"] }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif
</x-mail::message>
