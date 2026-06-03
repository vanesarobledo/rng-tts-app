import type {RefObject} from "react";

export default function InputNumber({name, defaultValue, min, max, step, ref} : {
    name: string,
    defaultValue: number,
    min: number,
    max: number,
    step: number,
    ref: RefObject<HTMLInputElement | null>,
} ) {
    return (
        <div>
            <input type="number" name={name} defaultValue={defaultValue} min={min} max={max} step={step} ref={ref} />
        </div>
    )
}