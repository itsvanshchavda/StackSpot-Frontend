import React from 'react';
import Navbar from '../components/Navbar';
import profile from '../assets/me.jpg'

const EditProfile = () => {
    return (
        <>
            <Navbar />

            <div className="bg-white w-full flex flex-col mt-2 gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-black">
                <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                    <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-zinc-100 top-12">
                        <h2 className="pl-[2.8em] mb-4 text-2xl font-semibold">Settings</h2>

                    </div>
                </aside>
                <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4">
                        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

                            <div className="grid max-w-2xl mx-auto mt-8">
                                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                                    <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-zinc-300 dark:ring-zinc-500"
                                        src={profile}
                                        alt="Bordered avatar" />

                                    <div className="flex flex-col space-y-5 sm:ml-8">
                                        <button type="button"
                                            className="py-3.5 px-7 text-base font-medium text-zinc-100 focus:outline-none bg-zinc-900 rounded-lg border border-zinc-200 hover:bg-zinc-800 focus:z-10 focus:ring-4 focus:ring-zinc-200 ">
                                            Change picture
                                        </button>
                                        <button type="button"
                                            className="py-3.5 px-7 text-base font-medium text-black focus:outline-none bg-white rounded-lg border border-zinc-200 hover:bg-zinc-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-zinc-200 ">
                                            Delete picture
                                        </button>
                                    </div>
                                </div>

                                <div className="items-center mt-8 sm:mt-14 text-black">


                                    <div className="mb-2 sm:mb-6">
                                        <label
                                            className="block mb-2 text-sm font-medium text-black ">Your
                                            Username</label>
                                        <input type="email" id="email"
                                            className="bg-zinc-100 border border-zinc-100 text-black text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5 "
                                            placeholder="@exampleuser" required />
                                    </div>

                                    <div className="mb-2 sm:mb-6">
                                        <label
                                            className="block mb-2 text-sm font-medium text-black ">Your
                                            email</label>
                                        <input type="email" id="email"
                                            className="bg-zinc-100 border border-zinc-100 text-black text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5 "
                                            placeholder="your.email@mail.com" required />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="message"
                                            className="block mb-2 text-sm font-medium text-black ">Bio</label>
                                        <textarea id="message" rows="4"
                                            className="block p-2.5 w-full text-sm text-black bg-zinc-100 rounded-lg border border-zinc-100 focus:ring-zinc-500 focus:border-zinc-500 "
                                            placeholder="Write your bio here..."></textarea>
                                    </div>

                                    <div className="flex justify-end md:justify-center">
                                        <button type="submit"
                                            className="text-white bg-zinc-900  hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800">Save</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default EditProfile;
