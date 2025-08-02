import type {FieldError} from "react-hook-form";

interface FileInputProps {
    label: string;
    error?: FieldError;
    [key: string]: any;
}

export function FileInput({ label, error, ...props }: FileInputProps) {
    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <input
                type="file"
                accept="image/*"
                className={`w-full border px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-dark-400 ${error ? "border-red-500" : ""}`}
                {...props}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
