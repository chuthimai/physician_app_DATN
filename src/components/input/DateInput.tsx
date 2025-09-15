import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import type { FieldError } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import useDate from "@/hooks/useDate.ts";


type DateAfter = {
    after: Date;
};
export type DateBefore = {
    before: Date;
};
type Matcher = boolean | ((date: Date) => boolean) | DateBefore | DateAfter;

type Props = {
    label: string
    error?: FieldError
    value?: string // YYYY-MM-DD
    onChange?: (value: string) => void
    min?: string // YYYY-MM-DD
    max?: string // YYYY-MM-DD
}

export default function DateInput({
                                      label,
                                      error,
                                      value,
                                      onChange,
                                      min,
                                      max,
                                  }: Props) {
    const { formatLocalDate } = useDate();
    const [open, setOpen] = React.useState(false)
    const dateValue = value ? new Date(value) : undefined

    const disabled: Matcher[] = []
    if (min) disabled.push({ before: new Date(min) })
    if (max) disabled.push({ after: new Date(max) })

    return (
        <div className="flex flex-col">
            <label className="block text-gray-600 mb-1">{label}</label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "justify-between font-normal",
                            error && "border-red-500"
                        )}
                    >
                        {dateValue
                            ? format(dateValue, "dd/MM/yyyy", { locale: vi })
                            : "Chọn ngày"}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        classNames={{
                            day: "h-9 w-9 text-center rounded-md hover:bg-accent hover:text-accent-foreground"
                        }}
                        mode="single"
                        selected={dateValue}
                        onSelect={(d) => {
                            if (!d) return
                            const iso = formatLocalDate(d) // giữ đúng local
                            onChange?.(iso)
                            setOpen(false)
                        }}
                        disabled={disabled}
                        locale={vi}
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>
            {error?.message && (
                <p className="text-sm text-red-500">{error.message}</p>
            )}
        </div>
    )
}