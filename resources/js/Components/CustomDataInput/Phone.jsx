import TextInput from "@/Components/TextInput.jsx";

export default function Phone({ ...props }) {
    let propValue = props.value || '';

    let handleChange = (e) => {
        props.onChange({ ...propValue, value: e.target.value });
    }
    return (
        <div>
            <TextInput value={propValue.value} onChange={handleChange} className="w-full text-sm" />
        </div>
    )
}
