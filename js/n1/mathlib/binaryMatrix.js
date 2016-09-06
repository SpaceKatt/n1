/*global N1 */
(function () {
  'use strict'
  N1.MathLib.BinaryMatrix = function BinaryMatrix () {
    this.setElements = function (newElements) {
      var row
      var column
      var elements = newElements.elements || newElements
      if (elements[0] && typeof (elements[0][0]) !== 'undefined') {
        row = elements.length
        this.elements = []
        while (row--) {
          column = elements[row].length
          this.elements[row] = []
          while (column--) {
            this.elements[row][column] = elements[row][column]
          }
        }
        return this
      }
      var elementsLength = elements.length
      this.elements = []
      for (row = 0; row < elementsLength; row++) {
        this.elements.push([elements[row]])
      }
      return this
    }
    this.setRow = function (rowNumberToReplace, replacementRow) {
      if (this.elements.length === 0) {
        /* eslint-disable */
        alert('Matrix (row) is empty. Select a matrix with content.');
        console.log('Matrix (row) is empty. Select a matrix with content.');
        /* eslint-enable */
      } else if (rowNumberToReplace < 1 || rowNumberToReplace >
      this.elements.length) {
      /* eslint-disable */
      alert('Matrix row, to replace, is out of range, please enter valid row.');
      console.log('Matrix row, to replace, is out of range, please enter \
      valid row.')
      /* eslint-enable */

        return null
      } else {
        this.elements[rowNumberToReplace - 1] = replacementRow
      }
    }
    this.getRow = function (rowNumberToGet) {
      if (rowNumberToGet < 1 || rowNumberToGet > this.elements.length) {
      /* eslint-disable */
      alert('Matrix row, to return, is out of range, please enter valid \
      matrix row.');
      console.log('Matrix row, to return, is out of range, please enter \
      valid matrix row.');
      /* eslint-enable */
        return null
      }

      return this.elements[rowNumberToGet - 1]
    }

    // delete row and column method here
    this.deleteRowAndColumn = function (rowNumberToDelete) {
      // console.log('rowNumberToDelete is: ' + rowNumberToDelete)
      if (rowNumberToDelete < 1 || rowNumberToDelete > this.elements.length) {
      /* eslint-disable */
      alert('Matrix row, to delete, is out of range, please enter valid \
      matrix row.');
      console.log('Matrix row, to delete, is out of range, please enter \
      valid matrix row.');
      /* eslint-enable */
        return null
      }
      var deleteMatrixSize = this.elements.length
      var deleteMatrixObject = N1.MathLib.BinaryMatrix.Zero(deleteMatrixSize - 1)
      var tempMo
      var tempMore
      // console.log('deleteMatrixObject is [**] 1: ' + deleteMatrixObject.matrixView())
      // console.log('this.matrixView() is:' + this.matrixView())
      var i
      var flag1 = 1
      for (i = 0; i < deleteMatrixSize; i++) {
        if (i !== (rowNumberToDelete - 1)) {
          deleteMatrixObject.setRow(flag1, this.getRow(i + 1))
           // console.log('this.getRow( ' + (Number(i) + 1) + ') ' + this.getRow(i + 1).toString())
          flag1 = flag1 + 1
        }
      }
      for (var j = 0; j < deleteMatrixObject.elements.length; j++) {
        tempMo = deleteMatrixObject.getRow(j + 1)
        tempMore = N1.MathLib.BinaryVector.NewOne(tempMo)
        // console.log('tempMore is: ' + tempMore.view())
        tempMo = tempMore.getElements()
        // tempMo = tempMore.deleteElement(rowNumberToDelete)
        // console.log('tempMo length is: ' + tempMo.length)
        // console.log('tempMo is: ' + tempMo.toString())
        // console.log('rowNumberToDelete is: ' + rowNumberToDelete)
        tempMo.splice(rowNumberToDelete - 1, 1)
        // console.log('tempMo ' + j + ' is: ' + tempMo.toString())
        // console.log('tempMo length is: ' + tempMo.length)
        deleteMatrixObject.setRow(j + 1, tempMo)
      }
      // console.log('deleteMatrixObject view is: ' + deleteMatrixObject.matrixView())
      return deleteMatrixObject.elements
    }

    this.setElement = function (row, column, valueToSet) {
      if (row < 1 || row > this.elements.length || column < 1 || column >
      this.elements[0].length) {
      /* eslint-disable */
      alert('Matrix element, to set, is out of range, please enter valid \
      matrix element cell.');
      console.log('Matrix element, to set, is out of range, please enter \
      valid matrix element cell.');
      /* eslint-enable */
      } else {
        this.elements[row - 1][column - 1] = valueToSet
      }
    }

    this.getElement = function (row, column) {
      if (row < 1 || row > this.elements.length || column < 1 || column >
      this.elements[0].length) {
      /* eslint-disable */
      alert('Matrix element, to return is out of range. Please enter a valid \
      matrix element cell.');
      console.log('Matrix element, to return is out of range. Please enter a \
      valid matrix element cell.');
      /* eslint-enable */

        return null
      }

      return this.elements[row - 1][column - 1]
    }

    this.setColumn = function (columnNumberToSet, replacementColumn) {
      // console.log('column number to set is: ' + columnNumberToSet)
      // console.log('replacementColumn is:' + replacementColumn.toString())
      // console.log('n1.gridColor is: ' + n1.gridColor.matrixView())
      // var elementsLength
      // var columnNumberToSet
      var numberOfElements
      // var row
      if (this.elements.length === 0) {
      /* eslint-disable */
      alert('Matrix column, to set, is out of range, matrix is empty. Select \
      a matrix with content.');
      console.log('Matrix column, to set, is out of range, matrix is empty. \
      Select a matrix with content.');
      /* eslint-enable */

        return null
      }
      if (columnNumberToSet < 1 || columnNumberToSet > this.elements[0].length) {
      /* eslint-disable */
      alert("Matrix column, to set is out of range, please enter valid \
      column .");
      console.log("Matrix column, to set is out of range, please enter valid \
      column .");
      /* eslint-enable */

        return null
      }
      numberOfElements = this.elements.length
      for (var row1 = 0; row1 < numberOfElements; row1++) {
        this.elements[row1][columnNumberToSet - 1] =
        replacementColumn[row1]
        // replacementColumn[row1]
      }
      // console.log('n1.gridColor is: ' + n1.gridColor.matrixView())
    }

    this.getColumn = function (columnNumberToGet) {
      if (this.elements.length === 0) {
      /* eslint-disable */
      alert('Matrix (col) is empty. Select a matrix with content.')
      console.log('Matrix (col) is empty. Select a matrix with content.')
      /* eslint-enable */

        return null
      }
      if (columnNumberToGet < 1 || columnNumberToGet > this.elements[0].length) {
       /* eslint-disable */
       alert('Matrix column, to return, is out of range, please enter valid \
       column .');
       console.log('Matrix column, to return, is out of range, please enter \
       valid column .');
      /* eslint-enable */

        return null
      }
      var columnToReturn = []
      var columnLength = this.elements.length
      for (var i = 0; i < columnLength; i++) {
        columnToReturn.push(this.elements[i][columnNumberToGet - 1])
      }
      return columnToReturn
    }

    // delete column function here
    this.numberOfRows = function () {
      return this.elements.length
    }

    this.numberOfColumns = function () {
      if (this.elements.length === 0) {
        return 0
      }
      return this.elements[0].length
    }

    this.duplicateMatrix = function () {
      var newOne = N1.MathLib.BinaryMatrix.NewOne(this.elements)
      return newOne
    }

    this.isSameSizeAs = function (matrix) {
      var tempMatrix = matrix.elements || matrix
      if (typeof (tempMatrix[0][0]) === 'undefined') {
        tempMatrix = N1.MathLib.BinaryMatrix.NewOne(tempMatrix).elements
      }
      if (this.elements.length === 0) {
        return tempMatrix.length === 0
      }
      return (this.elements.length === tempMatrix.length &&
        this.elements[0].length === tempMatrix[0].length)
    }

    this.mapProcess = function (procFunction, context) {
      if (this.elements.length === 0) {
        return N1.MathLib.BinaryVector.NewOne([])
      }
      var elements = []
      var numberOfRows = this.elements.length
      var numberOfColumns = this.elements[0].length
      var tempNumberOfColumns
      while (numberOfRows--) {
        tempNumberOfColumns = numberOfColumns
        elements[numberOfRows] = []
        while (tempNumberOfColumns--) {
          elements[numberOfRows][tempNumberOfColumns] = procFunction.call(context,
        this.elements[numberOfRows][tempNumberOfColumns], numberOfRows + 1,
        tempNumberOfColumns + 1)
        }
      }

      return N1.MathLib.BinaryMatrix.NewOne(elements)
    }

    /* need to update the add function for binary numbers */
    this.add = function (matrix) {
      if (this.elements.length === 0) {
        return this.mapProcess(function (value) {
          return value
        })
      }
      var tempMatrix = matrix.elements || matrix
      if (typeof (tempMatrix[0][0]) === 'undefined') {
        tempMatrix = N1.MathLib.BinaryMatrix.NewOne(tempMatrix).elements
      }
      if (!this.isSameSizeAs(tempMatrix)) {
        return null
      }
      return this.mapProcess(function (value, row, column) {
        return value + tempMatrix[row - 1][column - 1]
      })
    }
    // preprocess rows before adding color rows (maybe not??)
    // preprocess to remove rowTwo self referencing red cell (not at this time)
    this.addColorRows = function (rowOne, rowTwo) { // check logic in color add ...
    // console.log('add color row one is: ' + rowOne.view())
    // console.log('add color row two is: ' + rowTwo.view())
      if (rowOne.length <= 0) {  // write a small performance spec..
        return null
      } else if (rowTwo.length <= 0) {
        return null
      } else if (rowOne.length !== rowTwo.length) {
        return null
      } else {
        var tempColorRow = N1.MathLib.BinaryVector.Zero(rowOne.elements.length)
        var i
        for (i = 0; i < rowOne.elements.length; i++) {
          if ((rowOne.element(i + 1) === 1) && (rowTwo.element(i + 1) === 1)) {
            tempColorRow.setElement(i + 1, 1)
          } else if ((rowOne.element(i + 1) === 1) && (rowTwo.element(i + 1) === 2)) {
            tempColorRow.setElement(i + 1, 2)
          } else if ((rowOne.element(i + 1) === 1) && (rowTwo.element(i + 1) === 3)) {
            tempColorRow.setElement(i + 1, 3)
          } else if ((rowOne.element(i + 1) === 1) && (rowTwo.element(i + 1) === 5)) {
            tempColorRow.setElement(i + 1, 5)
          } else if ((rowOne.element(i + 1) === 2) && (rowTwo.element(i + 1) === 1)) {
            tempColorRow.setElement(i + 1, 2)
          } else if ((rowOne.element(i + 1) === 2) && (rowTwo.element(i + 1) === 2)) {
            tempColorRow.setElement(i + 1, 2)
          } else if ((rowOne.element(i + 1) === 2) && (rowTwo.element(i + 1) === 3)) {
            tempColorRow.setElement(i + 1, 3)
          } else if ((rowOne.element(i + 1) === 2) && (rowTwo.element(i + 1) === 3)) {
            tempColorRow.setElement(i + 1, 3)
          } else if ((rowOne.element(i + 1) === 2) && (rowTwo.element(i + 1) === 5)) {
            tempColorRow.setElement(i + 1, 5)
          } else if ((rowOne.element(i + 1) === 3) && (rowTwo.element(i + 1) === 1)) {
            tempColorRow.setElement(i + 1, 3)
          }
        }
        // console.log('temp color row is: ' + tempColorRow.view())
        return tempColorRow
      }
    }

    this.addColorColumns = function (columnOne, columnTwo) {
      if (columnOne.length <= 0) {
        return null
      } else if (columnTwo.length <= 0) {
        return null
      } else if (columnOne.length !== columnTwo.length) {
        return null
      } else {
        var tempColorColumn = N1.MathLib.BinaryVector.Zero(columnOne.elements.length)
        var i
        for (i = 0; i < columnOne.elements.length; i++) {
          if ((columnOne.element(i + 1) === 1) && (columnTwo.element(i + 1) === 1)) {
            tempColorColumn.setElement(i + 1, 1)
          } else if ((columnOne.element(i + 1) === 1) && (columnTwo.element(i + 1) === 2)) {
            tempColorColumn.setElement(i + 1, 2)
          } else if ((columnOne.element(i + 1) === 1) && (columnTwo.element(i + 1) === 3)) {
            tempColorColumn.setElement(i + 1, 3)
          } else if ((columnOne.element(i + 1) === 1) && (columnTwo.element(i + 1) === 5)) {
            tempColorColumn.setElement(i + 1, 5)
          } else if ((columnOne.element(i + 1) === 2) && (columnTwo.element(i + 1) === 1)) {
            tempColorColumn.setElement(i + 1, 2)
          } else if ((columnOne.element(i + 1) === 2) && (columnTwo.element(i + 1) === 2)) {
            tempColorColumn.setElement(i + 1, 2)
          } else if ((columnOne.element(i + 1) === 2) && (columnTwo.element(i + 1) === 3)) {
            tempColorColumn.setElement(i + 1, 3)
          } else if ((columnOne.element(i + 1) === 2) && (columnTwo.element(i + 1) === 3)) {
            tempColorColumn.setElement(i + 1, 3)
          } else if ((columnOne.element(i + 1) === 2) && (columnTwo.element(i + 1) === 5)) {
            tempColorColumn.setElement(i + 1, 5)
          } else if ((columnOne.element(i + 1) === 3) && (columnTwo.element(i + 1) === 1)) {
            tempColorColumn.setElement(i + 1, 3)
          }
        }
        // console.log('add column return is: ' + tempColorColumn.view())
        return tempColorColumn
      }
    }

    this.addTextRows = function (rowOne, rowTwo) {
      // console.log('add text row one is: ' + rowOne.view())
      // console.log('add text row two is: ' + rowTwo.view())
      if (rowOne.elements.length <= 0) {
        return null
      } else if (rowTwo.elements.length <= 0) {
        return null
      } else if (rowOne.elements.length !== rowTwo.elements.length) {
        return null
      } else {
        var tempTextRow = N1.MathLib.BinaryVector.Zero(rowOne.elements.length)
        var i
        for (i = 0; i < rowOne.elements.length; i++) {
          tempTextRow.setElement(i + 1, (rowOne.element(i + 1) + rowTwo.element(i + 1)))
          if (tempTextRow.element(i + 1) > 1) {
            tempTextRow.setElement(i + 1, 1)
          }
        }
        // console.log('temp text row is: ' + tempTextRow.view())
        return tempTextRow
      }
    }

    this.addTextColumns = function (columnOne, columnTwo) {
      if (columnOne.elements.length <= 0) {
        return null
      } else if (columnTwo.elements.length <= 0) {
        return null
      } else if (columnOne.elements.length !== columnTwo.elements.length) {
        return null
      } else {
        var tempTextColumn = N1.MathLib.BinaryVector.One(columnOne.elements.length)
        var i
        for (i = 0; i < columnOne.elements.length; i++) {
        // console.log('columnOne.element(i + 1) is: ' + (columnOne.element(i + 1)))
        // console.log('columnTwo.element(i + 1) is: ' + (columnTwo.element(i + 1)))
          tempTextColumn.setElement(i + 1, (columnOne.element(i + 1) + columnTwo.element(i + 1)))
          if (tempTextColumn.element(i + 1) > 1) {
            tempTextColumn.setElement(i + 1, 1)
          }
        // console.log('tempTextColumn.element(i + 1) is: ' + (tempTextColumn.element(i + 1)))
        }
        // console.log('temp text column is: ' + tempTextColumn.view())
        return tempTextColumn
      }
    }

    this.subtract = function (matrix) {
      if (this.elements.length === 0) {
        return this.mapProcess(function (value) {
          return value
        })
      }
      var tempMatrix = matrix.elements || matrix
      if (typeof (tempMatrix[0][0]) === 'undefined') {
        tempMatrix = N1.MathLib.BinaryMatrix.new_one(tempMatrix).elements
      }
      if (!this.isSameSizeAs(tempMatrix)) {
        return null
      }
      return this.mapProcess(function (value, row, column) {
        return value - tempMatrix[row - 1][column - 1]
      })
    }

    this.leftMultiply = function (binaryMatrix) {
      /* need to think about this one */
      if (this.elements.length === 0) {
        return false
      }
      var tempMatrix = binaryMatrix.elements || binaryMatrix
      if (typeof (tempMatrix[0][0]) === 'undefined') {
        tempMatrix = N1.MathLib.BinaryMatrix.new_one.new_one(tempMatrix).elements
      }
      return (this.elements[0].length === tempMatrix.length)
    }

    this.boolMultiply = function (binaryMatrix) {
      if (this.elements.length === 0) {
        return null
      }
      if (!binaryMatrix.elements) {
        return this.mapProcess(function (value) {
          return value * binaryMatrix
        })
      }
      var returnVector = binaryMatrix.modulus ? true : false
      var tempMatrix = binaryMatrix.elements || binaryMatrix
      if (typeof (tempMatrix[0][0]) === 'undefined') {
        tempMatrix = N1.MathLib.BinaryMatrix.new_one(tempMatrix).elements
      }
      if (!this.leftMultiply(tempMatrix)) {
        return null
      }
      var rowLength = this.elements.length
      var tempMatrixColumnLength = tempMatrix[0].length
      var tempColumnValue
      var columns = this.elements[0].length
      var tempC
      var elements = []
      var sum
      while (rowLength--) {
        tempColumnValue = tempMatrixColumnLength
        elements[rowLength] = []
        while (tempColumnValue--) {
          tempC = columns
          sum = 0
          while (tempC--) {
            sum += this.elements[rowLength][tempC] * tempMatrix[tempC][tempColumnValue]
          }
          if (sum === 0) {
            elements[rowLength][tempColumnValue] = 0
          }
          if (sum !== 0) {
            elements[rowLength][tempColumnValue] = 1
          }
        }
      }
      var newMatrix = N1.MathLib.BinaryMatrix.NewOne(elements)
      return returnVector ? newMatrix.getColumn(1) : newMatrix
    }

    this.matrixView = function () {
      var matrixRows = []
      var elementsLength = this.elements.length
      if (elementsLength === 0) return '[]'
      for (var row = 0; row < elementsLength; row++) {
        matrixRows.push(N1.MathLib.BinaryVector.NewOne(this.elements[row]).view())
      }
      return matrixRows.join('<br>')
    }
  }

  N1.MathLib.BinaryMatrix.NewOne = function (elements) {
    var bm = new N1.MathLib.BinaryMatrix()

    return bm.setElements(elements)
  }

  N1.MathLib.BinaryMatrix.One = function (size) {
    var elements = []
    var rowIndex
    var columnIndex
    for (rowIndex = 0; rowIndex < size; rowIndex++) {
      elements[rowIndex] = []
      for (columnIndex = 0; columnIndex < size; columnIndex++) {
        elements[rowIndex][columnIndex] = 1
      }
    }
    var bm = new N1.MathLib.BinaryMatrix()
    return bm.setElements(elements)
  }

  N1.MathLib.BinaryMatrix.Zero = function (size) {
    var elements = []
    var rowIndex
    var columnIndex
    for (rowIndex = 0; rowIndex < size; rowIndex++) {
      elements[rowIndex] = []
      for (columnIndex = 0; columnIndex < size; columnIndex++) {
        elements[rowIndex][columnIndex] = 0
      }
    }
    var bm = new N1.MathLib.BinaryMatrix()
    return bm.setElements(elements)
  }

  N1.MathLib.BinaryMatrix.Id = function (size) {
    var elements = []
    var rowIndex
    var columnIndex
    for (rowIndex = 0; rowIndex < size; rowIndex++) {
      elements[rowIndex] = []
      for (columnIndex = 0; columnIndex < size; columnIndex++) {
        elements[rowIndex][columnIndex] = (rowIndex === columnIndex) ? 1 : 0
      }
    }
    var bm = new N1.MathLib.BinaryMatrix()
    return bm.setElements(elements)
  }
}())
