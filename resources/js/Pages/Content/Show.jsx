import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import {PaperClipIcon} from "@heroicons/react/20/solid";

const Show = function ({query, content, canEditContent}) {
    return (
        <>
            <Head title={content.title}/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div
                        className="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        <div>
                            <h3 className="text-base font-semibold leading-6 text-gray-900">{content.title}</h3>
                            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
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
                                    </>
                                )}
                                <p className="truncate">Created by {content.created_by}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <SecondaryButton
                                onClick={() => router.get(route('contents.index', {...query}))}>Back</SecondaryButton>
                            {canEditContent && (
                                <>
                                    <PrimaryButton
                                        onClick={() => router.get(route('contents.edit', {content: content.id, ...query}))}>
                                        Edit
                                    </PrimaryButton>
                                    <PrimaryButton
                                        onClick={() => router.get(route('contents.notifications.showRecipients', {content: content.id, ...query}))}>
                                        Notify Users
                                    </PrimaryButton>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6 space-y-4">
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
                </div>
            </div>
        </>
    )
}

Show.layout = page => <AuthenticatedLayout children={page}/>

export default Show
