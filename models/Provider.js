import mongoose from "mongoose";

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: String,
    price: Number,
    image: String,

    // 🔥 IMPORTANT
    serviceSlug: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.modals.Provider ||
    mongoose.model("Provider", ProviderSchema);