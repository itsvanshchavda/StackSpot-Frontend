import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: localStorage.getItem("postData")
    ? JSON.parse(localStorage.getItem("postData"))
    : null,
  likedPosts: [],
  bookmarkedPosts: [],
  color: "white",
  likesCount: 0,
  postLiked:false
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPost: (state, action) => {
      state.postData = action.payload;
      localStorage.setItem("postData", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },

    addLike: (state, action) => {
      state.likesCount += 1;
      state.postLiked = true;
    },

    removeLike: (state, action) => {
      state.likesCount -= 1;
      state.postLiked = false;
    },

    addBookmark: (state, action) => {
      const postId = action.payload;
      state.bookmarkedPosts.push(postId);
    },

    removeBookmark: (state, action) => {
      const postId = action.payload;
      state.bookmarkedPosts = state.bookmarkedPosts.filter(
        (id) => id !== postId
      );
    },
  },
});

export default postSlice.reducer;

export const { getPost, addLike, removeLike, addBookmark, removeBookmark } =
  postSlice.actions;
