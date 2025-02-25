import { Schema, model, Document } from 'mongoose';

export interface Job extends Document {
  title: string;
  company: string;
  category?: "Engineering" | "Marketing" | "Design" | "Finance" | "Sales";
  location?: "New York, USA" | "London, UK" | "Berlin, Germany" | "Remote" | "San Francisco, USA";
  description?: string;
  salary?: string;
  status?: "Pending" | "Active" | "Inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSchema = new Schema<Job>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    category: {
      type: String,
      enum: ["Engineering", "Marketing", "Design", "Finance", "Sales"],
      required: true,
    },
    location: {
      type: String,
      enum: [
        "New York, USA",
        "London, UK",
        "Berlin, Germany",
        "Remote",
        "San Francisco, USA",
      ],
      required: true,
    },
    description: { type: String, required: true },
    salary: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Active", "Inactive"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const JobModel = model<Job>("Job", JobSchema);
