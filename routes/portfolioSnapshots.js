// Instantiate Variables
let express = require('express');
let router = express.Router();
let db = require('../models');


// Dashboard /GET
router.get('/portfolioSnapshots:user', (req, res) => {

    // Latest Snapshot Query
    db.sequelize.query('SELECT "users"."id", "users"."userName",  "users"."userPassword", "users"."benchmark", "users"."createdAt", "users"."updatedAt", "snapshots"."id" AS "snapshots.id", "snapshots"."title" AS "snapshots.title", "snapshots"."notes" AS "snapshots.notes", "snapshots"."stockTotal" AS "snapshots.stockTotal", "snapshots"."fixedTotal" AS "snapshots.fixedTotal", "snapshots"."realTotal" AS "snapshots.realTotal", "snapshots"."cashTotal" AS "snapshots.cashTotal", "snapshots"."userId" AS "snapshots.userId", "snapshots"."date" AS "snapshots.date", "snapshots"."createdAt" AS "snapshots.createdAt", "snapshots"."updatedAt" AS "snapshots.updatedAt" FROM "users" AS "users" LEFT OUTER JOIN "snapshots" AS "snapshots" ON "users"."id" = "snapshots"."userId" WHERE "users"."userName" = ' + `'${req.params.user}' ` + 'ORDER by "snapshots"."date" DESC',
    {model: db.users})
    .then(results => {

        let data = listOrganize(results);

        if (!isNaN(data[0].total) && results[0].dataValues['snapshots.id'] !== null){

            res.json({data: data});

        } else {

            res.json({data: null});

        }

    })
    .catch(error => console.log(error))

});

module.exports = router;


// Format List for Sending
function listOrganize (snapshots) {

    // Initialize Variables
    var organizedList = [];
    var newSnapshot = {};

    // Loop through List of Snapshots
    snapshots.forEach(snapshotData => {

        // Assign Pertinent Values
        newSnapshot.title = snapshotData.dataValues['snapshots.title'];
        newSnapshot.notes = snapshotData.dataValues['snapshots.notes'];
        newSnapshot.date = snapshotData.dataValues['snapshots.date'];
        newSnapshot.total = (parseFloat(snapshotData.dataValues['snapshots.stockTotal']) + parseFloat(snapshotData.dataValues['snapshots.fixedTotal']) + parseFloat(snapshotData.dataValues['snapshots.realTotal']) + parseFloat(snapshotData.dataValues['snapshots.cashTotal'])).toFixed(2);

        // Add to Bottom of Stack (Beginning of List)
        organizedList.unshift(newSnapshot);

        // Reset Object
        newSnapshot = {};

    })

    return organizedList;

}