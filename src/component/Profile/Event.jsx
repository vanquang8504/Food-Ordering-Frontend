import React from 'react'
import { EventCards } from './EventCards'

export const Event = () => {
  return (
    <div className='mt-5 flex flex-wrap gap-5'>
      {[1,1,1].map(item => <EventCards />)}

    </div>
  )
}
