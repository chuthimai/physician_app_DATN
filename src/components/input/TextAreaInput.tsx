import {type TextareaHTMLAttributes, useState} from "react";
import type {FieldError} from "react-hook-form";

interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: FieldError;
    disabled?: boolean;
    defaultValue?: string;
    suggestions?: string[]
}

export function TextAreaInput({
                                  label,
                                  error,
                                  disabled = false,
                                  defaultValue,
                                  suggestions = [],
                                  ...props
                              }: TextAreaInputProps) {
    const [filtered, setFiltered] = useState<string[]>([]);
    const [text, setText] = useState(defaultValue ?? "");
    const [highlightIndex, setHighlightIndex] = useState(-1);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (filtered.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex(prev =>
                prev < filtered.length - 1 ? prev + 1 : 0
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex(prev =>
                prev > 0 ? prev - 1 : filtered.length - 1
            );
        }

        if (e.key === "Enter") {
            if (highlightIndex >= 0) {
                e.preventDefault();
                chooseSuggestion(filtered[highlightIndex]);
            }
        }

        if (e.key === "Escape") {
            setFiltered([]);
            setHighlightIndex(-1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange?.(e);

        const v = e.target.value;
        setText(v);

        const lastWord = v.split(/\s+/).pop()?.toLowerCase() ?? "";

        if (lastWord.length > 0) {
            setFiltered(
                suggestions.filter(s =>
                    s.toLowerCase().includes(lastWord)
                )
            );
        } else {
            setFiltered([]);
        }
    };

    const chooseSuggestion = (s: string) => {
        const parts = text.split(/\s+/);
        parts.pop();
        const newText = [...parts, s].join(" ");

        setText(newText);
        setFiltered([]);

        if (props.onChange) {
            const event = {
                target: { value: newText }
            } as React.ChangeEvent<HTMLTextAreaElement>;

            props.onChange(event);
        }

    };

    return (
        <div className="relative">
            <label className="block text-gray-600 mb-1">{label}</label>

            <textarea
                {...props}
                disabled={disabled}
                className={`text-sm w-full h-20 border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-dark-400 ${
                    error ? "border-red-500" : ""
                }`}
                value={text}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />

            {filtered.length > 0 && (
                <ul className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-md shadow z-20 max-h-40 overflow-auto">
                    {filtered.map((item, index) => (
                        <li
                            key={item}
                            onClick={() => chooseSuggestion(item)}
                            className={`px-3 py-2 cursor-pointer ${
                                index === highlightIndex
                                    ? "bg-gray-200"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
