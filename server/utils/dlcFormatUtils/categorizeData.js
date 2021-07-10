const findLargestDate = require("./findLargestDate");

// Categorize List by Monthly Data (2 Year Range)
module.exports = function categorizeData(myList, start) {
  // Initialize Variables
  const newList = [];
  let tempList = [];
  let startTime = start;

  // Cycle through each month in the 2 year interval (24 month divisions)
  for (let month = 0; month <= 24; month++) {
    // Set cycled interval
    startTime.setMonth(startTime.getMonth() + month);

    // Attributes: stockTotal, fixedTotal, realTotal, cashTotal, date
    myList.forEach((data) => {
      const tempDate = new Date(data.dataValues.date);

      // If year and month are same, log it for comparison
      if (
        tempDate.getFullYear() === startTime.getFullYear() &&
        tempDate.getMonth() === startTime.getMonth()
      ) {
        tempList.push(data.dataValues);
      }
    });

    newList.push(findLargestDate(tempList));

    // Reset Date
    startTime = new Date(start);
    tempList = [];
  }

  return newList;
};
