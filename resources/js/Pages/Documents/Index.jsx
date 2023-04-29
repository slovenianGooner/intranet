import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import {PlusIcon} from "@heroicons/react/24/solid";
import Layout from "@/Pages/Documents/Layout";
import SearchInput from "@/Components/SearchInput";

const Index = function ({query, currentRoute, title, canCreateDocuments, pageTitle, documents}) {
    let search = (value) => {
        router.get(route(currentRoute + '.index', {...query, search: value}), {}, {preserveState: true});
    }

    return (
        <>
            <Head title={title}/>
            <div className="px-6 pb-6">
                <div className="mt-2 md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            {pageTitle}
                        </h2>
                    </div>
                </div>
                {documents.data.length === 0 && (
                    <div
                        className="text-center border-2 border-dashed border-gray-300 p-12 mt-8 rounded-lg">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                vectorEffect="non-scaling-stroke"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No documents</h3>
                        {canCreateDocuments && (
                            <>
                                <p className="mt-1 text-sm text-gray-500">Get started by creating a new
                                    document.</p>
                                <div className="mt-6">
                                    <Link
                                        href={route('documents.create', {route: currentRoute + '.index', ...query})}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
                                        New Document
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                )}
                <div className="mt-8 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
                    <SearchInput value={query.search} submit={search} className="w-full md:w-96"/>
                </div>
                {documents.data.length > 0 && (<div className="mt-8 flow-root">
                        <ul role="list"
                            className="divide-y divide-gray-100 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                            {documents.data.map((document) => (
                                <li key={document.id}
                                    className="relative flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                                    <div className="min-w-0">
                                        <div className="flex items-start gap-x-3">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{document.title}</p>
                                        </div>
                                        <div
                                            className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                            <p className="whitespace-nowrap">
                                                Created on <time
                                                dateTime={document.created_at}>{document.created_at}</time>
                                            </p>
                                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                                <circle cx={1} cy={1} r={1}/>
                                            </svg>
                                            <p className="truncate">Created by {document.created_by}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">
                                        <Link
                                            href={route(currentRoute + '.show', {
                                                document: document.id,
                                                route: currentRoute, ...query
                                            })}
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            View more<span className="sr-only">, {document.title}</span>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => (
    <AuthenticatedLayout>
        <Layout children={page}/>
    </AuthenticatedLayout>
)

export default Index;
