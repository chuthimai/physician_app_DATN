import type { FieldError } from "react-hook-form";

type Props = {
    label: string;
    error?: FieldError;
    min?: string | number; // YYYY-MM-DD
    max?: string | number; // YYYY-MM-DD
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function DateInput({label, error, min, max, ...rest}: Props) {
    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <input
                type="date"
                min={min}
                max={max}
                {...rest}
                className={`w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 ${
                    error ? "border-red-500" : ""
                }`}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
