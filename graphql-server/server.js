const express = require("express");
const { User } = require("./types/User");
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
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!): User!
  }
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    getFullname: String!
  }
`);

// some mock data - as db values
const users = [];
users.push(new User("Florian", "Birloi"));
users.push(new User("Andrew", "Radulescu"));

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  getAllUsers: () => {
    return users;
  },
  getUserById: (args) => {
    // passing arguments to query
    return users.find((user) => user.id === args.id);
  },
  addUser: ({ firstName, lastName }) => {
    const newUser = new User(firstName, lastName);
    users.push(newUser);
    return newUser;
  },
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
