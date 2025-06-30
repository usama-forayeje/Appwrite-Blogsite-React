import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Label } from '../ui/label';
import config from '../../config/config';

function RTE({
    label,
    value,
    onChange,
}) {
    return (
        <div className="w-full">
            {label && (
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                    {label}
                </Label>
            )}
            <Editor
                apiKey={config.tinyMCEApiKey}
                value={value}
                onEditorChange={onChange}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount',
                        'codesample', 'emoticons', 'directionality'
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | image media link anchor codesample | table | help',
                    skin: 'oxide',
                    content_css: 'default',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #ffffff !important; }',
                }}
            />
        </div>
    );
}

export default RTE
