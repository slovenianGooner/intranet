import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import Checkbox from "@/Components/Checkbox";

export default function Form({form, parentFolders, roles}) {
    return (
        <div className="space-y-6 max-w-lg">

            <div>
                <label className="flex items-center">
                    <Checkbox
                        name="active"
                        value={true}
                        checked={form.data.active}
                        onChange={
                            (e) => form.setData('active', e.target.checked)
                        }
                    />
                    <span className="ml-2 text-sm text-gray-600">Active</span>
                </label>
            </div>

            <div>
                <InputLabel htmlFor="name" value="Name"/>

                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                    required
                    isFocused
                    autoComplete="name"
                />

                <InputError className="mt-2" message={form.errors.name}/>
            </div>

            <div>
                <InputLabel htmlFor="parent_id" value="Parent Folder"/>

                <SelectInput options={parentFolders}
                             id="parent_id"
                             className="mt-1 block w-full"
                             valueProp="id"
                             value={form.data.parent_id}
                             submit={(value) => form.setData('parent_id', value)}
                             itemSlot={(option) => (
                                 <div style={{marginLeft: option.depth + 'rem'}}>{option.name}</div>
                             )}
                />

                <InputError className="mt-2" message={form.errors.parent_id}/>
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description"/>

                <TextareaInput className="mt-1 block w-full"
                               rows="5"
                               value={form.data.description}
                               onChange={(e) => form.setData('description', e.target.value)}
                />

                <InputError className="mt-2" message={form.errors.description}/>
            </div>

            <div>
                <InputLabel htmlFor="roles" value="Roles"/>

                <div className="mt-1 grid grid-cols-2 gap-2 border rounded-md p-4">
                    {roles.map((role) => (
                        <label key={role.value} className="flex items-center">
                            <Checkbox
                                name="roles[]"
                                value={role.value}
                                checked={form.data.roles.includes(role.value)}
                                onChange={
                                    (e) => form.setData('roles', e.target.checked ?
                                        [...form.data.roles, role.value] :
                                        form.data.roles.filter((role) => role !== e.target.value))
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600">{role.name}</span>
                        </label>
                    ))}
                </div>

                <InputError message={form.errors.roles} className="mt-2"/>
            </div>
        </div>
    )
}
