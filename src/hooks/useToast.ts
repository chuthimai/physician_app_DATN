import {toast} from "react-toastify";

export function useToast() {
    const showToastError = (message: string) => {
        toast.dismiss();  // đóng tất cả toast cũ
        toast.error(message);
    }

    const showToastSuccess = (message: string) => {
        toast.dismiss();
        toast.success(message);
    }

    const showToastInfo = (message: string) => {
        toast.dismiss();
        toast.info(message);
    }

    const showToastWarning = (message: string) => {
        toast.dismiss();
        toast.warning(message);
    }

    const showToastLoading = (message: string) => {
        toast.dismiss();
        toast.loading(message);
    }

    return {
        showToastError,
        showToastSuccess,
        showToastInfo,
        showToastWarning,
        showToastLoading,
    }
}