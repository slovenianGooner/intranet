import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SearchInput from "@/Components/SearchInput";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Pagination from "@/Components/Pagination";
import {classNames} from "@/Hooks/useClassNames";
import {PlusIcon} from "@heroicons/react/24/solid";

const Index = function ({contents, canCreateContent, canEditContents, query, types}) {
    let search = (value) => {
        router.get(route('contents.index', {...query, search: value}), {}, {preserveState: true});
    }

    let filterByType = (value) => {
        router.get(route('contents.index', {...query, type: value}), {}, {preserveState: true});
    }

    return (
        <>
            <Head title="Contents"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Contents</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the contents in your account including their name, type and status.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        {canCreateContent && <PrimaryButton
                            onClick={(e) => router.get(route('contents.create', {...query}))}
                        >
                            <PlusIcon className="mr-2 h-4 w-4" aria-hidden="true"/>
                            Add content
                        </PrimaryButton>}
                    </div>
                </div>
                <div className="mt-8 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
                    <SearchInput value={query.search} submit={search} className="w-full md:w-96"/>
                    <SelectInput options={types} value={query.type} submit={filterByType} className="w-full md:w-64"/>
                </div>
                <div className="mt-8 flow-root">
                    <ul role="list"
                        className="divide-y divide-gray-100 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                        {contents.data.map((content) => (
                            <li key={content.id}
                                className="relative flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                                <div className="min-w-0">
                                    <div className="flex items-start gap-x-3">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{content.title}</p>
                                        <p className={classNames(
                                            content.type === 'memo' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800',
                                            'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                        )}>
                                            {content.type}
                                        </p>
                                    </div>
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
                                <div className="flex flex-none items-center gap-x-4">
                                    <Link
                                        href={route('contents.show', {content: content.id, ...query})}
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        View more<span className="sr-only">, {content.title}</span>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-end mt-8">
                    <Pagination query={query} data={contents}/>
                </div>
            </div>
        </>
    )
}

Index.layout = (page) => <AuthenticatedLayout children={page}/>

export default Index
