import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.title}>
                Travel AI
            </div>
            <div className={styles.navitems}>
                <div>Example1</div>
                <div>Example2</div>
                <div>Example1</div>
                <div>Example2</div>
            </div>
        </div>
    );
}