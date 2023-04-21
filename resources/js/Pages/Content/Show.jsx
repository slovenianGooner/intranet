import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, router} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import {PaperClipIcon} from "@heroicons/react/20/solid";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import {BellIcon} from "@heroicons/react/24/outline";
import Detail from "@/Pages/Content/Detail";

const Show = function ({query, content, canEditContent}) {
    return (
        <>
            <Head title={content.title}/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div
                        className="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        <div>
                            <h3 className="text-base font-semibold leading-6 text-gray-900">{content.title}</h3>
                        </div>
                        <div className="flex space-x-2">
                            <SecondaryButton
                                onClick={() => router.get(route('contents.index', {...query}))}>Back</SecondaryButton>
                            {canEditContent && (
                                <>
                                    <PrimaryButton
                                        onClick={() => router.get(route('contents.edit', {content: content.id, ...query}))}>
                                        <PencilSquareIcon className="h-4 w-4 mr-2"/>
                                        Edit
                                    </PrimaryButton>
                                    <PrimaryButton
                                        onClick={() => router.get(route('contents.notifications.showRecipients', {content: content.id, ...query}))}>
                                        <BellIcon className="h-4 w-4 mr-2"/>
                                        Notify Users
                                    </PrimaryButton>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6 space-y-4">
                        <Detail content={content}/>
                    </div>
                </div>
            </div>
        </>
    )
}

Show.layout = page => <AuthenticatedLayout children={page}/>

export default Show
