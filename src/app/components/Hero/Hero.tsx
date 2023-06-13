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
    const [completion, setCompletion] = useState("")

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
        const res = await fetch(`http://127.0.0.1:5000/ner/"${value}"`) //dev
        // const res = await fetch(`https://spectratravel.herokuapp.com/ner/"${value}"`) //production
        let data: Input
        data = await res.json()

        if (data.adults === -1) {
            setText("Necesito más información sobre las personas que viajan. \n¿Cuántos adultos, niños e infantes son?")
        } else if (!data.origin) {
            setText("¿Desde qué aeropuerto deseas viajar?")
        } else if (!data.duration) {
            setText("¿Por cuántos días te quedarás?")
        } else if (data.duration > 12) {
            setText("¿Por cuántos días viajarás?")
        } else if (!data.endDate || !data.startDate) {
            setText("¿En qué rango de fechas deseas hacer la búsqueda?")
        }

        if (checkMinimumCompletion(data)) {
            const res = await fetch(`http://127.0.0.1:5000/"${value}"`) //dev
            // const res = await fetch(`https://spectratravel.herokuapp.com/"${value}"`) //production
            let data: Itinerary[]
            data = await res.json()
            props.setItineraries(data)
        }


        setCompletion(JSON.stringify(data))
    }


    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <div>
                    {text}
                </div>
            </div>
            {/*  */}
            <TextareaAutosize
                className={styles.input}
                onChange={ev => setValue(ev.target.value)}
                onSubmit={() => getCompletion()}
            />
            <h1>
                {completion}
            </h1>
            <button onClick={() => getCompletion()}>completion</button>
        </div >
    );
}