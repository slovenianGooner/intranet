import {useState} from "react";
import {Head, router, useForm} from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "@/Pages/Content/Form";
import PrimaryButton from "@/Components/PrimaryButton";
import TrashIcon from "@/Components/Icons/TrashIcon";
import FloppyDiskIcon from "@/Components/Icons/FloppyDiskIcon";

const Edit = function ({query, content, types, canDeleteContent}) {
    const [confirmingContentDeletion, setConfirmingContentDeletion] = useState(false);
    const form = useForm({...content, files: [], delete_files: []});

    const submit = (e) => {
        form.post(route('contents.update', {_method: 'PATCH', content: content.id, ...query}));
    }

    const confirmContentDeletion = () => {
        setConfirmingContentDeletion(true);
    }

    const deleteContent = () => {
        form.delete(route('contents.destroy', {content: content.id, ...query}));
    }

    return (
        <>
            <Head title="Edit Content"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Edit Content</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Form form={form} types={types} file-list={content.file_list}/>
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex justify-between">
                        <div>
                            {canDeleteContent &&
                                <div>
                                    <DangerButton onClick={confirmContentDeletion}>
                                        <TrashIcon className="h-4 w-4 mr-2"/>
                                        Delete
                                    </DangerButton>

                                    <Modal show={confirmingContentDeletion}
                                           onClose={() => setConfirmingContentDeletion(false)} maxWidth="md">
                                        <div className="p-6">
                                            <h2>
                                                Are you sure you want to delete the content?
                                            </h2>

                                            <div className="mt-6 flex justify-end">
                                                <SecondaryButton
                                                    onClick={() => setConfirmingContentDeletion(false)}>Cancel</SecondaryButton>

                                                <DangerButton className="ml-3" onClick={(e) => deleteContent()}>
                                                    Delete Content
                                                </DangerButton>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            }
                        </div>
                        <div className="space-x-2 flex justify-end">
                            <SecondaryButton
                                onClick={(e) => router.get(route('contents.show', {content: content.id, ...query}))}>Cancel</SecondaryButton>
                            <PrimaryButton onClick={(e) => submit()}>
                                <FloppyDiskIcon className="h-4 w-4 mr-2"/>
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Edit.layout = page => <AuthenticatedLayout children={page}/>

export default Edit;
