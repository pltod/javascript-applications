/**
 * Copyright 2013-2014 Justin Reidy
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * TodoService
 */

var Promise = require('bluebird');

/**
 * This is where we'd interact with the server; in this case we'll simulate
 * the create action to demonstrate TODO_CREATE_COMPLETED action, and for the
 * rest we'll ignore the simulated "server response"
 */
var TodoService= {
  create: function (text) {
    console.log('Service: create');
    var token = Promise.defer();
    var todo = {
      id: Date.now(),
      complete: false,
      text: text
    };
    token.resolve(todo);

    return token.promise;
  },

  update: function (id, options) {
    var token = Promise.defer();
    return token.promise;
  },

  completeAll: function () {
    var token = Promise.defer();
    return token.promise;
  },

  destroy: function (id) {
    var token = Promise.defer();
    return token.promise;
  },

  destroyCompleted: function () {
    var token = Promise.defer();
    return token.promise;
  },
};

module.exports = TodoService;
