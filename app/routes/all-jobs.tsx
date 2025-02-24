import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import JobContainer from '~/components/job-listing/job-container';
import { connectDB } from '~/db/connect';
import { JobModel } from '~/db/models/job';


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

function AllJobs() {
  const jobs = useLoaderData<{ _id: string; title: string; company: string }[]>() || [];
  return (
    <>
      <h1>ALL JOB LSTINGS</h1>
      <JobContainer jobs={jobs} />
    </>
  )
}

export default AllJobs
