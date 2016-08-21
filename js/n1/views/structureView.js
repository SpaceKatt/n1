/* global Backbone, _, N1 */
(function () {
  'use strict'

  // The DOM element for a todo item...
  N1.Views.StructureView = Backbone.View.extend({

    // ... is a list tag.
    tagName: 'li',

    // Cache the template function for a single item.
    // template: _.template($('#item-template').html()),
    template: _.template(
      '<div class="view">' +
      '<input class="toggle" type="checkbox" <%= done ? \'checked="checked"\' : \'\' %> />' +
      '<label><%- title %></label>' +
      '<a class="destroy"></a>' +
    '</div>' +
    '<input class="edit" type="text" value="<%- title %>" />' ),

    // The DOM events specific to an item.
    events: {
      'click .toggle': 'toggleDone',
      'dblclick .view': 'edit',
      'click a.destroy': 'clear',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    },

    // The StructureView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Structure** and a //**StructureView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function () {
      this.listenTo(this.model, 'change', this.render)
      this.listenTo(this.model, 'destroy', this.remove)
    },

    // Re-render the titles of the todo item.
    render: function () {
      this.$el.html(this.template(this.model.toJSON()))
      this.$el.toggleClass('done', this.model.get('done'))
      this.input = this.$('.edit')
      return this
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function () {
      this.model.toggle()
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function () {
      this.$el.addClass('editing')
      this.input.focus()
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function () {
      var value = this.input.val()
      if (!value) {
        this.clear()
      } else {
        this.model.save({title: value})
        this.$el.removeClass('editing')
      }
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function (e) {
      if (e.keyCode === 13) this.close()
    },

    // Remove the item, destroy the model.
    clear: function () {
      this.model.destroy()
    }

  })
}())
