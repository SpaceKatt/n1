/*global N1 */
(function () {
  'use strict'
  N1.MathLib.BinaryVector = function BinaryVector () {
    this.setElements = function (newElements) {
      this.elements = (newElements.elements || newElements).slice()

      return this
    }
    this.setElement = function (position, value) {
      /* Think about adding a value check 0 or 1 only */
      if (position < 1 || position > this.elements.length) {
      /* eslint-disable */
      console.log('Element out of range, please enter valid element.');
      alert('Element out of range, please enter valid element.');
      /* eslint-enable */
      } else {
        this.elements[position - 1] = value
      }
    }

    this.element = function (position) {
      return (position < 1 || position > this.elements.length) ? null : this.elements[position - 1]
    }

    this.indexOf = function (valueWanted) {
      var index = null
      var n = this.elements.length
      for (var i = 0; i < n; i++) {
        /* eslint-disable */
        if (index === null && this.elements[i] == valueWanted) {
        /* eslint-enable */
          index = i + 1
        }
      }

      return index
    }

    this.view = function () {
      return '[' + this.elements.join(', ') + ']'
    }
  }

  N1.MathLib.BinaryVector.NewOne = function (elements) {
    var bv = new N1.MathLib.BinaryVector()

    return bv.setElements(elements)
  }

  N1.MathLib.BinaryVector.Zero = function (size) {
    var elements = []
    var index
    for (index = 0; index < size; index++) {
      elements.push(0)
    }
    var bv = new N1.MathLib.BinaryVector()

    return bv.setElements(elements)
  }

  N1.MathLib.BinaryVector.One = function (size) {
    var elements = []
    var index
    for (index = 0; index < size; index++) {
      elements.push(1)
    }
    var bv = new N1.MathLib.BinaryVector()

    return bv.setElements(elements)
  }
}())
