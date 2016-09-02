/*global N1, Backbone */
(function () {
  'use strict'
  // Stucture Model
  // ----------
  var globalCounterId = 1

  N1.Models.Structure = Backbone.Model.extend({
    initialize: function () {
      this.set('id', globalCounterId)
      globalCounterId += 1
    },
    defaults: function () {
      return {
        size: '0',
        title: '',
        id: '',
        name: '',
        done: false,
        createdAt: new Date()
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function () {
      this.save({done: !this.get('done')})
    }
  })
}())
