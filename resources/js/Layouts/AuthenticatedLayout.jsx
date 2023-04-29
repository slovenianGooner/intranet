import {Dialog, Menu, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {
    Bars3Icon,
    ChevronDownIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    LockOpenIcon,
    FolderIcon,
    DocumentTextIcon,
    NewspaperIcon, DocumentIcon
} from "@heroicons/react/24/solid";
import {Link, router, usePage} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import {classNames} from "@/Hooks/useClassNames";
import FlashMessages from "@/Components/FlashMessages";

const icons = {
    HomeIcon: HomeIcon,
    UsersIcon: UsersIcon,
    LockOpenIcon: LockOpenIcon,
    FolderIcon: FolderIcon,
    DocumentIcon: DocumentIcon,
    DocumentTextIcon: DocumentTextIcon,
    NewspaperIcon: NewspaperIcon
}

export default function Authenticated({children}) {
    const user = usePage().props.auth.user;
    const is_impersonating = usePage().props.auth.is_impersonating;
    const userMenu = usePage().props.userMenu;
    const navigation = [...usePage().props.navigation].map((item) => {
        return {
            ...item,
            icon: icons[item.icon],
        }
    });

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);

    let timeout = null;
    router.on('start', () => {
        timeout = setTimeout(() => {
            setShowLoadingScreen(true);
        }, 500);
    });
    router.on('finish', () => {
        clearTimeout(timeout);
        setShowLoadingScreen(false);
    });

    return (<div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
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
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Link href={route('dashboard')}
                                              className="text-white font-bold text-2xl">intraNET</Link>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (<li key={item.name}>
                                                    <Link href={item.href}
                                                          onClick={() => setSidebarOpen(false)}
                                                          className={classNames(item.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold')}>
                                                        <item.icon
                                                            className={classNames(item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white', 'h-6 w-6 shrink-0')}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <a href={route('dashboard')} className="text-white font-bold text-2xl">intraNET</a>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (<li key={item.name}>
                                <Link href={item.href}
                                      className={classNames(item.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold')}>
                                    <item.icon
                                        className={classNames(item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white', 'h-6 w-6 shrink-0')}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            </li>))}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-72">
                <div
                    className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"/>

                    <div className="flex justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {is_impersonating && (
                                <PrimaryButton onClick={(e) => router.get(route('impersonate.leave'))}
                                               className="bg-indigo-500">
                                    Stop impersonating
                                </PrimaryButton>
                            )}
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative">
                                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                    <span className="sr-only">Open user menu</span>
                                    <span className="flex items-center">
                                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                            aria-hidden="true">
                                        {user.name}
                                      </span>
                                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </span>
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
                                        className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        {userMenu.map((item) => (<Menu.Item key={item.name}>
                                            {({active}) => (<Link href={item.href}
                                                                  method={item.method}
                                                                  as={item.as}
                                                                  className={classNames(active ? 'bg-gray-50' : '', 'block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900')}>
                                                {item.name}
                                            </Link>)}
                                        </Menu.Item>))}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <main>
                    {showLoadingScreen && (
                        <div
                            className="fixed inset-0 left-0 lg:left-72 flex justify-center items-center bg-white/90 z-[60]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="animate-spin w-16 h-16 text-indigo-500">
                                <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M7.9342 16.0659L6.87354 17.1265" stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M7.9342 7.93413L6.87354 6.87347" stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    )}
                    {children}
                </main>
            </div>

            <FlashMessages/>
        </div>
    )
}
