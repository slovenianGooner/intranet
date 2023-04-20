import {useState} from "react";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import Checkbox from "@/Components/Checkbox";

const Group = ({role, recipients, setRecipients}) => {
    const [open, setOpen] = useState(false)


    const selectAll = () => {
        // Only add those recipients that are not already in the list
        setRecipients([...recipients, ...role.users.map((user) => user.id).filter((id) => !recipients.includes(id))])
    }

    const clearAll = () => {
        setRecipients(recipients.filter((recipient) => !role.users.map((user) => user.id).includes(recipient)))
    }

    return (
        <fieldset>
            <div className="px-4 py-2 sm:px-6 flex justify-between items-center">
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
                        <div key={user.id} className="relative flex items-start px-4 py-2 sm:px-6">
                            <div className="min-w-0 flex-1 text-sm leading-6">
                                <label htmlFor={`user-${user.id}`} className="select-none font-medium text-gray-900">
                                    {user.name}
                                </label>
                                <div className="text-gray-500">
                                    {user.email}
                                </div>
                            </div>
                            <div className="ml-3 flex h-6 items-center">
                                <Checkbox
                                    id={`user-${user.id}`}
                                    name="recipients[]"
                                    value={user.id}
                                    checked={recipients.includes(user.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setRecipients([...recipients, user.id])
                                        } else {
                                            setRecipients(recipients.filter((recipient) => recipient !== user.id))
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </fieldset>
    )
}

export default Group
