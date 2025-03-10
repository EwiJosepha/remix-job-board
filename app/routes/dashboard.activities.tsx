import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { connectDB } from "~/db/connect";
import { getCurrentUser } from "~/services/auth.service";
import Apply from "~/db/models/apply";

export const loader: LoaderFunction = async ({ request }) => {
  await connectDB();
  try {
    const user = await getCurrentUser(request);
    const appliedJobs = await Apply.find({
      user: user._id,
    });
    
    return json(appliedJobs);
  } catch (error) {
    return error;
  }
};

export default function Activities() {
  const appliedJobs = useLoaderData<typeof loader>();

  return (
    <div className="py-10 px-6 bg-gray-200 rounded-lg">
      <div className="flex items-center gap-3 mb-8">
        <i className="ri-briefcase-line w-8 h-8 text-blue-600"></i>
        <h2 className="text-3xl font-bold text-gray-800">Your Job Applications</h2>
      </div>
      <Card className="mb-6 w-full max-w-lg shadow-lg rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Applied Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium"><span className="text-white">{appliedJobs.length}</span> Applications Submitted</p>
        </CardContent>
      </Card>

      <Card className="w-full shadow-lg rounded-lg">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-xl font-semibold text-gray-700">Application History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full bg-white">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left p-3 text-gray-600">Job Title</TableHead>
                <TableHead className="text-left p-3 text-gray-600">Company</TableHead>
                <TableHead className="text-left p-3 text-gray-600">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appliedJobs.length > 0 ? (
                appliedJobs.map((job: any) => (
                  <TableRow key={job._id} className="hover:bg-gray-50 transition">
                    <TableCell className="p-3 text-gray-700">{job.title}</TableCell>
                    <TableCell className="p-3 text-gray-700">{job.company}</TableCell>
                    <TableCell className="p-3">
                      <Badge className="px-2 py-1 text-sm font-medium">
                        {job.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="p-3 text-center text-gray-500">
                    No applications yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function getBadgeVariant(status: string) {
  switch (status) {
    case "Accepted":
      return "success";
    case "Pending":
      return "warning";
    case "Rejected":
      return "destructive";
    default:
      return "secondary";
  }
}
