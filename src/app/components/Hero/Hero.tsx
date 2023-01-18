"use client";
import TextareaAutosize from 'react-textarea-autosize';
import Image from 'next/image'
import styles from './Hero.module.css'

console.log(styles.input)
export default function Hero() {
    return (
        <>
            <div className={styles.message}>
                ¿Con dónde sueñas<br />
                ir hoy?
            </div>
            <TextareaAutosize className={styles.input}></TextareaAutosize>
        </>
    );
}