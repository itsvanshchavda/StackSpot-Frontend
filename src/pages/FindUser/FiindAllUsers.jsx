import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import AllUsersList from '../AllUsers/AllUsersList'
import { useGetAllUsersListQuery, useSearchUserQuery } from '../../api/user';
import Loader from '../../components/Loader/Loader';

const FindAllUsers = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const { data, isLoading: searchUserLoading } = useSearchUserQuery(search);
  const { data: allUsersList, isLoading } = useGetAllUsersListQuery();
  const { theme } = useSelector((state) => state.theme)

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

  { isLoading && <Loader /> }
  { searchUserLoading && <Loader /> }

  return (
    <>
      <Navbar />
      <div className={`h-auto  ${theme ? "bg-gradient-to-b from-black to-gray-800 via-black" : ""}`}>
        <div className='flex justify-center items-center mr-10 -space-y-24 pt-2'>
          <BsSearch
            className='cursor-pointer -mt-24'
            size={20}
            onClick={handleSearch}
            color={`${theme ? "white" : ""}`}
          />
          <input
            type='text'
            placeholder='Search...'
            className={`p-2 rounded-md max-sm:w-2/5 outline-none bg-transparent border-b-2 ${theme ? "text-white" : ""}`}
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            style={{ verticalAlign: 'middle' }}
          />
        </div>

        {/* Render AllUsersList when there is no search query */}
        <div className=''>
          {!search && <AllUsersList users={usersList} />}

          {/* Render searchedUsers when there is a search query */}
          {search && searchedUsers.length > 0 && <AllUsersList users={searchedUsers} />}

          {/* Render message when no users found for search query */}
          {search && searchedUsers.length === 0 && (
            <h1 className={`font-bold text-xl text-center mt-8 ${theme ? "text-white " : "text-black"}`}>No User Found</h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindAllUsers;
