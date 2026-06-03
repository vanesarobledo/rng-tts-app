import type {RefObject} from "react";

export default function InputNumber({name, label, unit, defaultValue, min, max, step, ref}: {
    name: string,
    label: string,
    unit: string,
    defaultValue: number,
    min: number,
    max: number,
    step: number,
    ref: RefObject<HTMLInputElement | null>,
}) {
    return (
        <div className="max-w-xs mx-auto">
            <label htmlFor={name} className="text-sm text-black">{label}</label>
            <input type="number" name={name} defaultValue={defaultValue} min={min} max={max} step={step} ref={ref}
                className="p-2 m-2 border border-gray-200 rounded text-lg" />
            { unit }
        </div>
    )
}