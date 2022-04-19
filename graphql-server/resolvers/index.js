const { user } = require("./user");
const { post } = require("./post");

module.exports.resolvers = {
  ...user,
  ...post,
};
