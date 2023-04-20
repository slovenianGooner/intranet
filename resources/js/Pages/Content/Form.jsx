import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import {Editor} from "@tinymce/tinymce-react";
import {useRef} from "react";

export default function Form({form, types, file_list = []}) {
    const editorRef = useRef(null);
    const setFiles = (e) => {
        form.setData('files', e.target.files);
    }
    return (
        <div className="space-y-6">
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

            <div className="max-w-sm">
                <InputLabel htmlFor="type" value="Type"/>

                <SelectInput
                    id="type"
                    className="mt-1 block w-full"
                    options={types}
                    value={form.data.type}
                    submit={(value) => form.setData('type', value)}
                    required
                />

                <InputError className="mt-2" message={form.errors.type}/>
            </div>

            <div>
                <InputLabel htmlFor="title" value="Title"/>

                <TextInput
                    id="title"
                    className="mt-1 block w-full"
                    value={form.data.title}
                    onChange={(e) => form.setData('title', e.target.value)}
                    required
                    isFocused
                    autoComplete="title"
                />

                <InputError className="mt-2" message={form.errors.title}/>
            </div>

            <div>
                <InputLabel htmlFor="body" value="Content"/>

                <Editor
                    tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={form.data.body}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | bold italic | bullist numlist outdent indent | removeformat',
                        content_style: 'body { font-family:Figtree, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 0.875rem }'
                    }}
                    onChange={(e) => form.setData('body', editorRef.current.getContent())}
                />
            </div>

            <div className="max-w-lg">
                <InputLabel htmlFor="files" value="Files"/>

                <div className="border rounded-md divide-y divide-gray-200">
                    {form.data.file_list.map((file, index) => (
                        <div className="px-3 py-2 flex justify-between items-center" key={index}>
                            <a href={file.url} target="_blank" key={index} className="text-sm">
                                {file.name}
                            </a>
                            <label className="flex items-center">
                                <Checkbox
                                    name="delete_files[]"
                                    value={file.id}
                                    checked={form.data.delete_files.includes(file.id)}
                                    onChange={
                                        (e) => {
                                            if (e.target.checked) {
                                                form.setData('delete_files', [...form.data.delete_files, file.id])
                                            } else {
                                                form.setData('delete_files', form.data.delete_files.filter((id) => id !== file.id))
                                            }
                                        }
                                    }
                                />
                                <span className="ml-2 text-sm text-gray-600">Delete</span>
                            </label>
                        </div>
                    ))}
                    <div className="px-3 py-2">
                        {form.data.file_list.length > 0 && (
                            <InputLabel htmlFor="files" value="Add Files"/>
                        )}
                        <div className="mt-1">
                            <input type="file" name="files[]" multiple={true} onChange={setFiles}/>
                        </div>
                    </div>
                </div>

                <InputError className="mt-2" message={form.errors.files}/>
            </div>

            {form.data.type === 'event' && (
                <div className="space-y-6">
                    <div className="flex space-x-4">
                        <div className="w-64">
                            <InputLabel htmlFor="starts_at" value="Starts At"/>

                            <DateTimePicker className="mt-1 block w-full"
                                            format={'dd/MM/yyyy HH:mm'}
                                            value={form.data.starts_at}
                                            name={'starts_at'}
                                            disableClock={true}
                                            onChange={(value) => form.setData('starts_at', value)}/>

                            <InputError className="mt-2" message={form.errors.starts_at}/>
                        </div>
                        <div className="w-64">
                            <InputLabel htmlFor="ends_at" value="Ends At"/>

                            <DateTimePicker className="mt-1 block w-full"
                                            format={'dd/MM/yyyy HH:mm'}
                                            value={form.data.ends_at}
                                            name={'ends_at'}
                                            disableClock={true}
                                            onChange={(value) => form.setData('ends_at', value)}/>

                            <InputError className="mt-2" message={form.errors.ends_at}/>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center">
                                <Checkbox
                                    name="allow_signups"
                                    value={true}
                                    checked={form.data.allow_signups}
                                    onChange={
                                        (e) => form.setData('allow_signups', e.target.checked)
                                    }
                                />
                                <span className="ml-2 text-sm text-gray-600">Allow Signups</span>
                            </label>
                        </div>
                        {form.data.allow_signups && (
                            <div className="w-64">
                                <InputLabel htmlFor="last_signup_at" value="Last signup at"/>

                                <DateTimePicker className="mt-1 block w-full"
                                                format={'dd/MM/yyyy HH:mm'}
                                                value={form.data.last_signup_at}
                                                name={'last_signup_at'}
                                                disableClock={true}
                                                onChange={(value) => form.setData('last_signup_at', value)}/>

                                <InputError className="mt-2" message={form.errors.last_signup_at}/>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
