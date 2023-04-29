import {Link} from "@inertiajs/react";
import NavigationItem from "@/Components/Folder/NavigationItem";
import {classNames} from "@/Hooks/useClassNames";
import {FolderIcon, FolderOpenIcon} from "@heroicons/react/24/solid";

export default function ({folder}) {
    return (
        <div style={{marginLeft: (folder.depth) + 'rem'}}>
            <Link href={folder.url}
                  className={classNames(folder.current ?
                          'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md px-4 py-2 text-sm leading-6 font-semibold'
                  )}>
                {folder.open ? (
                    <FolderOpenIcon
                        className={classNames(folder.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0')}
                        aria-hidden="true"/>
                ) : (
                    <FolderIcon
                        className={classNames(folder.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0')}
                        aria-hidden="true"/>
                )}
                {folder.name}
            </Link>
            {folder.open && folder.children.length > 0 && (
                <div className="mt-1 space-y-1">
                    {folder.children.map((child, index) => (
                        <div key={index}>
                            <NavigationItem folder={child}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
