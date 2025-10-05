"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export type Option = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    options: Option[];
    error?: { message?: string }; // tương thích FieldError
    value?: Option;
    onChange?: (value: Option | null) => void;
};

export default function SelectSearchInput({
                                              label,
                                              options,
                                              error,
                                              value,
                                              onChange,
                                          }: Props) {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (val: string) => {
        const selected = options.find((opt) => opt.value === val) || null;
        onChange?.(selected);
        setOpen(false);
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-600 mb-1">{label}</label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between opacity-50",
                            error && "border-red-500"
                        )}
                    >
                        {value?.label || `Chọn ${label.toLowerCase()}...`}
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0 w-[var(--radix-popover-trigger-width)]"
                    align="start"
                >
                    <Command
                        filter={(value, search) => {
                            // Lấy label của option tương ứng
                            const opt = options.find((o) => o.value === value);
                            if (!opt) return 0;

                            // Chuyển về lowercase để tìm kiếm không phân biệt hoa thường
                            return opt.label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
                        }}
                    >
                        <CommandInput placeholder="Tìm kiếm..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>Không tìm thấy.</CommandEmpty>
                            <CommandGroup>
                                {options.map((opt) => (
                                    <CommandItem
                                        key={opt.value}
                                        value={opt.value}
                                        onSelect={handleSelect}
                                    >
                                        {opt.label}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value?.value === opt.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {error?.message && (
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    );
}
