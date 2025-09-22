export default function useDate() {
    const formattedDateOfBirth = (dob: string) => {
        const day = dob.slice(0, 2);
        const month = dob.slice(2, 4);
        const year = dob.slice(4, 8);
        return `${year}-${month}-${day}`;
    }

    function formatLocalDate(d: Date) {
        return [
            d.getFullYear(),
            String(d.getMonth() + 1).padStart(2, "0"),
            String(d.getDate()).padStart(2, "0"),
        ].join("-") // YYYY-MM-DD
    }

    function parseLocalDate(iso: string) {
        const [year, month, day] = iso.split("-").map(Number)
        return new Date(year, month - 1, day) // constructor local
    }

    function compactDateOfBirth(iso: string) {
        const [year, month, day] = iso.split("-");
        return `${day}${month}${year}`;
    }


    return {
        formattedDateOfBirth,
        formatLocalDate,
        parseLocalDate,
        compactDateOfBirth,
    }
}