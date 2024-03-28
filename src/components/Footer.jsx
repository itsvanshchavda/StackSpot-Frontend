import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='mt-8 w-full bg-zinc-900 px-8 md:px-[200px] flex md:flex-row flex-col justify-center items-center  md:justify-between text-sm py-8 md:mt-8 md:text-md'>
        <div className='flex flex-col text-white'>
          <p>Fetures Blogs</p>
          <p>Trending</p>
          <p>Readers Choice</p>
        </div>

        <div className='flex flex-col text-white'>
          <p>Forum</p>
          <p>Trending</p>
          <p>Readers Choice</p>
        </div>

        <div className='flex flex-col text-white'>
          <p>Privacy</p>
          <p>Trending</p>
          <p>Readers Choice</p>
        </div>
      </div>
      <div className='w-full bg-zinc-900 px-8 md:px-[200px] py-8 text-white text-center'>
        <p>© 2024 Stack Spot</p>
      </div>
    </>
  )
}

export default Footer