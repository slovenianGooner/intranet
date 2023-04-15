import {forwardRef, useRef, useState} from "react";
import TextInput from "@/Components/TextInput";

export default forwardRef(function SearchInput({submit, className = '', ...props}, ref) {
    const search = ref ? ref : useRef();
    const [value, setValue] = useState(props.value || '');

    return (
        <TextInput
            {...props}
            placeholder="Search..."
            ref={search}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyPress={e => {
                if (e.key === 'Enter') {
                   submit(value);
                }
            }}
            className={
                'text-sm ' +
                className
            }
        />
    );
})
