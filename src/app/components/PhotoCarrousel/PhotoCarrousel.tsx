import Image from 'next/image'
import Carousel from 'nuka-carousel'
import styles from './PhotoCarrousel.module.css';

interface PhotoCarrouselProps {
    imagesUrl: string[]
}

export default function PhotosCarrousel(props: PhotoCarrouselProps) {
    return (
        <div>
            <Carousel wrapAround={true} style={{ maxWidth: '35vw' }} className={styles.images}>
                {props.imagesUrl.map((value, index) => {
                    return <Image src={value} alt="image" key={index} width={720} height={480} />
                })}
            </Carousel>
        </div>
    );
}