import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'

const Navbar = () => {
  return (
    <nav className=' navbar'>
        <Link href='/'>
            <div>
                <Image src="/images/logo.svg" alt='Logo'
                 height={48} width={48}></Image>


            </div>
        </Link>

        <div className='flex items-center gap-8'>
            <NavItems/>
            <p>Sign In</p>
        </div>
    </nav>
  )
}

export default Navbar