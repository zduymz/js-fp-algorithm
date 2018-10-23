const R = require('ramda')
const A = require('assert')

/*
split into half
merge
*/


const Split = (xs) => {
  const mid = xs.length >> 1
  return [xs.slice(0,mid), xs.slice(mid)]
}

const Merge = function* (xs1, xs2) {
  while(xs1.length && xs2.length) {
    yield (xs1[0] <= xs2[0])? xs1.shift() : xs2.shift()
  }
  // yield deligation
  yield* xs1
  yield* xs2
}

const mergesort = (arr) => {
  if(arr.length <= 1) {
    return arr
  }
  return [...Merge(...Split(arr).map(mergesort))];
}



// Test case
A.deepEqual(mergesort([]), [])
A.deepEqual(mergesort([1]), [ 1 ])
A.deepEqual(mergesort([1,2,3]), [ 1, 2, 3 ])
A.deepEqual(mergesort([2,3,1,3,1,4,1,5,8,2,1]), [ 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 8 ])
A.deepEqual(mergesort([2,2]), [ 2, 2 ])
A.deepEqual(mergesort([3,3,3]), [ 3, 3, 3 ])
A.deepEqual(mergesort([9,8,7,6,5,4,3,2,1]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
