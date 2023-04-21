import {Head, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Form from "@/Pages/Roles/Form";
import DangerButton from "@/Components/DangerButton";
import {useState} from "react";
import Modal from "@/Components/Modal";
import FloppyDiskIcon from "@/Components/Icons/FloppyDiskIcon";
import TrashIcon from "@/Components/Icons/TrashIcon";

const Edit = function ({query, role, canDeleteRole}) {
    const [confirmingRoleDeletion, setConfirmingRoleDeletion] = useState(false);
    const form = useForm({...role});

    const submit = (e) => {
        form.post(route('roles.update', {_method: 'PATCH', role: role.id, ...query}));
    }

    const confirmRoleDeletion = () => {
        setConfirmingRoleDeletion(true);
    }

    const deleteRole = () => {
        form.delete(route('roles.destroy', {role: role.id, ...query}));
    }
    return (
        <>
            <Head title="Edit Role"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Edit Role</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Form form={form}/>
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex justify-between">
                        <div>
                            {canDeleteRole &&
                                <div>
                                    <DangerButton
                                        onClick={confirmRoleDeletion}
                                    >
                                        <TrashIcon className="h-4 w-4 mr-2"/>
                                        Delete
                                    </DangerButton>

                                    <Modal show={confirmingRoleDeletion}
                                           onClose={() => setConfirmingRoleDeletion(false)} maxWidth="md">
                                        <div className="p-6">
                                            <h2>
                                                Are you sure you want to delete the role?
                                            </h2>

                                            <div className="mt-6 flex justify-end">
                                                <SecondaryButton
                                                    onClick={() => setConfirmingRoleDeletion(false)}>Cancel</SecondaryButton>

                                                <DangerButton className="ml-3" onClick={(e) => deleteRole()}>
                                                    Delete Role
                                                </DangerButton>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            }
                        </div>
                        <div className="flex justify-end space-x-2">
                            <SecondaryButton
                                onClick={(e) => router.get(route('roles.index', {...query}))}>Cancel</SecondaryButton>
                            <PrimaryButton onClick={(e) => submit(e)}>
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

export default Edit
