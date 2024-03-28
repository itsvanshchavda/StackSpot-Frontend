import React, { useEffect, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading, isError }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, setCredentials])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      toast.success(res?.message || 'Logged in successfully');
      dispatch(setCredentials(res))
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message)
      console.log(err?.data?.message || err)
    }
  }

  if (isLoading) return <Loader />


  return (
    <>
      <div>
        <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
          <h1 className='font-bold md:text-lg text-xl'><Link to='/'>Stack Spot</Link></h1>
          <h3><Link to='/login'>Login</Link></h3>
        </div>
        <div className="py-20">
          <div className="flex h-full items-center justify-center">
            <div className="rounded-lg border border-gray-200 bg-white shadow-md flex-col flex h-full items-center justify-center sm:px-4">
              <div className="flex h-full flex-col justify-center gap-4 p-6">
                <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                  <form className="flex flex-col gap-4 pb-4" onSubmit={handleSubmit}>
                    <h1 className="mb-4 text-2xl font-bold">Login</h1>

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
                      <p className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">Forgot password?</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button type="submit"
                        className="border transition-colors focus:ring-2 p-0.5 border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-lg">
                        <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">Login</span>
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
                    <div className="mt-4 text-center text-black mx-10">Not have an account?
                      <Link className="text-blue-500 underline hover:text-blue-600 px-2" to="/register">Register here</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
