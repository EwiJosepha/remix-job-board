import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { connectDB } from "~/db/connect";
import { getCurrentUser } from "~/services/auth.service";

export const loader: LoaderFunction = async ({ request }) => {
  await connectDB()
  try {
    const user = await getCurrentUser(request);
    console.log({user});
    
    return json({ user });
  } catch (error) {
    return error;
  }

};

export default function Activities() {
  const { appliedJobs } = useLoaderData<typeof loader>();

  return (
    <p>hello</p>
    // <div className="py-10 px-6">
    //   <h2 className="text-2xl font-bold mb-6">Your Job Applications</h2>

    //   <Card className="mb-6 w-full max-w-sm">
    //     <CardHeader>
    //       <CardTitle>Applied Jobs</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <p className="text-lg font-semibold">{appliedJobs.length} Applications</p>
    //     </CardContent>
    //   </Card>
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Application History</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <Table>
    //         <TableHeader>
    //           <TableRow>
    //             <TableHead>Job Title</TableHead>
    //             <TableHead>Company</TableHead>
    //             <TableHead>Status</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {appliedJobs.length > 0 ? (
    //             appliedJobs.map((job: any) => (
    //               <TableRow key={job._id}>
    //                 <TableCell>{job.title}</TableCell>
    //                 <TableCell>{job.company}</TableCell>
    //                 <TableCell>
    //                   <Badge>
    //                     {job.status}
    //                   </Badge>
    //                 </TableCell>
    //               </TableRow>
    //             ))
    //           ) : (
    //             <TableRow>
    //               <TableCell colSpan={3} className="text-center">
    //                 No applications yet
    //               </TableCell>
    //             </TableRow>
    //           )}
    //         </TableBody>
    //       </Table>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
