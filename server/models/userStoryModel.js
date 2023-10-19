import mongoose from 'mongoose';

const userStorySchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    job: { type: String, required: true },
    school: { type: String, required: true },
    position: { type: String, required: true },
    photo1: { type: String, required: true },
    photo2: { type: String, required: true },
    playedFor: { type: String, required: true },
    flipped: { type: Boolean, default: false },
    id: { type: Number, required: false, unique: true }
});

userStorySchema.pre('save', function(next) {
    const story = this;

    // If the story already has an ID, skip this middleware
    if (story.id) return next();

    // Otherwise, count the number of documents to determine the next ID
    mongoose.models.userStory.countDocuments({}, function(err, count) {
        if (err) {
            return next(err);
        }

        // Start the IDs at 15 and increment by 1 for each new entry
        story.id = 15 + count;
        next();
    });
});

export default mongoose.model('userStory', userStorySchema);