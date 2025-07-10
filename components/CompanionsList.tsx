import React from 'react'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import {subjectsColors , voices} from "@/constants";
import { getSubjectColor } from '@/lib/utils';

import {

  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CompanionListProps {
      title: string;
      companions?:Companion[];
      classNames?:string;

}

const CompanionsList = ({title , companions , classNames}:CompanionListProps) => {
  return (
    <article className={cn('companion-list', classNames)}>

      <h2 className='font-bold text-3xl'>{title}</h2>
            <Table>
                
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-lg w-2/3" key={6}>Lessons</TableHead>
                    <TableHead className='text-lg'>Subject</TableHead>
                    <TableHead className='text-lg text-right'>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>

                  {companions?.map(({id,subject,name, topic,duration})=>(
                    <TableRow key={id}>

                      <TableCell>
                        <Link href={`/companions/${id}`}>
                              <div className='flex items-center gap-2'>
                                <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden'
                                style={{backgroundColor:getSubjectColor(subject)}}>
                                  <Image
                                   src={`/icons/${subject}.svg`}
                                   alt="subjects"
                                    height={35} 
                                    width={35}>

                                  </Image>


                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-2xl font-semibold'>{name}</p>
                                    <p className='text-lg'>{topic}</p>
                                </div>
                                
                              </div>
                        </Link>
                      </TableCell>

                      <TableCell>
                          <div className='subject-badge max-md:hidden w-fit'>
                             {subject} 
                          </div>
                          <div className='flex items-center justify-center  rounded-lg w-fit p-2 md:hidden' style={{backgroundColor:getSubjectColor(subject)}}>

                              <Image src={`/icons/${subject}.svg`} alt={subject} height={18} width={18}></Image>
                          </div>

                      </TableCell>

                      <TableCell>
                        <div className='flex items-center gap-2 w-full'>
                          <p className='text-xl'>{duration} {' '} <span className='max-md:hidden'>mins</span></p>
                          <Image src="/icons/clock.svg" alt="" height={13.5} width={13.5}></Image>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
    
                </TableBody>
            </Table>
    </article>
  )
}

export default CompanionsList