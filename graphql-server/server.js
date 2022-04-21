const express = require("express");
const { resolvers } = require("./resolvers");
const { graphqlHTTP } = require("express-graphql");
const { shemaFirst } = require("./schemas/shema-first");
const { GraphQLSchema } = require("graphql");
const { types } = require("./schemas/type-first");

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  getAllUsers: resolvers.getAllUsers,
  getUserById: resolvers.getUserById,
  addUser: resolvers.addUser,
  getPosts: resolvers.getPosts,
  getPostById: resolvers.getPostById,
  addPost: resolvers.addPost,
};

const typeFirst = new GraphQLSchema({
  query: types.queryType,
  mutation: types.mutationType,
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: shemaFirst,
    // schema: typeFirst,
    rootValue,
    graphiql: true, // this can be very useful in development mode
  })
);

app.listen(4000, () => {
  console.log("listening to port 4000");
});
