import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useFetcher } from "@remix-run/react";
import { jobSchema } from "~/schemas/job.schemas";


export default function JobForm() {
  const fetcher = useFetcher();
  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: { title: "", company: "", location: "", description: "" },
  });

  return (
    <fetcher.Form method="post" action="/jobs/new" className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Post a New Job</h2>

      <Form {...form}>
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl><Input placeholder="Software Engineer" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="company" render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl><Input placeholder="Tech Corp" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="location" render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl><Input placeholder="Remote" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Job Description</FormLabel>
            <FormControl><Textarea placeholder="Describe the job role..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={fetcher.state === "submitting"} className="w-full">
          {fetcher.state === "submitting" ? "Posting..." : "Post Job"}
        </Button>
      </Form>
    </fetcher.Form>
  );
}
