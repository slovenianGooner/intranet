import {useState} from "react";
import {Head, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import Form from "@/Pages/Folders/Form";
import FloppyDiskIcon from "@/Components/Icons/FloppyDiskIcon";
import TrashIcon from "@/Components/Icons/TrashIcon";

const Edit = function ({query, folder, parentFolders, canDeleteFolder, roles}) {
    const [confirmingFolderDeletion, setConfirmingFolderDeletion] = useState(false);
    const form = useForm({...folder});

    const submit = (e) => {
        form.post(route('folders.update', {_method: 'PATCH', folder: folder.id, ...query}));
    }

    const confirmFolderDeletion = () => {
        setConfirmingFolderDeletion(true);
    }

    const deleteFolder = () => {
        form.delete(route('folders.destroy', {folder: folder.id, ...query}));
    }

    return (
        <>
            <Head title="Edit Folder"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Edit Folder</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Form form={form} parentFolders={parentFolders} roles={roles}/>
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex justify-between">
                        <div>
                            {canDeleteFolder &&
                                <div>
                                    <DangerButton
                                        onClick={confirmFolderDeletion}
                                    >
                                        <TrashIcon className="h-4 w-4 mr-2"/>
                                        Delete
                                    </DangerButton>

                                    <Modal show={confirmingFolderDeletion}
                                             onClose={() => setConfirmingFolderDeletion(false)} maxWidth="md">
                                        <div className="p-6">
                                            <h2>
                                                Are you sure you want to delete the folder?
                                            </h2>

                                            <div className="mt-6 flex justify-end">
                                                <SecondaryButton
                                                    onClick={() => setConfirmingFolderDeletion(false)}>Cancel</SecondaryButton>
                                                <DangerButton className="ml-3" onClick={(e) => deleteFolder()}>
                                                    Delete Folder
                                                </DangerButton>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            }
                        </div>
                        <div className="space-x-2 flex justify-end">
                            <SecondaryButton
                                onClick={(e) => router.get(route('folders.index', {...query}))}>Cancel</SecondaryButton>
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

Edit.layout = page => <AuthenticatedLayout children={page} title="Edit Folder"/>

export default Edit;
