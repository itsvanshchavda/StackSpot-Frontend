// Sidebar.js

import React, { useEffect, useState } from 'react';
import AllUsers from './AllUsers';
import { useSelector } from 'react-redux';
import { useGetAllUsersQuery } from '../api/user';

const Sidebar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);

    const id = userInfo?.user?._id;
    const { data } = useGetAllUsersQuery(id);
    

    useEffect(() => {
        setUsers(data?.allUser);
    }, [data]);

    return (
        <div className='flex float-end flex-col gap-5 max-sm:hidden max-xl:hidden'>

            {data?.allUser?.length === 0 ? (
                    <div className='text-start font-semibold text-[19px] animate-pulse duration-300'>
                        You followed all the users
                    </div>
            ) : (
                <div className='text-start font-semibold text-[19px]'>
                    All users
                </div>
            )}

            <div>
                {/* All Users */}
                {users?.map((user) => (
                    <div key={user._id}>
                        <AllUsers user={user} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
