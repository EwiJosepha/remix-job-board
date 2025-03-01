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
    if (error instanceof z.ZodError) {
      return json({ errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return json({ errors: { _form: "An unexpected error occurred" } }, { status: 500 });
  }
};

function ApplyToJob() {
  const form = useForm<z.infer <typeof applySchema>>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      title: '', company: "", firstName: "", email: '', resume: ""
    }
  })

  const submit = useSubmit()
  const actionData = useActionData<typeof action>()
  const job = useLoaderData<Job>();

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
    <div className="flex justify-center pt-28 pb-10">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Apply for {job.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
              <FormField control={form.control} name='title' render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <input type='text' placeholder='Title' {...field} value={job.title} disabled />
                  </FormControl>
                  <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                </FormItem>
              )}>

              </FormField>
              <FormField control={form.control} name='company' render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <input type='text' placeholder='company' {...field} value={job.company} disabled />
                  </FormControl>
                  <FormMessage>{form.formState.errors.company?.message}</FormMessage>
                </FormItem>
              )}>
              </FormField>

              <FormField control={form.control} name='firstName' render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <input type='text' placeholder='first name' {...field} />
                  </FormControl>
                   <FormMessage>{form.formState.errors.firstName?.message}</FormMessage>   
                </FormItem>
              )}>
              </FormField>
              <FormField control={form.control} name='email' render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input type='email' placeholder='email' {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.email?.message}</FormMessage>            
                </FormItem>
              )}>
              </FormField>
              <FormField control={form.control} name='resume' render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <input type='file' placeholder='resume' {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.resume?.message}</FormMessage>             
                </FormItem>
              )}>
              </FormField>
              <Button type="submit" className="w-full">Apply Now</Button>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default ApplyToJob;

