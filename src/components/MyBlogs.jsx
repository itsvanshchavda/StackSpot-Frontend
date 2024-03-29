import React from 'react';
import DOMPurify from 'dompurify';
import { useGetUserPostQuery } from '../api/post';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
const MyBlogs = () => {

    const userId = useParams().id;
    const { data , isLoading } = useGetUserPostQuery(userId);
    const IMG = import.meta.env.VITE_IMG_URL;
    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8 max-xl:grid-cols-1'>
            {/* Left */}

            {/* Right */}
            {data?.userPost?.map((post) => (
                <>
                    <div className='h-[200px] md:h-auto' key={post._id}>
                        <img src={IMG + post.photo} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='flex flex-col cursor-pointer' onClick={() => navigate(`/posts/post/${post._id}`)}>
                        <h1 className='text-xl font-bold md:text-2xl'>{post.title}</h1>
                        <div className='flex mb-2 text-sm font-semibold text-gray-500 justify-between items-center md:mb-4'>
                            <p>{post.firstname} {post.lastname}</p>
                            <div className='flex space-x-2'>
                                {/* You may want to format date and time here */}
                                <p>{new Date(post.updatedAt).toString().slice(0, 10)}</p>
                                <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                            </div>
                        </div>
                        <p className='text-sm md:text-lg' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description.slice(0, 200) + "..Read More") }} />
                    </div>
                 

                </>

                


            ))}
           {isLoading && <Loader />}
            
        </div>

        
    );
};

export default MyBlogs;
