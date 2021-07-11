const express = require("express");
const router = express.Router();
const db = require("../models");
const drtFormatUtils = require("../utils/drtFormatUtils");

router.get("/dashboardRowThree:user", async (req, res) => {
  try {
    const accountsArray = [];

    // Pull List of User Snapshots in Descending Order
    const snapshots = await db.sequelize.query(
      'SELECT "users"."id", "users"."userName",  "users"."userPassword", "users"."benchmark", "users"."createdAt", "users"."updatedAt", "snapshots"."id" AS "snapshots.id", "snapshots"."title" AS "snapshots.title", "snapshots"."notes" AS "snapshots.notes", "snapshots"."userId" AS "snapshots.userId", "snapshots"."createdAt" AS "snapshots.createdAt", "snapshots"."updatedAt" AS "snapshots.updatedAt" FROM "users" AS "users" LEFT OUTER JOIN "snapshots" AS "snapshots" ON "users"."id" = "snapshots"."userId" WHERE "users"."userName" = ' +
        `'${req.params.user}' ` +
        'ORDER by "snapshots"."createdAt" DESC',
      { model: db.users }
    );

    // If a snapshot exists...
    if (snapshots[0].dataValues["snapshots.id"] !== null) {
      const accounts = await db.accounts.findAll({
        where: { snapshotId: snapshots[0].dataValues["snapshots.id"] },
      });

      // Loop through and store relevant data fields
      accounts.forEach((account) => {
        accountsArray.push({
          location: account.holdingLocation,
          total: account.total,
        });
      });

      // Return consolidated data
      res.json({ data: drtFormatUtils.consolidateAccounts(accountsArray) });
    } else {
      // If no snapshots exists
      res.json({ data: "" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
