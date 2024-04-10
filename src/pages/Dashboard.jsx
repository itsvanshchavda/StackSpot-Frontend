import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useSelector } from 'react-redux'
import { FaBookBookmark, FaEye } from "react-icons/fa6";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { FaBookmark, FaHeart, FaUser } from 'react-icons/fa';
import { useGetUserPostQuery } from '../api/post';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { useUserFollowerListQuery } from '../api/user';
import avatar from '../assets/avatar.jpg'




const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const userId = userInfo?.user?._id
  const { data } = useGetUserPostQuery(userId)
  const { data: followerData } = useUserFollowerListQuery(userId);


  return (
    <>
      <Navbar />

      <div className='h-[90vh]'>
        <article className="flex  items-center max-sm:flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">

          {/* Views */}

          <div className='flex items-center gap-5 mx-auto'>
            <span className="rounded-full bg-slate-200 p-3 text-black ">

              <FaUser />
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">200</p>

              <p className="text-sm text-gray-500">Total Followers</p>
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


        <div className='md:px-[160px] mt-14 flex flex-row justify-between'>

          <div>

            {data?.userPost.length > 0 && (
              <>
                <h1 className='font-semibold text-xl'>Recent posts</h1>
                <div className='max-w-2xl mt-10'>
                  {data?.userPost?.map((post) => (
                    <div className="flex items-start gap-4 cursor-pointer " onClick={() => navigate(`/posts/post/${post._id}`)}>
                      <img
                        src={post.photo.url}
                        alt=""
                        className="w-[300px] rounded-lg object-cover"
                      />

                      <div>
                        <h3 className="text-lg/tight font-medium mb-3 text-gray-900">{post.title}</h3>

                        <p className='text-sm md:text-md w-[60%]' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description.slice(0, 100) + "..Read More") }} />

                      </div>
                    </div>


                  ))}
                </div>
              </>
            )}



          </div>

          {followerData?.followers.length > 0 &&
            <div>
              <h1 className='font-semibold text-xl'>Recent followers</h1>
              <div>
                
                {followerData?.followers?.map((followingUser) => (
                  <div className='flex mt-5 items-center justify-between gap-3 mb-5 cursor-pointer' key={followingUser._id} onClick={() => navigate(`/profile/${followingUser._id}`)}>
                    <div className='flex items-center gap-3'>
                      <img src={followingUser.profilePhoto?.url ?? avatar} className='w-10 h-10 object-cover rounded-full' alt='' />
                      <p className='font-semibold' onClick={() => navigate(`/profile/${followingUser._id}`)}>
                        {followingUser.username}
                      </p>
                    </div>
                    <div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          }


        </div>


      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
