export default function useDate() {
    const formattedDateOfBirth = (dob: string) => {
        const day = dob.slice(0, 2);
        const month = dob.slice(2, 4);
        const year = dob.slice(4, 8);
        return `${year}-${month}-${day}`;
    }

    return {
        formattedDateOfBirth
    }
}