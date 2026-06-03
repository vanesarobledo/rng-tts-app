import { useState, createRef } from 'react'
import { generateList } from './utils/rng.ts'
import InputNumber from "./components/InputNumber.tsx"

interface FormError {
    minNum : string,
    maxNum : string,
    numTimes : string,
    delaySeconds : string,
    countdownSeconds : string
}
function App() {
    const [errors, setFormErrors] = useState<FormError>({
        minNum : '',
        maxNum : '',
        numTimes : '',
        delaySeconds : '',
        countdownSeconds : ''
    })

    const minimumNumberField = createRef<HTMLInputElement>()
    const maximumNumberField = createRef<HTMLInputElement>()
    const numTimesField = createRef<HTMLInputElement>()
    const delaySecondsField = createRef<HTMLInputElement>()
    const countdownSecondsField = createRef<HTMLInputElement>()

    const [numbers, setNumbers] = useState('');

    function validateNums(minNum: number, maxNum: number): boolean {
        const newError = {
            minNum : '',
            maxNum : '',
            numTimes : '',
            delaySeconds : '',
            countdownSeconds : ''
        }

        if (minNum > maxNum) {
            newError.minNum = 'Minimum number must be less than maximum number';
            setFormErrors(newError);
            return false;
        }
        resetFormErrors();
        return true;
    }

    function resetFormErrors() {
        setFormErrors( {
            minNum : '',
            maxNum : '',
            numTimes : '',
            delaySeconds : '',
            countdownSeconds : ''
        });
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
                    Minimum: <InputNumber name="minimumNumber" defaultValue={1} min={1} max={99} step={1}
                                          error={errors.minNum}
                                          ref={minimumNumberField}/>
                    Maximum: <InputNumber name="maximumNumber" defaultValue={5} min={2} max={99} step={1}
                                          error={errors.maxNum}
                                          ref={maximumNumberField}/>
                </section>
                <section id="generate">
                    Generate
                    <InputNumber name="numTimes" defaultValue={5} min={1} max={99} step={1}
                                 error={errors.numTimes}
                                 ref={numTimesField}/> times
                </section>
                <section id="delay">
                    Delay
                    <InputNumber name="delaySeconds" defaultValue={1.00} min={0.25} max={5.0} step={0.25}
                                 error={errors.delaySeconds} ref={delaySecondsField}/> seconds
                </section>
                <section id="countdown">
                    Countdown
                    <InputNumber name="countdownSeconds" defaultValue={1.00} min={0.0} max={5.0} step={0.25}
                                 error={errors.countdownSeconds} ref={countdownSecondsField}/> seconds
                </section>
                <section id="startButton">
                    <button className="border border-gray-500 p-2">Start</button>
                </section>
                <section id="numDisplay">
                    { numbers }
                </section>
            </main>
        </form>
    )
}

export default App
