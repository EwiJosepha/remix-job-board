import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { connectDB } from "~/db/connect";
import { JobModel } from "~/db/models/job";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";

export async function loader({ params }: LoaderFunctionArgs) {
  await connectDB();
  const job = await JobModel.findById(params.jobId).lean();

  if (!job) throw new Response("Job Not Found", { status: 404 });

  const similarJobs = await JobModel.find({ category: job.category }).lean();
  console.log({similarJobs});
  

  const formattedSimilarJobs = similarJobs.map((job) => ({
    ...job,
    _id: job._id.toString(),
  }));

  return { job: { ...job, _id: job._id.toString() }, similarJobs: formattedSimilarJobs };
}

export default function JobDetails() {
  const { job, similarJobs } = useLoaderData<typeof loader>();
  const navigate = useNavigate()
  return (
    <div >
      <div className="max-w-4xl mx-auto p-6">
      <p className="font-bold text-2xl my-5">Details about {job.title}</p>
      <Card className="shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
          <Badge className="text-sm">{job.category}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{job.description}</p>
          <Separator className="my-4" />
          <p className="text-lg font-semibold">Company: {job.company}</p>
          <p className="text-gray-500">Location: {job.location}</p>
          <p className="text-gray-500">Salary: {job.salary || "Not specified"}</p>
          <Button className="mt-4 w-full"><Link to={`/apply/${job._id}`}>Apply Now</Link></Button>
        </CardContent>
      </Card>
      </div>

      <div className="my-10 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold px-2">Similar Jobs</h2>
        <div className="flex gap-4 overflow-x-auto mt-4 p-2">
          {similarJobs.length > 0 ? (
            similarJobs.map((similarJob, i) => (
              <Card  key={i} className="w-64 min-w-[250px] shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{similarJob.title}</CardTitle>
                  <Badge>{similarJob.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{similarJob.company}</p>
                  <p className="text-sm">{similarJob.location}</p>
                  <Button variant="outline" className="mt-2 w-full" onClick={()=>navigate(`/job/${similarJob._id}`) }>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No similar jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
