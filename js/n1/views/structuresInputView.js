/* global Backbone, $, _, N1 */
(function () {
  'use strict'

  // View class for displaying structure input items
  N1.Views.StructuresInputView = Backbone.View.extend({
    el: '#n1-app',
    template: _.template($('#structure-input-tmpl').html()),
    initialize: function () {
      this.listenTo(this.model, 'destroy', this.remove)
      console.log('Starting here...')
    },

    render: function () {
      var html = this.template(this.model.toJSON())
      this.$el.html(html)
      console.log('Rendering here...')
      return this
    }
  })
}())
