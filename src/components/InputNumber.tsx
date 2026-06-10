import type {ChangeEventHandler} from "react";

export default function InputNumber({name, label, unit, defaultValue, min, max, step, onChange}: {
    name: string,
    label: string,
    unit: string,
    defaultValue: number,
    min: number,
    max: number,
    step: number,
    onChange: ChangeEventHandler<HTMLInputElement>
}) {
    return (
        <div className="">
            <label htmlFor={name} className="text-sm text-neutral-800">{label}</label>
            <input type="number" name={name} defaultValue={defaultValue} min={min} max={max} step={step}
                   onChange={ onChange }
                className="p-2 m-2 border border-gray-200 rounded text-lg" />
            <span className="text-sm text-neutral-600">{ unit }</span>
        </div>
    )
}