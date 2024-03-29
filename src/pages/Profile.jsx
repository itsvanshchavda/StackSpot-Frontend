import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import avatar from '../assets/avatar.jpg';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MyBlogs from '../components/MyBlogs';
import { useGetPostByIdQuery } from '../api/post.js';

const Profile = ({postId}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: userId } = useParams(); 
  console.log(postId)
  const { data: postData } = useGetPostByIdQuery(userId); 
  console

  const IMG = import.meta.env.VITE_IMG_URL;
  const navigate = useNavigate();

  // Fixing user data fetch by the specific post like not just one fetch proper
  

  return (
    <>
      <Navbar />
      <div className='px-8 md:px-[200px] h-[100vh] mt-8 flex md:flex-row flex-row-reverse md:items-start items-start'>
        <div className='flex flex-col md:w-[70%] w-full mt-8  md:mt-0'>
          <h1 className='text-xl font-bold mb-2'>Your posts</h1>
          <MyBlogs userId={userId} />
        </div>

        {/* right */}
        <div className='flex sm:sticky justify-start items-center space-y-4 md:w-[30%] w-full md:items-start md:justify-end'>
          <div className='rotate-90 border-b-2 border-gray'></div>
          <div className='flex flex-col items-start'>

            <h1 className='text-xl font-bold mb-6 px-5'>Profile</h1>

            {!userInfo?.user?.profilePhoto ? (
              <img src={avatar} alt='profile' className='w-24 h-24 rounded-full' />
            ) : (
              <img src={IMG + userInfo?.user?.profilePhoto} alt='profile' className='w-24 h-24 rounded-full object-cover' />
            )}
            <div>
              <h1 className='text-lg mx-2  font-semibold mt-5'>
                {postData?.getPost?.firstname} {postData?.lastname} 
              </h1>

              <p className='mx-2 mt-2'>{userInfo?.user?.bio}</p>
            </div>

            {/* Edit profile */}
            {userInfo?.user?._id === userId && (
              <div>
                <button className='btn-donate mt-3 btn-custom' onClick={() => navigate(`/profile/edit/${userInfo?.user?._id}`)}>Edit profile</button>
              </div>
            )}

          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Profile;
