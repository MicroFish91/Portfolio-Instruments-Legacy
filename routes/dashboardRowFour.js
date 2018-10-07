// Instantiate Variables
let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');

// Set up Body Parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Dashboard /GET
router.get('/dashboardRowFour:user', (req, res) => {

    var passArray = [];

    // Latest Snapshot Query
    db.sequelize.query('SELECT "users"."id", "users"."userName",  "users"."userPassword", "users"."benchmark", "users"."createdAt", "users"."updatedAt", "snapshots"."id" AS "snapshots.id", "snapshots"."title" AS "snapshots.title", "snapshots"."notes" AS "snapshots.notes", "snapshots"."userId" AS "snapshots.userId", "snapshots"."createdAt" AS "snapshots.createdAt", "snapshots"."updatedAt" AS "snapshots.updatedAt" FROM "users" AS "users" LEFT OUTER JOIN "snapshots" AS "snapshots" ON "users"."id" = "snapshots"."userId" WHERE "users"."userName" = ' + `'${req.params.user}' ` + 'ORDER by "snapshots"."createdAt" DESC',
    {model: db.users})
    .then(results => {

        passArray.push(results[0].dataValues.benchmark);
        
        // If a snapshot exists, return sums, otherwise, return 0's
        if ((results[0].dataValues['snapshots.id']) !== null){

            db.snapshots.findAll({
                where: {
                    id: results[0].dataValues['snapshots.id']
                },
                include: {
                    association: 'accounts',
                    include: [{all: true}],
                    required: true
                },
                required: true
            })
            .then(results => {

                console.log(results[0].dataValues.accounts[0].dataValues["stock"].dataValues["tsm"]);

                console.log(results[0].dataValues.accounts[0].dataValues["fixed_income"].dataValues["ltb"]);

                console.log(results[0].dataValues.accounts[0].dataValues["real_asset"].dataValues["gold"]);

                console.log(results[0].dataValues.accounts[0].dataValues["moneyMarket"]);

            })
            
        } else {

            res.json({data: "doesn't exist"});

        }

    })

});

module.exports = router;


function assetMapper(benchmarkTitle){

    var assetList;
    var stocks = ["tsm", "dlcb", "dlcv", "dlcg", "dmcb", "dmcv", "dmcg", "dscb", "dscv", "dscg", "ilcb", "ilcv", "ilcg", "imcb", "imcv", "imcg", "iscb", "iscv", "iscg"];
    var fixedIncome = ["ltb", "itb", "stb", "bills"];
    var realAssets = ["commodoties", "gold", "reits"];

    switch(benchmarkTitle){

        case "Total Stock Market":
            assetList = ["tsm"];
            break;

        case "Classic 60/40":
            assetList = ["tsm", "itb"];
            break;

        case "Three-Fund Portfolio":
            assetList = ["dlcb", "ilcb", "itb"];
            break;

        case "No-Brainer Portfolio":
            assetList = ["dlcb", "dscb", "ilcb", "stb"];
            break;

        case "Rick Ferri Core Four":
            assetList = ["dlcb", "ilcb", "itb", "reits"];
            break;

        case "Ivy Portfolio":
            assetList = ["dlcb", "ilcb", "itb", "commodoties", "reits"];
            break;

        case "Permanent Portfolio":
            assetList = ["dlcb", "ltb", "gold", "cash"];
            break;

        case "Golden Butterfly":
            assetList = ["dlcb", "dscv", "ltb", "stb", "gold"];
            break;

        default:
            assetList = ["cash"];
            break;
    }



}