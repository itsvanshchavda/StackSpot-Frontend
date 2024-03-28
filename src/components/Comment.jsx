import React, { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDeleteCommentMutation, useUpdateCommentMutation } from '../api/comment';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Comment = ({ comment }) => {
    const getTimeElapsed = (timestamp) => {
        const currentDate = new Date();
        const commentDate = new Date(timestamp);
        const elapsedTime = Math.abs(currentDate - commentDate);
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };

    const { userInfo } = useSelector((state) => state.auth);
    const [deleteComment] = useDeleteCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [editMode, setEditMode] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.comment);
    const { useInfo } = useSelector((state) => state.auth);

    const deleteCommentHandler = async () => {
        try {
            const id = comment._id;
            await deleteComment(id);
            window.location.reload();
        } catch (err) {
            console.log(err);
            toast.error(err?.message || "Try again later!!");
        }
    };

    const handleUpdateComment = async () => {
        try {
            const id = comment._id;
            await updateComment({ id: id, comment: editedComment, author: userInfo?.user?.id });
            setEditMode(false);
            toast.success("Comment updated successfully!");
            window.location.reload();
        } catch (err) {
            console.log(err);
            toast.error(err?.message || "Try again later!!");
        }
    };

    useEffect(() => {
        setEditedComment(comment.comment)
    },[comment.comment])

    return (
        <>
            <div>
                <div className='px-2 py-2 bg-gray-200 my-2 rounded-md'>
                    <div className='flex items-center justify-between'>
                        <p className='font-bold text-gray-600'>{comment.author}</p>
                        <div className='flex justify-center items-center space-x-4 text-sm' >
                            <p>{getTimeElapsed(comment.updatedAt)}</p>
                            <div className='flex justify-center items-center space-x-2'>
                                {userInfo?.user?._id === comment.userId && !editMode && (
                                    <>
                                        <p className='cursor-pointer' onClick={() => setEditMode(true)}><BiEdit size={20} /></p>
                                        <p onClick={deleteCommentHandler} className='cursor-pointer'><MdDelete size={20} /></p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {editMode &&
                        <div className='mt-2'>
                            <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                                <textarea
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                    className='w-full md:w-2/3 px-4 py-2 bg-white rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-200 h-10'
                                    placeholder='Write your comment here...'
                                ></textarea>
                                <button
                                    type='submit'
                                    onClick={handleUpdateComment}
                                    className='w-full md:w-auto h-auto px-6 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300'
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    }
                    {!editMode && <p className='text-gray-600'>{comment.comment}</p>}
                </div>
            </div>
        </>
    );
};

export default Comment;
