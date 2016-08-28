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
        $size.val('')
        this.$('#structure-create').hide()
      }
    }
  })
}())
