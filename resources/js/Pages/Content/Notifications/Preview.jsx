import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, router} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline";
import Detail from "@/Pages/Content/Detail";
import User from "@/Pages/Content/Notifications/User";
import {useState} from "react";

const Preview = function ({query, content, users, session_recipients}) {
    const [recipients, setRecipients] = useState(session_recipients)

    return (
        <>
            <Head title="Preview Notification"/>

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
                        <div className="space-x-2 flex justify-start md:justify-end items-center">
                            <a href={route('contents.notifications.superPreview', {content: content.id, ...query})}
                               className="underline text-xs" target="_blank">
                                Super Preview
                            </a>
                            <SecondaryButton
                                onClick={(e) => router.get(route('contents.notifications.showRecipients', {content: content.id, ...query}))}>Back</SecondaryButton>
                            <PrimaryButton
                                onClick={(e) => router.post(route('contents.notifications.send', {content: content.id, ...query}))}>
                                <PaperAirplaneIcon className="h-4 w-4 mr-2" aria-hidden="true"/>
                                Send
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        <Detail content={content}/>
                    </div>
                    <div className="">
                        <h3 className="text-base font-semibold leading-6 text-gray-900 px-4 pt-5 pb-2 sm:px-6">Recipients
                            ({recipients.length})</h3>
                        <div
                            className="mt-2 border-t border-gray-200 divide-y divide-gray-200 max-h-60 overflow-y-auto">
                            {users.map((user, index) => (
                                <User key={index} user={user} recipients={recipients} setRecipients={setRecipients}/>
                            ))}
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:px-6 flex justify-end space-x-2">
                        <SecondaryButton
                            onClick={(e) => router.get(route('contents.notifications.showRecipients', {content: content.id, ...query}))}>Back</SecondaryButton>
                        <PrimaryButton
                            onClick={(e) => router.post(route('contents.notifications.send', {content: content.id, ...query}))}>
                            <PaperAirplaneIcon className="h-4 w-4 mr-2" aria-hidden="true"/>
                            Send
                        </PrimaryButton>
                    </div>
                </div>
            </div>

        </>
    )
}

Preview.layout = page => <AuthenticatedLayout children={page}/>

export default Preview
