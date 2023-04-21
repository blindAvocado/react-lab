import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: Number,
    director: String,
    tagline: String,
    genres: [String],
});

export default mongoose.model("Movie", MovieSchema);