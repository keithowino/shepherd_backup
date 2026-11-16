// Keep them minimal — you're a cache, not a source of truth.

import mongoose from "mongoose";

const animeSchema = new mongoose.Schema(
    {
        _id: { type: Number, required: true },                // = Anikoto id
        title: String,
        alternative: String,
        titles: String,
        native: String,
        slug: String,
        rating: String,
        poster: String,
        description: String,
        aired: String,
        season: String,
        year: Number,
        status: String,
        score: String,
        malId: String,
        episodesCount: String,
        isDub: Number,
        isSub: Number,
        // termsByType: {
        //     genre: [String],
        //     studios: [String],
        //     type: [String],
        // },
        termsByType: {
            type: {
                genre: [String],
                producers: [String],
                studios: [String],
                type: [String],
            },
            default: {},
        },
        sourceUpdatedAt: Date,                // Anikoto's updated_at
        fetchedAt: { type: Date, index: true }, seriesFetchedAt: Date,
    },
    // { _id: false, timestamps: true },
    { timestamps: true },
);

animeSchema.index({ "termsByType.genre": 1 });
animeSchema.index({ sourceUpdatedAt: -1 });

export const Anime = mongoose.model("Anime", animeSchema);