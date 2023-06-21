import { Itinerary } from '@/app/interfaces/responses';
import PhotosCarrousel from '../PhotoCarrousel/PhotoCarrousel';
import styles from './ResultCard.module.css';
import FlightInfo from '../FlightInfo/FlightInfo';
import { SolverSolution } from '@/app/interfaces/solverSolution.model';

type ResultCardProps = {
    solutions: SolverSolution[];
}

const dateFormat = (string: string) => {
    return new Date(string).toLocaleString('es', { month: 'long', day: '2-digit', year: 'numeric' })
}

const hourFormat = (string: string) => {
    return new Date(string).toLocaleString('es', { hour: '2-digit', minute: '2-digit', hour12: true })
}


export default function ResultCard(props: ResultCardProps) {

    let itineraries: Itinerary[] = []
    props.solutions.forEach((solution) => {
        const lodgingResult = solution.solution?.lodging?.result
        const departureResult = solution.solution?.departure?.result
        const returnResult = solution.solution?.return?.result
        if (lodgingResult && departureResult && returnResult) {
            itineraries.push({
                "lodging": lodgingResult,
                "departure": departureResult,
                "return": returnResult
            })
        }
    })



    return (
        <div className={styles.itineraries}>
            {itineraries.map((itinerary: Itinerary) => (
                <div key={itinerary.departure.id} className={styles.container}>
                    <div className={styles.content}>
                        <a className={styles.lodgings} href={itinerary.lodging.deeplink.replace(".com", ".com.co")}>
                            <div style={{ paddingBottom: '20px' }}>
                                <h2>{itinerary.lodging.name}</h2>
                            </div>
                            <a>
                                <PhotosCarrousel imagesUrl={itinerary.lodging.images} />
                            </a>
                            <div className={styles.lodgingDetails}>
                                {itinerary.lodging.bathrooms} baños · {itinerary.lodging.bedrooms} habitaciones · {itinerary.lodging.beds} camas
                            </div>
                            <div>
                                {itinerary.lodging.price.total * 4150}
                            </div>
                        </a>
                        <div className={styles.flights}>
                            <h2>Vuelos: </h2>
                            <FlightInfo flight={itinerary.departure} type={"ida"} />
                            <FlightInfo flight={itinerary.return} type={"vuelta"} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
