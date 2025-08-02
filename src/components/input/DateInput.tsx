import type {FieldError} from "react-hook-form";

type Props = {
    label: string;
    error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function DateInput({ label, error, ...rest }: Props) {
    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <input
                type="date"
                {...rest}
                className={`w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
