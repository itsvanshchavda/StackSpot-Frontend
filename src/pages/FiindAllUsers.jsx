import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BsSearch } from 'react-icons/bs';

const FindAllUsers = () => {
  return (
    <div className='relative'>
      <Navbar />
      <div className='flex justify-center items-center mt-10 absolute '>
        <BsSearch size={20} className='text-gray-500' />
        <input
          type='text'
          placeholder='Search...'
          className='p-2 ml-2 rounded-md outline-none border-b-2 border-gray-500'
        />
      </div>
      <Footer />
    </div>
  );
};

export default FindAllUsers;
