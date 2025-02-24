import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "..//ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "..//ui/button";
import { Form as RemixForm, useActionData, useNavigation } from "@remix-run/react";
import { jobSchema } from "~/schemas/job.schemas";

export default function JobForm() {
  const actionData: any = useActionData();
  const navigation = useNavigation();
  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: { title: "", company: "", location: "", description: "" },
  });

  return (
    <div className=" container flex justify-center items-center min-h-screen bg-gray-100">
      <RemixForm method="post" action="/new-job" className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">Post a New Job</h2>

        <Form {...form}>
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl><Input placeholder="Software Engineer" {...field} /></FormControl>
              <FormMessage>{actionData?.errors?.title}</FormMessage>
            </FormItem>
          )} />

          <FormField control={form.control} name="company" render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl><Input placeholder="Tech Corp" {...field} /></FormControl>
              <FormMessage>{actionData?.errors?.company}</FormMessage>
            </FormItem>
          )} />

          <FormField control={form.control} name="location" render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl><Input placeholder="Remote" {...field} /></FormControl>
              <FormMessage>{actionData?.errors?.location}</FormMessage>
            </FormItem>
          )} />

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl><Textarea placeholder="Describe the job role..." {...field} /></FormControl>
              <FormMessage>{actionData?.errors?.description}</FormMessage>
            </FormItem>
          )} />

          <Button type="submit" disabled={navigation.state === "submitting"} className="w-full">
            {navigation.state === "submitting" ? "Posting..." : "Post Job"}
          </Button>
        </Form>
      </RemixForm>
    </div>
  );
}
