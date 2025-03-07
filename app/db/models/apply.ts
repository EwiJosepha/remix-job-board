import mongoose from "mongoose";

const ApplySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String, required: true },
}, { timestamps: true });

const Apply = mongoose.models.Apply || mongoose.model("Apply", ApplySchema);
export default Apply;
