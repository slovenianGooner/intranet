import {forwardRef, Fragment, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default forwardRef(function SelectInput({
                                                   options = [],
                                                   submit,
                                                   className = '',
                                                   valueProp = 'value',
                                                   nameProp = 'name',
                                                   itemSlot,
                                                   ...props
                                               }, ref) {
    const propValue = props.value || null;
    const [selected, setSelected] = useState(options.filter(option => option[valueProp] === propValue)[0] || options[0])

    let selectAndSubmit = (value) => {
        setSelected(value);
        submit(value[valueProp]);
    }

    return (
        <Listbox value={selected} onChange={selectAndSubmit}>
            {({open}) => (
                <>
                    <div className={'relative ' + className}>
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">{selected[nameProp]}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option) => (
                                    <Listbox.Option
                                        key={option[valueProp]}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={option}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                {itemSlot ? itemSlot(option) : (
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {option[nameProp]}
                                                    </span>
                                                )}

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
})
