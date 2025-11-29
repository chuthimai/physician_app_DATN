import {useToast} from "@/lib/utils/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useMediaApi} from "@/lib/api/useMediaApi.ts";

export default function useUploadImage() {
    const {request, loading, error} = useMediaApi();
    const {showToastError, showToastSuccess} = useToast();

    const uploadImages = async (serviceReportId: number, images: File[]) => {
        try {
            const formData = new FormData();
            formData.append("imagingReportIdentifier", serviceReportId.toString());
            images.forEach(file => formData.append("images", file));
            await request("post", `${ENDPOINTS.UPLOAD_IMAGES}`, formData);
            showToastSuccess("Lưu ảnh thành công");
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`updatePerformer: ${e.message}`);
            showToastError("Có lỗi xảy ra");
        }

    }

    return {
        uploadImages,
        loading,
        error
    }
}