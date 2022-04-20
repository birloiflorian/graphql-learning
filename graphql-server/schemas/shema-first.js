const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
// We define types (two main types -> Query and Mutation)
// Types -> Fields -> each field has a resolver function which returns the data for that field
// these are object types - which just represent a kind of object you can fetch from your service
const schema = buildSchema(`
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

module.exports.shemaFirst = schema;
