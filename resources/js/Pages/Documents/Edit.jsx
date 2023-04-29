import {useState} from "react";
import {Head, router, useForm} from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "@/Pages/Documents/Form";
import PrimaryButton from "@/Components/PrimaryButton";
import TrashIcon from "@/Components/Icons/TrashIcon";
import FloppyDiskIcon from "@/Components/Icons/FloppyDiskIcon";

const Edit = function ({query, document, canDeleteDocument, cancelUrl, roles}) {
    const [confirmingDocumentDeletion, setConfirmingDocumentDeletion] = useState(false);
    const form = useForm({...document, files: [], delete_files: []});

    const submit = (e) => {
        form.post(route('documents.update', {_method: 'PATCH', document: document.id, ...query}));
    }

    const confirmDocumentDeletion = () => {
        setConfirmingDocumentDeletion(true);
    }

    const deleteDocument = () => {
        form.delete(route('documents.destroy', {document: document.id, ...query}));
    }

    return (
        <>
            <Head title="Edit Document"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Edit Document</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Form form={form} file-list={document.file_list} roles={roles}/>
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex justify-between">
                        <div>
                            {canDeleteDocument &&
                                <div>
                                    <DangerButton onClick={confirmDocumentDeletion}>
                                        <TrashIcon className="h-4 w-4 mr-2"/>
                                        Delete
                                    </DangerButton>

                                    <Modal show={confirmingDocumentDeletion}
                                           onClose={() => setConfirmingDocumentDeletion(false)} maxWidth="md">
                                        <div className="p-6">
                                            <h2>
                                                Are you sure you want to delete the document?
                                            </h2>

                                            <div className="mt-6 flex justify-end">
                                                <SecondaryButton
                                                    onClick={() => setConfirmingDocumentDeletion(false)}>Cancel</SecondaryButton>

                                                <DangerButton className="ml-3" onClick={(e) => deleteDocument()}>
                                                    Delete Document
                                                </DangerButton>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            }
                        </div>
                        <div className="space-x-2 flex justify-end">
                            <SecondaryButton
                                onClick={(e) => router.get(cancelUrl)}>Cancel</SecondaryButton>
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
