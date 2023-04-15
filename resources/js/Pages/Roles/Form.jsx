import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {usePage} from "@inertiajs/react";

export default function Form({form}) {
    return (
        <div className="space-y-6 max-w-lg">

            <InputError className="mt-2" message={usePage().props.flash.error}/>

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
        </div>
    )
}
