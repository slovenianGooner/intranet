import {usePage} from "@inertiajs/react";
import {Fragment, useEffect, useState} from "react";
import {Transition} from "@headlessui/react";
import {classNames} from "@/Hooks/useClassNames";

export default function FlashMessages({}) {
    const flash = usePage().props.flash;
    const [showToast, setShowToast] = useState(flash.error !== null || flash.success !== null);

    useEffect(() => {
        setShowToast(flash.error !== null || flash.success !== null);
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    }, [flash]);

    return (
        <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:p-6"
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                <Transition
                    show={showToast}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className={classNames(
                            'p-4',
                            flash.success !== null ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'
                        )}>
                            {flash.success !== null ? flash.success : flash.error}
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    )
}
