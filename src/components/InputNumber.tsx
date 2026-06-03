import type {RefObject} from "react";

export default function InputNumber({name, defaultValue, min, max, step, error, ref} : {
    name: string,
    defaultValue: number,
    min: number,
    max: number,
    step: number,
    error: string,
    ref: RefObject<HTMLInputElement | null>,
} ) {
    return (
        <div>
            <input type="number" name={name} defaultValue={defaultValue} min={min} max={max} step={step} ref={ref} />
            <span className="error">{error}</span>
        </div>
    )
}