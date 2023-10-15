import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function Search() {
  return (
    <div className='flex justify-center align-center h-max w-full my-5'>
        <input type="text" placeholder='動画URLで追加' className='w-1/2 bg-slate-100 shadow-lg rounded-lg px-4 text-center' />
        <FontAwesomeIcon icon={faMagnifyingGlass} className='h-[50px]' color='#555555' />
    </div>
  )
}

export default Search