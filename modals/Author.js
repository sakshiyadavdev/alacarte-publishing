import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },

        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },

        bio: { type: String, required: true },

        website: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        facebook: String,
    },
    { timestamps: true }
);

export default mongoose.models.Author ||
    mongoose.model("Author", AuthorSchema);