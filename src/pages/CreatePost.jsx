import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { usePostUploadMutation, useUploadFileMutation } from '../api/post.js';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const { userInfo } = useSelector((state) => state.auth);

    const [uploadFile] = useUploadFileMutation();
    const [postUpload] = usePostUploadMutation();
    const navigate = useNavigate();

    const addCategory = () => {
        setCategoryList([...categoryList, category]);
        setCategory('');
    }

    const deleteCategory = (index) => {
        let updates = [...categoryList];
        updates.splice(index, 1);
        setCategoryList(updates);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            // Upload file first, if available
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                const res = await uploadFile(formData).unwrap();
                console.log("File Response", res); // Make sure to check the response structure

                const post = {
                    title,
                    description,
                    username: userInfo.user?.username,
                    userId: userInfo.user?._id,
                    categories: categoryList,
                    photo: res?.img?.filename
                };

                console.log("Post Data", post);

                // Create post
                const data = await postUpload(post).unwrap();
                navigate("/posts/post/" + data?.newPost._id);
                toast.success(data?.message);
            } else {
                // If no file is uploaded
                const post = {
                    title,
                    description,
                    username: userInfo.user?.username,
                    userId: userInfo.user?._id,
                    category: categoryList
                };

                // Create post
                const data = await postUpload(post).unwrap();
                navigate("/posts/post/" + data?.newPost._id);
                toast.success(data?.message);
            }
        } catch (err) {
            toast.error(err?.message || "Something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <div className='px-6 md:px-[200px] mt-14'>
                <h1 className='font-bold md:text-2xl text-xl mt-8'>Create a post</h1>
                <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4' onSubmit={submitHandler}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='bg-zinc-100 outline-none px-4 py-2 rounded-md' placeholder='Enter post title...' />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='bg-zinc-100 outline-none px-4 py-2 rounded-md' placeholder='Write description...' rows="6"></textarea>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" className='px-4 py-2 rounded-md' name='image' />
                    <div className='flex items-center space-x-4 md:space-x-8 '>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" name="category" id="category" className='px-4 bg-zinc-100 py-2 outline-none rounded-md' placeholder='Enter category...' />
                        <button type="button" onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-md '>
                            Add
                        </button>
                    </div>
                    <div className='flex mt-4'>
                        {categoryList?.map((item, index) => (
                            <div key={index} className='flex justify-center w-24 items-center mr-4 p-5 space-x-2 bg-gray-200 py-1 rounded-md'>
                                <p>{item}</p>
                                <p onClick={() => deleteCategory(index)} className='p-1 cursor-pointer' ><IoMdCloseCircle size={18} /></p>
                            </div>
                        ))}
                    </div>
                    <button type='submit' className='bg-zinc-900 mx-auto w-full md:w-[30%] py-3 px-4 text-white rounded-md mt-24'>Create</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CreatePost;
