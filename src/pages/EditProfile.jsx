import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAddProfilePhotoMutation, useGetUserQuery, useUpdateUserMutation } from '../api/user';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/AuthSlice';
import avatar from '../assets/avatar.jpg';

const EditProfile = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(0);
    const [preview, setPreview] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [updateUser] = useUpdateUserMutation();
    const [addProfilePhoto] = useAddProfilePhotoMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const id = useParams().id;
    const img = import.meta.env.VITE_IMG_URL;
    const dispatch = useDispatch();
    const { data, error } = useGetUserQuery(id);

    useEffect(() => {
        if (data && data.user) {
            const user = data.user;
            setUserId(user._id);
            setUsername(user.username);
            setEmail(user.email);
            setPassword(user.password);
            setBio(user.bio);
            setFirstname(user.firstname);
            setLastname(user.lastname);

            if (user.profilePhoto) {
                setPreview(`${img}${user.profilePhoto}`);
            }
        }
    }, [data]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const imageUrl = URL.createObjectURL(selectedFile);
            setPreview(imageUrl);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let profilePhotoFilename = null;
            if (file) {
                const formData = new FormData();
                formData.append('profilePhoto', file);
                const res = await addProfilePhoto(formData).unwrap();
                profilePhotoFilename = res.profilePhoto;
                toast.success('Profile photo updated');
            }

            const newUserInfo = {
                username: username,
                email: email,
                bio: bio,
                password: password,
                firstname: firstname,
                lastname: lastname,
                profilePhoto: profilePhotoFilename,
            };

            const updatedUser = await updateUser({ userid: id, user: newUserInfo }).unwrap();
            toast.success('User info updated');
            dispatch(setCredentials(updatedUser));
            window.location.reload();
        } catch (err) {
            console.log(err);
            toast.error(err?.message || 'Failed to update user info');
        }
    };

    return (
        <>
            <Navbar />

            <div className="bg-white w-full flex flex-col mt-2 gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-black ">
                {/* Sidebar */}
                <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                    <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-zinc-100 top-12">
                        <h2 className="pl-[2.8em] mb-4 text-2xl font-semibold">Settings</h2>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4">
                        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="grid max-w-2xl mx-auto mt-8">
                                    {/* Profile Picture */}
                                    <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0">
                                        <img
                                            className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-zinc-300 dark:ring-zinc-500"
                                            src={preview ? preview : (data?.user?.profilePhoto ? `${img}${data?.user?.profilePhoto}` : avatar)}
                                            alt="Profile Avatar"
                                        />
                                        <div className="flex flex-col space-y-5 sm:ml-8">
                                            <label htmlFor="profilePicInput" className="cursor-pointer">
                                                <input
                                                    type="file"
                                                    id="profilePicInput"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => document.getElementById('profilePicInput').click()}
                                                    className="py-3.5 px-7 text-base font-medium text-zinc-100 focus:outline-none bg-zinc-900 rounded-lg border border-zinc-200 hover:bg-zinc-800 focus:z-10 focus:ring-4 focus:ring-zinc-200"
                                                >
                                                    Add Profile Picture
                                                </button>
                                            </label>

                                            <button
                                                type="button"
                                                className="py-3.5 px-7 text-base font-medium text-black focus:outline-none bg-white rounded-lg border border-zinc-200 hover:bg-zinc-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-zinc-200"
                                            >
                                                Remove Picture
                                            </button>
                                        </div>
                                    </div>

                                    {/* Other Form Fields */}
                                    <div className="items-center mt-8 sm:mt-14 text-black">
                                        <div className="flex space-x-6">
                                            <div className="w-1/2">
                                                <label className="block mb-2 text-sm font-medium text-black">First Name</label>
                                                <input
                                                    type="text"
                                                    value={firstname}
                                                    onChange={(e) => setFirstname(e.target.value)}
                                                    className="bg-zinc-100 border border-zinc-100 text-black text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5"
                                                    placeholder={data?.user?.firstname}
                                                    required
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block mb-2 text-sm font-medium text-black">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={lastname}
                                                    onChange={(e) => setLastname(e.target.value)}
                                                    className="bg-zinc-100 border border-zinc-100 text-black text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5"
                                                    placeholder={data?.user?.lastname}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-2 mt-2 sm:mb-6">
                                            <label className="block mb-2 text-sm font-medium text-black">Your Username</label>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="bg-zinc-100 border border-zinc-100 text-black text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5"
                                                placeholder={data?.user?.username}
                                                required
                                            />
                                        </div>

                                        <div className="mb-2 sm:mb-6">
                                            <label className="block mb-2 text-sm font-medium text-black">Your email</label>
                                            <input
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-zinc-100 border border-zinc-100 text-black text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5"
                                                value={email}
                                                placeholder={data?.user?.email}
                                                required
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">Bio</label>
                                            <textarea
                                                rows="4"
                                                value={bio}
                                                required
                                                onChange={(e) => setBio(e.target.value)}
                                                className="block p-2.5 w-full text-sm text-black bg-zinc-100 rounded-lg border border-zinc-100 focus:ring-zinc-500 focus:border-zinc-500"
                                                placeholder={`${!userInfo?.user?.bio ? 'Write your bio...' : userInfo?.user?.bio}`}
                                            ></textarea>
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">New Password</label>
                                            <input
                                                id="message"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block p-2.5 w-full text-sm text-black bg-zinc-100 rounded-lg border border-zinc-100 focus:ring-zinc-500 focus:border-zinc-500"
                                                placeholder="Password"
                                            ></input>
                                        </div>

                                        <div className="flex justify-end md:justify-center">
                                            <button
                                                type="submit"
                                                className="text-white bg-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </main>
            </div>
        </>

    );
};

export default EditProfile;
