import { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../api/notesApi';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';

export default function NotesList() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data.notes);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleNoteCreated = (newNote) => setNotes([newNote, ...notes]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        try {
            await deleteNote(id);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    const handleNoteUpdated = (updatedNote) => {
        setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
    };

    if (loading) return <p>Loading notes...</p>;

    return (
        <div>
            <NoteForm onNoteCreated={handleNoteCreated} />

            {notes.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#777' }}>No notes found.</p>
            ) : (
                notes.map(note => (
                    <NoteItem
                        key={note._id}
                        note={note}
                        onDelete={handleDelete}
                        onNoteUpdated={handleNoteUpdated}
                    />
                ))
            )}
        </div>
    );
}
