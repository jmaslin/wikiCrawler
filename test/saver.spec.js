var chai = require('chai');
var chaiAsPromised = require("chai-as-promised"); 
var expect = chai.use(chaiAsPromised).expect;

var low = require('lowdb')
var db = low();

var Saver = require('../build/saver.js').Saver;

describe('Saver', function () {

  var saver = new Saver();

  it('exists', function () {
    expect(new Saver()).to.be.a('object');
  });

  describe('addPerson', function () {

    it('adds a person record', function () {
      var person = {
        name: 'Test Person'
      };  

      expect(saver.addPerson(person)).to.not.be.a('undefined');
    });

  });



});