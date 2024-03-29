import React, { useEffect, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../api/auth';
import { toast } from 'react-toastify';
import { setCredentials as authCredentials, setCredentials } from '../slices/AuthSlice';
import Loader from '../components/Loader';



const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading, isError }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [setCredentials, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, password, username, firstname, lastname }).unwrap();
      dispatch(setCredentials(res))
      toast.success(res?.message || 'Registered successfully')
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message)
      console.log(err?.data?.message || err)
    }
  }

  const handleUsernameChange = (e) => {
    let value = e.target.value.toLowerCase();
    value = value.replace(/[^a-z]/g, '');
    setUsername(value.startsWith('@') ? value : `@${value}`);
  }

  if (isLoading) return <Loader />




  return <>

    <div>
      <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='font-bold md:text-lg text-xl'><Link to='/'>Stack Spot</Link></h1>
        <h3><Link to='/login'>Register</Link></h3>
      </div>
      <div className="py-20">
        <div className="flex h-full items-center justify-center">
          <div className="rounded-lg border border-gray-200 bg-white shadow-md flex-col flex h-full items-center justify-center sm:px-4">
            <div className="flex h-full flex-col justify-center gap-4 p-6">
              <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                <form className="flex flex-col gap-4 pb-4" onSubmit={handleSubmit}>
                  <h1 className="mb-4 text-2xl font-bold">Register</h1>


                  <div className="flex w-full">
                    {/* Left Div */}
                    <div className="w-1/2 pr-2">
                      <div className="mb-2">
                        <label className="text-sm font-medium text-gray-900" htmlFor="firstname">Firstname:</label>
                      </div>
                      <div className="relative">
                        <input
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          className="block w-full border bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 placeholder-gray-400 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          type="text"
                          name="firstname"
                          placeholder="Firstname"
                          required
                        />
                      </div>
                    </div>

                    {/* Right Div */}
                    <div className="w-1/2 pl-2">
                      <div className="mb-2">
                        <label className="text-sm font-medium text-gray-900" htmlFor="lastname">Lastname:</label>
                      </div>
                      <div className="relative">
                        <input
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          className="block w-full border bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 placeholder-gray-400 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          type="text"
                          name="lastname"
                          placeholder="Lastname"
                          required
                        />
                      </div>
                    </div>
                  </div>



                  <div>
                    <div className="mb-2">
                      <label className="text-sm font-medium text-gray-900" htmlFor="email">Username:</label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <div className="relative w-full">
                        <input
                          value={username} onChange={handleUsernameChange} className="block w-full border bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500  placeholder-gray-400 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          type="text" name="username" placeholder='@exampleuser' required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2">
                      <label className="text-sm font-medium text-gray-900" htmlFor="email">Email:</label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <div className="relative w-full">
                        <input
                          value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full border bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500  placeholder-gray-400 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          id="email" type="email" name="email" placeholder="email@example.com" required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <label className="text-sm font-medium text-gray-900" htmlFor="password">Password</label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <div className="relative w-full">
                        <input
                          value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full border bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500  placeholder-gray-400 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          id="password" type="password" name="password" required
                        />
                      </div>
                    </div>
                    {/* <p className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">Forgot password?</p> */}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button type="submit"
                      className="border transition-colors focus:ring-2 p-0.5 border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-lg">
                      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">Register</span>
                    </button>
                    <button type="button"
                      className="transition-colors focus:ring-2 p-0.5 bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 rounded-lg">
                      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">
                        <span className='px-2'> <FaGoogle /></span>
                        Sign in with Google
                      </span>
                    </button>

                  </div>
                </form>
                <div className="min-w-[270px]">
                  <div className="mt-4 text-center text-black mx-10">Allredy have acount?
                    <Link className="text-blue-500 underline hover:text-blue-600 px-2" to="/login">Login here</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
};


export default Register;