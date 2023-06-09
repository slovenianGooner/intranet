import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, router, useForm} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import Form from "@/Pages/Folders/Form";
import FloppyDiskIcon from "@/Components/Icons/FloppyDiskIcon";

const Create = function ({query, folder, parentFolders, roles, backUrl}) {
    const form = useForm({...folder});

    const submit = (e) => {
        form.post(route('folders.store', {...query}));
    }

    return (
        <>
            <Head title="Create Folder"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Create Folder</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Form form={form} parentFolders={parentFolders} roles={roles}/>
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex justify-end space-x-2">
                        <SecondaryButton
                            onClick={(e) => router.get(backUrl)}>Cancel</SecondaryButton>
                        <PrimaryButton onClick={(e) => submit(e)}>
                            <FloppyDiskIcon className="h-4 w-4 mr-2"/>
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
}

Create.layout = page => <AuthenticatedLayout children={page} title="Create Folder"/>

export default Create;
