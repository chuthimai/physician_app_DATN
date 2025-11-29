export default function useNumber() {
    function toTwelveDigitString(num: number): string {
        return String(num).padStart(12, "0");
    }

    function toFiveDigitString(num: number): string {
        return String(num).padStart(5, "0");
    }

    return {
        toTwelveDigitString,
        toFiveDigitString,
    }
}