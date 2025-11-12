import type {InputHTMLAttributes} from "react";
import type {FieldError} from "react-hook-form";

type Props = {
    type: string;
    label: string;
    error?: FieldError;
    disabled?: boolean;
    defaultValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({ type="string", label, error, disabled, defaultValue, ...rest }: Props) {
    if (type === "number") {
        return <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <input
                type="number" step="0.01"
                {...rest}
                className={`text-sm w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 ${error ? 'border-red-500' : ''} ${disabled ? 'bg-gray-200 disabled:opacity-50' : ''}`}
                defaultValue={defaultValue}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    }

    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <input
                type={type}
                {...rest}
                className={`text-sm w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 ${error ? 'border-red-500' : ''}`}
                defaultValue={defaultValue}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
