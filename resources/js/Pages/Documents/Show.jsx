import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Layout from "@/Pages/Documents/Layout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import {PaperClipIcon} from "@heroicons/react/20/solid";

const Show = function ({query, document, canEditDocument, cancelUrl, currentRoute}) {
    return (
        <>
            <Head title={document.title}/>

            <div className="px-6 pb-6">
                <div className="mt-2 md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            {document.title}
                        </h2>
                        <div className="flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                            <p className="whitespace-nowrap">
                                Created by {document.author}
                            </p>
                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                <circle cx={1} cy={1} r={1}/>
                            </svg>
                            <p className="whitespace-nowrap">
                                Created on <time dateTime={document.created_at}>{document.created_at}</time>
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0 space-x-2">
                        <SecondaryButton onClick={(e) => router.get(cancelUrl)}>
                            Back
                        </SecondaryButton>
                        {canEditDocument && (
                            <PrimaryButton
                                onClick={(e) => router.get(route('documents.edit', {
                                    document: document.id, ...query,
                                    route: currentRoute
                                }))}>
                                Edit
                            </PrimaryButton>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:p-6">
                        <div>
                            <div className="">
                                <dl>
                                    <div className="px-4 sm:col-span-2 sm:px-0">
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"
                                            dangerouslySetInnerHTML={{__html: document.body}}></dd>
                                    </div>
                                    {document.files.length > 0 && (
                                        <div className="px-4 py-6 sm:col-span-2 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Files</dt>
                                            <dd className="mt-2 text-sm text-gray-900">
                                                <ul role="list"
                                                    className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                    {document.files.map(file => (
                                                        <li key={file.id}
                                                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                            <div className="flex w-0 flex-1 items-center">
                                                                <PaperClipIcon
                                                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                                    aria-hidden="true"/>
                                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                    <span
                                                                        className="truncate font-medium">{file.name}</span>
                                                                    <span
                                                                        className="flex-shrink-0 text-gray-400">{file.size}</span>
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
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Show.layout = (page) => (
    <AuthenticatedLayout>
        <Layout children={page}/>
    </AuthenticatedLayout>
)

export default Show
