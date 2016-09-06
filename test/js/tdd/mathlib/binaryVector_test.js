/* global suite, N1, test, assert */
suite('N1.MathLib.BinaryVector Factory methods', function () {
  test('Create new vector', function () {
    var elements = [1, 0, 0, 1, 1]
    var vector = N1.MathLib.BinaryVector.NewOne(elements)
    var elementsExpected = [1, 0, 0, 1, 1]
    assert.deepEqual(vector.elements, elementsExpected)
  })

  test('Create zero vector', function () {
    var zeroVector = N1.MathLib.BinaryVector.Zero(4)
    var expectedElements = [0, 0, 0, 0]
    assert.deepEqual(zeroVector.elements, expectedElements)
  })

  test('Create vector with all ones', function () {
    var onesVector = N1.MathLib.BinaryVector.One(5)
    var expectedElements = [1, 1, 1, 1, 1]
    assert.deepEqual(onesVector.elements, expectedElements)
  })
})

suite('N1.MathLib.BinaryVector Operation methods', function () {
  test('Elements set correctly', function () {
    var elements = [1, 0, 1, 0, 1]
    var vector = new N1.MathLib.BinaryVector()
    vector.setElements(elements)
    var expectedElements = [1, 0, 1, 0, 1]
    assert.deepEqual(vector.elements, expectedElements)
  })

  test('Element set correctly', function () {
    var elements = [1, 1, 1, 1, 1]
    var vector = N1.MathLib.BinaryVector.NewOne(elements)
    vector.setElement(3, 0)
    var expectedElement = 0
    assert.deepEqual(vector.elements[2], expectedElement)
  })

  test('Element returned correctly', function () {
    var elements = [0, 0, 1, 0, 0]
    var vector = N1.MathLib.BinaryVector.NewOne(elements)
    var returnElem = vector.element(3)
    var expectedElement = 1
    assert.deepEqual(returnElem, expectedElement)
  })

  test('Index of element returned correctly', function () {
    var elements = [0, 0, 1, 0, 0]
    var vector = N1.MathLib.BinaryVector.NewOne(elements)
    var expectedIndex = 3
    assert.deepEqual(vector.indexOf(1), expectedIndex)
  })

  test('Vector view valid', function () {
    var elements = [0, 1, 0, 1]
    var vector = N1.MathLib.BinaryVector.NewOne(elements)
    var vectorView = '[0, 1, 0, 1]'
    assert.deepEqual(vector.view(), vectorView)
  })
})
