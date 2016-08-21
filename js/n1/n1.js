/* global _, $, Backbone, N1 */
// Model class for each structure

// View class for displaying each muppet list item
var StructuresListItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'structure',
  template: _.template($('#structure-item-tmpl').html()),

  initialize: function () {
    this.listenTo(this.model, 'destroy', this.remove)
  },

  render: function () {
    var html = this.template(this.model.toJSON())
    this.$el.html(html)
    return this
  },

  events: {
    'click .remove': 'onRemove'
  },

  onRemove: function () {
    this.model.destroy()
  }
})

// View class for rendering the list of all muppets
var StructuresListView = Backbone.View.extend({
  el: '#n1-app',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function () {
    var $list = this.$('ul.structure-list').empty()

    this.collection.each(function (model) {
      var item = new StructuresListItemView({model: model})
      $list.append(item.render().$el)
    }, this)

    return this
  },

  events: {
    'click .create': 'onCreate'
  },

  onCreate: function () {
    var $size = this.$('#matrix-size')

    if ($size.val()) {
      this.collection.create({
        size: $size.val()
      })

      $size.val('')
      this.$('#structure-create').hide()
    }
  }
})

// Create a new list collection, a list view, and then fetch list data:
var structuresList = new N1.Collections.StructureList()
var structuresView = new StructuresListView({collection: structuresList})
structuresList.fetch()
