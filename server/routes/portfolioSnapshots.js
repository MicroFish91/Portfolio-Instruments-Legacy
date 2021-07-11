const express = require("express");
const router = express.Router();
const db = require("../models");
const psFormatUtils = require("../utils/psFormatUtils");

/*
 ! Method: /GET /portfolioSnapshots:user
 * Takes a user => req.params.user
 * Returns a full list of snapshots (ordered by date)
 */
router.get("/portfolioSnapshots:user", async (req, res) => {
  try {
    // Pulls a list of all snapshots
    const snapshots = await db.sequelize.query(
      'SELECT "users"."id", "users"."userName",  "users"."userPassword", "users"."benchmark", "users"."createdAt", "users"."updatedAt", "snapshots"."id" AS "snapshots.id", "snapshots"."title" AS "snapshots.title", "snapshots"."portfolioBenchmark" AS "snapshots.portfolioBenchmark", "snapshots"."notes" AS "snapshots.notes", "snapshots"."stockTotal" AS "snapshots.stockTotal", "snapshots"."fixedTotal" AS "snapshots.fixedTotal", "snapshots"."realTotal" AS "snapshots.realTotal", "snapshots"."cashTotal" AS "snapshots.cashTotal", "snapshots"."userId" AS "snapshots.userId", "snapshots"."date" AS "snapshots.date", "snapshots"."createdAt" AS "snapshots.createdAt", "snapshots"."updatedAt" AS "snapshots.updatedAt" FROM "users" AS "users" LEFT OUTER JOIN "snapshots" AS "snapshots" ON "users"."id" = "snapshots"."userId" WHERE "users"."userName" = ' +
        `'${req.params.user}' ` +
        'ORDER by "snapshots"."date" DESC',
      { model: db.users }
    );

    // Organizes them by date
    let organizedSnapshots = psFormatUtils.snapshotsOrganize(snapshots);

    if (
      !isNaN(organizedSnapshots[0].total) &&
      snapshots[0].dataValues["snapshots.id"] !== null
    ) {
      res.json({ data: organizedSnapshots });
    } else {
      res.json({ data: null });
    }
  } catch (err) {
    console.log(err);
  }
});

// Snapshots /POST
router.post("/deleteSnapshot", (req, res) => {
  // Pull Array of Info
  db.snapshots
    .find({
      where: { id: req.body.id },
      include: {
        association: "accounts",
        include: [{ all: true }],
        required: true,
      },
    })
    .then((results) => {
      // Loop Through Accounts
      var asyncCheck = results.dataValues.accounts.map((account) => {
        // Remove Snapshot Rows From Databases
        // Stocks
        return db.stocks
          .destroy({
            where: { id: account.stock.dataValues.id },
          })
          .then((result) => {
            // Fixed Income
            return db.fixed_incomes
              .destroy({
                where: { id: account.fixed_income.dataValues.id },
              })
              .then((result) => {
                // Real Assets
                return db.real_assets
                  .destroy({
                    where: { id: account.real_asset.dataValues.id },
                  })
                  .then((result) => {
                    // Remove Snapshot Row From Database
                    return db.accounts
                      .destroy({
                        where: { id: account.dataValues.id },
                      })
                      .then((result) => {
                        return true;
                      })
                      .catch((error) => console.log(error));
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      });

      // When all dependencies are deleted, remove snapshot
      Promise.all(asyncCheck).then((values) => {
        // Remove Snapshot
        db.snapshots
          .destroy({
            where: { id: req.body.id },
          })
          .catch((error) => console.log(error));

        res.json({ data: "success" });
      });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
