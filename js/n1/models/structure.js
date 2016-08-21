/*global N1, n1, Backbone */
(function () {
  'use strict'
  // Stucture Model
  // ----------
  N1.Models.Structure = Backbone.Model.extend({
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
