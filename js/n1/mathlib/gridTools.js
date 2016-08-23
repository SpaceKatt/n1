/* global N1 */
'use strict'
/*
 * Copyright (c) 2013, 2014, 2015, 2016 Joseph J. Simpson
 * This file is part of a web program, this program will have multiple versions.
 * This file in the web program is free software: you can redistribute ist and/or modify
 * it under the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * The bsmp_wa_1 program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with bsmp_wa_1.
 * If not, see <http://www.gnu.org/licenses/>
 */

 // Add javascript code here to draw the BSMP Grid
 // and add the initial color scheme..

N1.MathLib.gridText = null
N1.MathLib.gridColor = null
N1.MathLib.vNames = null
/*
window.onload = function () {
  document.getElementById('one').value = 'N'
  document.getElementById('two').value = 'N'
  document.getElementById('northTrue').style.display = 'none'
  document.getElementById('northFalse').style.display = 'none'
  document.getElementById('moveData').style.display = 'none'
  var initButton = document.getElementById('initButton')
  initButton.onclick = initHandler
} */
 // initialize the window with a blank canvas
 // and data input area..
//N1.MathLib.BinaryMatrix.one = function(size) {
//function initHandler () {
N1.MathLib.GridTools.initHandler = function initHandler () {
  var canvas = document.getElementById('canvas-main')
  var context = canvas.getContext('2d')
  var canvas1 = document.getElementById('canvas-left-side')
  var context1 = canvas1.getContext('2d')
  var canvas2 = document.getElementById('canvas-bottom')
  var context2 = canvas2.getContext('2d')

  // N1.MathLib.gridText = BSMP.MatrixBin.O(19)
  N1.MathLib.gridText = N1.MathLib.BinaryMatrix.zero(19)
  // N1.MathLib.gridColor = BSMP.MatrixBin.O(19)
  N1.MathLib.gridColor = N1.MathLib.BinaryMatrix.zero(19)
  N1.MathLib.vNames = N1.MathLib.BinaryVector.newOne([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
  /*
  initGrid(canvas, context, canvas1, context1, canvas2, context2, N1.MathLib.gridText, N1.MathLib.vNames)

  document.getElementById('one').value = 'N'
  document.getElementById('two').value = 'N'
  document.getElementById('moveData').style.display = 'none'
  document.getElementById('northTrue').style.display = 'none'
  document.getElementById('northFalse').style.display = 'none'
  // write out gridText
  // writeToDocOne(gridText.view());

  function writeToDocOne (message) {
    document.getElementById('test_out').innerHTML = message
  } */
}

// ################################################################################################
// ################################################################################################
// #####
// #####        Functions to initialize the 19 by 19 grid
// #####
// ################################################################################################
// ################################################################################################

function drawYellowCell (x, y, canvas, context, cellSize) {
  var x1 = x
  var y1 = y
  context.fillStyle = 'yellow'
  context.fillRect(x1 * cellSize, y1 * cellSize, cellSize - 1, cellSize - 1)
}

function enterYellowColor (x, y) {
  N1.MathLib.gridColor.setE(x + 1, y + 1, 1)
}

function drawXGridCell (x, canvas1, context1, cellSize, vNames) {
  var text
  context1.fillStyle = 'wheat'
  context1.fillRect((x - 1) * cellSize, 0, cellSize - 1, cellSize - 1)
  context1.fillStyle = 'black'
  context1.font = '1em tahoma'
  text = N1.MathLib.vNames.e(x)
  if (x < 10) {
    context1.fillText(text, (x * cellSize) - 20, 15)
  }
  if (x >= 10) {
    context1.fillText(text, (x * cellSize) - 20, 15)
  }
}

function drawYGridCell (y, canvas2, context2, cellSize, vNames) {
  var text
  context2.fillStyle = 'wheat'
  context2.fillRect(0, (y - 1) * cellSize, cellSize - 1, cellSize - 1)
  context2.fillStyle = 'black'
  context2.font = '1em tahoma'
  text = N1.MathLib.vNames.e(y)
  context2.fillText(text, 0, (y * cellSize) - 5)
}

function drawRedCell (x, y, canvas, context, cellSize) {
  context.fillStyle = 'red'
  context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
}

function enterRedColor (x, y) {
  N1.MathLib.gridColor.setE(x + 1, y + 1, 2)
}

function drawGreenCell (x, y, canvas, context, cellSize) {
  context.fillStyle = 'green'
  context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
}

function enterGreenColor (x, y) {
  N1.MathLib.gridColor.setE(x + 1, y + 1, 3)
}

function drawLightBlueCell (x, y, canvas, context, cellSize) {
  context.fillStyle = 'lightblue'
  context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
}

function enterLightBlueColor (x, y) {
  N1.MathLib.gridColor.setE(x + 1, y + 1, 4)
}

function drawOrangeCell (x, y, canvas, context, cellSize) {
  context.fillStyle = 'orange'
  context.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
}

function enterOrangeColor (x, y) {
  N1.MathLib.gridColor.setE(x + 1, y + 1, 5)
}

function drawText (x, y, canvas, context, cellSize, gridText) {
  var text
  context.fillStyle = 'black'
  context.font = '1em tahoma'
  context.textAlign = 'center'
  text = N1.MathLib.gridText.e(x + 1, y + 1)
  context.fillText(text, (((x + 1) * cellSize) - (cellSize / 2)), (((y + 1) * cellSize) - (cellSize / 4)))
}

function drawText1 (x, y, canvas, context, cellSize) {
  context.fillStyle = 'black'
  context.font = '1em tahoma'
  context.textAlign = 'center'
  context.fillText('1', (((x + 1) * cellSize) - (cellSize / 2)), (((y + 1) * cellSize) - (cellSize / 4)))
}
function drawText0 (x, y, canvas, context, cellSize) {
  context.fillStyle = 'black'
  context.font = '1em tahoma'
  context.textAlign = 'center'
  context.fillText('0', (((x + 1) * cellSize) - (cellSize / 2)), (((y + 1) * cellSize) - (cellSize / 4)))
}
	function initGrid (canvas, context, canvas1, context1, canvas2, context2) {
  var x
  var y
  var cellSize = 20 // should be in global function
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context1.fillStyle = 'black'
  context1.fillRect(0, 0, canvas1.width, canvas1.height)
  context2.fillStyle = 'black'
  context2.fillRect(0, 0, canvas2.width, canvas2.height)
  for (x = 0; x < 19; x++) {
    drawXGridCell(x + 1, canvas1, context1, cellSize, N1.MathLib.vNames)

    for (y = 0; y < 19; y++) {
      if (x !== y) {
        drawYellowCell(x, y, canvas, context, cellSize)
        enterYellowColor(x, y)
        drawYGridCell(y + 1, canvas2, context2, cellSize, N1.MathLib.vNames)
      }
      if (x === y) {
        drawRedCell(x, y, canvas, context, cellSize)
        enterRedColor(x, y)
      }
      drawText(x, y, canvas, context, cellSize, N1.MathLib.gridText)
    }
  }
}

 // ################################################################################################
 // ################################################################################################
 // #####
 // #####        Functions to enter data into the 19 by 19 grid
 // #####
 // ################################################################################################
 // ################################################################################################
function enterData () {
  var rcOne = document.getElementById('one').value
  var rcTwo = document.getElementById('two').value
  var canvas = document.getElementById('BSMP_1')
  var context = canvas.getContext('2d')
  var cellSize = 20
  var color = 0
  var rcOneIndex
  var rcTwoIndex
  var ei
  var ex
  var ey

// get index numbers for the entered values
  rcOneIndex = N1.MathLib.vNames.indexOf(rcOne)
  rcTwoIndex = N1.MathLib.vNames.indexOf(rcTwo)
  if (!((rcOneIndex >= 1) && (rcOneIndex <= 19) && (rcTwoIndex >= 1) && (rcTwoIndex <= 19))) {
    alert('Please enter a value from 1 to 19 in each box')
  } else if (rcOneIndex === rcTwoIndex) {
    alert('Please enter two different values.. values can not be the same.')
  } else {
  // need to select the correct index of the input values
    N1.MathLib.gridText.setE(rcOneIndex, rcTwoIndex, 1)
    N1.MathLib.gridText.setE(rcTwoIndex, rcOneIndex, 0)
    enterRedColor(rcTwoIndex - 1, rcOneIndex - 1)
    enterGreenColor(rcOneIndex - 1, rcTwoIndex - 1)
  // need to redraw the main canvas using text values
  // use the gridColor matrix
    for (ex = 0; ex < 19; ex++) { // reduce to 0 and <
      for (ey = 0; ey < 19; ey++) { // reduce to 0 and <
        color = N1.MathLib.gridColor.e(ex + 1, ey + 1) // take out the + 1
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
        drawText(ex, ey, canvas, context, cellSize, N1.MathLib.gridText)
      }
    }
    document.getElementById('northTrue').style.display = 'inline'
    document.getElementById('northFalse').style.display = 'inline'
    document.getElementById('entryButton').style.display = 'none'
    document.getElementById('processButton').style.display = 'none'
    document.getElementById('inferenceButton').style.display = 'none'
  // writeToDocOne(gridColor.inspect());
  }
}
 // ################################################################################################
 // ################################################################################################
 //
 //   Now build a function to handle the order assessment
 //
 // ################################################################################################
 // ################################################################################################
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
 // ################################################################################################
 // ################################################################################################
 //
 //   Now build a function to infer new information
 //   from the existing properly formed matrix (all green points in the lower triangular.)
 //
 // ################################################################################################
 // ################################################################################################
function inferenceProcess () {
  var cellSize = 20 // should be in global function variable
  var canvas = document.getElementById('BSMP_1')
  var context = canvas.getContext('2d')
  var canvas1 = document.getElementById('BSMP_2')
  var context1 = canvas1.getContext('2d')
  var canvas2 = document.getElementById('BSMP_3')
  var context2 = canvas2.getContext('2d')
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
  var tempGridColor = N1.MathLib.gridColor.dup()
  tempGridText = N1.MathLib.gridText.dup()
  tempId = N1.MathLib.BinaryMatrix.Id(19)
  rMatrix = tempGridText.add(tempId)
  reachabilityMatrix(rMatrix)
  // ############## draw code here ########
  // need to redraw the main canvas using text values
  for (ix = 0; ix < 19; ix++) {
    drawXGridCell(ix + 1, canvas1, context1, cellSize, N1.MathLib.vNames) // added +1
    for (iy = 0; iy < 19; iy++) {
      var color
      drawYGridCell(iy + 1, canvas2, context2, cellSize, N1.MathLib.vNames) // added +1
      color = N1.MathLib.gridColor.e(ix + 1, iy + 1)
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

function reachabilityMatrix (matrixIn) {
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
  rmOne = matrixIn.dup()
  rmTwo = matrixIn.dup()
  rmOut1 = rmOne.boolMultiply(rmTwo)
  rmOut2 = rmOut1.boolMultiply(rmTwo)
  tempGridColor = N1.MathLib.gridColor.dup()
  tempGridText = N1.MathLib.gridText.dup()
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
  textInferred = rmDiff2.map(function (rx) { if (rx >= 1) { return 1 } else { return 0 } })
  tempGridColor = tempGridColor.add(colorInferred)
  tempGridText = tempGridText.add(textInferred)
  N1.MathLib.gridColor = tempGridColor
  N1.MathLib.gridText = tempGridText
    // end utility function here....
}
 // ################################################################################################
 // ################################################################################################
 //
 //   Now build a function to swap the selected row and column pairs
 //   That are existing data in the grid (move city data )
 //
 // ################################################################################################
 // ################################################################################################

function moveRC () {
  var cellSize = 20
  var moveOne = document.getElementById('moveOne').value
  var moveTwo = document.getElementById('moveTwo').value
  var canvas = document.getElementById('BSMP_1')
  var context = canvas.getContext('2d')
  var canvas1 = document.getElementById('BSMP_2')
  var context1 = canvas1.getContext('2d')
  var canvas2 = document.getElementById('BSMP_3')
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

  moveOneIndex = N1.MathLib.vNames.indexOf(moveOne)
  moveTwoIndex = N1.MathLib.vNames.indexOf(moveTwo)

  N1.MathLib.vNames.setE(moveTwoIndex, moveOne)
  N1.MathLib.vNames.setE(moveOneIndex, moveTwo)

  tempRowOneColor = N1.MathLib.gridColor.row(moveOneIndex)
  tempRowTwoColor = N1.MathLib.gridColor.row(moveTwoIndex)
  tempRowOneText = N1.MathLib.gridText.row(moveOneIndex)
  tempRowTwoText = N1.MathLib.gridText.row(moveTwoIndex)

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

  N1.MathLib.gridColor = tempGridColor
  N1.MathLib.gridText = tempGridText

  // ############## draw code here ########
  // need to redraw the main canvas using text values
  // use the gridColor matrix
  for (mx = 0; mx < 19; mx++) {
    var color
    drawXGridCell(mx + 1, canvas1, context1, cellSize, N1.MathLib.vNames) // added +1
    for (my = 0; my < 19; my++) {
      drawYGridCell(my + 1, canvas2, context2, cellSize, N1.MathLib.vNames) // added +1
      color = N1.MathLib.gridColor.e(mx + 1, my + 1)
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
      drawText(mx, my, canvas, context, cellSize, N1.MathLib.gridText)
    }
  }
  // ############# draw code end ###########
  document.getElementById('moveData').style.display = 'none'
}
 // ################################################################################################
 // ################################################################################################
 //
 //   Now build a function to swap the selected row and column pairs
 //   That are entered for the first time in the grid.. (modify swapRC()
 //   based on the approach in moveRC()
 //
 // ################################################################################################
 // ################################################################################################
function swapRC () {
  var cellSize = 20 // should be in global function variable
  var rcOne = document.getElementById('one').value
  var rcTwo = document.getElementById('two').value
  var canvas = document.getElementById('BSMP_1')
  var context = canvas.getContext('2d')
  var canvas1 = document.getElementById('BSMP_2')
  var context1 = canvas1.getContext('2d')
  var canvas2 = document.getElementById('BSMP_3')
  var context2 = canvas2.getContext('2d')

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

  tempRCOneIndex = N1.MathLib.vNames.indexOf(rcOne)
  tempRCTwoIndex = N1.MathLib.vNames.indexOf(rcTwo)

  tempGridColorSwap = gridColor.dup()
  tempGridTextSwap = gridText.dup()

  N1.MathLib.vNames.setE(tempRCTwoIndex, rcOne)
  N1.MathLib.vNames.setE(tempRCOneIndex, rcTwo)

  tempRowOneColorSwap = gridColor.row(tempRCOneIndex)
  tempRowTwoColorSwap = gridColor.row(tempRCTwoIndex)
  tempRowOneTextSwap = gridText.row(tempRCOneIndex)
  tempRowTwoTextSwap = gridText.row(tempRCTwoIndex)

  tempGridColorSwap.setRow(tempRCTwoIndex, tempRowOneColorSwap)

  tempColOneColorSwap = tempGridColorSwap.col(tempRCOneIndex)
  tempColTwoColorSwap = tempGridColorSwap.col(tempRCTwoIndex)
  tempColOneTextSwap = tempGridTextSwap.col(tempRCOneIndex)
  tempColTwoTextSwap = tempGridTextSwap.col(tempRCTwoIndex)

  tempGridColorSwap.setCol(tempRCTwoIndex, tempColOneColorSwap)
  tempGridColorSwap.setCol(tempRCOneIndex, tempColTwoColorSwap)
  tempGridTextSwap.setCol(tempRCTwoIndex, tempColOneTextSwap)
  tempGridTextSwap.setCol(tempRCOneIndex, tempColTwoTextSwap)

  N1.MathLib.gridColor = tempGridColorSwap
  N1.MathLib.gridText = tempGridTextSwap
  // ############## draw code here ########
  // need to redraw the main canvas using text values
  for (sx = 0; sx < 19; sx++) {
    var color
    drawXGridCell(sx + 1, canvas1, context1, cellSize, N1.MathLib.vNames) // added +1
    for (sy = 0; sy < 19; sy++) {
      drawYGridCell(sy + 1, canvas2, context2, cellSize, N1.MathLib.vNames) // added +1
      color = N1.MathLib.gridColor.e(sx + 1, sy + 1)
      switch (color) {
        case 1:
          drawYellowCell(sx, sy, canvas, context, cellSize)
          break
        case 2:
          drawRedCell(sx, sy, canvas, context, cellSize)
          // alert ("Drawing red cell in the box swap function");
          break
        case 3:
          drawGreenCell(sx, sy, canvas, context, cellSize)
          break
        case 5:
          drawLightBlueCell(sx, sy, canvas, context, cellSize)
          break

      }

      drawText(sx, sy, canvas, context, cellSize, N1.MathLib.gridText)
    }
  }
   // ############# draw code end ###########
  document.getElementById('one').value = 'N'
  document.getElementById('two').value = 'N'
  document.getElementById('northTrue').style.display = 'none'
  document.getElementById('northFalse').style.display = 'none'
  document.getElementById('entryButton').style.display = 'inline'
  document.getElementById('processButton').style.display = 'inline'
  document.getElementById('inferenceButton').style.display = 'inline'
}

 // ################################################################################################
 // ################################################################################################
 //
 //   A function to detect the presence of a one (1) in the upper triangular area
 //   -- If there are no ones (1) in the upper triangular area,
 //   -------- then the inference button is displayed for use
 //   -- If there are ones (1) in the upper triangular area ,
 //   -------- then the process button is displayed.
 //
 //   Adds tighter process logic to the GUI interface
 //
 // ################################################################################################
 // ################################################################################################

 // scan_upper_for_ones returns true if a 1 is found, false otherwise
 // all the matrix diagonal entries are zero (0), so the matrix may be correctly
 // scanned by starting with entry 0,0 and adding all the values in the first row (0).
 // Then proceed with scanning row two (2) at 1,1 and add all elements in column 1 to 19.
 // Then scan row three (3) starting at 2,2 and add all elements in  columns 2 to 19.
 // Next scan row four (4) starting at 3,3 and add all elements in columns 3 to 19.
 // Continue scanning each row and adding the elements in the selected columns.
 // If the sum of the adding operation is greater than zero (0) return false.
 // If the sum of the adding operation is equal to zero (0) return true

function scanUpperForOnes () {
  var num = 19
  var sum = 0
  var value = 0
  for (var i = 0; i < num; i++) {
    for (var j = 0; j <= i; j++) {
      value = N1.MathLib.gridText.elements[i, j]
      sum = parseInt(sum) + parseInt(value)
    }
  }
  return sum
}
