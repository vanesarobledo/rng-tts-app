import {useState, createRef} from 'react'
import {generateList} from './utils/rng.ts'
import InputNumber from "./components/InputNumber.tsx"

function App() {
    const [errors, setFormErrors] = useState('')

    const minimumNumberField = createRef<HTMLInputElement>()
    const maximumNumberField = createRef<HTMLInputElement>()
    const numTimesField = createRef<HTMLInputElement>()
    const delaySecondsField = createRef<HTMLInputElement>()
    const countdownSecondsField = createRef<HTMLInputElement>()

    const [numbers, setNumbers] = useState('');

    function validateNums(minNum: number, maxNum: number): boolean {

        if (minNum > maxNum) {
            setFormErrors('Minimum number must be less than maximum number');
            return false;
        }
        resetFormErrors();
        return true;
    }

    function resetFormErrors() {
        setFormErrors('');
    }

    const start = () => {
        const minimumNumber = Number(minimumNumberField.current?.value)
        const maximumNumber = Number(maximumNumberField.current?.value);
        const numTimes = Number(numTimesField.current?.value);

        if (!validateNums(minimumNumber, maximumNumber)) {
            console.log("Not successful");
            return;
        }

        const randomNumbers = generateList(numTimes, minimumNumber, maximumNumber, true)
        setNumbers(randomNumbers.toString());
    }

    return (
        <form action={start}>
            <header><h1>Text-to-Speech Random Number Generator</h1></header>
            <main>
                <section id="range">
                    Enter a range:
                    <InputNumber name="minimumNumber" label="Minimum:" defaultValue={1} min={1} max={99} step={1}
                                          unit="" ref={minimumNumberField}/>
                    <InputNumber name="maximumNumber" label="Maximum:" defaultValue={5} min={2} max={99} step={1}
                                          unit="" ref={maximumNumberField}/>
                </section>
                <section id="generate">
                    <InputNumber name="numTimes" label="Generate" defaultValue={5} min={1} max={99} step={1}
                                 unit="times" ref={numTimesField}/>
                </section>
                <section id="delay">
                    <InputNumber name="delaySeconds" label="Delay" defaultValue={1.00} min={0.25} max={5.0} step={0.25}
                                 unit="seconds" ref={delaySecondsField}/>
                </section>
                <section id="countdown">
                    <InputNumber name="countdownSeconds" label="Countdown" defaultValue={1.00} min={0.0} max={5.0} step={0.25}
                                 unit="seconds" ref={countdownSecondsField}/>
                </section>
                <section id="startButton">
                    <button className="p-2 m-2 border border-gray-200 bg-neutral-50 rounded text-2xl hover:bg-neutral-500 hover:text-white">Start</button>
                    <p><span className="error">{errors}</span></p>
                </section>
                <section id="numDisplay">
                    {numbers}
                </section>
            </main>
        </form>
    )
}

export default App
