import {Head, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import Form from "@/Pages/Content/Form";

const Create = function ({query, content, types}) {
    const form = useForm({...content, files: []});

    const submit = (e) => {
        form.post(route('contents.store', {...query}));
    }

    return (
        <>
            <Head title="Create Content"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div
                        className="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Create Content</h3>
                        <div>
                            here?
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Form form={form} types={types}/>
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex justify-end space-x-2">
                        <SecondaryButton
                            onClick={(e) => router.get(route('contents.index', {...query}))}>Cancel</SecondaryButton>
                        <PrimaryButton onClick={(e) => submit(e)}>Save</PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    )
}

Create.layout = page => <AuthenticatedLayout children={page}/>

export default Create
