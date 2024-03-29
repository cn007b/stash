// Selection sort.
// @see: https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif
//
// Worst case = O(n^2).
// Average case = O(n^2).
// Best case = O(n^2).
// Space required = O(n).
// Good for small arrays. Bad for big arrays.
// In practice it better than bubble sort but worst than insertion sort.
// Don't do many swaps but do lot of comparisons.
//
// The plan:
// start from begin of array,
// check first array element with all elements, and find the smallest one,
// swap first array element with smallest one,
// now first element in array is in sorted position,
// go to next iteration.
function selectionSort(a) {
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[min]) {
        min = j;
      }
    }
    if (min !== i) {
        let t = a[i];
        a[i] = a[min];
        a[min] = t;
      }
  }

  return a;
}

console.log(selectionSort([5, 3, 1, 2, 4]));
console.log(selectionSort([2, 4, 6, 8, 3]));
console.log(selectionSort([2, 4, 6, 8, 9]));
console.log(selectionSort([2, 4, 6, 8, 0]));
console.log(selectionSort(['f', 's', 'w', 'e', 'l', 'x', 'v', 'd', 'a']));
