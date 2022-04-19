const express = require("express");
const { resolvers } = require("./resolvers");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
// We define types (two main types -> Query and Mutation)
// Types -> Fields -> each field has a resolver function which returns the data for that field
// these are object types - which just represent a kind of object you can fetch from your service
var schema = buildSchema(`
  type Query {
    getAllUsers: [User!]!
    getUserById(id: Int!): User!
    getPosts: [Post]!
    getPostById: Post
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!): User!
    addPost(title: String!, content: String, userId: Int!): Post!
  }
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    getFullname: String!
    address: Address!
  }
  type Address {
    city: String!
    street: String!
    number: Int!
  }
  type Post {
    id: Int!
    title: String!
    content: String
    postedBy: User!
  }
`);

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  getAllUsers: resolvers.getAllUsers,
  getUserById: resolvers.getUserById,
  addUser: resolvers.addUser,
  getPosts: resolvers.getPosts,
  getPostById: resolvers.getPostById,
  addPost: resolvers.addPost,
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true, // this can be very useful in development mode
  })
);

app.listen(4000, () => {
  console.log("listening to port 4000");
});
