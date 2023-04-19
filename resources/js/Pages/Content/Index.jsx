import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SearchInput from "@/Components/SearchInput";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Pagination from "@/Components/Pagination";

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
                            Add content
                        </PrimaryButton>}
                    </div>
                </div>
                <div className="mt-8 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
                    <SearchInput value={query.search} submit={search} className="w-full md:w-96"/>
                    <SelectInput options={types} value={query.type} submit={filterByType} className="w-full md:w-64"/>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {contents.data.map((content) => (
                                        <tr key={content.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {content.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {content.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {canEditContents && <Link
                                                    href={route('contents.edit', {content: content.id, ...query})}
                                                    className="text-indigo-600 hover:text-indigo-900">
                                                    Edit<span className="sr-only">, {content.title}</span>
                                                </Link>}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <Pagination query={query} data={contents} />
                </div>
            </div>
        </>
    )
}

Index.layout = (page) => <AuthenticatedLayout children={page}/>

export default Index
