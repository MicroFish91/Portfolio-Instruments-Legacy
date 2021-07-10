// Refine List to total $ Values
module.exports = function clusterTotals(myList) {
  // Initialize Variables
  const newList = [];
  let lastNumber = myList[0];
  let total = 0;

  // Go Through List
  for (let index = 0; index < myList.length; index++) {
    // If zero
    if (myList[index] === 0) {
      newList.push(lastNumber);
      lastNumber = myList[index];
    }
    // If data object
    else {
      // Add total of all asset categories
      total =
        parseFloat(myList[index]["stockTotal"]) +
        parseFloat(myList[index]["fixedTotal"]) +
        parseFloat(myList[index]["realTotal"]) +
        parseFloat(myList[index]["cashTotal"]);

      newList.push(total.toFixed(2));

      lastNumber = total.toFixed(2);
      total = 0;
    }
  }

  return newList;
};
