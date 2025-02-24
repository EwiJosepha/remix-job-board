
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import JobForm from "~/components/job-listing/post-job-form";
import { jobSchema } from "~/schemas/job.schemas";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = jobSchema.safeParse(data);

  if (!result.success) {
    return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  console.log("New Job Posted:", result.data);
  return redirect("/jobs");
}

export async function loader() {
  return json({ message: "New Job Form" });
}

export default function NewJobPage() {
  useLoaderData();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <JobForm />
    </div>
  );
}

