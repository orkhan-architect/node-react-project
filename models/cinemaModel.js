import mongoose from 'mongoose';

const cinemaSchema = mongoose.Schema({
    title: String,
    bodyText: String,
    name: String,
    creator: String,
    selectedFile: String,
    comments: { 
        type: [String], 
        default: [] 
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const CinemaModel = mongoose.model('CinemaModel', cinemaSchema);

export default CinemaModel;