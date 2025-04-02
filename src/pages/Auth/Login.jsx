import React, { useEffect, useState } from 'react';
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../slices/AuthSlice';
import { toast } from 'react-toastify'
import logo from '../../assets/logo.png'
import { useLoginMutation } from '../../api/auth'
import { LoaderCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading, isError }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, setCredentials])

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      toast.success(res?.message || 'Logged in successfully');
      dispatch(setCredentials(res))
      setLoading(false)
      navigate('/')
    } catch (err) {
      setLoading(false)
      toast.error(err?.data?.message)
      console.log(err?.data?.message || err)
    }
  }

  const handleShow = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <div className={`h-screen bg-black`}>
        <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
          <Link to='/login'>
            <img src={logo} className='w-11 h-11 mt-1 rounded-full object-cover' alt="" />
          </Link>
          <h3 className='text-white'><Link to='/login'>Login</Link></h3>
        </div>
        <div className="py-20">
          <div className="flex h-full items-center justify-center">
            <div className="rounded-lg border border-slate-800 text-white bg-black shadow-md flex-col flex h-full items-center justify-center sm:px-4">
              <div className="flex h-full flex-col justify-center gap-4 p-6">
                <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                  <form className="flex flex-col gap-4 pb-4" onSubmit={handleSubmit}>
                    <h1 className="mb-4 text-2xl font-bold">Login</h1>

                    <div>
                      <div className="mb-2">
                        <label className="text-sm font-medium text-white" htmlFor="email">Email:</label>
                      </div>
                      <div className="flex w-full rounded-lg pt-1">
                        <div className="relative w-full">
                          <input
                            value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full border bg-black text-white border-slate-800  focus:border-cyan-500  placeholder-gray-400 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                            id="email" type="email" name="email" placeholder="email@example.com" required
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-white" htmlFor="password">Password</label>
                        <Link to="/reset-password" className="text-xs text-gray-300 hover:text-cyan-500">Forgot Password?</Link>
                      </div>
                      <div className="flex w-full rounded-lg pt-1">
                        <div className="relative w-full">
                          {showPassword ? <FaRegEye className='absolute right-4 top-3 cursor-pointer' onClick={handleShow} /> : <FaEyeSlash className='absolute right-4 top-3 cursor-pointer' onClick={handleShow} />}
                          <input
                            value={password} maxLength={16} onChange={(e) => setPassword(e.target.value)} className="block w-full border bg-black text-white border-slate-800  focus:border-cyan-500  placeholder-gray-400 focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                            id="password" type={showPassword ? "text" : "password"} name="password" required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button type="submit"
                        className="border transition-colors focus:ring-2 p-0.5 border-transparent bg-slate-100 text-black hover:bg-slate-300  rounded-lg">
                        <div className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">
                          <h2>Login</h2>
                          {loading && <LoaderCircle size={16} className="animate-spin" />}
                        </div>
                      </button>
                    </div>
                  </form>
                  <div className="min-w-[270px]">
                    <div className="mt-4 text-center text-white mx-10">Not have an account?
                      <Link className="text-gray-300 underline hover:text-gray-400 px-2" to="/register">Register here</Link>
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