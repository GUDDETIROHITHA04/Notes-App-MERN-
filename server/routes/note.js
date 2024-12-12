import express from 'express';
import Note from '../models/Note.js'; 
import Middleware from '../middleware/middleware.js'


const router=express.Router();

router.post('/add', Middleware, async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description are required' });
        }

        const newNote = new Note({
            title,
            description,
            userId: req.user.id,
        });

        await newNote.save();
        res.status(200).json({ success: true, message: 'Note created successfully' });
    } catch (error) {
        console.error('Add Note Error:', error);
        res.status(500).json({ success: false, message: 'Something went wrong, Error in adding note' });
    }
});


router.get('/', Middleware,async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.status(200).json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ success: false, message: ' Error in getting notes' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure required fields are present
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description are required' });
        }

        // Update the note
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } // Return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        res.status(200).json({ success: true, note: updatedNote });
    } catch (error) {
        console.error('Update Note Error:', error);
        res.status(500).json({ success: false, message: 'Error in updating note' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the note by ID
        const deletedNote = await Note.findByIdAndDelete(id);

        // If no note was found
        if (!deletedNote) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        res.status(200).json({ success: true, message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Delete Note Error:', error);
        res.status(500).json({ success: false, message: 'Error in deleting note' });
    }
});

export default router