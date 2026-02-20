const BookingSchema = new mongoose.Schema({
    provider: String,
    packageName: String,
    duration: String,
    price: Number,

    name: String,
    email: String,
    phone: String,
    location: String,

    website: String,
    bookPage: String,
    goodreads: String,
    twitter: String,

    status: {
        type: String,
        default: "pending", // 🔥 important
    }

}, { timestamps: true });