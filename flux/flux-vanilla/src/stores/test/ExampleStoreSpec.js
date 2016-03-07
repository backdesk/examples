'use strict';

const ExampleConstants = require('../../ExampleConstants')
    , sinon = require('sinon')
    , should = require('chai').should()
    , rewire = require('rewire');


beforeEach(function () {
  this.ExampleStore = rewire('../ExampleStore');
  this.registeredCallback = this.ExampleStore.__get__('registeredCallback');
});

describe('example store', function () {
  it('Initializes with zero records', function () {
    this.ExampleStore.state.records.should.be.empty;
  });

  it('Adds an example record', function () {
    this.registeredCallback({
      actionType : ExampleConstants.CREATE_RECORD,
      record : { id : 1, name : 'James Gardner' }
    });

    let records = this.ExampleStore.state.records;

    let results = records.find(r => {
      return r.id === 1;
    });

    should.exist(results);
  });

  it('Removes an example record', function () {
    this.registeredCallback({
      actionType : ExampleConstants.CREATE_RECORD,
      record : { id : 1, name : 'James Gardner' }
    });
    
    this.registeredCallback({
      actionType : ExampleConstants.DELETE_RECORD,
      record : { id : 1, name : 'James Gardner' }
    });

    let records = this.ExampleStore.state.records;

    let results = records.find(r => {
      return r.id === 1;
    });

    should.not.exist(results);
  });
});
