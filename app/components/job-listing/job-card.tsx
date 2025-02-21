import { lazy, Suspense } from 'react';
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Job } from "~/db/models/job";

const Calendar = lazy(() => import('lucide-react').then(mod => ({ default: mod.Calendar })));
const Briefcase = lazy(() => import('lucide-react').then(mod => ({ default: mod.Briefcase })));
const Clock = lazy(() => import('lucide-react').then(mod => ({ default: mod.Clock })));

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card key={job._id} className="p-4 shadow-md rounded-lg border">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <Badge
          className={`text-white ${job.status === "Active"
              ? "bg-green-500"
              : job.status === "Pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
        >
          {job.status}
        </Badge>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <p className="text-gray-500 flex items-center gap-1">
          <Briefcase size={16} /> {job.company}
        </p>
        <p className="text-sm text-gray-700 mt-2">{"Description"}</p>
        <div className="flex justify-between items-center text-gray-500 text-xs mt-3">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
          </span>
        </div>
      </Suspense>
    </Card>
  );
};

export default JobCard;
