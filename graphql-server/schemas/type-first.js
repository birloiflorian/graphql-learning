const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { resolvers } = require("../resolvers");

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: {
    city: { type: GraphQLString },
    street: { type: GraphQLString },
    number: { type: GraphQLInt },
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    address: { type: new GraphQLList(AddressType) },
    getFullname: {
      type: GraphQLString,
      resolve: (parent) => {
        console.log("parent", parent);
        return parent.firstName + " " + parent.lastName;
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    postedBy: { type: new GraphQLList(UserType) },
  }),
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return resolvers.getAllUsers();
      },
    },
    getUserById: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, { id }) => {
        return resolvers.getUserById(id);
      },
    },
    getPosts: {
      type: new GraphQLList(PostType),
      resolve: () => {
        return resolvers.getPosts();
      },
    },
    getPostById: {
      type: PostType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, { id }) => {
        return resolvers.getPostById(id);
      },
    },
  }),
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
      },
      resolve: (parent, { firstName, lastName }) => {
        return resolvers.addUser({ firstName, lastName });
      },
    },
    addPost: {
      type: PostType,
      args: {
        title: {
          type: GraphQLString,
        },
        content: {
          type: GraphQLString,
        },
        userId: {
          type: GraphQLInt,
        },
      },
      resolve: (parent, { title, content, userId }) => {
        return resolvers.addPost({ title, content, userId });
      },
    },
  }),
});

module.exports.types = {
  queryType,
  mutationType,
};
