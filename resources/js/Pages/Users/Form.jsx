import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {Link} from "@inertiajs/react";
import {classNames} from "@/Hooks/useClassNames";
import CustomDataInput from "@/Components/CustomDataInput";

export default function Form({form, roles, customDataTypes = [], canEditUserRoles = true}) {
    return (
        <div className="space-y-6 max-w-lg">
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
                <InputLabel htmlFor="email" value="Email"/>

                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={form.data.email}
                    onChange={(e) => form.setData('email', e.target.value)}
                    required
                    autoComplete="username"
                />

                <InputError className="mt-2" message={form.errors.email}/>
            </div>

            <div>
                <InputLabel htmlFor="password" value="Password"/>

                <TextInput
                    id="password"
                    value={form.data.password}
                    onChange={(e) => form.setData('password', e.target.value)}
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                />

                <InputError message={form.errors.password} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>

                <TextInput
                    id="password_confirmation"
                    value={form.data.password_confirmation}
                    onChange={(e) => form.setData('password_confirmation', e.target.value)}
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                />

                <InputError message={form.errors.password_confirmation} className="mt-2"/>
            </div>

            {canEditUserRoles && (<div>
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
            )}

            <div>
                <InputLabel htmlFor="custom_data" value="Custom Data"/>

                <CustomDataInput value={form.data.custom_data}
                                 onChange={(value) => form.setData('custom_data', value)}
                                 customDataTypes={customDataTypes}
                                 className="mt-4"/>
            </div>
        </div>
    )
}
