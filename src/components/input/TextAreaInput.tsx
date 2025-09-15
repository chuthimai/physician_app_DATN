import type {TextareaHTMLAttributes} from "react";
import type {FieldError} from "react-hook-form";

interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: FieldError;
}

export function TextAreaInput({ label, error, ...props }: TextAreaInputProps) {
    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <textarea
                className={`text-sm w-full h-20 border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 ${error ? "border-red-500" : ""}`}
                {...props}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
