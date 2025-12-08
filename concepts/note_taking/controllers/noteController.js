import NoteModel from "../models/note.js";

const createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content || title.trim() === "" || content.trim() === "") {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = new NoteModel({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        next(error);
    }
};

const getNotes = async (req, res, next) => {
    try {
        const notes = await NoteModel.find();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if ((title !== undefined && title.trim() === "") || (content !== undefined && content.trim() === "")) {
            return res.status(400).json({ message: "Title and content cannot be empty" });
        }

        const updatedNote = await NoteModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    try {
        const deletedNote = await NoteModel.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { createNote, getNotes, updateNote, deleteNote };
