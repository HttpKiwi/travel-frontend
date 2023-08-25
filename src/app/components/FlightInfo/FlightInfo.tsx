import styles from './FlightInfo.module.css';
import { Flight } from '@/app/interfaces/responses';
import Image from 'next/image'
import Arrow from 'public/arrow.svg'
import { useEffect, useState } from 'react';


interface flightProps {
    flight: Flight
    type: string
}

const dateFormat = (string: string) => {
    return new Date(string).toLocaleString('es', { month: 'long', day: '2-digit', year: 'numeric' })
}

const hourFormat = (string: string) => {
    return new Date(string).toLocaleString('es', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export const getRate = async () => {
    const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/cop.json"`) //dev
    let data: any
    data = await res.json()
    return data["cop"]
}

export default function FlightInfo(props: flightProps) {
    const [value, setValue] = useState(props.flight.pricing_options[0].price.amount)


    const segments = props.flight.legs[0].segments.length
    return (
        <a target="_blank" href={props.flight.deeplink} rel="noopener noreferrer">
            <div className={styles.flightCard}>
                <h4>Vuelo de {props.type}:</h4>
                <p>{dateFormat(props.flight.legs[0].departure)}</p>
                <div className={styles.flight}>
                    <div>
                        <Image src={'/take_off.png'} alt={"take off"} width={40} height={40} />
                        <p>{props.flight.legs[0].origin.name}</p>
                        <p>{hourFormat(props.flight.legs[0].departure)}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Image src={Arrow} alt={"arrow"} />
                        {props.flight.legs[0].durationInMinutes} minutos
                    </div>
                    <div>
                        <Image src={'/landing.png'} alt={"landing"} width={40} height={40} />
                        <p>{props.flight.legs[0].destination.name}</p>
                        <p>{hourFormat(props.flight.legs[0].arrival)}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div className={styles.info}>
                        {props.flight.pricing_options[0].agents[0].name} -
                        {props.flight.legs[0].segments[0].marketingCarrier.name} -
                        {segments <= 1 ? "Directo" :
                            segments < 1 ? ` ${segments - 1} Escalas` : `1 Escala`}
                    </div>
                    <div>
                        ${value}
                    </div>
                </div>
            </div>
        </a>
    )
}