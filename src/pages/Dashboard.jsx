import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useSelector } from 'react-redux'
import { FaBookBookmark, FaEye } from "react-icons/fa6";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { FaBookmark, FaHeart } from 'react-icons/fa';



const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className='h-[90vh]'>
        <article className="flex  items-center max-sm:flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">



          {/* Views */}

          <div className='flex items-center gap-5 mx-auto'>
            <span className="rounded-full bg-slate-200 p-3 text-black ">

              <FaEye />
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">200</p>

              <p className="text-sm text-gray-500">Total Views</p>
            </div>

            <div className='inline-flex gap-2 px-3 mb-3 rounded bg-green-100 p-1 text-green-600'>

              <div className='inline-flex'>
                <BsGraphUpArrow color='green' />
              </div>

              <span class="text-xs font-medium text-green-500"> 67.81% </span>
            </div>

          </div>

          {/* Likes */}

          <div className='flex items-center gap-5 mx-auto '>
            <span className="rounded-full bg-slate-200 p-3 text-black ">

              <FaHeart />
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">100</p>

              <p className="text-sm text-gray-500">Total Likes</p>
            </div>

            <div className='inline-flex gap-2 px-3 mb-3 rounded bg-red-100 p-1 text-red-600'>

              <div className='inline-flex'>
                <BsGraphDownArrow color='red' />
              </div>

              <span class="text-xs font-medium text-red-500"> 67.81% </span>
            </div>

          </div>


          {/* Bookmark */}

          <div className='flex items-center gap-5 mx-auto'>
            <span className="rounded-full bg-slate-200 p-3 text-black ">

              <FaBookmark />
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">50</p>

              <p className="text-sm text-gray-500">Total Bookmark</p>
            </div>

            <div className='inline-flex gap-2 px-3 mb-3 rounded bg-red-100 p-1 text-red-600'>

              <div className='inline-flex'>
                <BsGraphDownArrow color='red' />
              </div>

              <span class="text-xs font-medium text-red-500"> 80.81% </span>
            </div>

          </div>

          {/* List of posts */}






        </article>


        <div className='md:px-[160px] mt-10'>
          <div>
            <h1 className='font-semibold text-xl'>Recent posts</h1>
          </div>
          <div></div>
        </div>

        {/* <article
          className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6 sm:justify-between"
        >

          <div>
            <p className="text-2xl font-medium text-gray-900">$240.94</p>

            <p className="text-sm text-gray-500">Total Sales</p>
          </div>
        </article> */}
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
