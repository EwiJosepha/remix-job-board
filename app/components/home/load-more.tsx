import React from 'react'
import { Button } from '../ui/button'
import { Link } from '@remix-run/react'

function LoadMore() {
  return (
    <div className='flex items-center justify-center py-8'>
    <Button className='px-5'><Link to='/all-jobs'>Load all</Link></Button>
    </div>
  )
}

export default LoadMore
