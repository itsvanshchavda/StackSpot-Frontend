import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AllUsersList from './AllUsersList';
import { useGetAllUsersListQuery, useSearchUserQuery } from '../api/user';

const FindAllUsers = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const { data } = useSearchUserQuery(search);
  const { data: allUsersList } = useGetAllUsersListQuery();

  useEffect(() => {
    if (data && data.searchedUser) {
      setSearchedUsers(data.searchedUser);
    } else {
      setSearchedUsers([]);

    }
  }, [data]);

  useEffect(() => {
    if (allUsersList && allUsersList.allUsers) {
      setUsersList(allUsersList.allUsers);
    }
  }, [allUsersList]);

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      navigate(`?search=${searchInput}`);
    } else {
      navigate('/finduser');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.trim() === '') {
      navigate('/finduser');
    }
  };

  return (
    <>
      <Navbar />
      <div className='h-[90vh]'>
        <div className='flex justify-center items-center mr-10 -mt-14'>
          <BsSearch
            className='cursor-pointer'
            size={20}
            onClick={handleSearch}
          />
          <input
            type='text'
            placeholder='Search...'
            className='p-2 rounded-md max-sm:w-2/5  outline-none bg-transparent border-b-2'
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>

        {/* Render AllUsersList when there is no search query */}
        {!search && <AllUsersList users={usersList} />}

        {/* Render searchedUsers when there is a search query */}
        {search && searchedUsers.length > 0 && <AllUsersList users={searchedUsers} />}

        {/* Render message when no users found for search query */}
        {search && searchedUsers.length === 0 && (
          <h1 className='font-bold text-xl text-center mt-8'>No User Found</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FindAllUsers;
