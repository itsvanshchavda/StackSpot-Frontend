import React from 'react';
import DOMPurify from 'dompurify';

const HomePost = ({ post }) => {
  const imgURL = `${import.meta.env.VITE_IMG_URL}/${post.photo}`;
  const desc = DOMPurify.sanitize(post.description.slice(0, 80) + "..Read More");

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8 max-xl:grid-cols-1'>
      {/* Left (Image) */}
      <div className='h-[200px] md:h-auto'>
        <img src={imgURL} alt="" className={`w-full h-full max-xl:object-contain object-cover rounded-lg`} />
      </div>
      {/* Right (Text) */}
      <div className='flex flex-col'>
        <h1 className='text-xl font-bold md:text-2xl'>{post.title}</h1>
        <div className='flex mb-2 text-sm font-semibold text-gray-500 justify-between items-center md:mb-4'>
          <p>{post.username}</p>
          <div className='flex space-x-2'>
            {/* Format date and time */}
            <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
        {/* Add max-width for tablet devices */}
        <p className='text-sm md:text-base max-w-xl' dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
    </div>
  );
};

export default HomePost;
