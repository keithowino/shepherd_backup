import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
    {
        _id: { type: Number },                // = Anikoto episode id
        animeId: { type: Number, index: true },
        number: Number,
        title: String,
        jpTitle: String,
        embedId: String,
        embedUrls: {
            sub: String,
            dub: String,
        },
        sourceUpdatedAt: Date,
        fetchedAt: Date,
    },
    // { _id: false, timestamps: true },
    { timestamps: true },
);

episodeSchema.index({ animeId: 1, number: 1 }, { unique: true });

export const Episode = mongoose.model("Episode", episodeSchema);