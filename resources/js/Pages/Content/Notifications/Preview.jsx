import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, router, usePage} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline";
import Detail from "@/Pages/Content/Detail";
import User from "@/Pages/Content/Notifications/User";
import {useState} from "react";
import Modal from "@/Components/Modal";

const Preview = function ({query, content, users, session_recipients, canSeePreviewInBrowser}) {
    const [recipients, setRecipients] = useState(session_recipients)
    const [sendingNotifications, setSendingNotifications] = useState(false)
    const [sending, setSending] = useState(false)

    const sendNotifications = () => {
        setSending(true);
        router.post(route('contents.notifications.send', {content: content.id, ...query}), {
            recipients: recipients
        }, {
            onFinish: () => {
                setSending(false);
                setSendingNotifications(false);
            }
        })
    }

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
                            {canSeePreviewInBrowser && (
                                <a href={route('contents.notifications.superPreview', {content: content.id, ...query})}
                                   className="underline text-xs" target="_blank">
                                    Super Preview
                                </a>
                            )}
                            <SecondaryButton
                                onClick={(e) => router.get(route('contents.notifications.showRecipients', {content: content.id, ...query}))}>Back</SecondaryButton>
                            <PrimaryButton
                                onClick={() => setSendingNotifications(true)}>
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
                            onClick={() => setSendingNotifications(true)}>
                            <PaperAirplaneIcon className="h-4 w-4 mr-2" aria-hidden="true"/>
                            Send
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <Modal show={sendingNotifications} onClose={() => setSendingNotifications(false)} maxWidth="md">
                <div className="p-6">
                    <div>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <PaperAirplaneIcon className="h-6 w-6 text-gray-500" aria-hidden="true"/>
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                Are you sure?
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Sending notification to {recipients.length} users.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                            onClick={() => sendNotifications()}
                            disabled={sending}
                        >
                            {sending ? 'Sending...' : 'Send'}
                        </button>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={() => setSendingNotifications(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

Preview.layout = page => <AuthenticatedLayout children={page}/>

export default Preview
