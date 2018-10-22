const R = require('ramda')
const A = require('assert')
/*
quicksort:
-> pivot: pick last one
-> partition:
*/

const debug = (x) => { console.log('debug: ',x); return x}

const concatAll = R.unapply(R.reduce(R.concat, []))
const lowerThanPivot = R.curry((pivot, x) => x < pivot)
const greaterEqualPivot = R.curry((pivot, x) => x >= pivot)

const quicksort = (arr) => {
  if(R.length(arr) < 2) {
    return arr
  }
  const pivot = R.last(arr)
  return concatAll(
    quicksort(R.filter(lowerThanPivot(pivot), R.dropLast(1, arr))),
    [pivot] ,
    quicksort(R.filter(greaterEqualPivot(pivot), R.dropLast(1, arr)))
  )
}


// Test case
A.deepEqual(quicksort([10, 80, 30, 90, 40, 50, 70]), [ 10, 30, 40, 50, 70, 80, 90 ])