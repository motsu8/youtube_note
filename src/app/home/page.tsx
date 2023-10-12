import React from 'react'

import Search from '@/components/search'
import Sidebar from '@/components/sidebar'

export default function Home() {
  return (
    <div className='flex'>
      <Sidebar />
      <Search />
    </div>
  )
}

