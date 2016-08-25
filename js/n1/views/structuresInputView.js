/* global Backbone, $, _, N1, n1 */
(function () {
  'use strict'

  // View class for displaying structure input items
  N1.Views.StructuresInputView = Backbone.View.extend({
    el: '#n1-app',
    template: _.template($('#structure-input-tmpl').html()),
    initialize: function () {
      // may need to create new model using data from old model
      console.log('Input start ...')
      // this.listenTo(this.model, 'destroy', this.remove)
      N1.MathLib.GridTools.initHandler()
      console.log('Starting here...')
    },

    render: function () {
      var html = this.template(this.model.toJSON())
      this.$el.html(html)
      console.log('Rendering here...')
      var canvas = $('#canvas-main').get(0)
      var context = canvas.getContext('2d')
      var canvas2 = $('#canvas-left-side').get(0)
      var context2 = canvas2.getContext('2d')
      var canvas1 = $('#canvas-bottom').get(0)
      var context1 = canvas1.getContext('2d')
      N1.MathLib.GridTools.initGrid(
        canvas, context, canvas1, context1, canvas2, context2, n1.gridText,
         n1.vNames)
      return this
    }
  })
}())
