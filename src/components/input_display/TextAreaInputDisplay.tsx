import type {TextareaHTMLAttributes} from "react";

interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    defaultValue?: string;
}

export function TextAreaInputDisplay({ label, defaultValue }: TextAreaInputProps) {
    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <div
                className={`text-sm w-full h-20 border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400`}
            >
                {defaultValue ?? "Không có thông tin"}
            </div>
        </div>
    );
}
