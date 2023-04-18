import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {Link} from "@inertiajs/react";
import {classNames} from "@/Hooks/useClassNames";
import Gender from "@/Components/CustomDataInput/Gender";
import Phone from "@/Components/CustomDataInput/Phone";
import Address from "@/Components/CustomDataInput/Address";

export default function CustomDataInput({customDataTypes, className = '', ...props}) {
    let components = {
        Gender: Gender,
        Phone: Phone,
        Address: Address,
    }

    let propValue = props.value || [];

    let addValue = (value) => {
        propValue.push({...value, value: ''});
        props.onChange(propValue);
    }

    let updateValueAtIndex = (value, index) => {
        propValue[index] = value;
        handleChange(propValue);
    }

    let removeValueAtIndex = (index) => {
        propValue.splice(index, 1);
        handleChange(propValue);
    }

    let handleChange = (propValue) => {
        props.onChange(propValue.map((value) => {
            delete value.componentObject
            return {...value}
        }));
    }

    return (
        <div className={
            classNames(
                'space-y-4',
                className
            )
        }>

            {propValue.length > 0 && <div className="border rounded-md">
                <div className="divide-y divide-gray-200">
                    {propValue.map((value, index) => {
                        return {
                            ...value,
                            componentObject: components[value.component],
                        }
                    }).map((value, index) => (
                        <div key={index} className="p-4 space-y-1">
                            <div className="whitespace-nowrap text-sm font-medium text-gray-900">
                                {value.title}
                            </div>
                            <div className="whitespace-nowrap text-sm text-gray-500">
                                <value.componentObject
                                    value={value}
                                    onChange={(value) => updateValueAtIndex(value, index)}
                                />
                            </div>
                            <div className="relative whitespace-nowrap text-sm text-gray-500 text-right">
                                <button className="text-indigo-600 hover:text-indigo-900"
                                        onClick={(e) => removeValueAtIndex(index)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}

            <Menu as="div" className="relative">
                <Menu.Button className={
                    `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150`
                }>
                    Add new
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
                        className="absolute left-0 bottom-0 z-10 mb-6 w-32 origin-bottom-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        {customDataTypes.map((type) => (
                            <Menu.Item key={type.title}>
                                {({close}) => (
                                    <Link
                                        href="#"
                                        as="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addValue({...type})
                                            close()
                                        }}
                                        className={classNames('block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50')}>
                                        {type.title}
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
