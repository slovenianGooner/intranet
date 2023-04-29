import {useRef} from "react";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Editor} from "@tinymce/tinymce-react";

export default function Form({form, file_list = [], roles}) {
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
                        height: 200,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | bold italic | bullist numlist outdent indent | removeformat',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onChange={(e) => form.setData('body', e.target.getContent())}
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
