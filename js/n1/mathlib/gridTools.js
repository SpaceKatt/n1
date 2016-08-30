/* global N1, n1 */
(function () {
  'use strict'
  // initialize the window with a blank canvas
  // and data input area..
  N1.MathLib.GridTools.initHandler = function initHandler (size) {
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

  function enterLightBlueColor (x, y) {
    n1.gridColor.setElement(x + 1, y + 1, 4)
  }

  function drawOrangeCell (x, y, canvas, context, cellSize) {
    context.fillStyle = 'orange'
    context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
  }

  function enterOrangeColor (x, y) {
    n1.gridColor.setE(x + 1, y + 1, 5)
  }

  function drawText (x, y, canvas, context, cellSize, gridText) {
    var text
    context.fillStyle = 'black'
    context.font = '0.8em tahoma'
    context.textAlign = 'center'
    text = n1.gridText.getElement(x + 1, y + 1)
    context.fillText(text, (((x + 1) * cellSize) - (cellSize / 2)), (((y + 1) * cellSize) - (cellSize / 4)))
  }

  function drawText1 (x, y, canvas, context, cellSize) {
    context.fillStyle = 'black'
    context.font = '0.8em tahoma'
    context.textAlign = 'center'
    context.fillText('1', (((x + 1) * cellSize) - (cellSize / 2)), (((y + 1) * cellSize) - (cellSize / 4)))
  }
  function drawText0 (x, y, canvas, context, cellSize) {
    context.fillStyle = 'black'
    context.font = '0.8em tahoma'
    context.textAlign = 'center'
    context.fillText('0', (((x + 1) * cellSize) - (cellSize / 2)), (((y + 1) * cellSize) - (cellSize / 4)))
  }

  N1.MathLib.GridTools.initGrid =	function initGrid (canvas, context, canvas1, context1, canvas2, context2, size) {
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
    var ei
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
  //   Now build a function to handle the order assessment
  // #########################################################################
  // #########################################################################
  function noSwapRC () {
    document.getElementById('one').value = 'N'
    document.getElementById('two').value = 'N'
    document.getElementById('northTrue').style.display = 'none'
    document.getElementById('northFalse').style.display = 'none'
    document.getElementById('entryButton').style.display = 'inline'
    document.getElementById('processButton').style.display = 'inline'
    document.getElementById('inferenceButton').style.display = 'inline'
  }
  function processData () {
    document.getElementById('moveData').style.display = 'inline'
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
    var rmOne
    var rmTwo
    var rmOut1
    var rmOut2
    var rmDiff1
    var rmDiff2
    var colorInferred
    var textInferred
    var ii
    var ix
    var iy
    var tempGridColor = n1.gridColor.duplicateMatrix()
    tempGridText = n1.gridText.duplicateMatrix()
    // tempId = N1.MathLib.BinaryMatrix.Id(19)
    tempId = N1.MathLib.BinaryMatrix.Id(n1.size)
    rMatrix = tempGridText.add(tempId)
    N1.MathLib.GridTools.reachabilityMatrix(rMatrix)
    // reachabilityMatrix(rMatrix)
    // ############## draw code here ########
    // need to redraw the main canvas using text values
    // for (ix = 0; ix < 19; ix++) {
    for (ix = 0; ix < n1.size; ix++) {
      drawXGridCell(ix + 1, canvas1, context1, cellSize, n1.vNames)
      // for (iy = 0; iy < 19; iy++) {
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
    var done = new Boolean(0)
    var loopFlag = 25
    var ri
    var rx
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
        done = new Boolean(1)
        loopFlag = 0
      } else {
        rmOut1 = rmOut2
        rmOut2 = rmOut2.boolMultiply(rmTwo)
      }
      loopFlag = loopFlag - 1
    }
    rmDiff2 = rmOut2.subtract(rmOne)
    colorInferred = rmDiff2.mapProcess(function(rx){
      if(rx >= 1) {
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
  // #########################################################################
  // #########################################################################
  //   Now build a function to swap the selected row and column pairs
  //   That are existing data in the grid (move city data )
  // #########################################################################
  // #########################################################################

  function moveRC () {
    var cellSize = 20
    var moveOne = document.getElementById('moveOne').value
    var moveTwo = document.getElementById('moveTwo').value
    var canvas = document.getElementById('canvas-main')
    var context = canvas.getContext('2d')
    var canvas1 = document.getElementById('canvas-bottom')
    var context1 = canvas1.getContext('2d')
    var canvas2 = document.getElementById('canvas-left-side')
    var context2 = canvas2.getContext('2d')

    var tempRowOneColor
    var tempRowTwoColor
    var tempRowOneText
    var tempRowTwoText

    var tempColOneColor
    var tempColTwoColor
    var tempColOneText
    var tempColTwoText

    var tempGridColor
    var tempGridText
    var mx
    var my
    var mi
    var moveOneIndex
    var moveTwoIndex

    moveOneIndex = n1.vNames.indexOf(moveOne)
    moveTwoIndex = n1.vNames.indexOf(moveTwo)

    n1.vNames.setElement(moveTwoIndex, moveOne)
    n1.vNames.setElement(moveOneIndex, moveTwo)

    tempRowOneColor = n1.gridColor.row(moveOneIndex)
    tempRowTwoColor = n1.gridColor.row(moveTwoIndex)
    tempRowOneText = n1.gridText.row(moveOneIndex)
    tempRowTwoText = n1.gridText.row(moveTwoIndex)

    tempGridColor.setRow(moveTwoIndex, tempRowOneColor)
    tempGridColor.setRow(moveOneIndex, tempRowTwoColor)
    tempGridText.setRow(moveTwoIndex, tempRowOneText)
    tempGridText.setRow(moveOneIndex, tempRowTwoText)

    tempColOneColor = tempGridColor.col(moveOneIndex)
    tempColTwoColor = tempGridColor.col(moveTwoIndex)
    tempColOneText = tempGridText.col(moveOneIndex)
    tempColTwoText = tempGridText.col(moveTwoIndex)

    tempGridColor.setCol(moveTwoIndex, tempColOneColor)
    tempGridColor.setCol(moveOneIndex, tempColTwoColor)
    tempGridText.setCol(moveTwoIndex, tempColOneText)
    tempGridText.setCol(moveOneIndex, tempColTwoText)

    n1.gridColor = tempGridColor
    n1.gridText = tempGridText

    // ############## draw code here ########
    // need to redraw the main canvas using text values
    // use the gridColor matrix
    for (mx = 0; mx < 19; mx++) {
      var color
      drawXGridCell(mx + 1, canvas1, context1, cellSize, n1.vNames) // added +1
      for (my = 0; my < 19; my++) {
        drawYGridCell(my + 1, canvas2, context2, cellSize, n1.vNames) // added +1
        color = n1.gridColor.getElement(mx + 1, my + 1)
        switch (color) {
          case 1:
            drawYellowCell(mx, my, canvas, context, cellSize)
            break
          case 2:
            drawRedCell(mx, my, canvas, context, cellSize)
            // alert ("Drawing red cell in the box swap function");
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
    // ############# draw code end ###########
    document.getElementById('moveData').style.display = 'none'
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
    var si
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

  N1.MathLib.GridTools.same = function same (rcOne, rcTwo, canvas, context, canvas1, context1, canvas2, context2, cellSize) {

  var tempRowOneColor
  var tempRowTwoColor
  var tempRowOneText
  var tempRowTwoText

  var tempColOneColor
  var tempColTwoColor
  var tempColOneText
  var tempColTwoText

  var tempGridColor
  var tempGridText
  var mx
  var my
  var mi
  // var moveOneIndex
  var rcOneIndex
  // var moveTwoIndex
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

  rcOneIndex = (n1.vNames.indexOf(rcOne)) // need to get offset
  console.log('rcOne index is:' + rcOneIndex)
  rcTwoIndex = (n1.vNames.indexOf(rcTwo)) //need to get offset
 // remove rcTwo values from vNames
  n1.vNames.deleteElement(rcTwoIndex)
  console.log('n1.vNames is now:' + n1.vNames.view())
  // n1.vNames.setElement(moveOneIndex, moveTwo)
  // need to add the two rows data together to fit in on row
  // tempRowOneColor = n1.gridColor.row(rcOneIndex)
  console.log('n1.gridColor is: ' + n1.gridColor.matrixView())
  tempRowOneColor = N1.MathLib.BinaryVector.NewOne(n1.gridColor.getRow(rcOneIndex))
  tempRowTwoColor = N1.MathLib.BinaryVector.NewOne(n1.gridColor.getRow(rcTwoIndex))
  console.log('rowOne is: ' + tempRowOneColor.view())
  console.log('rowTwo is: ' + tempRowTwoColor.view())
  tempRowOneColor = n1.gridColor.addColorRows(tempRowOneColor, tempRowTwoColor)
  console.log('tempRowOneColor is now:' + tempRowOneColor.view())
  // tempRowTwoColor = n1.gridColor.row(rcTwoIndex)
  // tempRowOneText = n1.gridText.row(rcOneIndex)
  tempRowOneText = N1.MathLib.BinaryVector.NewOne(n1.gridText.getRow(rcOneIndex))
  tempRowTwoText = N1.MathLib.BinaryVector.NewOne(n1.gridText.getRow(rcTwoIndex))
  console.log('rowOneText is: ' + tempRowOneText.view())
  console.log('rowTwoText is: ' + tempRowTwoText.view())
  tempRowOneText = n1.gridText.addTextRows(tempRowOneText, tempRowTwoText)
  console.log('rowOneText now is: ' + tempRowOneText.view())
  console.log('n1.gridColor is : ' + n1.gridColor.matrixView())
  console.log('n1.gridText is: ' + n1.gridText.matrixView())

  n1.gridColor = N1.MathLib.BinaryMatrix.NewOne(n1.gridColor.deleteRow(rcTwo))

  console.log('n1.gridColor is: ' + n1.gridColor.matrixView())

  // n1.gridColor = tempGridColor
  // n1.gridText = tempGridText

  // ############## draw code here ########
  // need to redraw the main canvas using text values
  // use the gridColor matrix
  // for (mx = 0; mx < 19; mx++) {
  console.log('n1.gridColor.elements.length is: ' + n1.gridColor.elements.length)
  context1.clearRect(0, 0, canvas1.width, canvas1.height)
  context2.clearRect(0, 0, canvas2.width, canvas2.height)
  context.clearRect(0, 0, canvas.width, canvas.height)
  for (mx = 0; mx < n1.gridColor.elements.length; mx++) {
    var color
    // context1.clearRect(0, 0, canvas1.width, canvas1.height)
    drawXGridCell(mx + 1, canvas1, context1, cellSize, n1.vNames)
    // for (my = 0; my < 19; my++) {
    for (my = 0; my < n1.gridColor.elements.length; my++) {
      // context2.clearRect(0, 0, canvas2.width, canvas2.height)
      drawYGridCell(my + 1, canvas2, context2, cellSize, n1.vNames)
      color = n1.gridColor.getElement(mx + 1, my + 1)
      // context.clearRect(0, 0, canvas.width, canvas.height)
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
  // ############# draw code end ###########
  // document.getElementById('moveData').style.display = 'none'
}
