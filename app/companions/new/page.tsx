import React from 'react'
import CompanionForm from '@/components/CompanionForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

const page = async () => {

  const {userId } = await auth();
  if(!userId) redirect('/sign-in');
  
  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center'>

        <article className='w-full gap-4 flex flex-col'>

          <CompanionForm></CompanionForm>
        </article>


    </main>
  )
}

export default page