import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Nestable } from "@/Components/Nestable";
import {ArrowsPointingOutIcon, MinusIcon, PencilSquareIcon, PlusIcon} from "@heroicons/react/24/solid";

const Index = function ({auth, canCreateFolder, canEditFolders, query, folders}) {
    let handleSort = (event) => {
        let direction = (event.oldIndex - event.newIndex) <= 0 ? 'right' : 'left';
        let neighbourIndex = direction === 'left' ? event.newIndex + 1 : event.newIndex - 1;

        let neighbourId = event.from.children[neighbourIndex].dataset.id;
        let id = event.item.dataset.id;

        router.post(route('folders.sort', { folder: id }), {
            neighbour_id: neighbourId,
            direction: direction,
        });
    }
    return (
        <>
            <Head title="Folders"/>

            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Folder</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A tree list of all the folders in the system.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        {canCreateFolder && <PrimaryButton
                            onClick={(e) => router.get(route('folders.create', { ...query }))}
                        >
                            <PlusIcon className="mr-2 h-4 w-4" aria-hidden="true"/>
                            Add folder
                        </PrimaryButton>}
                    </div>
                </div>
                <div className="mt-8">
                    <Nestable folders={folders} canEditFolders={canEditFolders} itemSlot={ItemSlot} handleSort={handleSort} />
                </div>
            </div>
        </>
    )
}

let ItemSlot = ({folder, open, setOpen, canEditFolders}) => {
    return (
        <div className="bg-white flex divide-x divide-gray-200 border border-gray-200 group">
            <div className="px-4 py-2 flex items-center group-hover:bg-gray-50 handle cursor-pointer">
                <ArrowsPointingOutIcon className="w-4 h-4"/>
            </div>
            <div className="flex-1 px-4 py-2 group-hover:bg-gray-50">
                <div className="text-sm">{folder.name}</div>
                <div className="text-xs text-gray-500">#{folder.id}</div>
            </div>
            {canEditFolders && <button onClick={(e) => router.get(route('folders.edit', { folder: folder.id }))} className="px-4 py-2 flex items-center group-hover:bg-gray-50">
                <PencilSquareIcon className="w-4 h-4" />
            </button>}
            {folder.children.length > 0 && <button onClick={(e) => setOpen(!open)} className="px-4 py-2 group-hover:bg-gray-50">
                {open ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/>}
            </button>}
        </div>
    )
}

Index.layout = (page) => <AuthenticatedLayout children={page}/>

export default Index;
