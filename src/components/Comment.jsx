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
    const { useInfo } = useSelector((state) => state.auth)
    const postId = useParams().id;



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
            const updatedData = await updateComment({ id: id, comment: editedComment, author: userInfo?.user?.id });
            const updatedComment = updatedData?.data?.updateComment
            setEditMode(false);
            toast.success("Comment updated successfully!");
        } catch (err) {
            console.log(err);
            toast.error(err?.message || "Try again later!!");
        }
    };

    return (
        <>
            {/* Comments */}
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
                        <div>
                            <textarea
                                className="px-4 mt-2 border rounded-md"
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                            />
                            <button onClick={handleUpdateComment} className="bg-zinc-900  text-white font-bold py-2 px-4 rounded mt-2">
                                Save
                            </button>


                        </div>
                    }

                    {editMode ? <>
                        <p>{comment.comment}</p>
                    </> : <><p>{editedComment}</p></>
                    }



                </div>
            </div>
        </>
    );
};

export default Comment;
