"use client";
import TextareaAutosize from 'react-textarea-autosize';
import styles from './Hero.module.css'
import { useState, useEffect, useRef } from 'react';
import { Input, Itinerary } from '@/app/interfaces/responses';
import test from 'node:test';

type HeroProps = {
    setItineraries: (data: Itinerary[]) => void;
}


export default function Hero(props: HeroProps) {

    const [value, setValue] = useState("")
    const [prompt, setPrompt] = useState("")

    const [text, setText] = useState(`¿A dónde sueñas
    ir hoy?`)
    const [data, setData] = useState<Input>()

    const checkMinimumCompletion = (value: Input | undefined) => {
        if (!value?.origin ||
            value.adults === -1 ||
            !value.destination ||
            !value.duration ||
            !value.endDate ||
            !value.startDate)
            return false
        return true
    }

    const getCompletion = async () => {
        // const res = await fetch(`http://127.0.0.1:5000/ner/"${value}"`) //dev
        const res = await fetch(`https://spectragpt.fun/ner/"${prompt}${value}"`) //production
        let data: Input
        data = await res.json()
        console.log(data)

        if (data.adults === -1) {
            setText("Necesito más información sobre las personas que viajan. \n¿Cuántos adultos, niños e infantes son?")
            setPrompt(prompt + value)
            setValue("")
        } else if (!data.origin) {
            setText("¿Desde qué aeropuerto deseas viajar?")
            setPrompt(prompt + value)
            setValue("")
        } else if (!data.duration) {
            setText("¿Por cuántos días te quedarás?")
            setPrompt(prompt + value)
            setValue("")
        } else if (data.duration > 10) {
            setText("¿Por cuántos días viajarás?")
            setPrompt(prompt + value)
            setValue("")
        } else if (!data.endDate || !data.startDate) {
            setText("¿En qué rango de fechas deseas hacer la búsqueda?")
            setPrompt(prompt + value)
            setValue("")
        }

        console.log(prompt)

        if (checkMinimumCompletion(data)) {
            setText("Espera mientras encontramos tu viaje al mejor precio")
            //const res = await fetch(`http://127.0.0.1:5000/mzn`, { //dev
            const res = await fetch(`https://spectragpt.fun/mzn`, {
                method: "POST",
                body: JSON.stringify(data)
            }) //production
            let obj: Itinerary[]
            obj = await res.json()
            props.setItineraries(obj)
        }

        console.log(data)
    }


    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <div>
                    {text}
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
                <button className={styles.button} onClick={() => getCompletion()}>Búsqueda</button>
            </div>
        </div >
    );
}