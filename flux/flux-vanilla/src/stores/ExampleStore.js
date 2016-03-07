'use strict';

const EventEmitter = require('events').EventEmitter
    , ExampleConstants = require('../ExampleConstants')
    , ExampleDispatcher = require('../ExampleDispatcher');


const CHANGE_EVENT = 'change';

const _records = [];

function createRecord (record) {
  _records.push(record);
};

function deleteRecord (record) {
  let index = _records.findIndex(r => {
    return r.id === record.id;
  });

  if(index !== -1) {
    _records.splice(index, 1);
  }
};

function getById (id) {
  return _records.find(r => {
    return r.id === id;
  });
};

/**
 * Example Store.
 *
 * Most of the code here is boilerplate lifted from the official flux examples.
 * See: https://github.com/facebook/flux/blob/master/examples
 */
const ExampleStore = Object.assign({}, EventEmitter.prototype, {
  emitChange : function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

/**
 * Set the initial state.
 */
ExampleStore.state = { records : _records };

/**
 * Register with appropriate dispatcher.
 */
const registeredCallback = function (payload) {
  switch(payload.actionType) {
    case ExampleConstants.CREATE_RECORD:
      createRecord(payload.record);
    break;
    case ExampleConstants.DELETE_RECORD:
      deleteRecord(payload.record);
    break;
  }

  ExampleStore.emitChange()
}.bind(ExampleStore);

ExampleDispatcher.register(registeredCallback);

module.exports = ExampleStore;
