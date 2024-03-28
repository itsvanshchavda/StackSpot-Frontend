import React from 'react';

const HomePost = ({ post }) => {

  const imgURL = `${import.meta.env.VITE_IMG_URL}/${post.photo}`;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8 max-xl:grid-cols-1'>
      {/* Left */}
      <div className='h-[200px] md:h-auto'>
        <img src={imgURL} alt="" className='w-full h-full object-cover' />
      </div>
      {/* Right */}
      <div className='flex flex-col'>
        <h1 className='text-xl font-bold md:text-2xl'>{post.title}</h1>
        <div className='flex mb-2 text-sm font-semibold text-gray-500 justify-between items-center md:mb-4'>
          <p>{post.username}</p>
          <div className='flex space-x-2'>
            {/* You may want to format date and time here */}
            <p>{new Date(post.updatedAt).toString().slice(0, 10)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className='text-sm md:text-lg'>{post.description.slice(0, 200) + "..Read More"}</p>
      </div>
    </div>
  );
};

export default HomePost;
