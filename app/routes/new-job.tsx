import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { jobSchema } from "~/schemas/job.schemas";
import { Button } from "~/components/ui/button";



export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = jobSchema.safeParse(data);

  if (!result.success) {
    return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  // Simulating a DB save operation
  console.log("New Job Posted:", result.data);

  return redirect("/jobs");
}

export default function NewJobPage() {
  const actionData = useActionData<typeof action>();
  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: { title: "", company: "", location: "", description: "" },
  });

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post a Job</h2>

      {actionData?.errors && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          Please fix the errors and try again.
        </div>
      )}

      <Form method="post" className="space-y-4">
        <Input type="text" name="title" placeholder="Job Title" className="input w-full" />
        <Input type="text" name="company" placeholder="Company" className="input w-full" />
        <Input type="text" name="location" placeholder="Location" className="input w-full" />
        <textarea name="description" placeholder="Job Description" className="textarea w-full"></textarea>
        <Button type="submit" className="btn w-full">Submit</Button>
      </Form>
    </div>
  );
}
