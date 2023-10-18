'use client'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

import Video from '@/app/api/video';
import { Search } from '@/types/parts';

function Search({ placeholder, session }: Search) {
  const [content, setContent] = useState('');

  const videoClient = new Video(session)

  return (
    <div className='flex relative justify-center align-center h-max w-10/12 my-5'>
      <form action="" className='w-full' onSubmit={e =>{ videoClient.insertVideo(e,content); return false;}}>
        <input type="text" placeholder={placeholder} onChange={(e) => setContent(e.target.value)} className='w-1/2 max-h-max w-full py-3 pl-7 bg-slate-100 shadow-lg rounded-lg px-4 text-center' />
        <div className='flex absolute pl-3 inset-y-0 py-2 px-3 end-0'>
          <button type='button' onClick={(e) => videoClient.insertVideo(e, content)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='h-[30px]' color='#555555' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Search