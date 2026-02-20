import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
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

    services: {
        type: [
            {
                name: { type: String, default: "" },
                type: { type: String, default: "" },
                status: { type: String, default: "Active" },
                package: { type: String, default: "" },
                price: { type: Number, default: 0 },
                provider: {
                    name: { type: String, default: "" },
                    image: { type: String, default: "" },
                    rating: { type: Number, default: 0 },
                    reviews: { type: Number, default: 0 },
                    location: { type: String, default: "" }
                },
                expires: Date,
                purchased: Date
            }
        ],
        default: []

    },
}, { timestamps: true });

if (mongoose.models.Author) {
    delete mongoose.models.Author;
}
const Author = mongoose.model("Author", AuthorSchema);
export default Author;