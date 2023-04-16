import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchInput from "@/Components/SearchInput";

const Index = function({canCreateRole, canEditRoles, query, roles}) {
    let search = (value) => {
        router.get(route('roles.index', {...query, search: value}), {}, {preserveState: true});
    }

    return (
        <>
            <Head title="Roles"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Roles</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the roles in the system.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        {canCreateRole && <PrimaryButton
                            onClick={(e) => router.get(route('roles.create', {...query}))}
                        >
                            Add role
                        </PrimaryButton>}
                    </div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <SearchInput value={query.search} submit={search} className="w-full md:w-96" />
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {roles.map((role) => (
                                        <tr key={role.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {role.name}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-4">
                                                {canEditRoles && role.can_be_edited && <Link
                                                    href={route('roles.edit', {role: role.id, ...query})}
                                                    className="text-indigo-600 hover:text-indigo-900">
                                                    Edit<span className="sr-only">, {role.name}</span>
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
            </div>
        </>
    )
}

Index.layout = (page) => <AuthenticatedLayout children={page}/>

export default Index
