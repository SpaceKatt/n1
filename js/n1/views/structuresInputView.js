/* global Backbone, $, _, N1, n1, alert */
(function () {
  'use strict'

  // View class for displaying structure input items
  N1.Views.StructuresInputView = Backbone.View.extend({
    el: '#n1-app',
    template: _.template($('#structure-input-tmpl').html()),
    initialize: function () {
      // may need to create new model using data from old model
      N1.MathLib.GridTools.initHandler()
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
        canvas, context, canvas1, context1, canvas2, context2, n1.gridText, n1.vNames)

      return this
    },

    events: {
      'click .enter-data': 'enterData',
      'click .enter-swap': 'enterSwap',
      'click .enter-infer': 'enterInfer'
    },

    enterData: function () {
      n1.columnNumber = $('#column-number').val()
      n1.rowNumber = $('#row-number').val()
      var model = n1.structuresList.at(0)
      var size = model.get('size')
      var canvas = $('#canvas-main').get(0)
      var context = canvas.getContext('2d')
      var cellSize = 20
      var rcOne = n1.columnNumber
      var rcTwo = n1.rowNumber
      N1.MathLib.GridTools.enterData(rcOne, rcTwo, canvas, context, cellSize)
    },

    enterSwap: function () {
      n1.columnNumber = $('#column-number').val()
      n1.rowNumber = $('#row-number').val()
      var model = n1.structuresList.at(0)
      var size = model.get('size')
      var canvas = $('#canvas-main').get(0)
      var context = canvas.getContext('2d')
      var canvas1 = $('#canvas-bottom').get(0)
      var context1 = canvas1.getContext('2d')
      var canvas2 = $('#canvas-left-side').get(0)
      var context2 = canvas2.getContext('2d')
      var cellSize = 20
      var rcOne = n1.columnNumber
      var rcTwo = n1.rowNumber
      N1.MathLib.GridTools.swapRC(rcOne, rcTwo, canvas, context, canvas1, context1, canvas2, context2, cellSize)
    },

    enterInfer: function () {
      var canvas = $('#canvas-main').get(0)
      var context = canvas.getContext('2d')
      var canvas1 = $('#canvas-bottom').get(0)
      var context1 = canvas1.getContext('2d')
      var canvas2 = $('#canvas-left-side').get(0)
      var context2 = canvas2.getContext('2d')
      var cellSize = 20
      N1.MathLib.GridTools.inferenceProcess(canvas, context, canvas1, context1, canvas2, context2, cellSize)
      alert('Inference all done...')
    }
  })
}())
