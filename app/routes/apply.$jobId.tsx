import { LoaderFunction } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { connectDB } from '~/db/connect';
import { Job, JobModel } from '~/db/models/job';
import { json, redirect } from "@remix-run/node";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useForm } from 'react-hook-form';
import { applySchema } from '~/schemas/apply.schemas';
import { FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form';
import Apply from '~/db/models/apply';
import { z } from 'zod';


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


  try {
    const validatedValues = applySchema.parse(values)
    const saveToDb = Apply.create({ validatedValues })

    if (!saveToDb) {
      return json({ message: 'Application failed', status: 400 })
    }
    return { redirect: redirect('/sign-in'), messager: json({ message: 'Application successfully', status: 201 }) }
  } catch (error) {

  }
};

function ApplyToJob() {
  const form = useForm({})
  const submit = useSubmit()
  const actionData = useActionData<typeof action>()
  const job = useLoaderData<Job>();

  function onSubmit(values: z.infer<typeof applySchema>) {
    submit(values, { method: 'post' })
  }

  return (
    <div className="flex justify-center pt-28 pb-10">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Apply for {job.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" encType="multipart/form-data" className="space-y-4">
            <FormField control={form.control} name='title' render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <input type='text' placeholder='Title' {...field} value={job.title} disabled />
                </FormControl>
              </FormItem>
            )}>

            </FormField>
            <FormField control={form.control} name='company' render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <input type='text' placeholder='company' {...field} value={job.company} disabled />
                </FormControl>
              </FormItem>
            )}>
            </FormField>

            <FormField control={form.control} name='firstName' render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <input type='text' placeholder='first name' {...field} />
                </FormControl>
              </FormItem>
            )}>
            </FormField>
            <FormField control={form.control} name='email' render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input type='email' placeholder='email' {...field} />
                </FormControl>
              </FormItem>
            )}>
            </FormField>
            <FormField control={form.control} name='resume' render={({ field }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
                  <input type='file' placeholder='resume' {...field} />
                </FormControl>
              </FormItem>
            )}>
            </FormField>
            <Button type="submit" className="w-full">Apply Now</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ApplyToJob;

