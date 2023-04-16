import TextareaInput from "@/Components/TextareaInput.jsx";

export default function Address({ ...props }) {
    let propValue = props.value || '';

    let handleChange = (e) => {
        props.onChange({ ...propValue, value: e.target.value });
    }
    return (
        <div>
            <TextareaInput value={propValue.value} onChange={handleChange} className="w-full text-sm" />
        </div>
    )
}
