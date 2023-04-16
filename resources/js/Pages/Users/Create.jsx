import {usePage, Head, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Form from "@/Pages/Users/Form";

const Create = function ({ query, user, roles, customDataTypes }) {
    const form = useForm({ ...user, password: '', password_confirmation: '' });

    const submit = (e) => {
        form.post(route('users.store', { ...query }));
    }
    return (
        <>
            <Head title="Create User" />

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Create User</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Form form={form} roles={roles} customDataTypes={customDataTypes} />
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex justify-end space-x-2">
                        <SecondaryButton onClick={(e) => router.get(route('users.index', { ...query }))}>Cancel</SecondaryButton>
                        <PrimaryButton onClick={(e) => submit(e)}>Save</PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    )
}

Create.layout = page => <AuthenticatedLayout children={page} />

export default Create
