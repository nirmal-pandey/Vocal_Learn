import React from 'react'
import { Button } from '@/components/ui/button'
import CompanionCard from "@/components/CompanionCard"
import CompanionList from "@/components/CompanionsList"
import CTA from "@/components/CTA"
import { recentSessions } from '@/constants'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companions.actions'
import { getSubjectColor } from '@/lib/utils'

const Page = async () => {

  const companions = await getAllCompanions({ limit: 3});
  const recentSessionsCompanions = await getRecentSessions(5);
  return (

    <main>
      <h1 className='text-2xl underline'>Popular Companions</h1>

      <section className='home-section'>
        {companions.map((companion) => (
            <CompanionCard 
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
            
            />
        ))}

        
        

      </section>

      <section className='home-section '>
        <CompanionList 
          title ="recently Completed Sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        
        />
        <CTA/>
      </section>
      
    </main>
  )
}

export default Page