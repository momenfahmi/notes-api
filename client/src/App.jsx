import NotesList from './components/NotesList';
import styles from './App.module.css';

export default function App() {
    return (
        <div className={styles.appContainer}>
            <header className={styles.header}>Notes App</header>
            <main className={styles.main}>
                <NotesList />
            </main>
        </div>
    );
}
