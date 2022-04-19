const { db } = require("../db");
const { Post } = require("../types/Post");

const getPosts = () => {
  return db.posts;
};

const getPostById = ({ id }) => {
  return db.posts.find((post) => post.id === id);
};

const addPost = ({ title, content, userId }) => {
  const newPost = new Post(title, content, userId);
  db.posts.push(newPost);
  return newPost;
};

module.exports.post = {
  getPosts,
  getPostById,
  addPost,
};
