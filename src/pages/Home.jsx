import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HomePost from '../components/HomePost';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import { useGetAllPostQuery, useGetSearchPostMutation } from '../api/post';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Home = () => {
    const { data, isLoading, error } = useGetAllPostQuery();
    const { search } = useLocation();

    const [getSearchPost, { data: searchData, isLoading: loading }] = useGetSearchPostMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (search) {
            getSearchPost(search);

        } else {
            getSearchPost('');
        }
    }, [search]);




    return (
        <>
            <Navbar />

            <div className='px-8 py-8 md:px-[200px] min-h-[90vh]'>

                {error && <h1 className='text-2xl font-bold text-center mt-8'>Something went wrong</h1>}    
                
                {searchData?.searchedPost && searchData.searchedPost.length === 0 && (
                    <>
                        <h1 className='font-bold text-xl text-center mt-8 '>No Post Found</h1>
                    </>
                )}

                {
                    userInfo && (
                        <>
                            {search ? (
                                <>
                                    {searchData?.searchedPost.map(post => (
                                        <HomePost post={post} key={post._id} />
                                    ))}
                                </>
                            ) : (
                                <>
                                    {data && data.allPost.map(post => (
                                        <Link to={`/posts/post/${post._id}`} key={post._id}>
                                            <HomePost post={post} key={post._id} />
                                        </Link>
                                    ))}

                                </>
                            )}
                        </>
                    )
                }



                {!userInfo && <h1 className='text-2xl font-bold text-center mt-8'>Login to view posts</h1>}


                {isLoading && <Loader />}




            </div>

            <Footer />
        </>
    );
};

export default Home;
