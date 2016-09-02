/* global suite, expect, N1, test, assert */
suite('N1.MathLib.BinaryMatrix Factory methods', function () {
  test('Creates the Identity Matrix', function () {
    var idMatrix = new N1.MathLib.BinaryMatrix.Id(3)
    var expectedElements = [[1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]]
    expect(idMatrix.elements).to.deep.equal(expectedElements)

    var idMatrixTwo = N1.MathLib.BinaryMatrix.Id(3)
    expect(idMatrixTwo.elements).to.deep.equal(expectedElements)
  })

  test('Creates the Zero Matrix', function () {
    var zeroMatrix = new N1.MathLib.BinaryMatrix.Zero(3)
    var expectedElements = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]]
    expect(zeroMatrix.elements).to.deep.equal(expectedElements)

    var zeroMatrixTwo = N1.MathLib.BinaryMatrix.Zero(3)
    expect(zeroMatrixTwo.elements).to.deep.equal(expectedElements)
  })

  test('Creates the Universal Matrix', function () {
    var uniMatrix = new N1.MathLib.BinaryMatrix.One(3)
    var expectedElements = [[1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]]
    expect(uniMatrix.elements).to.deep.equal(expectedElements)

    var uniMatrixTwo = N1.MathLib.BinaryMatrix.One(3)
    expect(uniMatrixTwo.elements).to.deep.equal(expectedElements)
  })

  test('Creates a new matrix', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var expectedElements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var newMatrix = new N1.MathLib.BinaryMatrix.NewOne(elements)
    var newMatrixTwo = N1.MathLib.BinaryMatrix.NewOne(elements)

    expect(newMatrix.elements).to.deep.equal(expectedElements)
    expect(newMatrixTwo.elements).to.deep.equal(expectedElements)
  })
})

suite('N1.MathLib.BinaryMatrix Operation methods', function () {
  test('Elements set correctly', function () {
    var matrix = new N1.MathLib.BinaryMatrix()
    assert.strictEqual(matrix.elements, undefined, 'Elements do not exist yet')

    var newElements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    matrix.setElements(newElements)
    assert.deepEqual(matrix.elements, newElements, 'Elements set properly')
  })

  test('Row set correctly', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var newRow = [1, 1, 1]
    matrix.setRow(2, newRow)
    var expectedElements = [[1, 0, 1],
        [1, 1, 1],
        [1, 0, 1]]

    assert.deepEqual(matrix.elements, expectedElements)
  })

  test('Row retrieved correctly', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var expectedRow = [1, 0, 1]
    var actualRow = matrix.getRow(1)
    assert.deepEqual(actualRow, expectedRow)
  })

  test('Element set correctly', function () {
    var elements = [[0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    assert(matrix.elements[1][1] === 1)
    matrix.setElement(2, 2, 0)
    assert(matrix.elements[1][1] === 0)
  })

  test('Element retrieved correctly', function () {
    var elements = [[0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var returnedElement = matrix.getElement(2, 2)
    assert(returnedElement === 1)
    assert(matrix.elements[1][1] === returnedElement)
  })

  test('Column set correctly', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var newCol = [1, 1, 1]
    matrix.setColumn(2, newCol)
    var expectedElements = [[1, 1, 1],
        [0, 1, 0],
        [1, 1, 1]]
    assert.deepEqual(matrix.elements, expectedElements)
  })

  test('Column retrieved correctly', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var returnedCol = matrix.getColumn(2, 2)
    var expectedCol = [0, 1, 0]
    assert.deepEqual(returnedCol, expectedCol)
  })

  test('Number of rows correctly returned', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var numOfRows = matrix.numberOfRows()
    assert.strictEqual(numOfRows, 3)
  })

  test('Number of Columns correctly returned', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var numOfCols = matrix.numberOfColumns()
    assert.strictEqual(numOfCols, 3)
  })

  test('Duplicate matrix valid', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var dupeMatrix = matrix.duplicateMatrix()
    assert.deepEqual(dupeMatrix.elements, matrix.elements)
  })

  test('Same size matrix detection valid', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var idMatrix = N1.MathLib.BinaryMatrix.Id(3)
    assert.isOk(matrix.isSameSizeAs(idMatrix))
  })

  test('Functions Map properly', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var sampleFunc = function (value, row, column) {
      return value * 2
    }
    var processedMatrix = matrix.mapProcess(sampleFunc)
    var expectedElements = [[2, 0, 2],
        [0, 2, 0],
        [2, 0, 2]]
    assert.deepEqual(processedMatrix.elements, expectedElements)
  })

  test('Matrices add correctly', function () {
    var elements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    var matrix = N1.MathLib.BinaryMatrix.NewOne(elements)
    var matrixTwo = N1.MathLib.BinaryMatrix.NewOne(elements)
    var resultingMatrix = matrix.add(matrixTwo)
    var expectedElements = [[2, 0, 2],
        [0, 2, 0],
        [2, 0, 2]]
    assert.deepEqual(resultingMatrix.elements, expectedElements)
  })

  test('Matrices subtract correctly', function () {
    var univeralMatrix = N1.MathLib.BinaryMatrix.NewOne([[1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]])
    var otherMatrix = N1.MathLib.BinaryMatrix.NewOne([[0, 1, 0],
        [1, 0, 1],
        [0, 1, 0]])
    var resultMatrix = univeralMatrix.subtract(otherMatrix)
    var expectedElements = [[1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]]
    assert.deepEqual(resultMatrix.elements, expectedElements)
  })

  test('Left Multiply valid', function () {
    var univeralMatrix = N1.MathLib.BinaryMatrix.NewOne([[1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]])
    var otherMatrix =  N1.MathLib.BinaryMatrix.NewOne([[0, 1, 0],
        [1, 0, 1],
        [0, 1, 0]])
    assert.isOk(univeralMatrix.leftMultiply(otherMatrix))
  })

  test('Boolean multiplication valid', function () {
    var matrix =  N1.MathLib.BinaryMatrix.NewOne([[0, 1, 0],
        [0, 0, 1],
        [0, 1, 0]])
    var otherMatrix =  N1.MathLib.BinaryMatrix.NewOne([[0, 1, 0],
        [1, 0, 0],
        [0, 0, 1]])
    var multipliedMatrix = matrix.boolMultiply(otherMatrix)
    var expectedElements = [[1, 0, 0],
        [0, 0, 1],
        [1, 0, 0]]
    assert.deepEqual(multipliedMatrix.elements, expectedElements)
  })

  test('Matrix view valid', function () {
    var matrix = N1.MathLib.BinaryMatrix.NewOne([[0, 1, 0],
        [0, 0, 1],
        [0, 1, 0]])
    var expectedView = '[0, 1, 0]<br>[0, 0, 1]<br>[0, 1, 0]'
    assert.strictEqual(matrix.matrixView(), expectedView)
  })
})
