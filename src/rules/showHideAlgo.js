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
 * @param {Number} aMaxCode - aMaxCode can be defined
 * @returns {Array} Array with all names of fragments which are not visible but still at show
 */
function showOrHideAlgo(aMaxCode) {
  let unvisibleFragments = [];
  let visibleFragments = [];

  // Get the max code
  const maxCode = aMaxCode || aMaxCode === 0 ? aMaxCode : Math.max(...allReceivedFragments.map((fragment) => fragment.code));
  // Get all fragments with the higher code
  let updatedFragments = allReceivedFragments.filter((item) => {
    if (item.code === maxCode) {
      return item;
    }
    // Add fragment to unvisibleFragments
    unvisibleFragments.push(item.name);
    return null;
  });

  // If only one fragment => algo stops
  if (updatedFragments.length === 1) {
    visibleFragments.push(updatedFragments[0].name);
    return {visibleFragments, unvisibleFragments};;
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
      // If both pos are equal and last layer is simultaneous, add the pivot to visibleFragments and update the pivot
      if (pivot.pos[pivot.pos.length - 1].charAt(0) === 's') {
        visibleFragments.push(pivot.name);
        pivot = fragment;
        pivotIndex = index;
      }
      // If both pos are equal and last layer is priority, check the priority
      else if (pivot.pos[pivot.pos.length - 1].charAt(0) === 'p') {
        if (pivot.priority > fragment.priority) {
          updatedFragments[index].isShowed = false;
          unvisibleFragments.push(fragment.name);
        }
        // Delete the current pivot and update it with this fragment
        else {
          updatedFragments[pivotIndex].isShowed = false;
          unvisibleFragments.push(pivot.name);
          pivot = fragment;
          pivotIndex = index;
        }
      }
    }
    // If pos are different then the former pivot is added to visibleFragments and the pivot updates
    else {
      visibleFragments.push(pivot.name);
      pivot = fragment;
      pivotIndex = index;
    }
  });
  // Add the last fragment of the array inside the visible fragments because no other did indicate the opposite
  visibleFragments.push(pivot.name);

  return {visibleFragments, unvisibleFragments};
}

/**
 * Add a fragment inside allReceivedFragments when a Show command is received
 * @param {String} fragmentName - Fragment's name
 */
function showCmdReceived(fragmentName) {
  const { code, pos, priority } = fragmentsDict[fragmentName];
  allReceivedFragments.push({ name: fragmentName, code, pos, priority });
}

/**
 * Remove a fragment from allReceivedFragments when a Hide command is received
 * @param {String} fragmentName - Fragment's name
 */
function hideCmdReceived(fragmentName) {
  allReceivedFragments = allReceivedFragments.filter(fragment => fragment.name !== fragmentName)
}

function callAlgo() {
  let fragments = showOrHideAlgo(0);
  console.log(fragments);
  fragments = showOrHideAlgo();
  console.log(fragments);
}

function main(aFragmentsDict) {
  console.log(aFragmentsDict);
  console.log();
  fragmentsDict = aFragmentsDict;

  // addShowFragment('B');
  // addShowFragment('A');
  // addShowFragment('E');

  showCmdReceived('K');
  showCmdReceived('J');
  showCmdReceived('G1');
  showCmdReceived('E');
  showCmdReceived('D');
  showCmdReceived('F');
  showCmdReceived('C');
  showCmdReceived('H');
  showCmdReceived('G');
  hideCmdReceived('G');
  showCmdReceived('A');
  hideCmdReceived('A');
  showCmdReceived('Z');
  sortFragmentsArray(allReceivedFragments);
  callAlgo();
}

module.exports.main = main;
