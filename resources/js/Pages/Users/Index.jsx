import {Head, router, Link} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SearchInput from "@/Components/SearchInput";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";

const Index = function({ auth, canCreateUser, canEditUsers, query, roles, users }) {
    let search = (value) => {
        router.get(route('users.index', { ...query, search: value }), {}, { preserveState: true });
    }

    let filterByRole = (value) => {
        router.get(route('users.index', { ...query, role: value }), {}, { preserveState: true });
    }

    return (
        <>
            <Head title="Users" />

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, email and role.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        {canCreateUser && <PrimaryButton
                            onClick={(e) => router.get(route('users.create', { ...query }))}
                        >
                            Add user
                        </PrimaryButton>}
                    </div>
                </div>
                <div className="mt-8 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
                    <SearchInput value={query.search} submit={search} className="w-full md:w-96" />
                    <SelectInput options={roles} value={query.role} submit={filterByRole} className="w-full md:w-64" />
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Role
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {users.map((user) => (
                                        <tr key={user.email}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {user.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 space-x-1">
                                                {user.roles.map((role) => (
                                                    <span key={role} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        {role}
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-4">
                                                {canEditUsers && user.can_be_edited && <Link
                                                    href={route('users.edit', { user: user.id, ...query })} className="text-indigo-600 hover:text-indigo-900">
                                                    Edit<span className="sr-only">, {user.name}</span>
                                                </Link>}
                                                {user.can_be_impersonated && !auth.is_impersonating && <Link
                                                    href={route('impersonate', { id: user.id })} className="text-indigo-600 hover:text-indigo-900">
                                                    Impersonate<span className="sr-only">, {user.name}</span>
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

Index.layout = page => <AuthenticatedLayout children={page} />

export default Index;
