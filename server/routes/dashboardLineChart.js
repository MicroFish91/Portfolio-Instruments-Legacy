const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const db = require("../models");
const dlcFormatUtils = require("../utils/dlcFormatUtils");

router.get("/dashboardLineChart:user", async (req, res) => {
  // Set up Date Ranges
  const queryDates = dlcFormatUtils.findDateRanges();
  const labels = dlcFormatUtils.getLabels(queryDates);

  // Find User
  const user = await db.users.find({ where: { userName: req.params.user } });

  // DB Queries
  const snapshotsRangeOneData = await db.snapshots.findAll({
    where: {
      userId: user.dataValues.id,
      date: { [Op.lte]: queryDates.endDate, [Op.gte]: queryDates.middleDate },
    },
  });
  const snapshotsRangeTwoData = await db.snapshots.findAll({
    where: {
      userId: user.dataValues.id,
      date: { [Op.lte]: queryDates.middleDate, [Op.gte]: queryDates.startDate },
    },
  });

  // Categorize Data
  const categorizedSnapshotsOne = dlcFormatUtils.categorizeData(
    snapshotsRangeOneData,
    queryDates.middleDate
  );
  const categorizedSnapshotsTwo = dlcFormatUtils.categorizeData(
    snapshotsRangeTwoData,
    queryDates.startDate
  );

  // Cluster Totals
  const snapshotsRangeOne = dlcFormatUtils.clusterTotals(
    categorizedSnapshotsOne
  );
  const snapshotsRangeTwo = dlcFormatUtils.clusterTotals(
    categorizedSnapshotsTwo
  );

  // Transmit final data
  res.json({
    data: [snapshotsRangeOne, snapshotsRangeTwo],
    labels: labels.month,
    labelOne: `${labels.startYear} - ${labels.middleYear}`,
    labelTwo: `${labels.middleYear} - ${labels.endYear}`,
  });
});

module.exports = router;
