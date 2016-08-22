/* global Backbone, $, N1 */
(function () {
  'use strict'

  N1.Views.StructureItemView = Backbone.View.extend({
    /*
    * Initialize with the template-id
    */
    initialize: function (options) {
      this.template = options.template
    },

    /*
    * Get the template content and render it into a new div-element
    */
    render: function () {
      var content = $(this.template).html()
      $(this.el).html(content)

      return this
    }
  })
}())
