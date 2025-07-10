import React from 'react'
import { getCompanion } from "@/lib/actions/companions.actions";
import { currentUser } from '@clerk/nextjs/server';
import {redirect} from 'next/navigation';
import { getSubjectColor } from '@/lib/utils';
import Image from 'next/image';
import CompanionComponent from '@/components/CompanionComponent';

interface CompanionSessionProps {

  params:{
    id:string;
  }

}
const page = async ({params} : CompanionSessionProps) => {

  const {id} = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  const {name, topic, subject, duration, color} = companion;

  if(!user) redirect('/sign-in');
  if(!name) redirect('/companions');



  return (

        <main>

          <article className='flex rounded-border justify-between p-6 max-md:flex-col'>

            <div className=' flex items-center gap-2'>

              <div className='size-]72px] flex justify-center items-center rounded-lg max-md:hidden' style={{backgroundColor: getSubjectColor(color)}}>
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={35}
                  height={35}
                ></Image>
              </div>

              <div className=' flex flex-col gap-2 max-md:items-center'>
                <div className='flex items-center gap-2'>
                  <p className='font-bold text-2xl'>{name} </p>
                  <div className='subject-badge max-sm:hidden'> {subject} </div>
                </div>
                <p className='text-lg'> {topic} </p>
              </div>
            </div>

            <div className='items-start text-2xl max-md:hidden'>
              {duration} minutes
            </div>


          </article>
          <CompanionComponent
            
            {...companion}
            companionId={id}
            userName={user.firstName!}
            userImage={user.imageUrl!}

           />
        </main>
  )
}

export default page