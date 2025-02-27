import { LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react';
import { connectDB } from '~/db/connect';
import { Job, JobModel } from '~/db/models/job';
import { json, redirect } from "@remix-run/node";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";


export const loader: LoaderFunction = async ({ params }) => {
  await connectDB();
  const job = await JobModel.findById(params.jobId).lean();

  if (!job) {
    throw new Response("Job Not Found", { status: 404 });
  }

  return json(job);
};

export const action = async ({ request }: { request: Request }) => {
  await connectDB();
  const formData = await request.formData();
  const values = Object.fromEntries(formData)

  if (!values) {
    return json({ error: "All fields are required" }, { status: 400 });
  }
  return redirect("/thank-you");
};

function ApplyToJob() {
  const job = useLoaderData<Job>();

  return (
    <div className="flex justify-center pt-28 pb-10">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Apply for {job.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" encType="multipart/form-data" className="space-y-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" name="jobTitle" value={job.title} disabled />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" value={job.company} disabled />
            </div>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="resume">Resume</Label>
              <Input id="resume" name="resume" type="file" required />
            </div>
            <Button type="submit" className="w-full">Apply Now</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ApplyToJob;

