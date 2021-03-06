/* global N1, n1, alert */
;(function () {
  'use strict'
  // initialize the window with a blank canvas
  // and data input area..
  N1.MathLib.GridTools.initHandler = function initHandler (size) {
    n1.vectorGrid = new N1.MathLib.BinaryMatrix.Zero(1)
    n1.gridText = new N1.MathLib.BinaryMatrix.Zero(size)
    n1.gridColor = new N1.MathLib.BinaryMatrix.Zero(size)
    size = Number(size) + Number(1)
    n1.vEntries = Array.apply(null, {length: size}).map(Number.call, Number)
    n1.vEntries.shift()
    n1.vNames = new N1.MathLib.BinaryVector.NewOne(n1.vEntries)
  }

  // ###########################################################################
  // ###########################################################################
  //       Functions to initialize the grid
  // ###########################################################################
  // ###########################################################################

  function drawYellowCell (x, y, canvas, context, cellSize) {
    var x1 = x
    var y1 = y
    context.fillStyle = 'yellow'
    context.fillRect(x1 * cellSize, y1 * cellSize, cellSize - 1, cellSize - 1)
  }

  function enterYellowColor (x, y) {
    n1.gridColor.setElement(x + 1, y + 1, 1)
  }

  function drawXGridCell (x, canvas1, context1, cellSize, vNames) {
    var text
    context1.fillStyle = 'wheat'
    context1.fillRect((x - 1) * cellSize, 0, cellSize - 1, cellSize - 1)
    context1.fillStyle = 'black'
    context1.font = '0.8em tahoma'
    text = n1.vNames.element(x)
    if (x < 10) {
      context1.fillText(text, (x * cellSize) - 20, 15)
    }
    if (x >= 10) {
      context1.fillText(text, (x * cellSize) - 20, 15) // changed 20 to 22
    }
  }

  function drawYGridCell (y, canvas2, context2, cellSize, vNames) {
    var text
    context2.fillStyle = 'wheat'
    context2.fillRect(0, (y - 1) * cellSize, cellSize - 1, cellSize - 1)
    context2.fillStyle = 'black'
    context2.font = '0.8em tahoma'
    text = n1.vNames.element(y)
    context2.fillText(text, 0, (y * cellSize) - 5)
  }

  function drawRedCell (x, y, canvas, context, cellSize) {
    context.fillStyle = 'red'
    context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
  }

  function enterRedColor (x, y) {
    n1.gridColor.setElement(x + 1, y + 1, 2)
  }

  function drawGreenCell (x, y, canvas, context, cellSize) {
    context.fillStyle = 'green'
    context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
  }

  function enterGreenColor (x, y) {
    n1.gridColor.setElement(x + 1, y + 1, 3)
  }

  function drawLightBlueCell (x, y, canvas, context, cellSize) {
    context.fillStyle = 'lightblue'
    context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
  }

  function drawText (x, y, canvas, context, cellSize, gridText) {
    var text
    context.fillStyle = 'black'
    context.font = '0.8em tahoma'
    context.textAlign = 'center'
    text = n1.gridText.getElement(x + 1, y + 1)
    context.fillText(text, (((x + 1) * cellSize) - (cellSize / 2)), (((y + 1) * cellSize) - (cellSize / 4)))
  }

  N1.MathLib.GridTools.initGrid = function initGrid (canvas, context, canvas1, context1, canvas2, context2, size) {
    var x
    var y
    var cellSize = 20 // should be in global function
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context1.fillStyle = 'black'
    context1.fillRect(0, 0, canvas1.width, canvas1.height)
    context2.fillStyle = 'black'
    context2.fillRect(0, 0, canvas2.width, canvas2.height)
    for (x = 0; x < size; x++) {
      drawXGridCell(x + 1, canvas1, context1, cellSize, n1.vNames)
      for (y = 0; y < size; y++) {
        if (x !== y) {
          drawYellowCell(x, y, canvas, context, cellSize)
          enterYellowColor(x, y)
          drawYGridCell(y + 1, canvas2, context2, cellSize, n1.vNames)
        }
        if (x === y) {
          drawRedCell(x, y, canvas, context, cellSize)
          enterRedColor(x, y)
        }
        drawText(x, y, canvas, context, cellSize, n1.gridText)
      }
    }
  }
  // ##########################################################################
  // ##########################################################################
  //    Functions to enter data into the grid
  // ##########################################################################
  // ##########################################################################
  N1.MathLib.GridTools.enterData = function enterData (rcOne, rcTwo, canvas, context, cellSize) {
    var color = 0
    var rcOneIndex
    var rcTwoIndex
    // var ei
    var ex
    var ey

    // get index numbers for the entered values
    rcOneIndex = n1.vNames.indexOf(rcOne)
    rcTwoIndex = n1.vNames.indexOf(rcTwo)
    if (!((rcOneIndex >= 1) && (rcOneIndex <= n1.size) && (rcTwoIndex >= 1) && (rcTwoIndex <= n1.size))) {
      alert('Please enter a value from 1 to ' + n1.size + ' in each box')
    } else if (rcOneIndex === rcTwoIndex) {
      alert('Please enter two different values.. values can not be the same.')
    } else {
      // need to select the correct index of the input values
      n1.gridText.setElement(rcOneIndex, rcTwoIndex, 1)
      n1.gridText.setElement(rcTwoIndex, rcOneIndex, 0)
      enterRedColor(rcTwoIndex - 1, rcOneIndex - 1)
      enterGreenColor(rcOneIndex - 1, rcTwoIndex - 1)
      console.log('enter n1.gridColor is: ' + n1.gridColor.matrixView())
      console.log('enter n1.gridText is: ' + n1.gridText.matrixView())

      // need to redraw the main canvas using text values
      // use the gridColor matrix
      for (ex = 0; ex < n1.size; ex++) {
        for (ey = 0; ey < n1.size; ey++) {
          color = n1.gridColor.getElement(ex + 1, ey + 1)
          switch (color) {
            case 1:
              drawYellowCell(ex, ey, canvas, context, cellSize)
              break
            case 2:
              drawRedCell(ex, ey, canvas, context, cellSize)
              break
            case 3:
              drawGreenCell(ex, ey, canvas, context, cellSize)
              break
            case 5:
              drawLightBlueCell(ex, ey, canvas, context, cellSize)
              break
          }
          drawText(ex, ey, canvas, context, cellSize, n1.gridText)
        }
      }
    }
  }
  // #########################################################################
  // #########################################################################
  //   Now build a function to infer new information
  //   from the existing properly formed matrix
  //   (all green points in the lower triangular section.)
  // #########################################################################
  // #########################################################################
  N1.MathLib.GridTools.inferenceProcess = function inferenceProcess (canvas, context, canvas1, context1, canvas2, context2, cellSize) {
    var tempGridColor
    var tempGridText
    var tempId
    var rMatrix
    var ix
    var iy
    tempGridColor = n1.gridColor.duplicateMatrix()
    tempGridText = n1.gridText.duplicateMatrix()
    // tempId = N1.MathLib.BinaryMatrix.Id(19)
    tempId = N1.MathLib.BinaryMatrix.Id(n1.size)
    rMatrix = tempGridText.add(tempId)
    N1.MathLib.GridTools.reachabilityMatrix(rMatrix)
    // reachabilityMatrix(rMatrix)
    // ############## draw code here ########
    // need to redraw the main canvas using text values
    for (ix = 0; ix < n1.size; ix++) {
      drawXGridCell(ix + 1, canvas1, context1, cellSize, n1.vNames)
      for (iy = 0; iy < n1.size; iy++) {
        var color
        drawYGridCell(iy + 1, canvas2, context2, cellSize, n1.vNames)
        color = n1.gridColor.getElement(ix + 1, iy + 1)
        switch (color) {
          case 1:
            drawYellowCell(ix, iy, canvas, context, cellSize)
            break
          case 2:
            drawRedCell(ix, iy, canvas, context, cellSize)
            break
          case 3:
            drawGreenCell(ix, iy, canvas, context, cellSize)
            break
          case 5:
            drawLightBlueCell(ix, iy, canvas, context, cellSize)
            break
        }

        drawText(ix, iy, canvas, context, cellSize, N1.MathLib.gridText)
      }
    }
  // ############# draw code end ###########
  }

  N1.MathLib.GridTools.reachabilityMatrix = function reachabilityMatrix (matrixIn) {
    var rmOne
    var rmTwo
    var rmOut1
    var rmOut2
    var rmDiff1
    var rmDiff2
    var colorInferred
    var textInferred
    var tempGridColor
    var tempGridText
    var done = Boolean(0)
    var loopFlag = 25
    var matrixSum
    // start utility function here
    rmOne = matrixIn.duplicateMatrix()
    rmTwo = matrixIn.duplicateMatrix()
    rmOut1 = rmOne.boolMultiply(rmTwo)
    rmOut2 = rmOut1.boolMultiply(rmTwo)
    tempGridColor = n1.gridColor.duplicateMatrix()
    tempGridText = n1.gridText.duplicateMatrix()
    // start a loop to calculate the reachability matrix
    while ((!done) && (loopFlag > 0)) {
      rmDiff1 = rmOut2.subtract(rmOut1)
      // check to see if sum of rmDiff_1 is equal to zero
      // if not boolMultiply rmOut_2 by rmTwo
      // continue the boolMultiply until sum of rmDiff_1 is zero
      matrixSum = rmOut2.subtract(rmOut1)
      if (matrixSum === 0) {
        // done = new Boolean(1)
        done = Boolean(1)
        loopFlag = 0
      } else {
        rmOut1 = rmOut2
        rmOut2 = rmOut2.boolMultiply(rmTwo)
      }
      loopFlag = loopFlag - 1
    }
    rmDiff2 = rmOut2.subtract(rmOne)
    colorInferred = rmDiff2.mapProcess(function (rx) {
      if (rx >= 1) {
        return 4
      } else {
        return 0
      }
    })

    textInferred = rmDiff2.mapProcess(function (rx) {
      if (rx >= 1) {
        return 1
      } else {
        return 0
      }
    })
    tempGridColor = tempGridColor.add(colorInferred)
    tempGridText = tempGridText.add(textInferred)
    n1.gridColor = tempGridColor
    n1.gridText = tempGridText
  // end utility function here....
  }

  // ##########################################################################
  // ##########################################################################
  //   Now build a function to swap the selected row and column pairs
  //   That are entered for the first time in the grid.. (modify swapRC()
  //   based on the approach in moveRC()
  // ##########################################################################
  // ##########################################################################

  N1.MathLib.GridTools.swapRC = function swapRC (rcOne, rcTwo, canvas, context, canvas1, context1, canvas2, context2, cellSize) {
    var tempRCOneIndex
    var tempRCTwoIndex
    var tempGridColorSwap
    var tempGridTextSwap
    var tempRowOneColorSwap
    var tempRowTwoColorSwap
    var tempRowOneTextSwap
    var tempRowTwoTextSwap
    var tempColOneColorSwap
    var tempColTwoColorSwap
    var tempColOneTextSwap
    var tempColTwoTextSwap
    // var si
    var sx
    var sy

    tempRCOneIndex = n1.vNames.indexOf(rcOne)
    tempRCTwoIndex = n1.vNames.indexOf(rcTwo)

    tempGridColorSwap = n1.gridColor.duplicateMatrix()
    tempGridTextSwap = n1.gridText.duplicateMatrix()

    n1.vNames.setElement(tempRCTwoIndex, rcOne)
    n1.vNames.setElement(tempRCOneIndex, rcTwo)

    tempRowOneColorSwap = n1.gridColor.getRow(tempRCOneIndex)
    tempRowTwoColorSwap = n1.gridColor.getRow(tempRCTwoIndex)
    tempRowOneTextSwap = n1.gridText.getRow(tempRCOneIndex)
    tempRowTwoTextSwap = n1.gridText.getRow(tempRCTwoIndex)

    tempGridColorSwap.setRow(tempRCTwoIndex, tempRowOneColorSwap)
    tempGridColorSwap.setRow(tempRCOneIndex, tempRowTwoColorSwap)
    tempGridTextSwap.setRow(tempRCTwoIndex, tempRowOneTextSwap)
    tempGridTextSwap.setRow(tempRCOneIndex, tempRowTwoTextSwap)

    tempColOneColorSwap = tempGridColorSwap.getColumn(tempRCOneIndex)
    tempColTwoColorSwap = tempGridColorSwap.getColumn(tempRCTwoIndex)
    tempColOneTextSwap = tempGridTextSwap.getColumn(tempRCOneIndex)
    tempColTwoTextSwap = tempGridTextSwap.getColumn(tempRCTwoIndex)

    tempGridColorSwap.setColumn(tempRCTwoIndex, tempColOneColorSwap)
    tempGridColorSwap.setColumn(tempRCOneIndex, tempColTwoColorSwap)
    tempGridTextSwap.setColumn(tempRCTwoIndex, tempColOneTextSwap)
    tempGridTextSwap.setColumn(tempRCOneIndex, tempColTwoTextSwap)

    n1.gridColor = tempGridColorSwap
    n1.gridText = tempGridTextSwap

    // ############## draw code here ########
    // need to redraw the main canvas using text values
    for (sx = 0; sx < n1.size; sx++) {
      var color
      drawXGridCell(sx + 1, canvas1, context1, cellSize, n1.vNames)
      for (sy = 0; sy < n1.size; sy++) {
        drawYGridCell(sy + 1, canvas2, context2, cellSize, n1.vNames)
        color = n1.gridColor.getElement(sx + 1, sy + 1)
        switch (color) {
          case 1:
            drawYellowCell(sx, sy, canvas, context, cellSize)
            break
          case 2:
            drawRedCell(sx, sy, canvas, context, cellSize)
            break
          case 3:
            drawGreenCell(sx, sy, canvas, context, cellSize)
            break
          case 5:
            drawLightBlueCell(sx, sy, canvas, context, cellSize)
            break
        }
        drawText(sx, sy, canvas, context, cellSize, n1.gridText)
      }
    }
  }
}())

// #########################################################################
// #########################################################################
//   Now build a function to remove the selected row and column pairs
//   and convert then into one vector (they are the same)
// #########################################################################
// #########################################################################

N1.MathLib.GridTools.same = function same (rcOne, rcTwo, canvas, context, canvas1, context1, canvas2, context2, cellSize) { // work this out...
  var tempRowOneColor
  var tempColumnOneColor
  var tempRowTwoColor
  var tempColumnTwoColor
  var tempRowOneText
  var tempColumnOneText
  var tempRowTwoText
  var tempColumnTwoText
  var mx
  var my
  var rcOneIndex
  var rcTwoIndex

  function drawXGridCell (x, canvas1, context1, cellSize, vNames) {
    var text
    context1.fillStyle = 'wheat'
    context1.fillRect((x - 1) * cellSize, 0, cellSize - 1, cellSize - 1)
    context1.fillStyle = 'black'
    context1.font = '0.8em tahoma'
    text = n1.vNames.element(x)
    if (x < 10) {
      context1.fillText(text, (x * cellSize) - 20, 15)
    }
    if (x >= 10) {
      context1.fillText(text, (x * cellSize) - 20, 15) // changed 20 to 22
    }
  }

  function drawYGridCell (y, canvas2, context2, cellSize, vNames) {
    var text
    context2.fillStyle = 'wheat'
    context2.fillRect(0, (y - 1) * cellSize, cellSize - 1, cellSize - 1)
    context2.fillStyle = 'black'
    context2.font = '0.8em tahoma'
    text = n1.vNames.element(y)
    context2.fillText(text, 0, (y * cellSize) - 5)
  }

  function drawRedCell (x, y, canvas, context, cellSize) {
    context.fillStyle = 'red'
    context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
  }

  function drawText (x, y, canvas, context, cellSize, gridText) {
    var text
    context.fillStyle = 'black'
    context.font = '0.8em tahoma'
    context.textAlign = 'center'
    text = n1.gridText.getElement(x + 1, y + 1)
    context.fillText(text, (((x + 1) * cellSize) - (cellSize / 2)), (((y + 1) * cellSize) - (cellSize / 4)))
  }

  function drawYellowCell (x, y, canvas, context, cellSize) {
    var x1 = x
    var y1 = y
    context.fillStyle = 'yellow'
    context.fillRect(x1 * cellSize, y1 * cellSize, cellSize - 1, cellSize - 1)
  }

  function drawGreenCell (x, y, canvas, context, cellSize) {
    context.fillStyle = 'green'
    context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
  }

  function drawLightBlueCell (x, y, canvas, context, cellSize) {
    context.fillStyle = 'lightblue'
    context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
  }

  rcOneIndex = (n1.vNames.indexOf(rcOne))
  rcTwoIndex = (n1.vNames.indexOf(rcTwo))
  n1.vNames.deleteElement(rcTwoIndex)
  // n1.size = n1.vNames.elements.length // needed to control canvas size
  tempRowOneColor = N1.MathLib.BinaryVector.NewOne(n1.gridColor.getRow(rcOneIndex))
  tempRowTwoColor = N1.MathLib.BinaryVector.NewOne(n1.gridColor.getRow(rcTwoIndex))
  tempRowOneColor = n1.gridColor.addColorRows(tempRowOneColor, tempRowTwoColor)
  tempColumnOneColor = N1.MathLib.BinaryVector.NewOne(n1.gridColor.getColumn(rcOneIndex))
  tempColumnTwoColor = N1.MathLib.BinaryVector.NewOne(n1.gridColor.getColumn(rcTwoIndex))
  tempColumnOneColor = n1.gridColor.addColorColumns(tempColumnOneColor, tempColumnTwoColor)
  n1.gridColor.setRow(rcOneIndex, tempRowOneColor)
  n1.gridColor.setColumn(rcOneIndex, tempColumnOneColor.elements)
  n1.gridColor = N1.MathLib.BinaryMatrix.NewOne(n1.gridColor.deleteRowAndColumn(rcTwoIndex))
  // console.log('same n1.gridColor is: ' + n1.gridColor.matrixView())

  tempRowOneText = N1.MathLib.BinaryVector.NewOne(n1.gridText.getRow(rcOneIndex))
  tempRowTwoText = N1.MathLib.BinaryVector.NewOne(n1.gridText.getRow(rcTwoIndex))
  tempRowOneText = n1.gridText.addTextRows(tempRowOneText, tempRowTwoText)
  tempColumnOneText = N1.MathLib.BinaryVector.NewOne(n1.gridText.getColumn(rcOneIndex))
  tempColumnTwoText = N1.MathLib.BinaryVector.NewOne(n1.gridText.getColumn(rcTwoIndex))
  tempColumnOneText = n1.gridText.addTextColumns(tempColumnOneText, tempColumnTwoText)
  n1.gridText.setColumn(rcOneIndex, tempColumnOneText.elements)
  n1.gridText.setRow(rcOneIndex, tempRowOneText)
  n1.gridText = N1.MathLib.BinaryMatrix.NewOne(n1.gridText.deleteRowAndColumn(rcTwoIndex))

  // ############## draw code here ########
  // need to redraw the main canvas using text values
  context1.clearRect(0, 0, canvas1.width, canvas1.height)
  context2.clearRect(0, 0, canvas2.width, canvas2.height)
  context.clearRect(0, 0, canvas.width, canvas.height)
  for (mx = 0; mx < n1.gridColor.elements.length; mx++) {
    var color
    drawXGridCell(mx + 1, canvas1, context1, cellSize, n1.vNames)
    for (my = 0; my < n1.gridColor.elements.length; my++) {
      drawYGridCell(my + 1, canvas2, context2, cellSize, n1.vNames)
      color = n1.gridColor.getElement(mx + 1, my + 1)
      switch (color) {
        case 1:
          drawYellowCell(mx, my, canvas, context, cellSize)
          break
        case 2:
          drawRedCell(mx, my, canvas, context, cellSize)
          break
        case 3:
          drawGreenCell(mx, my, canvas, context, cellSize)
          break
        case 5:
          drawLightBlueCell(mx, my, canvas, context, cellSize)
          break
      }
      drawText(mx, my, canvas, context, cellSize, n1.gridText)
    }
  }
}
