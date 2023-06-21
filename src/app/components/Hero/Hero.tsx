"use client";
import TextareaAutosize from 'react-textarea-autosize';
import styles from './Hero.module.css'
import { useState, useEffect, useRef } from 'react';
import { Input, Itinerary } from '@/app/interfaces/responses';
import { SolverSolution } from '@/app/interfaces/solverSolution.model';

type HeroProps = {
    setSolutions: (data: SolverSolution[]) => void;
}


export default function Hero(props: HeroProps) {

    const [value, setValue] = useState("")
    const [answeringTo, setAnsweringTo] = useState("")
    const [text, setText] = useState(`¿A dónde sueñas
    ir hoy?`)
    const [data, setData] = useState<Input>()
    const [isVisible, setIsVisible] = useState("none")
    const [isDefaultVisible, setIsDefaultVisible] = useState("block")
    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState("none")
    const [firstPrompt, setFirstPrompt] = useState("")

    const hasValidInput = (input: Input | undefined): boolean => {
        const {
            adults,
            origin,
            destination,
            duration,
            startDate,
            endDate,
            maxPrice,
        } = input ?? {}

        return !!(
            adults !== undefined &&
            adults !== -1 &&
            origin &&
            destination &&
            duration &&
            duration <= 10 &&
            startDate &&
            endDate &&
            maxPrice
        )
    }

    useEffect(() => {
        if (isErrorMessageVisible === "block")
            setTimeout(() => {
                setIsVisible("none")
                setIsDefaultVisible("block")
                setIsErrorMessageVisible("none")
                setText("Cambia algunos datos e intenta de nuevo")
                setAnsweringTo("")
                setValue(firstPrompt)
                setData(undefined)
            }, 10000)
    }, [firstPrompt, isDefaultVisible, isErrorMessageVisible])

    useEffect(() => {
        const searchQnA = async () => {
            if (value !== "") {
                setIsDefaultVisible("block")
                setIsVisible("none")
                if (data?.adults === -1 || data?.adults === undefined) {
                    setText("Necesito más información sobre las personas que viajan. \n¿Cuántos adultos, niños e infantes son?")
                    setAnsweringTo("people")
                    setIsVisible("block")
                    setIsDefaultVisible("none")
                    setIsErrorMessageVisible("none")
                } else if (!data?.origin) {
                    setText("¿Desde qué aeropuerto deseas viajar?")
                    setAnsweringTo("origin")
                } else if (!data?.endDate || !data?.startDate) {
                    setText("¿En qué rango de fechas deseas hacer la búsqueda?")
                    setAnsweringTo("dates")
                } else if (!data?.duration) {
                    setText("¿Por cuántos días te quedarás?")
                    setAnsweringTo("duration")
                } else if (data?.duration > 10) {
                    setText("¿Por cuántos días viajarás?")
                    setAnsweringTo("duration")
                } else if (!data?.maxPrice) {
                    console.log("maxPrice");
                    setText("¿Cuál es tu presupuesto total para el viaje?")
                    setAnsweringTo("maxPrice")
                }
            }
            setValue("")

            if (hasValidInput(data)) {
                setText("Espera mientras encontramos tu viaje al mejor precio");
                console.log(data);
                // const res = await fetch("http://127.0.0.1:5000/mzn", {
                const res = await fetch("https://spectragpt.fun/mzn", {
                    method: "POST",
                    body: JSON.stringify(data)
                });
                let obj;
                obj = await res.json();
                console.log(obj);
                if (Array.isArray(obj)) {
                    // Check if the response is an array (Itinerary[])
                    props.setSolutions(obj);
                } else {
                    setIsVisible("none")
                    setIsDefaultVisible("none")
                    setIsErrorMessageVisible("block")
                }
            }

        }
        searchQnA()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const getCompletion = async () => {

        let url = ""
        let partialData: Input = {} as Input
        switch (answeringTo) {
            case "people":
                url = `people/"${value}"`
                break;
            case "origin":
                url = `origin/"${value}"`
                break;
            case "duration":
                let temp = value
                if (!isNaN(parseInt(temp))) temp += ' dias'
                url = `duration/"${temp}"`
                break;
            case "dates":
                url = `dates/"${value}"`
                break;
            case "maxPrice":
                url = `budget/"${value}"`
                break;
            default:
                url = `ner/"${value}"`
                setFirstPrompt(value)
                break;
        }
        // const res = await fetch(`http://127.0.0.1:5000/${url}`) //dev
        const res = await fetch(`https://spectragpt.fun/${url}`) //production
        partialData = await res.json()
        let mergedData = { ...data, ...partialData }
        setData(mergedData)
    }


    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <div style={{ display: isDefaultVisible }}>
                    {text}
                </div>
                <div style={{ display: isVisible }} className={styles.additionalInfo}>
                    Necesito más información sobre las personas que viajan <br />
                    ¿Cuántos <dfn className={styles.peopleHover} title='Personas mayores a 12 años'> adultos
                    </dfn>, <dfn className={styles.peopleHover} title='Personas entre 2-12 años'>niños
                    </dfn> e <dfn className={styles.peopleHover} title='Personas entre 0-1 años'>infantes</dfn> viajan?
                </div>
                <div className={styles.error} style={{ display: isErrorMessageVisible }}>
                    Parece que no hay viajes disponobles con tus parametros,
                    te retornaré a tu primera búsqueda para que puedas cambiar
                    algún dato como el presupuesto o los servicios del hospedaje
                </div>
            </div>
            <div className={styles.search}>
                <TextareaAutosize
                    className={styles.input}
                    onChange={ev => setValue(ev.target.value)}
                    onSubmit={() => getCompletion()}
                    placeholder={"Deseo ir a Pasto con mi familia..."}
                    value={value}
                />
                {/* <>{JSON.stringify(data)}</> */}
                <button className={styles.button} onClick={() => getCompletion()}>Búsqueda</button>
            </div>
        </div >
    );
}