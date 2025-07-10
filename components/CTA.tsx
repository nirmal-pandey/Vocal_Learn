import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CTA = () => {
  return (
    <section className='cta-section'>
      <div className='cta-badge'>Start learning your way.</div>
      <h2 className='text-3xl font-bold'>Build a Personalize learning Companion</h2>
      <p>Pick aname , subject, voice & personality -- and start learning through voice converstaion that feels naural and fun.</p>
      <Image src="/images/cta.svg" alt="cta" height={362} width={232}></Image>
      <button className='btn-primary'>
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12}></Image>
        <Link href="/companions/new"> Create a New Companion </Link>
      </button>

    </section>
  )
}

export default CTA