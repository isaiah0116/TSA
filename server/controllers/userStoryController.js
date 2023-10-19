import UserStory from "../models/userStoryModel.js";
import mongoose from 'mongoose';

export const getUserStories = async (req, res) => {
    try {
        const stories = await UserStory.find();
        res.status(200).json(stories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addUserStory = async (req, res) => {
    const story = new UserStory(req.body);
    try {
        await story.save();
        res.status(201).json(story);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteUserStory = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await UserStory.findOne({ id: parseInt(id) });
        if (!story) return res.status(404).send('No story with that id');
        
        await UserStory.findByIdAndRemove(story._id);
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        console.error("Error while deleting:", error);
        res.status(500).json({ message: error.message });
    }
}