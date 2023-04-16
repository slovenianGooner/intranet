import SelectInput from "@/Components/SelectInput";

export default function Gender({ ...props }) {
    let propValue = props.value || props.value.options[0];

    let handleChange = (value) => {
        props.onChange({ ...propValue, value: value });
    }
    return (
        <div>
            <SelectInput options={propValue.options} value={propValue.value} submit={handleChange} nameProp="title" valueProp="value" />
        </div>
    )
}
