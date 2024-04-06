import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className='mt-8 w-full bg-zinc-900 px-8 md:px-[200px] flex md:flex-row flex-col justify-center items-center  md:justify-between text-sm py-8 md:mt-8 md:text-md'>
        {/* <div className='flex flex-col text-white'>
          <p>Features Blogs</p>
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
        </div> */}



      </div>
      <div className='w-full bg-zinc-900 px-8 md:px-[200px] py-8 text-white text-center'>
        <p>Made by <span className='text-indigo-400 font-semibold'>Vansh Chavda</span></p>
        <div className='flex justify-center mt-4 mb-5'>
          <FaLinkedin className='mx-2 cursor-pointer' size={24} onClick={() => window.open('https://linkedin.com/in/vanshchavda07', '_blank')}/>
          <FaTwitter className='mx-2 cursor-pointer' size={24} onClick={() => window.open('https://twitter.com/vanshchavda_', '_blank')} />
          <FaGithub className='mx-2 cursor-pointer' size={24} onClick={() => window.open('https://github.com/itsvanshchavda', '_blank')} />
        </div>
        <p>© 2024 Stack Spot</p>
      </div>
    </>
  );
};

export default Footer;
