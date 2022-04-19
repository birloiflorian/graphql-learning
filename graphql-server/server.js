const { graphql, buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
// We define types (two main types -> Query and Mutation)
// Types -> Fields -> each field has a resolver function which returns the data for that field
// these are object types - which just represent a kind of object you can fetch from your service
var schema = buildSchema(`
  type Query {
    getAllUsers: [User!]!
    user: User
  }
  type User {
    id: Int!
    name: String!
  }
`);

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  getAllUsers: () => {
    return [
      { id: 1, name: "test this" },
      { id: 2, name: "test this" },
      { id: 3, name: "test this" },
    ];
  },
  user: () => {
    return {
      id: 1,
      name: "test this",
    };
  },
};

const getAllUsersRequest = "{ getAllUsers { id, name } }";
const getUser = "{ user { id, name } }";

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: getUser,
  //   source: getAllUsersRequest,
  rootValue,
}).then((response) => {
  console.log("response", response);
});
