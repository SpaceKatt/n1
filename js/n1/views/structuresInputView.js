/* global Backbone, $, _, N1, n1 */
(function () {
  'use strict'

  // View class for displaying structure input items
  N1.Views.StructuresInputView = Backbone.View.extend({
    el: '#n1-app',
    template: _.template($('#structure-input-tmpl').html()),
    initialize: function () {
      // may need to create new model using data from old model
      N1.MathLib.GridTools.initHandler(n1.size)
    },

    render: function () {
      var html = this.template(this.model.toJSON())
      this.$el.html(html)
      var canvas = $('#canvas-main').get(0)
      var context = canvas.getContext('2d')
      var canvas2 = $('#canvas-left-side').get(0)
      var context2 = canvas2.getContext('2d')
      var canvas1 = $('#canvas-bottom').get(0)
      var context1 = canvas1.getContext('2d')
      N1.MathLib.GridTools.initGrid(
        canvas, context, canvas1, context1, canvas2, context2, n1.size)

      return this
    },

    events: {
      'click .enter-data': 'enterData',
      'click .enter-swap': 'enterSwap',
      'click .enter-infer': 'enterInfer'
    },

    enterData: function () {
      if(n1.vectorGrid.length === 0) {
          $('#canvas-vector').hide()
      }
      n1.columnNumber = $('#column-number').val()
      n1.rowNumber = $('#row-number').val()
      var canvas = $('#canvas-main').get(0)
      var context = canvas.getContext('2d')
      var canvas1 = $('#canvas-bottom').get(0)
      var context1 = canvas1.getContext('2d')
      var canvas2 = $('#canvas-left-side').get(0)
      var context2 = canvas2.getContext('2d')
      var canvas3 = $('#canvas-vector').get(0)
      var context3 = canvas3.getContext('2d')
      var cellSize = 20
      var rcOne = n1.columnNumber
      var rcTwo = n1.rowNumber

      if($('#entries-equal').val() === 'N') {
        N1.MathLib.GridTools.enterData(rcOne, rcTwo, canvas, context, cellSize)
        this.$('#enter-swap').show()
        this.$('#enter-infer').show()
      } else {
        N1.MathLib.GridTools.same(rcOne, rcTwo, canvas, context, canvas1, context1, canvas2, context2, cellSize)
        n1.size = n1.gridColor.elements.length
        n1.vectorGrid.push(rcOne)
        $('#display').css('heigth', (Number((n1.size * 20) + Number(40))))
        $('#display').css('width', (Number((n1.size * 20) + Number(40))))
        $('#canvas-main').prop('width', Number(n1.size * 20))
        $('#canvas-main').prop('height', Number(n1.size * 20))
        $('#canvas-left-side').prop('width', Number(20))
        $('#canvas-left-side').prop('height', Number(n1.size * 20))
        $('#canvas-bottom').prop('width', Number(n1.size * 20))
        $('#canvas-bottom').prop('height', Number(20))
        this.$('#canvas-vector').show()
        $('#canvas-vector').prop('width', Number(n1.size * 20))
        $('#canvas-vector').prop('height', Number(20))
        this.$('#enter-swap').show()
        this.$('#enter-infer').show()
        N1.MathLib.GridTools.swapRC(1, 1, canvas, context, canvas1, context1, canvas2, context2, cellSize)
      }
    },

    enterSwap: function () {
      n1.columnNumber = $('#column-number').val()
      n1.rowNumber = $('#row-number').val()
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
    }
  })
}())
