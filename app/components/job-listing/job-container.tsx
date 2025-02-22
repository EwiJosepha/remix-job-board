import React from 'react'
import JobCard from './job-card'
import { Job } from '~/db/models/job'

function JobContainer({jobs}: {jobs: Job[]}) {
  return (
    <div className="container mx-auto p-6">
    <h1 className="text-xl font-bold">Job Listings</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {jobs.map((job) => (
      <JobCard  job={job} key={job._id}/>
      ))}
    </div>
  </div>
  )
}

export default JobContainer
