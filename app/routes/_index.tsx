import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import Footer from "~/components/home/footer";
import HeroSection from "~/components/home/hero";
import Navbar from "~/components/home/nav";
import JobContainer from "~/components/job-listing/job-container";
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
     <JobContainer jobs={jobs} />
     <Footer />
    </div>
  );
}