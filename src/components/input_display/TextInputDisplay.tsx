import type {InputHTMLAttributes} from "react";

type Props = {
    type: string;
    label: string;
    defaultValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextInputDisplay({ type="string", label, defaultValue, ...rest }: Props) {
    if (type === "number") {
        return <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <input
                type="number" step="0.01"
                {...rest}
                className={`text-sm w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400`}
                defaultValue={defaultValue}
            />
        </div>
    }

    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            <input
                type={type}
                {...rest}
                className={`text-sm w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400`}
                defaultValue={defaultValue}
            />
        </div>
    );
}
