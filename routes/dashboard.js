// Instantiate Variables
let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');

// Set up Body Parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Dashboard /GET
router.get('/dashboardRowOne:user', (req, res) => {

    var taxable = 0;
    var traditional = 0;
    var roth = 0;
    var netWorth = 0;

    // Latest Snapshot Query
    db.sequelize.query('SELECT "users"."id", "users"."userName",  "users"."userPassword", "users"."benchmark", "users"."createdAt", "users"."updatedAt", "snapshots"."id" AS "snapshots.id", "snapshots"."title" AS "snapshots.title", "snapshots"."notes" AS "snapshots.notes", "snapshots"."userId" AS "snapshots.userId", "snapshots"."createdAt" AS "snapshots.createdAt", "snapshots"."updatedAt" AS "snapshots.updatedAt" FROM "users" AS "users" LEFT OUTER JOIN "snapshots" AS "snapshots" ON "users"."id" = "snapshots"."userId" WHERE "users"."userName" = ' + `'${req.params.user}' ` + 'ORDER by "snapshots"."createdAt" DESC',
    {model: db.users})
    .then(results => {

        // console.log(results[0].dataValues['snapshots.id']);

        // If a snapshot exists, return sums, otherwise, return 0's
        if ((results[0].dataValues['snapshots.id']) !== null){
            
            db.accounts.findAll({
                where: {snapshotId: (results[0].dataValues['snapshots.id'])}
                }).then(results => {
                    
                    results.forEach((data, index) => {

                        // Categorize account totals
                        if (data.dataValues.accountType === "Taxable") {
                            taxable += parseInt(data.dataValues.total);
                        } 
                        else if (data.dataValues.accountType === "Roth") {
                            roth += parseInt(data.dataValues.total);
                        }
                        else if (data.dataValues.accountType === "Traditional") {
                            traditional += parseInt(data.dataValues.total);
                        }

                    })

                    netWorth = taxable + roth + traditional;

                    res.json({taxable: taxable, roth: roth, traditional: traditional, netWorth: netWorth});

                })
            
        } else {

            res.json({taxable: 0, roth: 0, traditional: 0, netWorth: 0});

        }
            
    })

});

module.exports = router;