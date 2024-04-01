import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import avatar from '../assets/avatar.jpg';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MyBlogs from '../components/MyBlogs';
import { useGetUserQuery } from '../api/user';
import Loader from '../components/Loader';
import MyBookmark from './MyBookmark';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = useParams().id;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeLink, setActiveLink] = useState('posts');
  const { data, isLoading } = useGetUserQuery(userId);

  const IMG = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    if (!isLoading && data) {
      setUserData(data.user);
    }
  }, [isLoading, data]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='px-4 h-screen'>

          <div className='flex md:flex-row justify-center flex-col-reverse '>

            <div className='md:w-2/3 md:px-4 '>
              <div className='flex justify-start items-center gap-6'>
                <h1 className={`text-xl  font-semibold cursor-pointer ${activeLink === 'posts' ? 'border-b-2 border-zinc-800  duration-300 ' : ''}`} onClick={() => setActiveLink('posts')}>Your posts</h1>
                <h1 className={`text-xl font-semibold cursor-pointer ${activeLink === 'bookmarks' ? 'border-b-2 border-zinc-800  duration-300 ' : ''}`} onClick={() => setActiveLink('bookmarks')}>Bookmarks</h1>
              </div>
              {activeLink === 'posts' ? (
                <>
                  <h1 className='text-xl font-bold mt-5'>Posts</h1>
                  <MyBlogs userId={userId} />
                </>
              ) : (
                <>
                  <h1 className='text-xl font-bold mt-5'>Bookmarks</h1>
                  <MyBookmark userId={userId} />
                </>

              )}
            </div>

            {/* right */}
            <div className='md:w-1/3 pl-4 mt-8 md:mt-20'>
              <div className='border-b-2 border-gray-100 mb-5'></div>
              <div className='px-4'>
                {/* <h1 className='text-xl font-bold mb-4'>Profile</h1> */}
                {!userData ? (
                  <Loader />
                ) : (
                  <>
                    <div className='flex items-center mb-4'>
                      {!userData?.profilePhoto ? (
                        <img src={avatar} alt='profile' className='w-24 h-24 rounded-full mr-4' />
                      ) : (
                        <img src={IMG + userData?.profilePhoto} alt='profile' className='w-24 h-24 rounded-full object-cover mr-4' />
                      )}
                      <div>
                        <h1 className='text-lg font-semibold'>
                          {userData?.firstname} {userData?.lastname}
                        </h1>
                        <p>{userData?.bio}</p>
                      </div>
                    </div>
                    {/* Edit profile */}
                    {userInfo?.user?._id === userId && (
                      <div>
                        <button className='btn-donate mt-3 btn-custom' onClick={() => navigate(`/profile/edit/${userInfo?.user?._id}`)}>Edit profile</button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className='border-b-2 border-gray-100 mb-3 mt-8'></div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
