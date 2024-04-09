import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addLike, removeLike } from '../slices/PostSlice';
import { useSelector , useDispatch } from 'react-redux'
import { useGetUserQuery } from '../api/user';
import { useGetPostByIdQuery, useLikePostMutation, useUnlikePostMutation } from '../api/post';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Like = ({postId}) => {
    const { data, isLoading } = useGetPostByIdQuery(postId);
    const { likedPosts } = useSelector((state) => state.post);
    const { postData } = useSelector((state) => state.post)
    const [likecount, setLikeCount] = useState(0);
    const [likePost, { data: LikedData }] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch();



    useEffect(() => {
        if(data && postId){
            setLikeCount(data?.getPost?.likes?.length)
        }
    }, [data?.getPost , postId])


    const userId = userInfo?.user?._id;
    const handleLike = async () => {
        try {

            if (likedPosts?.some((post) => post.postId === postId)) {
                return toast.error("You have already liked this post");

            }
            await likePost({ id: postId, userId: userInfo?.user?._id });
            toast.success("Post liked");
            dispatch(addLike(userId));
            setLikeCount((prev) => prev+1)
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await unlikePost({ id: postId, userId: userInfo?.user?._id });
            toast.success("Post unliked");
            dispatch(removeLike(userId));
            setLikeCount((prev) => prev - 1)

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex gap-3 justify-start items-center mx-2'>
            {likedPosts.find((post) => post.userId === userId && post.postId === postId) !== undefined && likecount > 0 ? (
                <FaHeart size={21} className='cursor-pointer' color='red' onClick={handleUnlike} />
            ) : (
                <FaRegHeart size={21} className='cursor-pointer' onClick={handleLike} />
            )}
            <span className='mx-2'>{likecount}</span>
        </div>
    )
}

export default Like