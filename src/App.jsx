import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import PostDetails from './pages/PostBody/PostDetails'
import EditPost from './pages/PostAction/EditPost'
import MyBookmark from './pages/ProfileDetail/MyBookmark'
import FiindAllUsers from './pages/FindUser/FiindAllUsers'
import Profile from './pages/ProfileDetail/Profile'
import EditProfile from './pages/ProfileAction/EditProfile'
import Dashboard from './pages/Analytics/Dashboard'
import Notfound from './components/ErrorPage/Notfound'
import CreatePost from './pages/PostAction/CreatePost'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './pages/ResetPassword/ResetPassword'




const App = () => {
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/bookmark/:id" element={<MyBookmark />} />
        <Route path='/finduser' element={<FiindAllUsers />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path='/profile/edit/:id' element={<EditProfile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path="*" element={<Notfound />} />
        <Route path='/write' element={<CreatePost />} />

      </Routes>
    </Router>
  )
}

export default App