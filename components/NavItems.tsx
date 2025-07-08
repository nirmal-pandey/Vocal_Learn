"use client"

import { Link } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'

const navItems = [
    {label : 'Companions' , href: '/companions'},
    {label : 'Home' , href: '/'},
    {label : 'My Journey' , href: '/my-journey'},
]
const NavItems = () => {

    const pathname = usePathname();
  return (
    <nav className='flex items-center gap-4'>
        {navItems.map(({label , href})=>(
            <Link href={href} key={label} className={cn(pathname===href && 'text-primary font-semibold')}>    
                {label}
            </Link>
        ))}
    </nav>
  )
}

export default NavItems