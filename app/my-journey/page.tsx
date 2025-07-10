import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserCompanions, getUserSessions } from '@/lib/actions/companions.actions';
import Image from 'next/image';
import CompanionsList from '@/components/CompanionsList';

const page = async () => {

  const user = await currentUser();
  if(!user) redirect('/sign-in');

  const companions = await getUserCompanions(user.id);
  const sessionhistory = await getUserSessions(user.id);

  const {imageUrl , firstName , lastName} = user;
  return (
    <main className='min-lg-:w-3/4'>
      <section className='fex justify-between gap-4 max-sm:flex-col'>
        <div className="flex gap-4 items-center mb-4">
              <Image src={imageUrl} alt={firstName!} width={110} height={110}></Image>

              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl'>
                  {firstName} {lastName}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {user.emailAddresses[0].emailAddress}
                </p>
              </div>
        </div>
        
        <div className="flex gap-4 ">
          <div className="border border-black rounded-lg p-3 gap-2
            flex flex-col h-fit"
          >
              <div className='flex gap-2 items-center'>
                <Image src="/icons/check.svg" alt="cap" width={22} height={22}></Image>
                <p className='text-2xl font-bold'>
                  {sessionhistory.length}
                </p>
                <div>Lessons Learned</div>
              </div>

              
          </div>

          <div className="border border-black rounded-lg p-3 gap-2
            flex flex-col h-fit"
          >
              <div className='flex gap-2 items-center'>
                <Image src="/icons/cap.svg" alt="cap" width={22} height={22}></Image>
                <p className='text-2xl font-bold'>
                  {companions.length}
                </p>
                <div>Companions Created</div>
              </div>
          </div>
        </div>

      </section>
      <Accordion type="multiple">
        <AccordionItem value="recent">
            <AccordionTrigger className='text-2xl font-bold'>
              Recent Sessions
            </AccordionTrigger>
            <AccordionContent>
              <CompanionsList
                title='Recent Sessions'
                companions={sessionhistory}
              />
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
            <AccordionTrigger className='text-2xl font-bold'>
              My Companions {`(${companions.length}) `}
            </AccordionTrigger>
            <AccordionContent>
              <CompanionsList
                title='My Companions'
                companions={companions}
              />
            </AccordionContent>
        </AccordionItem>
            
            
      </Accordion>
    </main>
  )
}

export default page