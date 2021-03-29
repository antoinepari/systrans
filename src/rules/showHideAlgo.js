const assert = require('assert');

let fragmentsDict;
let allReceivedFragments = [];

/**
 * Display an array sorted by pos
 * @param {Array} array - Fragments' array
 */
function sortFragmentsArray(array) {
  const updatedFragments = array.sort((fragmentA, fragmentB) =>
    fragmentA.pos > fragmentB.pos ? 1 : fragmentB.pos > fragmentA.pos ? -1 : 0,
  );
  console.log(updatedFragments);
}

/**
 * This algo will determine only the fragments to hide
 */
function showOrHideAlgo() {
  let hiddenFragments = [];

  // Get the max code
  const maxCode = Math.max(
    ...allReceivedFragments.map((fragment) => fragment.code),
  );
  // Get all fragments with the higher code
  let updatedFragments = allReceivedFragments.filter((item) => {
    if (item.code === maxCode) {
      return item;
    }
    // Add fragments to hiddenFragments
    hiddenFragments.push(item.name);
    return null;
  });

  // If only one fragment => algo stops
  if (updatedFragments.length === 1) {
    updatedFragments.forEach((fragment) =>
      fragment.isShowed === false ? '' : console.log(fragment.name),
    );
    return hiddenFragments;
  }

  // If it remains multiple fragments => we need to check if all can be displayed or not
  // Sort the array to get same pos side by side and to get the max pos length at the beginning
  updatedFragments = updatedFragments.sort((fragmentA, fragmentB) =>
    fragmentA.pos > fragmentB.pos ? 1 : fragmentB.pos > fragmentA.pos ? -1 : 0,
  );

  // Comparaison with a pivot
  let pivot;
  let pivotIndex;
  updatedFragments.forEach((fragment, index) => {
    // Only useful for the first element
    if (!pivot) {
      pivot = fragment;
      pivotIndex = index;
      return true;
    }
    // If pos are equal
    if (JSON.stringify(pivot.pos) === JSON.stringify(fragment.pos)) {
      // If both pos are equal and last layer is simultaneous, change the pivot
      if (pivot.pos[pivot.pos.length - 1].charAt(0) === 's') {
        pivot = fragment;
        pivotIndex = index;
      }
      // If both pos are equal and last layer is priority, check the priority
      else if (pivot.pos[pivot.pos.length - 1].charAt(0) === 'p') {
        if (pivot.priority > fragment.priority) {
          updatedFragments[index].isShowed = false;
          hiddenFragments.push(fragment.name);
        }
        // Delete the current pivot and update it with this fragment
        else {
          updatedFragments[pivotIndex].isShowed = false;
          hiddenFragments.push(pivot.name);
          pivot = fragment;
          pivotIndex = index;
        }
      }
    }
    // If pos are different then the pivot needs to change
    else {
      pivot = fragment;
      pivotIndex = index;
    }
  });

  // Display only the fragments to show (no need for the algo but interesting to verify)
  updatedFragments.forEach((fragment) =>
    fragment.isShowed === false ? '' : console.log(fragment.name),
  );
  return hiddenFragments;
}

function addShowFragment(fragmentName) {
  const { code, pos, priority } = fragmentsDict[fragmentName];
  allReceivedFragments.push({ name: fragmentName, code, pos, priority });
  // showOrHideAlgo();
}

function main(aFragmentsDict) {
  console.log(aFragmentsDict);
  console.log();
  fragmentsDict = aFragmentsDict;

  // addShowFragment('B');
  // addShowFragment('A');
  // addShowFragment('E');

  addShowFragment('K');
  addShowFragment('J');
  addShowFragment('G1');
  addShowFragment('E');
  addShowFragment('D');
  addShowFragment('F');
  addShowFragment('C');
  addShowFragment('H');
  addShowFragment('G');
  // addShowFragment('A');
  sortFragmentsArray(allReceivedFragments);
  const hiddenFragments = showOrHideAlgo();
  console.log(hiddenFragments);
}

module.exports.main = main;
