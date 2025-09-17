export default function useNumber() {
    function toTwelveDigitString(num: number): string {
        return String(num).padStart(12, "0");
    }

    return { toTwelveDigitString }
}