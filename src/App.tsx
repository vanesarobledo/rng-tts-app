import {useState} from 'react'
import {generateList} from './utils/rng.ts'
import InputNumber from "./components/InputNumber.tsx"
import {useQueue, useSpeak} from "react-text-to-speech";

function App() {
    const {
        speak,
        Text,
        speechStatus,
        isInQueue,
        start,
        pause,
        stop,
    } = useSpeak();

    const {
        queue,
        clearQueue,
        dequeue
    } = useQueue();

    const [errors, setFormErrors] = useState('')

    type FormState = {
        minimumNumber: number;
        maximumNumber: number;
        numTimes: number;
        delaySeconds: number;
        countdownSeconds: number;
    };

    const [form, setForm] = useState<FormState>({
        minimumNumber: 1,
        maximumNumber: 5,
        numTimes: 5,
        delaySeconds: 1,
        countdownSeconds: 1,
    });

    function updateField<K extends keyof FormState>(
        field: K,
        value: FormState[K]
    ) {
        setForm(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    const [numbers, setNumbers] = useState(Array<number>);
    const [currentNumber, setCurrentNumber] = useState(0);

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

    const startTTS = async () => {
        const minimumNumber = Number(form.minimumNumber)
        const maximumNumber = Number(form.maximumNumber);
        const numTimes = Number(form.numTimes);

        if (!validateNums(minimumNumber, maximumNumber)) {
            return;
        }

        const randomNumbers: number[] = generateList(numTimes, minimumNumber, maximumNumber, true)
        setNumbers(randomNumbers);
        await displayNumbers(randomNumbers);
    };

    async function displayNumbers(nums: Array<number>): Promise<void> {
        for (const num of nums) {
            speak(num);
            setCurrentNumber(num);
            await customTimeout(form.delaySeconds);
        }
    }

    function customTimeout(seconds: number): Promise<boolean> {
        return new Promise(resolve => {
            setTimeout(function (): void {
                resolve(true);
            }, seconds * 1000)
        })
    }


    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    startTTS();
                }
                }>
                <header><h1 className="text-5xl mb-6">Text-to-Speech Random Number Generator</h1></header>
                <main className="grid grid-cols-2 text-left">
                    <section>
                        <section id="range">
                            Enter a range:
                            <div className="flex">
                                <InputNumber name="minimumNumber" label="Minimum:" defaultValue={1} min={1} max={99}
                                             step={1} unit=""
                                             onChange={(e) =>
                                                 updateField('minimumNumber', Number(e.target.value))}/>
                                <InputNumber name="maximumNumber" label="Maximum:" defaultValue={5} min={2} max={99}
                                             step={1} unit=""
                                             onChange={(e) =>
                                                 updateField('maximumNumber', Number(e.target.value))}/>

                            </div>
                        </section>
                        <section id="generate">
                            <InputNumber name="numTimes" label="Generate" defaultValue={5} min={1} max={99} step={1}
                                         unit="times"
                                         onChange={(e) =>
                                             updateField('numTimes', Number(e.target.value))}/>
                        </section>
                        <section id="delay">
                            <InputNumber name="delaySeconds" label="Delay" defaultValue={1.00} min={0.25} max={5.0}
                                         step={0.25} unit="seconds"
                                         onChange={(e) =>
                                             updateField('delaySeconds', Number(e.target.value))}/>
                        </section>
                        <section id="countdown">
                            <InputNumber name="countdownSeconds" label="Countdown" defaultValue={1.00} min={0.0}
                                         max={5.0}
                                         step={0.25} unit="seconds"
                                         onChange={(e) =>
                                             updateField('countdownSeconds', Number(e.target.value))}/>
                        </section>
                        <section id="startButton">
                            <button
                                className="p-2 m-2 border border-gray-200 bg-neutral-50 rounded text-2xl hover:bg-neutral-500 hover:text-white"
                                type="submit">
                                Start
                            </button>
                            <p><span className="text-red-400">{errors}</span></p>
                        </section>
                    </section>
                    <section id="numDisplay" className="border border-neutral-100 flex content-center">
                        <div className="m-auto text-6xl ">{currentNumber}</div>
                    </section>
                </main>
            </form>
        </>
    )
}

export default App
