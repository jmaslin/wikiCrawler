var low = require('lowdb')

class Saver {

  constructor(dbName='') {
    this.db = low(dbName);
  }

  addPerson(person) {
    this.db('people').push(person);
    return this.db('people').find({ name: person.name });
  }

  addPersonForDay(person, day) {
    this.db(day).push(person);
    return this.db(day).find({ name: person.name });
  }

  manualSetData(key, data) {
    this.db.object[key] = data;
    this.db.saveSync();
  }

}

exports.Saver = Saver;