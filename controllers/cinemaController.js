import mongoose from "mongoose";

import CinemaModel from "../models/cinemaModel.js";

export const getCinemas = async(req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 4;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await CinemaModel.countDocuments({});

        const cinemas = await CinemaModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: cinemas, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCinema = async(req, res) => {
    const {id} = req.params;

    try {
        const cinema = await CinemaModel.findById(id);

        res.status(200).json(cinema);
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCinema = async(req, res) => {
    const cinema = req.body;

    const newCinema = new CinemaModel({ ...cinema, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newCinema.save();

        res.status(201).json(newCinema);
    } 
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCinema = async(req, res) => {
    const {id} = req.params;
    const { title, bodyText, creator, selectedFile, likes } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No cinema with that id');

    const updatedCinema = { title, bodyText, creator, selectedFile, likes, _id: id };
    await CinemaModel.findByIdAndUpdate(id, updatedCinema, {new: true});
    res.json(updatedCinema);
}

export const deleteCinema = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No cinema with that id');

    await CinemaModel.findByIdAndRemove(id);
    res.json({ message: 'Cinema deleted' });
}

export const likeCinema = async(req, res) => {
    const {id} = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No cinema with that id');

    const cinema = await CinemaModel.findById(id);
    const index = cinema.likes.findIndex((id) => id === String(req.userId));

    (index === -1) ? cinema.likes.push(req.userId) : cinema.likes = cinema.likes.filter((id) => id !== String(req.userId));

    const updatedCinema = await CinemaModel.findByIdAndUpdate(id, cinema, {new: true});
    res.json(updatedCinema);
}

export const getCinemasBySearch = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const cinemas = await CinemaModel.find({title});

        res.status(200).json(cinemas);
    } 
    catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const commentCinema = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const cinema = await CinemaModel.findById(id);

    cinema.comments.push(value);

    const updatedCinema = await CinemaModel.findByIdAndUpdate(id, cinema, { new: true });

    res.json(updatedCinema);
};