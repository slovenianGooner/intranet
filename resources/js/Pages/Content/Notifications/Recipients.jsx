import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import {useState} from "react";
import Group from "@/Pages/Content/Notifications/Group";
import {EyeIcon} from "@heroicons/react/24/outline";

const Recipients = ({content, roles, session_recipients, query}) => {
    const [recipients, setRecipients] = useState(session_recipients)

    const selectAll = () => {
        const userIds = [...new Set([].concat.apply([], roles.map(role => role.users.map(user => user.id))))];
        setRecipients(userIds)
    }

    const clearAll = () => {
        setRecipients([])
    }

    return (
        <>
            <Head title="Notify Users"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div
                        className="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        <div>
                            <h3 className="text-base font-semibold leading-6 text-gray-900">{content.title}</h3>
                            <div className="text-sm text-gray-700">
                                Number of selected recipients: {recipients.length}
                            </div>
                        </div>
                        <div className="flex justify-start md:justify-end">
                            <SecondaryButton
                                onClick={(e) => router.get(route('contents.show', {content: content.id, ...query}))}>Cancel</SecondaryButton>
                            <PrimaryButton
                                onClick={(e) => router.post(
                                    route('contents.notifications.storeRecipients', {content: content.id, ...query}),
                                    {recipients}
                                )}
                                className="ml-2">
                                <EyeIcon className="h-4 w-4 mr-2"/>
                                Preview
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {roles.map((role, index) => (
                            <Group key={index} role={role} recipients={recipients} setRecipients={setRecipients}/>
                        ))}
                        <div className="px-4 py-4 sm:px-6 flex space-x-2 justify-end items-center">
                            <button className="text-xs underline" onClick={selectAll}>Select all</button>
                            <button className="text-xs underline" onClick={clearAll}>Clear all</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Recipients.layout = page => <AuthenticatedLayout children={page}/>

export default Recipients
