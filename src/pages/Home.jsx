import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HomePost from '../components/HomePost';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import { useGetAllPostQuery, useGetSearchPostMutation } from '../api/post';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPost } from '../slices/PostSlice';
import Sidebar from '../components/Sidebar';

const Home = () => {
    const { data, isLoading, error } = useGetAllPostQuery();
    const dispatch = useDispatch();
    const { search } = useLocation();
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);
    const [getSearchPost, { isLoading: searchLoader }] = useGetSearchPostMutation();

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
            <div className='px-8 py-8 md:px-[200px] min-h-[90vh]'>
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
                            <h1 className='font-bold text-xl text-center mt-8'>No Post Found</h1>
                        )}
                        {!loading && searchedPosts.map((post) => (
                            <HomePost post={post} key={post._id} />
                        ))}
                        {!search && data && data.allPost.map((post) => (
                            <Link to={`/posts/post/${post._id}`} key={post._id}>
                                <HomePost post={post} key={post._id} />
                            </Link>
                        ))}
                    </>
                )}
                {!userInfo && <h1 className='text-2xl font-bold text-center mt-8'>Login to view posts</h1>}
            </div>
            <Footer />
        </>
    );
};

export default Home;
