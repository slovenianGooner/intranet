import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import Checkbox from "@/Components/Checkbox";
import User from "@/Pages/Content/Notifications/User";


export default forwardRef(function ({role, recipients, setRecipients}, ref) {
    const group = ref ? ref : useRef();
    const [open, setOpen] = useState(false)

    const selectAll = () => {
        // Only add those recipients that are not already in the list
        setRecipients([...recipients, ...role.users.map((user) => user.id).filter((id) => !recipients.includes(id))])
    }

    const clearAll = () => {
        setRecipients(recipients.filter((recipient) => !role.users.map((user) => user.id).includes(recipient)))
    }

    return (
        <fieldset ref={group}>
            <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
                <button className="flex items-center space-x-1" onClick={() => setOpen(!open)}>
                    <legend className="text-base font-semibold leading-6 text-gray-900">{role.name}</legend>
                    <div>
                        {!open ? (
                            <PlusIcon className="h-5 w-5"/>
                        ) : (
                            <MinusIcon className="h-5 w-5"/>
                        )}
                    </div>
                </button>
                <div className="flex space-x-2">
                    <button className="text-xs underline" onClick={selectAll}>Select all</button>
                    <button className="text-xs underline" onClick={clearAll}>Clear all</button>
                </div>
            </div>
            {open && (
                <div className="divide-y divide-gray-200 border-b border-t border-gray-200">
                    {role.users.map((user) => (
                        <User key={user.id} user={user} recipients={recipients} setRecipients={setRecipients}/>
                    ))}
                </div>
            )}
        </fieldset>
    )
});
