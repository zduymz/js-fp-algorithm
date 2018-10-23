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
A.deepEqual(quicksort([]), [])
A.deepEqual(quicksort([1]), [ 1 ])
A.deepEqual(quicksort([1,2,3]), [ 1, 2, 3 ])
A.deepEqual(quicksort([2,3,1,3,1,4,1,5,8,2,1]), [ 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 8 ])
A.deepEqual(quicksort([2,2]), [ 2, 2 ])
A.deepEqual(quicksort([3,3,3]), [ 3, 3, 3 ])
A.deepEqual(quicksort([9,8,7,6,5,4,3,2,1]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
