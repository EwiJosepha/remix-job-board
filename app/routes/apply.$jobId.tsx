import { LoaderFunction } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { connectDB } from '~/db/connect';
import { Job, JobModel } from '~/db/models/job';
import { json, redirect } from "@remix-run/node";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FormProvider, useForm } from 'react-hook-form';
import { applySchema } from '~/schemas/apply.schemas';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import Apply from '~/db/models/apply';
import { z } from 'zod';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/ui/input';


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
    const saveToDb = Apply.create(validatedValues)
    console.log({ validatedValues });


    if (!saveToDb) {
      return json({ message: 'Application failed', status: 400 });
    }

    return redirect('/thanks');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return json({ errors: { _form: "An unexpected error occurred" } }, { status: 500 });
  }
};

function ApplyToJob() {

  const submit = useSubmit()
  const actionData = useActionData<typeof action>()
  const job = useLoaderData<Job>();

  const form = useForm<z.infer<typeof applySchema>>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      title: job.title,
      company: job.company,
      firstName: '',
      email: '',
      resume: ''
    }
  })


  function onSubmit(values: z.infer<typeof applySchema>) {
    submit(values, { method: 'post' })
  }

  React.useEffect(() => {
    if (actionData && "errors" in actionData) {
      Object.entries(actionData.errors).forEach(([key, value]) => {
        form.setError(key as any, { type: "manual", message: (value as string[]).join(", ") });
      });
    }
  }, [actionData, form]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-8 shadow-lg bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Apply for {job.title}
          </CardTitle>
          <p className="text-sm text-gray-500">{job.company}</p>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <Form
              onSubmit={form.handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium pr-2">Job Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="input-field"
                        {...field}
                        value={job.title}
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Company</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="input-field"
                        {...field}
                        value={job.company}
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        className="input-field"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm">
                      {form.formState.errors.firstName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="input-field"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm">
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Resume (PDF or DOC)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="input-field border p-2 rounded-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm">
                      {form.formState.errors.resume?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg">
                Apply Now
              </Button>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default ApplyToJob;

