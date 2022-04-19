// define a type as a class for object types
// this should mirror the schema we use for graphql
class User {
  constructor(firstName, lastName) {
    this.id = Math.floor(Math.random() * 100 + 1);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullname() {
    return this.firstName + " " + this.lastName;
  }
}

module.exports.User = User;
