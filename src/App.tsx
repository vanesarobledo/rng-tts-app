import {useState, createRef} from 'react'
import { generateList } from './utils/rng.ts'
import InputNumber from "./components/InputNumber.tsx"

function App() {
    const [errors, setFormErrors] = useState({})

    const minimumNumberField = createRef<HTMLInputElement>()
    const maximumNumberField = createRef<HTMLInputElement>()
    const numTimesField = createRef<HTMLInputElement>()
    const delaySecondsField = createRef<HTMLInputElement>()
    const countdownSecondsField = createRef<HTMLInputElement>()

    const numDisplay = createRef<HtmlElement>()

    function validateNums(minNum : number, maxNum : number) : boolean {
        if (minNum > maxNum) {
            setFormErrors({
                minNum: 'Minimum number should be less than maximum number.'
            })
            return false;
        }
        return true;
    }

    const start = () => {
        const minimumNumber = Number(minimumNumberField.current?.value)
        const maximumNumber = Number(maximumNumberField.current?.value);
        const numTimes = Number(numTimesField.current?.value);

        if(!validateNums(minimumNumber, maximumNumber)) {
            console.log("Not successful");
            return;
        }

        console.log(generateList(numTimes, minimumNumber, maximumNumber, false));

    }

    return (
        <div>
            <form action={ start }>
                <header><h1>Text-to-Speech Random Number Generator</h1></header>
                <main>
                    <section id="range">
                        Enter a range:
                        Minimum: <InputNumber name="minimumNumber" defaultValue="1" min="1" max="99"
                                              error={errors.minNum}
                                              ref={minimumNumberField}/>
                        Maximum: <InputNumber name="maximumNumber" defaultValue="5" min="2" max="99"
                                              error={errors.maxNum}
                                              ref={maximumNumberField}/>
                    </section>
                    <section id="generate">
                        Generate
                        <InputNumber name="numTimes" defaultValue="5" min="1" max="99" error={errors.numTimes}
                                     ref={numTimesField}/> times
                    </section>
                    <section id="delay">
                        Delay
                        <InputNumber name="delaySeconds" defaultValue="1.00" min="0.50" max="5.0" step={0.25}
                                     error={errors.delaySeconds} ref={delaySecondsField}/> seconds
                    </section>
                    <section id="countdown">
                        Countdown
                        <InputNumber name="countdownSeconds" defaultValue="3.00" min="0.50" max="5.0" step={0.25}
                                     error={errors.countdownSeconds} ref={countdownSecondsField}/> seconds
                    </section>
                    <section id="startButton">
                        <button>Start</button>
                    </section>
                    <section id="numDisplay" ref={numDisplay}>

                    </section>
                </main>
            </form>
        </div>
    )
}

export default App
