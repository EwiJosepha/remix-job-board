
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Job } from "~/db/models/job";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card key={job._id} className="p-4 shadow-md rounded-lg border cursor-pointer">
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
      <i className="ri-briefcase-3-line text-2xl text-gray-500"></i> {job.company}
      <p className="text-gray-500 flex items-center gap-1">
      </p>
      <p className="text-sm text-gray-700 mt-2">{"Description"}</p>
      <div className="flex justify-between items-center text-gray-500 text-xs mt-3">
        <span className="flex items-center gap-1">
          <i className="ri-calendar-line text-2xl"></i>
        </span>
        <i className="ri-time-line text-2xl"></i>
        <span className="flex items-center gap-1">
        </span>
      </div>
    </Card>
  );
};

export default JobCard;
