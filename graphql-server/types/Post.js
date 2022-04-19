const { db } = require("../db");

class Post {
  constructor(title, content, userId) {
    this.id = Math.floor(Math.random() * 100 + 1);
    this.title = title;
    this.content = content;
    this.postedBy = db.users.find((user) => user.id === userId);
  }
}

module.exports.Post = Post;
