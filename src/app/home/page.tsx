'use client'

import React from 'react'

import Search from '@/components/search'
import Sidebar from '@/components/sidebar'
import SignOut from '@/utils/signOut'

export default function Home() {
  return (
    <div className='flex'>
      <Sidebar />
      <div id='dashBoard' className='w-full flex flex-col justify-start space-y-10'>
        <Search />
        <SignOut />
      </div>
    </div>
  )
}

