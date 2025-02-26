import React from 'react'
import JobCard from './job-card'
import { Job } from '~/db/models/job'
import { Link } from '@remix-run/react'

function JobContainer({ jobs }: { jobs: Job[] }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {jobs.map((job, i) => (
          <Link to={`/job/${job._id}`} key={i}>
            <JobCard job={job} i={i} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JobContainer
