import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Dashboard</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Views</h2>
           
          </div>

          {/* User Posts */}
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>User Posts</h2>
            {/* Your user posts content goes here */}
          </div>

          {/* Likes */}
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Likes</h2>
            {/* Your likes content goes here */}
          </div>

          {/* Comments */}
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Comments</h2>
            {/* Your comments content goes here */}
          </div>

          {/* Bookmarks */}
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Bookmarks</h2>
            {/* Your bookmarks content goes here */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
