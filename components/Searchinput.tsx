"use client"

import React from 'react'
import { usePathname , useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const Searchinput = () => {

    const pathname = usePathname();
    const router = useRouter();
    const searchparams = useSearchParams();
    const query = searchparams.get('topic') || '';
    const [serachQuery, setSearchQuery] = useState("");


  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
        <Image src="/icons/search.svg" alt="seaarh" width={15} height={15}></Image>
        <input type="text" placeholder='Search..' className='outline-none' 
            value={serachQuery} 
            onChange={(e)=>{setSearchQuery(e.target.value)}}
         />
    </div>
  )
}

export default Searchinput