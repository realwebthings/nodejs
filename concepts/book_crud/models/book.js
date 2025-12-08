import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: String, required: true, default: Date.now },
});

const BookModel = mongoose.model('Book', bookSchema);

export default BookModel;