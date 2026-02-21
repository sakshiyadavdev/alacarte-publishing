import mongoose from "mongoose";

// Package schema
const PackageSchema = new mongoose.Schema({
    name: String,
    price: Number,
    duration: String,
    type: String,
    features: [String],
});

// Provider schema
const ProviderSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    location: String,
    price: Number,
    image: String,
    packages: [PackageSchema],
});

// Service schema
const ServiceSchema = new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    icon: String,
    priceRange: String,
    providers: [ProviderSchema],
});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);