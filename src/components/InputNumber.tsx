export default function InputNumber({name, defaultValue, min, max, step = 1, error, ref} ) {
    return (
        <div>
            <input type="number" name={name} defaultValue={defaultValue} min={min} max={max} step={step} ref={ref} />
            <span className="error">{error}</span>
        </div>
    )
}