const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const db = require("../models");
const dlcFormatUtils = require("../utils/dlcFormatUtils");

router.get("/dashboardLineChart:user", async (req, res) => {
  const queryDates = dlcFormatUtils.findDateRanges();
  const labels = dlcFormatUtils.getLabels(queryDates);

  const user = await db.users.find({ where: { userName: req.params.user } });
  const queryOne = await db.snapshots.findAll({
    where: {
      userId: user.dataValues.id,
      date: { [Op.lte]: queryDates.endDate, [Op.gte]: queryDates.middleDate },
    },
  });
  const queryTwo = await db.snapshots.findAll({
    where: {
      userId: user.dataValues.id,
      date: { [Op.lte]: queryDates.middleDate, [Op.gte]: queryDates.startDate },
    },
  });

  let listOne = dlcFormatUtils.categorizeData(queryOne, queryDates.middleDate);
  let listTwo = dlcFormatUtils.categorizeData(queryTwo, queryDates.startDate);

  listOne = dlcFormatUtils.clusterTotals(listOne);
  listTwo = dlcFormatUtils.clusterTotals(listTwo);

  res.json({
    data: [listOne, listTwo],
    labels: labels.month,
    labelOne: `${labels.startYear} - ${labels.middleYear}`,
    labelTwo: `${labels.middleYear} - ${labels.endYear}`,
  });
});

module.exports = router;
