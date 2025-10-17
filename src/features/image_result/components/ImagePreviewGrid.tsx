import { useState } from "react";
import type ImageStudy from "@/features/image_result/types/ImageStudy.ts";
import PreviewImageDialog from "@/features/add_image/components/PreviewImageDialog.tsx";

interface ImagePreviewGridProps {
    images: ImageStudy[];
}

export default function ImagePreviewGrid({ images }: ImagePreviewGridProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [openPreview, setOpenPreview] = useState(false);

    const handleImageClick = (url: string) => {
        setPreviewUrl(url);
        setOpenPreview(true);
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Ảnh mẫu xét nghiệm
                </label>

                {/* Lưới ảnh 4 cột */}
                <div className="grid grid-cols-4 gap-3">
                    {images.map((img) => (
                        <div key={img.identifier} className="relative">
                            <img
                                src={img.endpoint}
                                alt={`image-${img.identifier}`}
                                onClick={() => handleImageClick(img.endpoint)}
                                className="w-full h-28 object-cover rounded-lg border border-gray-300 cursor-pointer hover:opacity-80 transition"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dialog xem ảnh phóng to */}
            {previewUrl && (
                <PreviewImageDialog
                    open={openPreview}
                    onOpenChange={setOpenPreview}
                    urlImage={previewUrl}
                />
            )}
        </div>
    );
}
