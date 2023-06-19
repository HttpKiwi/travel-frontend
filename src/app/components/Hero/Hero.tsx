"use client";
import TextareaAutosize from 'react-textarea-autosize';
import styles from './Hero.module.css'
import { useState, useEffect, useRef } from 'react';
import { Input, Itinerary } from '@/app/interfaces/responses';

type HeroProps = {
    setItineraries: (data: Itinerary[]) => void;
}


export default function Hero(props: HeroProps) {

    const [value, setValue] = useState("")
    const [answeringTo, setAnsweringTo] = useState("")
    const [text, setText] = useState(`¿A dónde sueñas
    ir hoy?`)
    const [data, setData] = useState<Input>()
    const [isVisible, setIsVisible] = useState("none")
    const [isDefaultVisible, setIsDefaultVisible] = useState("block")

    const hasValidInput = (input: Input | undefined): boolean => {
        const {
            adults,
            origin,
            destination,
            duration,
            startDate,
            endDate,
        } = input ?? {}

        return !!(
            adults !== undefined &&
            adults !== -1 &&
            origin &&
            destination &&
            duration &&
            duration <= 10 &&
            startDate &&
            endDate
        )
    }

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
                }
            }
            setValue("")

            if (hasValidInput(data)) {
                setText("Espera mientras encontramos tu viaje al mejor precio")
                console.log("holi, esto es fake");
                console.log(data);
                // const res = await fetch(`http://127.0.0.1:5000/mzn`, { //dev
                const res = await fetch(`https://spectragpt.fun/mzn`, {
                    method: "POST",
                    body: JSON.stringify(data)
                }) //production
                let obj: Itinerary[]
                obj = await res.json()
                props.setItineraries(obj)
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
                console.log("people");
                break;
            case "origin":
                url = `origin/"${value}"`
                console.log("origin");
                break;
            case "duration":
                let temp = value
                if (!isNaN(parseInt(temp))) temp += ' dias'
                url = `duration/"${temp}"`
                console.log("duration");
                break;
            case "dates":
                url = `dates/"${value}"`
                console.log("dates");
                break;
            default:
                url = `ner/"${value}"`
                console.log("dfault");
                break;
        }
        // const res = await fetch(`http://127.0.0.1:5000/${url}`) //dev
        const res = await fetch(`https://spectragpt.fun/${url}`) //production
        partialData = await res.json()
        console.log(partialData);
        let mergedData = { ...data, ...partialData }
        console.log(mergedData);
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