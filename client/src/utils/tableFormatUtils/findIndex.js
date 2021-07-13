// Find Index of query that matches the searched array
function findIndex(searchArray, searchQuery) {
  var indexResult = 0;
  var searchHold;

  searchArray.forEach((string, index) => {
    searchHold = string.split(" ");
    searchHold.shift();
    searchHold = searchHold.join(" ");

    if (searchHold.trim() === searchQuery.trim()) {
      indexResult = index;
    }

    searchHold = string.split(" ");
    searchHold = searchHold.shift();

    if (searchHold.trim() === searchQuery.trim()) {
      indexResult = index;
    }
  });

  return indexResult;
}

export default findIndex;
