import {createContext, useContext, useEffect, useRef, useState} from "react";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import {classNames} from "@/Hooks/useClassNames";
import Sortable from "sortablejs";

const NestableContext = createContext();

export const Nestable = function ({folders, canEditFolders, level = 0, itemSlot, handleSort}) {
    let sortableDiv = useRef();

    useEffect(() => {
        Sortable.create(sortableDiv.current, {
            animation: 150,
            handle: '.handle',
            draggable: '.draggable',
            ghostClass: '.ghost-class',
            onEnd: handleSort
        });
    }, [sortableDiv]);

    return (
        <NestableContext.Provider value={{canEditFolders, level, itemSlot, handleSort}}>
            <ol className="space-y-2" ref={sortableDiv}>
                {folders.map((folder) => (
                    <NestableItem as="li" key={folder.id} folder={folder} />
                ))}
            </ol>
        </NestableContext.Provider>
    )
}

export const NestableItem = function ({folder}) {
    const {canEditFolders, level, itemSlot, handleSort} = useContext(NestableContext);
    let indents = ["pl-4", "pl-8", "pl-12", "pl-16", "pl-20"]
    const [open, setOpen] = useState(false);

    return (
        <div className="draggable" data-id={folder.id}>
            {itemSlot ? itemSlot({folder, open, setOpen, canEditFolders}) : (
                <div className="flex space-x-2">
                    <div>{folder.name}</div>
                    {folder.children.length > 0 && <button onClick={() => setOpen(!open)}>
                        {open ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/>}
                    </button>}
                </div>
            )}
            {folder.children.length > 0 && open && (
                <div className={classNames(indents[level], 'mt-2')}>
                    <Nestable folders={folder.children}
                              canEditFolders={canEditFolders}
                              level={level + 1}
                              itemSlot={itemSlot}
                              handleSort={handleSort}
                    />
                </div>
            )}
        </div>
    )
};
