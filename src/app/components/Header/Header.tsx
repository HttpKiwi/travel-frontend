/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <Image src={'/spectra-logo.png'} alt={"spectra logo"} width={150} height={90} />
            <div className={styles.navitems}>
                Smart travel Plans Empowered with ConsTRAint technologies
            </div>
        </div>
    );
}