import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import MobileMenu from './MobileMenu';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const toggleNav = () => {
        setNav(!nav);
    };

    const handleSearch = () => {
        if (search.trim() !== '') {
            navigate(`?search=${search}`);
        } else {
            navigate('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleInputChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value.trim() === '') {
            navigate('/');
        }
    };

    const path = useLocation().pathname

    if (!userInfo) {
       return navigate('/login')
    }



    return (
        <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
            <h1 className='font-bold md:text-lg text-xl'>
                <Link to='/'>Stack Spot</Link>
            </h1>

            {path === '/' && <div className='flex justify-center items-center space-x-2'>
                <BsSearch
                    className='cursor-pointer'
                    size={20}
                    onClick={handleSearch}
                />
                <input
                    type='text'
                    placeholder='Search...'
                    className='p-2 rounded-md outline-none bg-transparent border-b-2'
                    value={search}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
            </div>}
            <div className='hidden md:flex items-center justify-center space-x-4'>
                {userInfo ? (
                    <div className='flex gap-5'>
                        <h3>{userInfo?.user?.username}</h3>
                    </div>
                ) : (
                    <h3>
                        <Link to='/login'>Login</Link>
                    </h3>
                )}
                {!userInfo && (
                    <h3>
                        <Link to='/register'>Register</Link>
                    </h3>
                )}
                <div className='cursor-pointer' onClick={toggleNav}>
                    {nav ? <MdClose size={20} /> : <FaBars size={20} />}
                </div>
            </div>
            <div className='md:hidden cursor-pointer' onClick={toggleNav}>
                {nav ? <MdClose size={20} /> : <FaBars size={20} />}
            </div>
            {nav && <MobileMenu />}
        </div>
    );
};

export default Navbar;
