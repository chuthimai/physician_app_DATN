import React, {useContext, useRef, useState} from "react";
import { Plus, X } from "lucide-react";
import PreviewImageDialog from "@/features/add_image/components/PreviewImageDialog.tsx";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import useUploadImage from "../hooks/useUploadImages";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";

type AddImageFormProps = {
    imageReportId?: number,
    setShowAddImageForm: (showAddImageForm: boolean) => void;
}

export default function AddImageForm({imageReportId, setShowAddImageForm}: AddImageFormProps) {
    const [images, setImages] = useState<File[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [openPreview, setOpenPreview] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const patientRecordIdContext = useContext(PatientRecordIdContext);
    const {uploadImages, error, loading} = useUploadImage();

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImages = Array.from(files);
            setImages((prev) => [...prev, ...newImages]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleImageClick = (url: string) => {
        setPreviewUrl(url);
        setOpenPreview(true);
    };

    const onClickSave = async () => {
        if (!imageReportId) return;
        await uploadImages(imageReportId, images);
        if (error) return;
        setImages([]);
        setPreviewUrl(null);
        setOpenPreview(false);
        setShowAddImageForm(false);
        patientRecordIdContext?.setPatientRecordId(undefined);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Ảnh mẫu xét nghiệm</label>
                <div className="grid grid-cols-4 gap-3">
                    {images.map((file, index) => {
                        const url = URL.createObjectURL(file);
                        return (
                            <div key={index} className="relative group">
                                <img
                                    src={url}
                                    alt={`image-${index}`}
                                    onClick={() => handleImageClick(url)}
                                    className="w-full h-28 object-cover rounded-lg border border-gray-300 cursor-pointer group-hover:opacity-80"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        );
                    })}

                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-28 cursor-pointer hover:bg-gray-100 transition"
                         onClick={() => inputRef.current?.click()}
                         onDragOver={(e) => {
                             e.preventDefault();
                             e.currentTarget.classList.add("bg-gray-100");
                         }}
                         onDragLeave={(e) => {
                             e.preventDefault();
                             e.currentTarget.classList.remove("bg-gray-100");
                         }}
                         onDrop={(e) => {
                             e.preventDefault();
                             e.currentTarget.classList.remove("bg-gray-100");

                             const files = e.dataTransfer.files;
                             if (files && files.length > 0) {
                                 const newImages = Array.from(files);
                                 setImages((prev) => [...prev, ...newImages]);
                             }
                         }}
                    >
                        <Plus className="w-6 h-6 text-gray-500" />
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleAddImage}
                            className="hidden"
                            ref={inputRef}
                        />
                    </div>
                </div>

                {/* Hiển thị ảnh phóng to */}
                {previewUrl && (
                    <PreviewImageDialog
                        open={openPreview}
                        onOpenChange={setOpenPreview}
                        urlImage={previewUrl}
                    />
                )}
            </div>

            <div className="flex items-center justify-center pt-1">
                <ButtonSave
                    label={"Lưu"}
                    className={"w-full"}
                    isSubmitting={loading}
                    onClick={onClickSave}
                />
            </div>
        </div>
    );
}
