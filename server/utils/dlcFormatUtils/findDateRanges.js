// Finds Date Ranges Needed for DB Query
module.exports = function findDateRanges() {
  let endDate = new Date();
  let middleDate = new Date();
  let startDate = new Date();

  // Set Middle Date 2 Years from Today
  middleDate.setMonth(middleDate.getMonth() - 24);

  // Set Start Date 4 Years from Today
  startDate.setMonth(startDate.getMonth() - 48);

  return { endDate, middleDate, startDate };
};
