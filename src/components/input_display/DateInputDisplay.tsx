import { format } from "date-fns"
import { vi } from "date-fns/locale"

type Props = {
    label: string
    value?: string // YYYY-MM-DD
}

export default function DateInputDisplay({
                                      label,
                                      value,
                                  }: Props) {
    const dateValue = value ? new Date(value) : undefined

    return (
        <div className="flex flex-col">
            <label className="block text-gray-600 mb-1">{label}</label>
            <div>{dateValue ? format(dateValue, "dd/MM/yyyy", {locale: vi}) : "Không có giá trị"}</div>
        </div>
    )
}