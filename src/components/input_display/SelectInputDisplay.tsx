import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
} from "@/components/ui/select";

type Option = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    options: Option[];
    value?: Option;
};

export default function SelectInputDisplay({
                                        label,
                                        options,
                                        value,
                                    }: Props) {
    return (
        <div className="">
            <label className="block text-gray-600 mb-1">{label}</label>
            <Select
                value={value?.value}
            >
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
        </div>
    );
}
