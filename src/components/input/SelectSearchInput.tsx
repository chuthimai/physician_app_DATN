import Select from "react-select";
import type { FieldError } from "react-hook-form";

type Option = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    options: Option[];
    error?: FieldError;
    value?: Option;
    onChange?: (value: Option | null) => void;
};

export default function SelectSearchInput({ label, options, error, value, onChange }: Props) {
    return (
        <div className="mb-4">
            <label className="block text-gray-600 mb-1">{label}</label>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                classNamePrefix="react-select"
                className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
        </div>
    );
}
