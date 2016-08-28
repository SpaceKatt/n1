/* global Backbone, N1 */
(function () {
  'use strict'

  // View class for entering initial matrix size
  N1.Views.StructuresInitialView = Backbone.View.extend({
    el: '#n1-app',

    initialize: function () {
      this.listenTo(this.collection, 'sync', this.render)
    },

    render: function () {
      this.collection.each(function (model) {
        var item = new N1.Views.StructuresInputView({model: model})
        item.render().$el
      }, this)

      return this
    },

    events: {
      'click .create': 'onCreate'
    },

    onCreate: function () {
      var $size = this.$('#matrix-size')
      n1.size = $size.val()
      if (n1.size) {
        this.collection.create({
          size: n1.size
        })
      $('#display').css('heigth',(Number((n1.size * 20) + Number(40))))
      $('#display').css('width',(Number((n1.size * 20) + Number(40))))
      $('#canvas-main').prop('width', Number(n1.size * 20))
      $('#canvas-main').prop('height', Number(n1.size * 20))
      $('#canvas-left-side').prop('width', Number(20))
      $('#canvas-left-side').prop('height', Number(n1.size * 20))
      $('#canvas-bottom').prop('width', Number(n1.size * 20))
      $('#canvas-bottom').prop('height', Number(20))
      var canvas = $('#canvas-main').get(0)
      var context = canvas.getContext('2d')
      var canvas1 = $('#canvas-bottom').get(0)
      var context1 = canvas1.getContext('2d')
      var canvas2 = $('#canvas-left-side').get(0)
      var context2 = canvas2.getContext('2d')
      var cellSize = 20
      N1.MathLib.GridTools.swapRC(1, 1, canvas, context, canvas1, context1, canvas2, context2, cellSize)
        $size.val('')
        this.$('#structure-create').hide()
      }
    }
  })
}())
