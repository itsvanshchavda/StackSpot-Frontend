import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import {
    useGetPostByIdQuery,
    useLikePostMutation,
    useDeletePostMutation,
    useAddBookmarkMutation,
    useUnlikePostMutation,
} from '../api/post';
import { useCreateCommentMutation, useGetAllCommentQuery } from '../api/comment';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import Loader from '../components/Loader';
import avatar from '../assets/avatar.jpg';
import { addLike, getPost, removeLike } from '../slices/PostSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BsBookmark } from 'react-icons/bs';
import { IoPlayCircleOutline, IoShareOutline } from "react-icons/io5";
import { useGetUserQuery } from '../api/user';
import PostDetailSkeleton from '../components/PostDetailSkeleton';

const PostDetails = () => {
    const postId = useParams().id;
    const { data, isLoading } = useGetPostByIdQuery(postId);
    const { data: commentData, isLoading: commentLoader, error: commentError, refetch } = useGetAllCommentQuery(postId);
    const navigate = useNavigate();
    const [deletePost] = useDeletePostMutation();
    const [addBookmark] = useAddBookmarkMutation();
    const [createComment] = useCreateCommentMutation();
    const [likePost, { data: LikedData }] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const [comment, setComment] = useState('');
    const { userInfo } = useSelector((state) => state.auth);
    const {postLiked} = useSelector((state) => state.post);
    const [showLoader, setShowLoader] = useState(true);
    const likesArray = useMemo(() => data?.getPost?.likes.map((item) => item._id) || [], [data]);
    const isUserLiked = useMemo(() => likesArray.includes(userInfo?.user?._id), [likesArray, userInfo]);
    const [likeCount, setLikeCount] = useState(likesArray?.length || 0);
    const [isLiked, setIsLiked] = useState(isUserLiked);

   
   
    const img = import.meta.env.VITE_IMG_URL;
    const dispatch = useDispatch();


    useEffect(() => {
        const delay = setTimeout(() => {
            setShowLoader(false);
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    useEffect(() => {
        if (data && data.getPost) {
            dispatch(getPost(data?.getPost));
            setLikeCount(data?.getPost?.likes.length);
        }
    }, [data, dispatch,]);





    const handleBookmark = async () => {
        try {
            await addBookmark(postId, userInfo?.user?._id);
            dispatch(addBookmark(postId));
            toast.success("Post bookmarked successfully");
        } catch (err) {
            toast.error(err?.message || "Failed to bookmark the post");
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost(postId);
            toast.success("Post deleted successfully");
            navigate('/');
        } catch (err) {
            toast.error(err?.message || "Failed to delete the post");
            console.log(err);
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
            await createComment(commentData);
            setComment("");
            toast.success("Comment added successfully");
            refetch(); // Refresh comments
        } catch (err) {
            toast.error(err?.message || "Failed to add comment");
            console.log(err);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };



    //User details of post liked 
    

    const handleLike = async () => {
        try {

            if (isLiked) return toast.warning("You have already liked this post");
            await likePost({ id: postId, userId: userInfo?.user?._id });
            toast.success("Post liked");
            setLikeCount((prevCount) => prevCount + 1);
            setIsLiked(true);
            dispatch(addLike());

        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await unlikePost({ id: postId, userId: userInfo?.user?._id });
            toast.success("Post unliked");
            setLikeCount((prevCount) => Math.max(prevCount - 1, 0)); // Ensure like count doesn't go below 0
            setIsLiked(false);
            dispatch(removeLike());

        } catch (err) {
            console.log(err);
        }
    };







    return (
        <>
            <Navbar />
            {showLoader ? <PostDetailSkeleton /> : (
                <div className='px-4 md:px-8 py-7 max-w-4xl mx-auto'>
                    <h1 className='text-4xl font-bold mb-4'>{data?.getPost?.title}</h1>
                    <div className='flex items-center space-x-2 text-sm text-gray-600 mb-4'>
                        <p>{new Date(data?.getPost?.updatedAt).toLocaleDateString()}</p>
                        <span>|</span>
                        <p>{new Date(data?.getPost?.updatedAt).toLocaleTimeString()}</p>
                    </div>

                    <div className='flex gap-3 mb-5 justify-start items-center'>
                      {isUserLiked || postLiked ? <FaHeart size={21} className='cursor-pointer' color='red' onClick={handleUnlike} /> : <FaRegHeart size={21} className='cursor-pointer' onClick={handleLike} />}
                        <span className='mx-2'>{likeCount}</span>
                    </div>

                    <div className='border-gray-100 border-b-2 mb-2'>
                        <div>
                            
                        </div>
                    </div>

                       

                 

                    <div className="flex mb-5 mt-4">
                        <button className="flex text-gray-500 flex-grow justify-end gap-6">
                            <span ><BsBookmark onClick={handleBookmark} className='cursor-pointer' size={21} /></span>
                            <span><IoPlayCircleOutline size={21} className='cursor-pointer' title="Play" /></span>
                            <span><IoShareOutline size={21} className='cursor-pointer' title="Share" /></span>
                        </button>
                    </div>

                    <div className='border-b-2 mb-5 border-gray-100 '></div>

                    <img
                        src={`${import.meta.env.VITE_IMG_URL}${data?.getPost?.photo}`}
                        alt=""
                        className='w-full rounded-lg mb-6 shadow-xl'
                    />
                    <div className='text-lg text-gray-800 leading-relaxed mb-6 font-serif' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.getPost?.description) }} />

                    <div className='flex flex-wrap items-center space-x-2 mb-6'>
                        {data?.getPost?.categories.map((item, index) => (
                            <div key={index} className='bg-gray-200 rounded-md px-3 py-1 text-sm text-gray-600'>{item}</div>
                        ))}
                    </div>

                    <div className='flex items-center justify-between'>
                        {data?.getPost?.userId === userInfo?.user?._id && (
                            <div className='flex items-center space-x-2'>
                                <button onClick={() => handleNavigate(`/edit/${postId}`)} className='flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md'><BiEdit size={20} />Edit</button>
                                <button onClick={handleDelete} className='flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md'><MdDelete size={20} />Delete</button>
                            </div>
                        )}
                    </div>

                    <h3 className='text-xl font-semibold mt-8 mb-4'>Comments:</h3>
                    {commentError ? <h2 className='text-red-400'>Comments not found!!</h2> : (
                        <>
                            {commentData?.comments?.map((item) => (
                                <Comment key={item._id} comment={item} userData={item.userId} />
                            ))}
                        </>
                    )}

                    <div className='mt-8'>
                        <h3 className='text-xl font-semibold mb-4'>Write Comment:</h3>
                        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='w-full md:w-2/3 px-4 py-2 bg-gray-100 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-200' placeholder='Write your comment here...'></textarea>
                            <button disabled={commentLoader} type='submit' onClick={commentHandler} className='w-full md:w-auto h-12 px-6 bg-zinc-900 text-white rounded-md hover:bg-zinc-600 transition duration-300'>Comment</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default PostDetails;
