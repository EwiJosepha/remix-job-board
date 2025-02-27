import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import HeroSection from "~/components/home/hero";
import LoadMore from "~/components/home/load-more";
import JobContainer from "~/components/job-listing/job-container";
import { connectDB } from "~/db/connect";
import { Job, JobModel } from "~/db/models/job";

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
    return json(jobs); 
  } catch (error) {
    throw new Response("Error fetching jobs", { status: 500 });
  }
};


export default function Index() {
    const jobs = useLoaderData<Job[]>() || [];
    const showTen = jobs.slice(0, 10)
  
  return (
    <div>
      <HeroSection />
     <JobContainer jobs={showTen} />
     <LoadMore />
    </div>
  );
}