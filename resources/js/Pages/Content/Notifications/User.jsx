import Checkbox from "@/Components/Checkbox";

export default function ({user, recipients, setRecipients}) {
    return (
        <div className="relative flex items-center px-4 py-2 sm:px-6">
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
    )
}
