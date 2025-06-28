import { useMutation } from "@tanstack/react-query";
import fileService from "../api/appwrite/file";


export const useUploadFile = () => {
    return useMutation({
        mutationFn: (file) => fileService.uploadFile(file),
    });
};

export const useDeleteFile = () => {
    return useMutation({
        mutationFn: (fileId) => fileService.deleteFile(fileId),
    });
};

export const useGetFilePreview = () => {
    return useMutation({
        mutationFn: (fileId) => fileService.getFilePreview(fileId),
    });
};