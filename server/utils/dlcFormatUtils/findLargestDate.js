// Find largest date in the list
module.exports = function findLargestDate(newList) {
  // If length is 0, return 0, if length exists, find largest date and return
  if (newList.length > 0) {
    // Initialize Variables
    let myDate = new Date(newList[0].createdAt);
    let compareDate;
    let myIndex = 0;

    // Cycle through List and Compare
    newList.forEach((date, index) => {
      compareDate = new Date(date.createdAt);

      // See if latest date
      if (compareDate > myDate) {
        myDate = compareDate;
        myIndex = index;
      }
    });

    return newList[myIndex];
  } else {
    return 0;
  }
};
