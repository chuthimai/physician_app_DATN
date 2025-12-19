export const useConvertData = () => {
    function convertAndFillMissingDates(
        obj?: Record<string, number>,
        startDate?: string | undefined,
        endDate?: string | undefined,
    ) {
        if (!obj) return [];
        if (!obj) return [];

        const dates = Object.keys(obj).sort(
            (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );

        const start = startDate ?? dates[0];
        const end = endDate ?? dates[dates.length - 1];

        const result = [];

        const current = new Date(start);
        const last = new Date(end);

        while (current.getTime() <= last.getTime()) {
            const iso = current.toISOString().slice(0, 10);

            result.push({
                date: iso,
                patients: obj[iso] ?? 0
            });

            // tăng ngày
            current.setDate(current.getDate() + 1);
        }

        return result;
    }

    function convertAndSortDataDateNumber(obj?: Record<string, number>) {
        if (!obj) return [];
        return Object.entries(obj).map(([date, patients]) => ({
            date,
            patients
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    function convertDiseaseGroupObjectToArray(obj?: Record<string, number>) {
        if (!obj) return [];
        return Object.entries(obj)
            .filter(([group]) => group !== "Khám sơ bộ")
            .map(([group, count]) => ({
                group,
                count,
            }));
    }

    function convertServiceGroupObjectToArray(obj?: Record<string, number>) {
        if (!obj) return [];
        return Object.entries(obj)
            .map(([service, count]) => ({
                service,
                count,
            }));
    }

    function convertGenderObjectToArray(obj?: Record<string, number>) {
        if (!obj) return [];

        return Object.entries(obj).map(([gender, value]) => ({
            gender,
            value,
        }));
    }

    function convertAgeData(obj?: Record<string, number>) {
        if (!obj) return [];

        return Object.entries(obj).map(([key, count]) => {
            // Key đang có dạng: "Children (0-12)"
            // Lấy phần nằm trong ngoặc
            const match = key.match(/\((.*?)\)/);
            const ageRange = match ? match[1] : key;

            return {
                ageRange,
                count,
            };
        });
    }

    return {
        convertAndFillMissingDates,
        convertDiseaseGroupObjectToArray,
        convertGenderObjectToArray,
        convertAgeData,
        convertAndSortDataDateNumber,
        convertServiceGroupObjectToArray,
    };
};