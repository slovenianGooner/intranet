import {Head, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Form from "@/Pages/Users/Form";
import DangerButton from "@/Components/DangerButton";
import {useState} from "react";
import Modal from "@/Components/Modal";
import FloppyDiskIcon from "@/Components/Icons/FloppyDiskIcon";
import TrashIcon from "@/Components/Icons/TrashIcon";

const Edit = function ({
                           query,
                           auth,
                           user,
                           roles,
                           customDataTypes,
                           canEditUserRoles,
                           canDeleteUser,
                           canBeImpersonated
                       }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const form = useForm({...user, password: '', password_confirmation: ''});

    const submit = (e) => {
        form.post(route('users.update', {_method: 'PATCH', user: user.id, ...query}));
    }

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    }

    const deleteUser = () => {
        form.delete(route('users.destroy', { user: user.id, ...query }));
    }
    return (
        <>
            <Head title="Edit User"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6 flex justify-between">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Edit User</h3>
                        {canBeImpersonated && !auth.is_impersonating && (
                            <SecondaryButton onClick={(e) => router.get(route('impersonate', { id: user.id }))}>Impersonate</SecondaryButton>
                        )}
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Form form={form} roles={roles} canEditUserRoles={canEditUserRoles} customDataTypes={customDataTypes}/>
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex justify-between">
                        <div>
                            {canDeleteUser &&
                                <div>
                                    <DangerButton
                                        onClick={confirmUserDeletion}
                                    >
                                        <TrashIcon className="w-4 h-4 mr-2"/>
                                        Delete
                                    </DangerButton>

                                    <Modal show={confirmingUserDeletion} onClose={() => setConfirmingUserDeletion(false)} maxWidth="md">
                                        <div className="p-6">
                                            <h2>
                                                Are you sure you want to delete the user?
                                            </h2>

                                            <div className="mt-6 flex justify-end">
                                                <SecondaryButton onClick={() => setConfirmingUserDeletion(false)}>Cancel</SecondaryButton>

                                                <DangerButton className="ml-3" onClick={(e) => deleteUser()}>
                                                    Delete Account
                                                </DangerButton>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            }
                        </div>
                        <div className="flex justify-end items-center space-x-2">
                            <SecondaryButton
                                className="h-full"
                                onClick={(e) => router.get(route('users.index', {...query}))}>Cancel</SecondaryButton>
                            <PrimaryButton onClick={(e) => submit(e)}>
                                <FloppyDiskIcon className="w-4 h-4 mr-2"/>
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Edit.layout = page => <AuthenticatedLayout children={page} />

export default Edit
