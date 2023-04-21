import {PaperClipIcon} from "@heroicons/react/20/solid";

export default function ({content}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                {content.type === 'event' && (
                    <>
                        <p className="whitespace-nowrap">
                            Starts at: <time
                            dateTime={content.starts_at}>{content.starts_at}</time>
                        </p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1}/>
                        </svg>
                        <p className="whitespace-nowrap">
                            Ends at: <time dateTime={content.ends_at}>{content.ends_at}</time>
                        </p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1}/>
                        </svg>
                        <p className="whitespace-nowrap">
                            Created by {content.author}
                        </p>
                    </>
                )}
                {content.type === 'memo' && (
                    <>
                        <p className="whitespace-nowrap">
                            Created on <time
                            dateTime={content.created_at}>{content.created_at}</time>
                        </p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1}/>
                        </svg>
                        <p className="whitespace-nowrap">
                            Created by {content.author}
                        </p>
                    </>
                )}
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: content.body}}></div>
            {content.files.length > 0 && (
                <div className="max-w-xl">
                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                        {content.files.map(file => (
                            <li key={file.id}
                                className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                <div className="flex w-0 flex-1 items-center">
                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                   aria-hidden="true"/>
                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                        <span className="truncate font-medium">{file.name}</span>
                                        <span className="flex-shrink-0 text-gray-400">{file.size}</span>
                                    </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <a href={file.url} target="_blank"
                                       className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Download
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
