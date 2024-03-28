import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import profile from '../assets/me.jpg'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserQuery } from '../api/user'


const Profile = () => {

  const userId = useParams().id
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetUserQuery(userId)
  const IMG = import.meta.env.VITE_IMG_URL;
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className='px-8 md:px-[200px] h-[100vh] mt-8 flex md:flex-row flex-row-reverse md:items-start items-start'>
        <div className='flex flex-col md:w-[70%] w-full mt-8  md:mt-0'>
          <h1 className='text-xl font-bold mb-2'>Your posts</h1>


        </div>

        {/* right */}
        <div className='flex sm:sticky justify-start items-center space-y-4 md:w-[30%] w-full md:items-start md:justify-end'>
          <div className='rotate-90 border-b-2 border-gray'></div>
          <div className='flex flex-col items-start'>

            <h1 className='text-xl font-bold mb-6 px-5'>Profile</h1>

            <img src={IMG + data?.user?.profilePhoto} alt="" className='w-[100px] h-[100px] object-cover rounded-full' />
            <h1 className='text-lg px-1 font-semibold mt-4'>{data?.user?.username}</h1>

            {/* Edit profile */}

            <div>
              <button className='btn-donate mt-3 btn-custom' onClick={() => navigate(`/profile/edit/${userInfo?.user?._id}`)}>Edit profile</button>
            </div>


          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Profile