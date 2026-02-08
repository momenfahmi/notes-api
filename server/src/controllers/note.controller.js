import Note from '../models/note.model.js';

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newNote = await Note.create({
            title,
            content
        });

        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create note', error: error.message });
    }
}

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: notes.length,
            notes
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve notes', error: error.message });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        res.status(500).json({ message: 'Failed to retrieve note', error: error.message });
    }
}

export const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const note = await Note.findByIdAndUpdate(
            noteId,
            { title, content },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'No note found' });
        }

        res.status(200).json(note);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        return res.status(500).json({ message: 'Failed to update note', error: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findByIdAndDelete(noteId);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        res.status(500).json({ message: 'Failed to delete note', error: error.message });
    }
}
