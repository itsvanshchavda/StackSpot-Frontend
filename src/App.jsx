import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PostDetails from './pages/PostDetails'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import Notfound from './components/Notfound'
import CreatePost from './pages/CreatePost'
import MyBlogs from './components/MyBlogs'
import EditProfile from './pages/EditProfile'


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
        <Route path='/myblogs/:id' element={<MyBlogs />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path='/profile/edit/:id' element={<EditProfile />} />
        <Route path="*" element={<Notfound />} />
        <Route path='/write' element={<CreatePost />} />

      </Routes>
    </Router>
  )
}

export default App