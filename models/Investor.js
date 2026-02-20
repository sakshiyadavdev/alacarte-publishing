import mongoose from "mongoose";

const InvestorSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        company: { type: String, required: true },
        range: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Investor ||
    mongoose.model("Investor", InvestorSchema);