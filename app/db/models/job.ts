import mongoose, { Schema } from "mongoose";

export type JobStatus = "Pending" | "Active" | "Inactive";

export interface Job {
  _id: string
  title: string;
  company: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSchema = new Schema<Job>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Active", "Inactive"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const JobModel = mongoose.models.Job || mongoose.model<Job>("Job", JobSchema);
