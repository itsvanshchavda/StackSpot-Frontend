import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import MobileMenu from '../MobileNav/MobileMenu.jsx';
import { TfiPencilAlt } from "react-icons/tfi";
import avatar from '../../assets/avatar.jpg'
import logo from '../../assets/logo.png'
import { BsMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { toggleDarkMode } from '../../slices/Theme.js';



const Navbar = () => {
    const [search, setSearch] = useState('');
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme)
    const dispatch = useDispatch();
    const profilePhoto = userInfo?.user?.profilePhoto?.url;
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

    const handleTheme = () => {
        dispatch(toggleDarkMode())
    }

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
        <>

            <div className={`flex items-center justify-between px-6 md:px-[200px] py-4 bg-white ${theme ? "bg-zinc-950 text-white" : ""}`}>
                <h1 className='font-bold md:text-lg text-xs'>
                    <Link to='/'>
                        <img src={logo} className='w-11 h-11 mt-1 rounded-full object-cover' alt="" />
                    </Link>
                </h1>

                {path === '/' && <div className='flex justify-center items-center space-x-1'>
                    <BsSearch
                        className='cursor-pointer'
                        size={20}
                        onClick={handleSearch}
                    />
                    <input
                        type='text'
                        placeholder='Search...'
                        className='p-1 rounded-md outline-none bg-transparent border-b-2 max-sm:w-2/3'
                        value={search}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                    />
                </div>}




                <div className='flex items-center justify-center'>
                    {userInfo ? (
                        <div className='flex flex-row '>
                            <Link to='/write' className='flex items-center gap-2 cursor-pointer max-sm:hidden'>
                                <TfiPencilAlt size={17} />
                                <h3>Write</h3>
                            </Link>

                            <div className='max-sm:mr-2 mt-1'>
                                {theme ? <BsMoonStarsFill onClick={handleTheme} className='cursor-pointer ' /> : <MdSunny onClick={handleTheme} className='cursor-pointer' />}
                            </div>
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
                        {
                            !profilePhoto ? (
                                <div>
                                    <img src={avatar} className='w-10 h-10 mb-2 rounded-full object-cover' />
                                </div>

                            ) : (
                                <img
                                    src={profilePhoto}
                                    className="w-11 h-11 mt-1 rounded-full object-cover"
                                    style={{ aspectRatio: '1 / 1' }}
                                    alt="Profile Avatar"
                                />
                            )
                        }
                    </div>
                </div>
                {nav && <MobileMenu />}
            </div>

            <div className={`border-b-2  w-full ${theme ? "border-slate-800" : ""}`}></div>
        </>
    );
};

export default Navbar;
