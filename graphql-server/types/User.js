// define a type as a class for object types
// this should mirror the schema we use for graphql
class User {
  constructor(firstName, lastName, address) {
    this.id = Math.floor(Math.random() * 100 + 1);
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
  }

  getFullname() {
    return this.firstName + " " + this.lastName;
  }
}

module.exports.User = User;
