import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import JobCard from "~/components/job-listing/job-card";
import { connectDB } from "~/db/connect";
import { JobModel } from "~/db/models/job";

export const loader: LoaderFunction = async () => {
  await connectDB();

  try {
    const jobs = await JobModel.find().lean();

    if (!jobs) {
      throw new Response("No jobs found", { status: 404 });
    }

    return json(jobs); 
  } catch (error) {
    throw new Response("Error fetching jobs", { status: 500 });
  }
};

export default function Jobs() {
  const jobs = useLoaderData<{ _id: string; title: string; company: string }[]>();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {jobs.map((job) => (
        <JobCard  job={job}/>
        ))}
      </div>
    </div>
  );
}
