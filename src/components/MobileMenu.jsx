import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUserlogoutMutation } from '../api/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/AuthSlice';
import Loader from './Loader';

const MobileMenu = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [userlogout, { isLoading }] = useUserlogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await userlogout().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error(err?.data?.message);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='shadow-2xl z-10 w-[200px] flex flex-col space-y-4 absolute top-14 right-6 md:right-32 bg-zinc-900 p-4 rounded-md '>
      {!userInfo && <>
        <Link to='/login'>
          <h3 className='text-white hover:text-gray-500 cursor-pointer'>Login</h3>
        </Link>
        <Link to='/register'>
          <h3 className='text-white hover:text-gray-500 cursor-pointer'>Register</h3>
        </Link>
      </>}
      {userInfo && <>
        <Link to={`/profile/${userInfo?.user?._id}`} >
          <h3 className='text-white hover:text-gray-500 cursor-pointer'>Profile</h3>
        </Link>
    
        <Link to={`/myblogs/${userInfo?.user?._id}`}>
          <h3 className='text-white hover:text-gray-500 cursor-pointer'>My blogs</h3>
        </Link>
        <h3 className='text-white hover:text-gray-500 cursor-pointer' onClick={handleLogout}>Logout</h3>
      </>}
    </div>
  );
};

export default MobileMenu;
