import React, { useEffect } from 'react';
import avatar from '../assets/avatar.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { useFollowUserMutation, useUserFollowingListQuery } from '../api/user';

const Userfollowing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: userId } = useParams(); // Extracting userId from route params
    const [followUser] = useFollowUserMutation();

    // Fetch user's following list based on userId
    const { data, isLoading, isError } = useUserFollowingListQuery(userId);
    useEffect(() => {
        if (isError) {
            toast.error('Failed to fetch user following list.');
        }
    }, [isError]);



    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {data?.following?.length === 0 ? (
                <h2>No users followed by this user</h2>
            ) : (
                <div>
                    {data?.following?.map((followingUser) => (
                        <div className='flex items-center justify-between gap-3 mb-5 cursor-pointer' key={followingUser._id} onClick={() => navigate(`/profile/${followingUser._id}`)}>
                            <div className='flex items-center gap-3'>
                                <img src={followingUser.profilePhoto?.url ?? avatar} className='w-10 h-10 object-cover rounded-full' alt='' />
                                <p className='font-semibold' onClick={() => navigate(`/profile/${followingUser._id}`)}>
                                    {followingUser.username}
                                </p>
                            </div>
                            <div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Userfollowing;
