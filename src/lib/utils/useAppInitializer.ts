import { useEffect, useRef } from "react";
import useMedication from "@/features/diagnosis/hooks/useMedication.ts";
import { BASE_DELAY, MAX_RETRIES } from "@/constants/prescription/call_api_constants.ts";
import log from "loglevel";

export const useAppInitializer = () => {
    const { fetchMedicationsFromApi, error } = useMedication();
    const retryCount = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const run = async () => {
            await fetchMedicationsFromApi();
            if (!error) return;

            // nếu lỗi -> thử lại
            if (retryCount.current < MAX_RETRIES) {
                retryCount.current++;
                const delay = BASE_DELAY * retryCount.current;
                log.warn(`Lấy dữ liệu thuốc thất bại, thử lại sau ${delay / 1000}s`);
                // Hẹn thời gian để gọi lại run()
                timeoutRef.current = setTimeout(run, delay);
            }
        };

        run().then(() => null);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);
};
