var low = require('lowdb')

class Saver {

  constructor(dbName) {
    if (!dbName) {
      dbName = '';
    }
    this.db = low(dbName);
  }

  addPerson(person) {
    this.db('people').push(person);
    console.log(this.db('people').push(person));
    return this.db('people').find({ name: person.name });
  }

}

exports.Saver = Saver;