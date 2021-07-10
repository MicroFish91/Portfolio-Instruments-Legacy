// Get Chart Labels for Front End
module.exports = function getLabels({ startDate, middleDate, endDate }) {
  const months = [];
  const returnObject = {};
  let startTime = new Date(startDate);

  // Cycle through each month in the 2 year interval (24 month divisions)
  for (let month = 0; month <= 24; month++) {
    // Set cycled interval
    startTime.setMonth(startTime.getMonth() + month);

    // Find Month
    switch (startTime.getMonth()) {
      case 0:
        months.push("January");
        break;

      case 1:
        months.push("February");
        break;

      case 2:
        months.push("March");
        break;

      case 3:
        months.push("April");
        break;

      case 4:
        months.push("May");
        break;

      case 5:
        months.push("June");
        break;

      case 6:
        months.push("July");
        break;

      case 7:
        months.push("August");
        break;

      case 8:
        months.push("September");
        break;

      case 9:
        months.push("October");
        break;

      case 10:
        months.push("November");
        break;

      case 11:
        months.push("December");
        break;
    }

    startTime = new Date(startDate);
  }

  returnObject.month = months;
  returnObject.startYear = startDate.getFullYear();
  returnObject.middleYear = middleDate.getFullYear();
  returnObject.endYear = endDate.getFullYear();

  return returnObject;
};
