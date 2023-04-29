import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, router, useForm} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import FloppyDiskIcon from "@/Components/Icons/FloppyDiskIcon";
import Form from "@/Pages/Documents/Form";

const Create = function ({query, document, cancelUrl, roles}) {
    const form = useForm({...document, files: []})

    const submit = (e) => {
        form.post(route('documents.store', {...query}));
    }

    return (
        <>
            <Head title="Create Document"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div
                        className="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Create Document</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Form form={form} roles={roles}/>
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex justify-end space-x-2">
                        <SecondaryButton
                            onClick={(e) => router.get(cancelUrl)}>Cancel</SecondaryButton>
                        <PrimaryButton onClick={(e) => submit(e)}>
                            <FloppyDiskIcon className="h-4 w-4 mr-2"/>
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    )
}

Create.layout = page => <AuthenticatedLayout children={page}/>

export default Create
