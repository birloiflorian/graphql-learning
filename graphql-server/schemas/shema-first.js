const { buildSchema } = require("graphql");

const schema = buildSchema(`
  interface Entity {
    id: Int!
  }
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
  type User implements Entity {
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
  type Post implements Entity {
    id: Int!
    title: String!
    content: String
    postedBy: User!
  }
`);

module.exports.shemaFirst = schema;
