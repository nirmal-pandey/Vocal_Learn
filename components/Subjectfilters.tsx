'use client'

import React from 'react'
import { Select, SelectItem , SelectContent , SelectTrigger , SelectValue} from "@/components/ui/select";
import { subjects } from "@/constants";
import {useState , useEffect} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

const Subjectfilters = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject , setSubject] = useState(query);

    useEffect(()=>{
        let newUrl="";
        if(subject ==="all"){
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove:["subject"],
            })
        }else{

            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key:"subject",
                value: subject,
            });
        }

        router.push(newUrl , {scroll: false});
    },[subject]);

  return (
    
        
        <Select onValueChange={setSubject} value={subject}>
           
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Select the Subject" />
            </SelectTrigger >
            <SelectContent>
                <SelectItem value='all'> All Subjects </SelectItem>
                {subjects.map((subject)=>(
                    <SelectItem
                        value={subject}
                        key={subject}
                        className="capitalize"
          
                    >
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>

        </Select>
    
  )
}

export default Subjectfilters