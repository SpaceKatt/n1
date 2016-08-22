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

    this.setRow = function (rowNumberToReplace, ReplacementRow) {
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
      valid row.');
      /* eslint-enable */

        return null
      } else {
        /*  this.elements[rowNumberToReplace-1] = ReplacementRow.elements ; */
        this.elements[rowNumberToReplace - 1] = ReplacementRow
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

    this.setElement = function (row, column, valueToSet) {
      if (row < 1 || row > this.elements.length || column < 1 || column >
      this.elements[0].length) {
      /* eslint-disable */
      alert('Matrix element, to set, is out of range, please enter valid \
      matrix element cell.');
      console.log('Matrix element, to set, is out of range, please enter \
      valid matrix element cell.');
    } else {
      this.elements[row-1][column-1] = valueToSet;
    }
  },

  this.getElement = function(row, column) {
    if(row < 1 || row > this.elements.length || column < 1 || column >
      this.elements[0].length) {
      /* eslint-disable */
      alert('Matrix element, to return is out of range. Please enter a valid \
      matrix element cell.');
      console.log('Matrix element, to return is out of range. Please enter a \
      valid matrix element cell.');
      /* eslint-enable */

      return null;
    }

    return this.elements[row-1][column-1];
  },

  this.setColumn = function(columnNumberToSet, replacementColumn) {
  var elementsLength;
  var columnNumberToSet;
  var numberOfElements;
  var row;
    if (this.elements.length === 0) {
      /* eslint-disable */
      alert('Matrix column, to set, is out of range, matrix is empty. Select \
      a matrix with content.');
      console.log('Matrix column, to set, is out of range, matrix is empty. \
      Select a matrix with content.');
      /* eslint-enable */

      return null;
    }
    if (columnNumberToSet < 1 || columnNumberToSet > this.elements[0].length) {
      /* eslint-disable */
      alert("Matrix column, to set is out of range, please enter valid \
      column .");
      console.log("Matrix column, to set is out of range, please enter valid \
      column .");
      /* eslint-enable */

      return null;
    }
    numberOfElements = this.elements.length;
    for (var row = 0; row < numberOfElements; row++) {
      this.elements[row][columnNumberToSet-1] =
      //ReplacementColumn.getElement(row+1);
      replacementColumn[row];
    }
  },

  this.getColumn = function(columnNumberToGet) {
    if (this.elements.length === 0) {
      /* eslint-disable */
     alert('Matrix (col) is empty. Select a matrix with content.');
     console.log('Matrix (col) is empty. Select a matrix with content.');
     /* eslint-enable */

     return null;
    }
    if (columnNumberToGet < 1 || columnNumberToGet > this.elements[0].length) {
       /* eslint-disable */
     alert('Matrix column, to return, is out of range, please enter valid \
     column .');
     console.log('Matrix column, to return, is out of range, please enter \
     valid column .');
     /* eslint-enable */

     return null;
    }
    var columnToReturn = [], columnLength = this.elements.length;
    for (var i = 0; i < columnLength; i++)
    {
      columnToReturn.push(this.elements[i][columnNumberToGet-1]);
    }
    return columnToReturn;
  },

  this.numberOfRows = function() {
    return this.elements.length;
  },

  this.numberOfColumns = function() {
    if (this.elements.length === 0)
    {
      return 0;
    }
    return this.elements[0].length;
  },

  this.duplicateMatrix = function() {
    var newOne = N1.MathLib.BinaryMatrix.newOne(this.elements);
    return newOne;
  },

  this.isSameSizeAs = function(matrix) {
    var tempMatrix = matrix.elements || matrix;
    if (typeof(tempMatrix[0][0]) === 'undefined')
    {
      tempMatrix = bm.new_one(tempMatrix).elements;
    }
    if (this.elements.length === 0)
    {
      return tempMatrix.length === 0;
    }
    return (this.elements.length === tempMatrix.length &&
        this.elements[0].length === tempMatrix[0].length);
  },

  this.mapProcess = function(procFunction, context) {
    if (this.elements.length === 0)
    {
      return N1.MathLib.BinaryVector.newOne([]);
    }
    var elements = [];
    var numberOfRows = this.elements.length;
    var numberOfColumns = this.elements[0].length;
    var tempNumberOfColumns;
    while (numberOfRows--) {
      tempNumberOfColumns = numberOfColumns;
      elements[numberOfRows] = [];
      while (tempNumberOfColumns--) {
        elements[numberOfRows][tempNumberOfColumns] = procFunction.call(context, /* changed numberOfColumns to tempNumberOfColumns */
        this.elements[numberOfRows][tempNumberOfColumns], numberOfRows + 1,
        tempNumberOfColumns + 1);
      }
    }

      return N1.MathLib.BinaryMatrix.newOne(elements);
  },

  /* need to update the add function for binary numbers */
  this.add = function(matrix) {
    if (this.elements.length === 0)
    {
      return this.mapProcess(function(value)
      {
        return value;
      });
    }
    var tempMatrix = matrix.elements || matrix;
    if (typeof(tempMatrix[0][0]) === 'undefined')
    {
      tempMatrix = bm.new_one(tempMatrix).elements;
    }
    if (!this.isSameSizeAs(tempMatrix))
    {
      return null;
    }
    return this.mapProcess(function(value, row, column)
    {
      return value + tempMatrix[row-1][column-1];
    });
  },

  this.subtract = function(matrix) {
   if (this.elements.length === 0)
   {
     return this.mapProcess(function(value)
     {
       return value;
     });
   }
   var tempMatrix = matrix.elements || matrix;
   if (typeof(tempMatrix[0][0]) === 'undefined')
   {
     tempMatrix = N1.MathLib.BinaryMatrix.new_one(tempMatrix).elements;
   }
   if (!this.isSameSizeAs(tempMatrix))
   {
     return null;
   }
   return this.mapProcess(function(value, row, column)
   {
     return value - tempMatrix[row-1][column-1];
   });
 },

 this.leftMultiply = function(binary_matrix) {
   /* need to think about this one */
  if (this.elements.length === 0)
  {
    return false;
  }
  var tempMatrix = binary_matrix.elements || binary_matrix;
  if (typeof(tempMatrix[0][0]) === 'undefined')
  {
    tempMatrix = N1.MathLib.BinaryMatrix.new_one.new_one(tempMatrix).elements;
  }
  return (this.elements[0].length === tempMatrix.length);
},

this.boolMultiply = function(binary_matrix) {
 if (this.elements.length === 0)
 {
   return null;
 }
 if (!binary_matrix.elements) {
   return this.mapProcess(function(value)
   {
     return value * binary_matrix;
   });
 }
 var returnVector = binary_matrix.modulus ? true : false;
 var tempMatrix = binary_matrix.elements || binary_matrix;
 if (typeof(tempMatrix[0][0]) === 'undefined')
 {
   tempMatrix = N1.MathLib.BinaryMatrix.new_one(tempMatrix).elements;
 }
 if (!this.leftMultiply(tempMatrix))
 {
   return null;
 }
 var rowLength = this.elements.length;
 var tempMatrixColumnLength = tempMatrix[0].length;
 var tempColumnValue;
 var columns = this.elements[0].length;
 var tempC;
 var elements = [];
 var sum;
 while (rowLength--)
 {
   tempColumnValue = tempMatrixColumnLength;
   elements[rowLength] = [];
   while (tempColumnValue--)
   {
     tempC = columns;
     sum = 0;
     while (tempC--) {
       sum += this.elements[rowLength][tempC] * tempMatrix[tempC][tempColumnValue];
     }
     if(sum === 0)
     {
       elements[rowLength][tempColumnValue] = 0;
     }
     if(sum !== 0)
     {
       elements[rowLength][tempColumnValue] = 1;
     }
   }
 }
 var newMatrix = N1.MathLib.BinaryMatrix.newOne(elements);
 return returnVector ? newMatrix.getColumn(1) : newMatrix;
},

this.matrixView = function() {
 var matrix_rows = [];
 var elementsLength = this.elements.length;
 if (elementsLength === 0) return '[]';
 for (var row = 0; row < elementsLength; row++) {
   matrix_rows.push(N1.MathLib.BinaryVector.newOne(this.elements[row]).view());
 }
 return matrix_rows.join('<br>');
}


},

N1.MathLib.BinaryMatrix.newOne = function(elements) {
  var bm = new N1.MathLib.BinaryMatrix();

  return bm.setElements(elements);
},

N1.MathLib.BinaryMatrix.one = function(size) {
  var elements = [];
  var rowIndex;
  var columnIndex;
  for(rowIndex = 0; rowIndex < size; rowIndex++){
    elements[rowIndex] = [];
    for(columnIndex = 0; columnIndex < size; columnIndex++){
      elements[rowIndex][columnIndex] = 1;
    }
  }
  var bm = new N1.MathLib.BinaryMatrix();
  return bm.setElements(elements);
},
N1.MathLib.BinaryMatrix.zero = function(size) {
  var elements = [];
  var rowIndex;
  var columnIndex;
  for(rowIndex = 0; rowIndex < size; rowIndex++){
    elements[rowIndex] = [];
    for(columnIndex = 0; columnIndex < size; columnIndex++){
      elements[rowIndex][columnIndex] = 0;
    }
  }
  var bm = new N1.MathLib.BinaryMatrix();
  return bm.setElements(elements);
},

N1.MathLib.BinaryMatrix.id = function(size) {
  var elements = [];
  var rowIndex;
  var columnIndex;
  for(rowIndex = 0; rowIndex < size; rowIndex++){
    elements[rowIndex] = [];
    for(columnIndex = 0; columnIndex < size; columnIndex++){
      elements[rowIndex][columnIndex] = (rowIndex === columnIndex) ? 1 : 0;
    }
  }
  var bm = new N1.MathLib.BinaryMatrix();
  return bm.setElements(elements);
}

}());
