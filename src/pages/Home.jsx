import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HomePost from '../components/HomePost';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import { useGetAllPostQuery, useGetFollowingPostQuery, useGetSearchPostMutation, useGetUserPostQuery } from '../api/post';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPost } from '../slices/PostSlice';
import Sidebar from '../components/Sidebar';
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useUserFollowingListQuery } from '../api/user';


const Home = () => {
    const { data, isLoading, error } = useGetAllPostQuery();
    const dispatch = useDispatch();
    const { search } = useLocation();
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [followingPosts, setFollowingPosts] = useState([])
    const [loading, setLoading] = useState(false);
    const [activeLink, setActiveLink] = useState('explore');
    const { theme } = useSelector((state) => state.theme)
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [getSearchPost, { isLoading: searchLoader }] = useGetSearchPostMutation();
    const { data: followingData } = useGetFollowingPostQuery();





    useEffect(() => {
        const fetchSearch = async () => {
            try {
                const { data } = await getSearchPost(search);
                if (data && data.searchedPost) {
                    setSearchedPosts(data.searchedPost);
                } else {
                    setSearchedPosts([]);
                }
            } catch (err) {
                toast.error('Something went wrong');
            }
        };

        if (search) {
            fetchSearch();
        } else {
            setSearchedPosts([]);
        }
    }, [search]);

    return (
        <>
            <Navbar />

            <div className={`px-8 min-h-screen py-8 md:px-[200px] min-h-auto ${theme ? " bg-gradient-to-b from-black to-gray-900 via-black text-white" : ""} `}>

               
                {!search && (
                    <div className='flex justify-center items-center gap-5 text-xl font-semibold font-sans '>
                        <h1 className={`text-xl  font-semibold cursor-pointer ${activeLink === 'explore' ? 'border-b-2 border-zinc-800  duration-300 ' : ''}`} onClick={() => setActiveLink('explore')}>Explore</h1>
                        <h1 className={`text-xl font-semibold cursor-pointer ${activeLink === 'following' ? 'border-b-2 border-zinc-800  duration-300 ' : ''}`} onClick={() => setActiveLink('following')}>Following</h1>
                    </div>

                )}



                {error && <h1 className='text-2xl font-bold text-center mt-8'>Something went wrong</h1>}


                {userInfo && (
                    <>

                        {
                            !search && (
                                <Sidebar />
                            )
                        }

                        {searchLoader && <Loader />}
                        {!loading && searchedPosts.length === 0 && search && (
                            <h1 className='font-bold text-xl text-center h-[90vh] mt-8'>No Post Found</h1>
                        )}
                        {!loading && searchedPosts.map((post) => (
                            <HomePost post={post} key={post._id} />
                        ))}

                        {activeLink === "following" ? (
                            <div>
                                {followingData?.followingPost?.map((post) => (
                                    <HomePost post={post} key={post._id} />
                                ))}
                            </div>
                        ) : (
                            <>
                                {!search && data && data.allPost.map((post) => (
                                    <Link to={`/posts/post/${post._id}`} key={post._id}>
                                        <HomePost post={post} key={post._id} />
                                    </Link>
                                ))}
                            </>
                        )}

                    </>
                )}
                {!userInfo && <h1 className='text-2xl font-bold text-center mt-8'>Login to view posts</h1>}
            </div>
            <Footer />
        </>
    );
};

export default Home;
