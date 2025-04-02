import React, { useEffect, useRef } from 'react';
import avatar from '../../assets/avatar.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserFollowerListQuery } from '../../api/user';
import Loader from '../../components/Loader/Loader';


const UserFollowing = () => {
    const navigate = useNavigate();
    const { id: userId } = useParams();
    const scrollContainerRef = useRef(null);

    const { data, isLoading, isError } = useUserFollowerListQuery(userId);

    useEffect(() => {
        if (isError) {
            toast.error('Failed to fetch user following list.');
        }
    }, [isError]);

    const navigateToProfile = (followerId) => {
        navigate(`/profile/${followerId}`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader />
            </div>
        );
    }

    const followers = data?.followers || [];

    return (
        <div className="flex flex-col h-full max-h-screen">
            <h2 className="text-xl font-bold mb-4 px-4 pt-2 sticky top-0 bg-white z-10">
                Following
                <span className="text-gray-500 text-sm ml-2">({followers.length})</span>
            </h2>

            {followers.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-gray-500">
                    <p>No users followed by this user</p>
                </div>
            ) : (
                <div
                    ref={scrollContainerRef}
                    className="overflow-y-auto px-4 pb-4 flex-grow custom-scrollbar"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#cbd5e0 #f7fafc'
                    }}
                >
                    {followers.map((followingUser) => (
                        <div
                            className="flex items-center justify-between gap-3 p-3 mb-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            key={followingUser._id}
                            onClick={() => navigateToProfile(followingUser._id)}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={followingUser.profilePhoto?.url ?? avatar}
                                    className="w-12 h-12 object-cover rounded-full border border-gray-200"
                                    alt={`${followingUser.username}'s profile`}
                                    loading="lazy"
                                />
                                <div>
                                    <p className="font-semibold">{followingUser.username}</p>
                                    {followingUser.fullName && (
                                        <p className="text-sm text-gray-500">{followingUser.fullName}</p>
                                    )}
                                </div>
                            </div>
                            <button
                                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Add your follow/unfollow handler here
                                }}
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserFollowing;