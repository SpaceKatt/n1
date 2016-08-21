/*global N1, Backbone */
(function () {
  'use strict'
  // Structure List Collection
  // ----------------
  // Uses HTML `localStorage`.
  N1.Collections.StructureList = Backbone.Collection.extend({
    model: N1.Models.Structure,

    localStorage: new Backbone.LocalStorage(N1.Config.storeName),

    url: '/structures',

    parse: function (data) {
      return data.structures
    }
  })
}())
