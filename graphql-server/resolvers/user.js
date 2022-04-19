const { db } = require("../db");
const { User } = require("../types/User");
const { Address } = require("../types/Address");

const getAllUsers = () => {
  return db.users;
};

const getUserById = ({ id }) => {
  return db.users.find((user) => user.id === id);
};

const addUser = ({ firstName, lastName }) => {
  const address = new Address("Bucharest", "Blvd Unirii", 59);
  const newUser = new User(firstName, lastName, address);
  db.users.push(newUser);
  return newUser;
};

module.exports.user = {
  getAllUsers,
  getUserById,
  addUser,
};
