import type {InputHTMLAttributes} from "react";
import type {FieldError} from "react-hook-form";

type Props = {
    type: string;
    label: string;
    error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({ type="string", label, error, ...rest }: Props) {
    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <input
                type={type}
                {...rest}
                className={`text-sm w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
