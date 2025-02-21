import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import HeroSection from "~/components/home/hero";
import Navbar from "~/components/home/nav";
import JobCard from "~/components/job-listing/job-card";
import { connectDB } from "~/db/connect";
import { JobModel } from "~/db/models/job";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Board" },
    { name: "description", content: "Job board listing" },
  ];
};

export const loader: LoaderFunction = async () => {
  await connectDB();

  try {
    const jobs = await JobModel.find().lean();

    if (!jobs) {
      throw new Response("No jobs found", { status: 404 });
    }
    console.log("jobss",jobs);

    return json(jobs); 
  } catch (error) {
    throw new Response("Error fetching jobs", { status: 500 });
  }
};


export default function Index() {
    const jobs = useLoaderData<{ _id: string; title: string; company: string }[]>() || [];
  
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {jobs.map((job) => (
        <JobCard  job={job} key={job._id}/>
        ))}
      </div>
    </div>
    </div>
  );
}