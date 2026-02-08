import { useState } from 'react';
import styles from './NoteItem.module.css';
import { updateNote } from '../api/notesApi';

export default function NoteItem({ note, onDelete, onNoteUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content || '');

    const startEditing = () => setIsEditing(true);
    const cancelEditing = () => {
        setIsEditing(false);
        setEditTitle(note.title);
        setEditContent(note.content || '');
    };

    const saveEdit = async () => {
        if (!editTitle) return alert('Title is required');
        try {
            const updatedNote = await updateNote(note._id, {
                title: editTitle,
                content: editContent
            });
            onNoteUpdated(updatedNote);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update note:', error);
        }
    };

    return (
        <div className={styles.noteCard}>
            {isEditing ? (
                <>
                    <input
                        className={styles.input}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                        className={styles.textarea}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div style={{ textAlign: 'right' }}>
                        <button className={`${styles.button} ${styles.saveButton}`} onClick={saveEdit}>
                            Save
                        </button>
                        <button className={`${styles.button} ${styles.cancelButton}`} onClick={cancelEditing}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h3 className={styles.noteTitle}>{note.title}</h3>
                    <p className={styles.noteContent}>{note.content}</p>
                    <div style={{ textAlign: 'right' }}>
                        <button className={`${styles.button} ${styles.editButton}`} onClick={startEditing}>
                            Edit
                        </button>
                        <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => onDelete(note._id)}>
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
