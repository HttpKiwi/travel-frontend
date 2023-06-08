"use client";
import TextareaAutosize from 'react-textarea-autosize';
import Image from 'next/image'
import styles from './Hero.module.css'
import { useState } from 'react';

export default function Hero() {

    const [value, setValue] = useState("")
    const [completion, setCompletion] = useState("")

    const getCompletion = async () => {
        const res = await fetch(`http://143.198.177.199/:5000/"${value}"`)
        setCompletion(await res.text())
    }

    return (
        <div className={styles.container}>
            <div className={styles.message}>
                ¿A dónde sueñas<br />
                ir hoy?
            </div>
            <button onClick={() => getCompletion()}>Submit</button>
            <TextareaAutosize
                className={styles.input}
                onChange={ev => setValue(ev.target.value)}
                onSubmit={() => getCompletion()}
            />
            <h1>
                {completion}
            </h1>
        </div>
    );
}