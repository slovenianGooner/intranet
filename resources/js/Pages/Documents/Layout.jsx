import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import {FolderIcon, XMarkIcon} from "@heroicons/react/24/solid";
import NavigationItem from "@/Components/Folder/NavigationItem";
import ActionButtons from "@/Pages/Documents/ActionButtons";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {classNames} from "@/Hooks/useClassNames";
import {Link} from "@inertiajs/react";

export default function Layout({children}) {
    const {
        folderNavigation,
        canCreateDocuments,
        currentFolder,
        currentRoute,
        canCreateFolders,
        breadcrumbs
    } = children.props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="lg:flex h-[calc(100vh-4rem)]">
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80"></div>
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5"
                                                    onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="bg-white w-full pt-4 divide-y divide-gray-200">
                                        <div className="px-4 pb-4 font-bold">Folders</div>
                                        <div className="space-y-1 pt-4">
                                            {folderNavigation.map((folder, index) => (
                                                <NavigationItem key={index} folder={folder}/>
                                            ))}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="h-full hidden bg-white lg:flex lg:w-72 lg:flex-col">
                    <div className="p-4 space-y-4">
                        {canCreateDocuments && (<div className="flex justify-start">
                            <ActionButtons currentFolder={currentFolder} currentRoute={currentRoute}
                                           canCreateFolders={canCreateFolders}
                                           originLeft={true}/>
                        </div>)}
                        <div className="space-y-1">
                            {folderNavigation.map((folder, index) => (
                                <NavigationItem key={index} folder={folder}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div
                    className="flex justify-between sticky top-0 z-40 h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 lg:hidden">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <FolderIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                    <div className="flex justify-end space-x-2">
                        <ActionButtons currentFolder={currentFolder} currentRoute={currentRoute}
                                       canCreateFolders={canCreateFolders}/>
                    </div>
                </div>
                <div>
                    <div className="px-6 pt-6">
                        {breadcrumbs.length > 0 && (<div>
                            <nav className="sm:hidden" aria-label="Back">
                                <Link href={breadcrumbs[breadcrumbs.length - 1].url}
                                      className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                                    <ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
                                                     aria-hidden="true"/>
                                    Back
                                </Link>
                            </nav>
                            <nav className="hidden sm:flex" aria-label="Breadcrumb">
                                <ol role="list" className="flex items-center space-x-4">
                                    {breadcrumbs.map((breadcrumb, index) => (
                                        <li key={index}>
                                            <div className={classNames(
                                                index > 0 ? 'flex items-center' : 'flex',
                                            )}>
                                                {index > 0 && (
                                                    <ChevronRightIcon
                                                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                        aria-hidden="true"/>
                                                )}
                                                <Link href={breadcrumb.url}
                                                      className={classNames(
                                                          'text-sm font-medium text-gray-500 hover:text-gray-700',
                                                          index > 0 ? 'ml-4' : '',
                                                      )}>
                                                    {breadcrumb.name}
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>)}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};
