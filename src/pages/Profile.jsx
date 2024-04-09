import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import avatar from '../assets/avatar.jpg';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MyBlogs from '../components/MyBlogs';
import { useGetUserQuery, useUnfollowUserMutation, useUserFollowerListQuery, useUserFollowingListQuery } from '../api/user';
import Loader from '../components/Loader';
import MyBookmark from './MyBookmark';
import Userfollowing from './Userfollowing';
import { FaTimes } from 'react-icons/fa';
import { useFollowUserMutation } from '../api/user'; // Import the isFollowing query
import UserFollowers from './UserFollowers';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addFollower, addFollowing } from '../slices/AuthSlice';
import PostDetails from './PostDetails';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = useParams().id;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeLink, setActiveLink] = useState('posts');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('following');
  const { data, isLoading } = useGetUserQuery(userId);
  const [followUser] = useFollowUserMutation(); // Initialize the follow user mutation
  const [unfollowUser] = useUnfollowUserMutation(); // Initialize the unfollow user mutation
  const { data: isFollowingData, isLoading: isFollowingLoading, refetch: refetchFollowing, isSuccess: Following } = useUserFollowingListQuery(userId); // Query to check if the user is already following
  const { data: isFollowerData, isLoading: isFollowerLoading, refetch: refetchFollowers, isSuccess: Followers } = useUserFollowerListQuery(userId); // Query to check if the user is already following
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);




  useEffect(() => {
    if (!isLoading && data) {
      setUserData(data.user);

    }
  }, [isLoading, data, userData]);

  useEffect(() => {
    return () => {
      setShowModal(false);
    };
  }, [userId]);



  const handleFollowingClick = () => {
    setShowModal(true);
    setModalType('following');
  };

  const handleFollowersClick = () => {
    setShowModal(true);
    setModalType('followers');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFollow = async () => {
    try {
      const res = await followUser(userId).unwrap();
      refetchFollowing();
      refetchFollowers();
      toast.success(res?.message || 'User followed successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error following user:', error);
      toast.error(error?.data?.message || 'Failed to follow user');
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(userId).unwrap();
      refetchFollowing();
      refetchFollowers();
      toast.success('User unfollowed successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast.error(error?.data?.message || 'Failed to unfollow user');
    }
  };



  return (
    <>
      <Navbar />
      <div className={`px-4 pb-20 overflow-y-auto ${theme ? " bg-gradient-to-b from-black to-gray-900 via-black text-white" : ""}  `}>
        <div className='flex md:flex-row justify-center flex-col-reverse '>
          <div className='md:w-2/3 md:px-4 mt-4'>
            {userInfo?.user?._id === userId && (
              <div className='flex justify-start items-center gap-6'>
                <h1 className={`text-xl  font-semibold cursor-pointer ${activeLink === 'posts' ? 'border-b-2 border-zinc-800  duration-300 ' : ''}`} onClick={() => setActiveLink('posts')}>Your posts</h1>
                <h1 className={`text-xl font-semibold cursor-pointer ${activeLink === 'bookmarks' ? 'border-b-2 border-zinc-800  duration-300 ' : ''}`} onClick={() => setActiveLink('bookmarks')}>Bookmarks</h1>
              </div>
            )}
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
          <div className='md:w-1/3 pl-4 mt-8 md:mt-20'>
            <div className={`border-b-2  mb-5 ${theme ? "border-slate-700" : "border-gray-100"}`}></div>
            <div className='px-4'>
              {!userData ? (
                <Loader />
              ) : (
                <>
                  <div className='flex items-center mb-4'>
                    <img src={userData?.profilePhoto?.url ?? avatar} alt='profile' className='w-24 h-24 rounded-full object-cover mr-4' />
                    <div>
                      <div className='text-lg font-semibold flex gap-3 items-center'>
                        <p>{userData?.firstname}</p>
                        <p> {userData?.lastname}</p>
                      </div>
                      <p>{userData?.bio}</p>
                    </div>
                  </div>
                  {userInfo?.user?._id === userId ? (
                    <button className='btn-donate mt-3 btn-custom' onClick={() => navigate(`/profile/edit/${userInfo?.user?._id}`)}>Edit profile</button>
                  ) : (
                    null
                  )}

                  {/* Follow and unfollow button */}
                  <div>


                    {userInfo?.user?._id !== userId && (
                      <div>
                        {isFollowerData?.followers?.find((user) => user._id === userInfo?.user?._id) ? (
                          <div>
                            <button className={`px-20 py-1 rounded-lg ${theme ? "bg-gray-200 text-black" : "bg-zinc-900 text-white"}`} onClick={handleUnfollow}>
                              Unfollow
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button className={`px-20 py-1 rounded-lg ${theme ? "bg-gray-200 text-black" : "bg-zinc-900 text-white"}`} onClick={handleFollow}>
                              Follow
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                  </div>


                </>
              )}

              <div className='mt-4 '>
                <div className='flex gap-2'>
                  <p className='font-sans'>{userData?.followers?.length || 0}</p>
                  <p className='font-semibold cursor-pointer' onClick={handleFollowersClick}>Followers</p>
                  <p className='font-sans'>{userData?.following?.length || 0}</p>
                  <p className='cursor-pointer font-semibold' onClick={handleFollowingClick}>Following</p>
                </div>
              </div>
            </div>
            <div className={`border-b-2 mt-5 ${theme ? "border-slate-700" : "border-gray-100"}`}></div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className={`${theme? "bg-zinc-950 text-white" : "bg-white text-black"} p-4 rounded-lg max-w-2xl`}>
              <div className=''>
                <button onClick={closeModal} className='flex gap-3 mt-2'>
                  <span className='font-semibold'>{modalType === 'following' ? 'Following' : 'Followers'}</span>
                  <FaTimes className='mt-1 mb-5' />
                </button>
              </div>
              <div className="">
                {modalType === 'following' ? <Userfollowing /> : <UserFollowers />}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
