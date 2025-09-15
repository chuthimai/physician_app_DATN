import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

export default function SelectInput({
                                        label,
                                        options,
                                        error,
                                        value,
                                        onChange,
                                    }: Props) {
    return (
        <div className="">
            <label className="block text-gray-600 mb-1">{label}</label>
            <Select
                value={value?.value}
                onValueChange={(val) => {
                    const selected = options.find((opt) => opt.value === val) || null;
                    onChange?.(selected);
                }}
            >
                <SelectTrigger
                    className={`w-full ${error ? "border-red-500" : ""}`}
                >
                    <SelectValue placeholder={`Chọn ${label.toLowerCase()}...`} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {error?.message && (
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    );
}
