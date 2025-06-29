
import { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, X, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function FileUpload({ value, onChange }) {
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (value && typeof value === 'string') {
            setPreview(value);
        }
    }, [value]);

    const handleFileChange = (files) => {
        if (files && files.length > 0) {
            const file = files[0];
            console.log("Uploaded file details:", file);
            setPreview(URL.createObjectURL(file));
            onChange(files);
        }
    };

    const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const onDragLeave = () => setIsDragging(false);
    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files);
    };


    const removeImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPreview(null);
        onChange(null); // react-hook-form-এর স্টেট null করা হচ্ছে
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div
            className={`w-full h-56 border-2 border-dashed rounded-lg flex items-center justify-center text-center p-4 transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'bg-muted/40 hover:border-primary'}`}
            onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <Input ref={fileInputRef} type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e.target.files)} />
            {preview ? (
                <div className="relative w-full h-full">
                    <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain rounded-md mx-auto" />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 z-10" onClick={removeImage}><X className="h-4 w-4" /></Button>
                </div>
            ) : (
                <div className="text-muted-foreground cursor-pointer">
                    <UploadCloud className="mx-auto h-12 w-12" />
                    <p>Click or drag & drop file</p>
                </div>
            )}
        </div>
    );
}

export default FileUpload;