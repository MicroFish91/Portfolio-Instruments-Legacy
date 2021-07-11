const express = require("express");
const router = express.Router();
const db = require("../models");
const droFormatUtils = require("../utils/droFormatUtils");

router.get("/dashboardRowOne:user", async (req, res) => {
  try {
    // Pull List of User Snapshots in Descending Order
    const snapshots = await db.sequelize.query(
      'SELECT "users"."id", "users"."userName",  "users"."userPassword", "users"."benchmark", "users"."createdAt", "users"."updatedAt", "snapshots"."id" AS "snapshots.id", "snapshots"."title" AS "snapshots.title", "snapshots"."notes" AS "snapshots.notes", "snapshots"."userId" AS "snapshots.userId", "snapshots"."createdAt" AS "snapshots.createdAt", "snapshots"."updatedAt" AS "snapshots.updatedAt" FROM "users" AS "users" LEFT OUTER JOIN "snapshots" AS "snapshots" ON "users"."id" = "snapshots"."userId" WHERE "users"."userName" = ' +
        `'${req.params.user}' ` +
        'ORDER by "snapshots"."createdAt" DESC',
      { model: db.users }
    );

    // If a snapshot exists...
    if (snapshots[0].dataValues["snapshots.id"] !== null) {
      // Pull List of Snapshot Accounts
      const accounts = await db.accounts.findAll({
        where: { snapshotId: snapshots[0].dataValues["snapshots.id"] },
      });

      // Sum Totals
      const [taxable, traditional, roth, netWorth] =
        droFormatUtils.taxSpaceTotals(accounts);

      // Output Data
      res.json({
        taxable,
        roth,
        traditional,
        netWorth,
      });
    } else {
      // If no snapshots exist
      res.json({ taxable: 0.0, roth: 0.0, traditional: 0.0, netWorth: 0.0 });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
