import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from '../components/Comment';
import { useDeletePostMutation, useGetPostByIdQuery } from '../api/post';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useCreateCommentMutation, useGetAllCommentQuery } from '../api/comment';

const PostDetails = () => {
    const img = import.meta.env.VITE_IMG_URL;
    const postId = useParams().id;
    const { data, isLoading, isError } = useGetPostByIdQuery(postId);
    const { data: commentData, isLoading: commentLoader, error, refetch } = useGetAllCommentQuery(postId);
    const navigate = useNavigate();
    const [deletePost] = useDeletePostMutation();
    const [createComment] = useCreateCommentMutation();
    const [comment, setComment] = useState('');

    const { userInfo } = useSelector((state) => state.auth);

    const handleDelete = async () => {
        try {
            await deletePost(postId);
            toast.success("Post deleted✅");
            navigate('/');
        } catch (err) {
            toast.error(err?.message || "Something went wrong");
        }
    };

    const commentHandler = async (e) => {
        e.preventDefault();
        try {
            const commentData = {
                comment,
                postId,
                author: userInfo?.user?.username,
                userId: userInfo?.user?._id
            };
            const res = await createComment(commentData);
            setComment("");
            toast.success("Comment added✅");
            window.location.reload();

        } catch (err) {
            console.log(err);
            toast.error(err?.message || "Try again later");
        }
    };

    const hanleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <Navbar />
            {isLoading ? <Loader /> : (
                <div className='px-4 md:px-8 py-7 max-w-4xl mx-auto'>
                    <h1 className='text-4xl font-bold mb-4'>{data?.getPost.title}</h1>
                    <div className='flex items-center space-x-2 text-sm text-gray-600 mb-4'>
                        <p>{new Date(data?.getPost.updatedAt).toLocaleDateString()}</p>
                        <span>|</span>
                        <p>{new Date(data?.getPost.updatedAt).toLocaleTimeString()}</p>
                    </div>
                    <p className="text-[16px] font-semibold text-gray-800 mb-2">{data?.getPost.username}</p>
                    <img
                        src={img + data?.getPost.photo}
                        alt=""
                        className='w-full rounded-lg mb-6 shadow-xl'
                    />
                    <div className='text-lg text-gray-800 leading-relaxed mb-6 font-serif'>
                        {data?.getPost.description}
                    </div>
                    <div className='flex flex-wrap items-center space-x-2 mb-6'>
                        {data?.getPost?.categories.map((item, index) => (
                            <div key={index} className='bg-gray-200 rounded-md px-3 py-1 text-sm text-gray-600'>{item}</div>
                        ))}
                    </div>
                    <div className='flex items-center justify-between'>
                        {data?.getPost?.userId === userInfo?.user._id && (
                            <div className='flex items-center space-x-2'>
                                <button onClick={() => hanleNavigate(`/edit/${postId}`)} className='flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md'><BiEdit size={20} />Edit</button>
                                <button onClick={handleDelete} className='flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md'><MdDelete size={20} />Delete</button>
                            </div>
                        )}
                    </div>

                    {/* Comment Section */}
                    <h3 className='text-xl font-semibold mt-8 mb-4'>Comments:</h3>
                    {error ? <h2 className='text-red-400'>Comments not found!!</h2> : (
                        <>
                            {commentData?.comments?.map((item) => (
                                <>
                                    <Comment key={item._id} comment={item} />

                                </>

                            ))}
                        </>
                    )}
                    <div className='mt-8'>
                        <h3 className='text-xl font-semibold mb-4'>Write Comment:</h3>
                        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='w-full md:w-2/3 px-4 py-2 bg-gray-100 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-200' placeholder='Write your comment here...'></textarea>
                            <button disabled={commentLoader} type='submit' onClick={commentHandler} className='w-full md:w-auto px-6 bg-zinc-900 text-white rounded-md hover:bg-zinc-600 transition duration-300'>Comment</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default PostDetails;
