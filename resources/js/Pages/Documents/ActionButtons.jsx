import {Link} from "@inertiajs/react";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {Fragment} from "react";
import {classNames} from "@/Hooks/useClassNames";

export default function ActionButtons({currentFolder, currentRoute, canCreateFolders, originLeft = false}) {
    return (
        <Menu as="div" className="relative -ml-px block">
            <Menu.Button
                className="relative inline-flex items-center rounded-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 space-x-2">
                <span className="sr-only">Open options</span>
                <span className="text-sm font-semibold text-gray-900">Options</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true"/>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={classNames(
                        'absolute z-10 -mr-1 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                        originLeft ? 'left-0 origin-top-left' : 'right-0 origin-top-right',
                    )}>
                    <div className="py-1">
                        <a
                            href={route('documents.create', {
                                folder: currentFolder.id,
                                route: currentRoute + '.index'
                            })}
                            className="text-gray-700 block px-4 py-2 text-sm"
                        >
                            New Document
                        </a>
                        {canCreateFolders && (
                            <a
                                href={route('folders.create', {
                                    folder: currentFolder.id,
                                    route: currentRoute + '.index'
                                })}
                                className="text-gray-700 block px-4 py-2 text-sm"
                            >
                                New Folder
                            </a>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
