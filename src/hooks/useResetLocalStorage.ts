export const useResetLocalStorage = () => {
    const resetLocalStorage = () => {
        localStorage.clear();
    };

    return { resetLocalStorage };
}