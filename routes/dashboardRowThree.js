// Instantiate Variables
let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');

// Set up Body Parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Dashboard /GET
router.get('/dashboardRowThree:user', (req, res) => {

    var accountArray = [];

    // Latest Snapshot Query
    db.sequelize.query('SELECT "users"."id", "users"."userName",  "users"."userPassword", "users"."benchmark", "users"."createdAt", "users"."updatedAt", "snapshots"."id" AS "snapshots.id", "snapshots"."title" AS "snapshots.title", "snapshots"."notes" AS "snapshots.notes", "snapshots"."userId" AS "snapshots.userId", "snapshots"."createdAt" AS "snapshots.createdAt", "snapshots"."updatedAt" AS "snapshots.updatedAt" FROM "users" AS "users" LEFT OUTER JOIN "snapshots" AS "snapshots" ON "users"."id" = "snapshots"."userId" WHERE "users"."userName" = ' + `'${req.params.user}' ` + 'ORDER by "snapshots"."createdAt" DESC',
    {model: db.users})
    .then(results => {

        // If a snapshot exists, return sums, otherwise, return 0's
        if ((results[0].dataValues['snapshots.id']) !== null){
            
            db.accounts.findAll({
                where: {snapshotId: (results[0].dataValues['snapshots.id'])}
            }).then(results => {

                results.forEach(account => {

                    accountArray.push({location: account.holdingLocation, total: account.total});

                })
                    
                res.json({data: consolidator(accountArray)});

            })
            
        } else {

            res.json({data: ""});

        }
            
    })

});

module.exports = router;

// Consolidates totals into each account and returns back as an alphabetized array
function consolidator(accountArray){

    var financialAccounts = {};
    var listOfAccounts = [];
    var sum = 0;

    // Cycle through all accounts
    accountArray.forEach(account => {

        // If account exists, add to total, else instantiate new institution
        if (financialAccounts.hasOwnProperty(account.location)){

            financialAccounts[account.location] += parseFloat(account.total);

        } else {

            financialAccounts[account.location] = parseFloat(account.total);
        }

        sum += parseFloat(account.total);
    })

    for(let properties in financialAccounts){

        listOfAccounts.push(properties);

        financialAccounts[properties] = (financialAccounts[properties] / sum * 100).toFixed(2);

    }

    listOfAccounts.sort();

    financialAccounts.list = listOfAccounts;

    return financialAccounts;

}


