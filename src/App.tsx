import {useEffect, useState} from 'react'
import {generateList} from './utils/rng.ts'
import InputNumber from "./components/InputNumber.tsx"
import {useSpeech} from "react-text-to-speech";

const SpeakNum =
    ({num, onDone, delay}:
     { num: number, onDone: () => void, delay: number }) => {
        const text: string = num.toString();
        const {Text, start, stop} = useSpeech({
            text,
            preserveUtteranceQueue: true,
            onStop: async (): Promise<void> => {
                await customTimeout(delay);
                onDone();
            }
        });

        useEffect((): () => void => {
            let isMounted: boolean = true;

            const timer: number = setTimeout((): void => {
                if (isMounted) {
                    start();
                }
            }, 50);

            return (): void => {
                isMounted = false;
                clearTimeout(timer);
                stop();
            }
        }, []);

        return (
            <div>
                <Text/>
            </div>
        );
    }

function customTimeout(seconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000)
    });
}

function App() {
    const maxNumber = 100000;
    const maxNumTimes = 50;

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

    const [numbers, setNumbers] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

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

    const startTTS = () => {
        const minimumNumber = Number(form.minimumNumber);
        const maximumNumber = Number(form.maximumNumber);
        const numTimes = Number(form.numTimes);

        if (!validateNums(minimumNumber, maximumNumber)) {
            return;
        }

        const randomNumbers: number[] = generateList(numTimes, minimumNumber, maximumNumber, true);
        setNumbers(randomNumbers);
        console.log(randomNumbers);
        setCurrentIndex(0);
    };

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
                                <InputNumber name="minimumNumber" label="Minimum:" defaultValue={1} min={1}
                                             max={maxNumber}
                                             step={1} unit=""
                                             onChange={(e) =>
                                                 updateField('minimumNumber', Number(e.target.value))}/>
                                <InputNumber name="maximumNumber" label="Maximum:" defaultValue={5} min={2}
                                             max={maxNumber}
                                             step={1} unit=""
                                             onChange={(e) =>
                                                 updateField('maximumNumber', Number(e.target.value))}/>

                            </div>
                        </section>
                        <section id="generate">
                            <InputNumber name="numTimes" label="Generate" defaultValue={5} min={1} max={maxNumTimes}
                                         step={1}
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
                        <div className="m-auto text-6xl">
                            {currentIndex !== null && numbers[currentIndex] !== undefined &&
                                (
                                    <SpeakNum
                                        num={numbers[currentIndex]}
                                        onDone={(): void => {
                                            setCurrentIndex(prev => {
                                                if (prev == null || prev + 1 >= numbers.length) return null;
                                                return prev + 1;
                                            });
                                        }}
                                        delay={Number(form.delaySeconds)}
                                        key={currentIndex}
                                    />
                                )}
                        </div>
                    </section>
                </main>
            </form>
        </>
    )
}

export default App
