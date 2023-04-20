import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import {useState} from "react";
import Group from "@/Pages/Content/Notifications/Group";

const Recipients = ({content, roles, query}) => {
    const [recipients, setRecipients] = useState([])

    const selectAll = () => {
        let newRecipients = []
        roles.forEach(role => {
            // Only add users that are not already in the recipients list
            role.users.forEach(user => {
                if (newRecipients.findIndex(recipient => recipient.id === user.id) === -1) {
                    newRecipients.push(user)
                }
            });
        })
        setRecipients(newRecipients)
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
                            <div className="text-sm text-gray-700">Number of selected
                                recipients: {recipients.length}</div>
                        </div>
                        <div>
                            <SecondaryButton
                                onClick={(e) => router.get(route('contents.show', {content: content.id, ...query}))}>Cancel</SecondaryButton>
                            <PrimaryButton
                                onClick={(e) => router.get(route('contents.notifications.preview', {content: content.id, ...query}))}
                                className="ml-2">Preview</PrimaryButton>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {roles.map((role, index) => (
                            <Group key={index} role={role} recipients={recipients} setRecipients={setRecipients}/>
                        ))}
                        <div className="px-4 py-3 sm:px-6 flex space-x-2 justify-end items-center">
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
