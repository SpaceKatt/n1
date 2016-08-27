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
      console.log('1- n1.size = ' + n1.size)
      if ($size.val()) {
        this.collection.create({
          size: $size.val()
        })

        $size.val('')
        this.$('#structure-create').hide()
      }
    }
  })
}())
