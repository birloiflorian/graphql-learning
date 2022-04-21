import { ApolloServer, gql } from "apollo-server";

// data
const users = [
  {
    id: 1,
    firstName: "Kate",
    lastName: "Chopin",
    address: {
      city: "Bucharest",
      street: "Iuliu Maniu",
      number: 15,
    },
  },
  {
    id: 2,
    firstName: "Kate",
    lastName: "Upton",
    address: {
      city: "Bucharest",
      street: "Iuliu Maniu",
      number: 15,
    },
  },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  """
  This is a multiline description comment
  """
  interface Entity {
    "Describe on field"
    id: Int!
  }

  type Address {
    city: String!
    street: String!
    number: Int!
  }

  type User implements Entity {
    id: Int!
    firstName: String!
    lastName: String!
    getFullName: String!
    address: Address!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!): User!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getUsers: () => users,
  },
  Mutation: {
    addUser: (firstName: string, lastName: string) => {
      const newUser = {
        id: users.length + 1,
        firstName: "Kate",
        lastName: "Chopin",
        address: {
          city: "Bucharest",
          street: "Iuliu Maniu",
          number: 15,
        },
      };
      users.push(newUser);
      return newUser;
    },
  },
  User: {
    getFullName: (parent: any) => {
      return parent.firstName + " " + parent.lastName;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
