import type {FieldError} from "react-hook-form";

type Option = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    options: Option[];
    error?: FieldError;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectInput({ label, options, error, ...rest }: Props) {
    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <select
                {...rest}
                className={`w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 ${error ? 'border-red-500' : ''}`}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
