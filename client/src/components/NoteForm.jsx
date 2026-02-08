import { useState } from 'react';
import { createNote } from '../api/notesApi';
import styles from './NoteForm.module.css';

export default function NoteForm({ onNoteCreated }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return alert('Title is required');

        setLoading(true);
        try {
            const newNote = await createNote({ title, content });
            onNoteCreated(newNote);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Failed to create note:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className={styles.textarea}
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button className={styles.submitButton} type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Add Note'}
            </button>
        </form>
    );
}
