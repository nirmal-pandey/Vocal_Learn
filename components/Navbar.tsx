import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from '@/components/NavItems'
import { SignInButton,SignedIn,SignedOut ,UserButton } from '@clerk/nextjs'

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
            <SignedOut>
                
                  <SignInButton>
                        <button className='btn-signin'>Signin</button>
                  </SignInButton>
                
            </SignedOut>


            <SignedIn>
              <UserButton/>
            </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar