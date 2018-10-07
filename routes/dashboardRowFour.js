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

    var benchmarkList = [];
    var assetArrays = [];
    var arrayOfAssetArrays = [];
    var returnList = [];

    // Latest Snapshot Query
    db.sequelize.query('SELECT "users"."id", "users"."userName",  "users"."userPassword", "users"."benchmark", "users"."createdAt", "users"."updatedAt", "snapshots"."id" AS "snapshots.id", "snapshots"."title" AS "snapshots.title", "snapshots"."notes" AS "snapshots.notes", "snapshots"."userId" AS "snapshots.userId", "snapshots"."createdAt" AS "snapshots.createdAt", "snapshots"."updatedAt" AS "snapshots.updatedAt" FROM "users" AS "users" LEFT OUTER JOIN "snapshots" AS "snapshots" ON "users"."id" = "snapshots"."userId" WHERE "users"."userName" = ' + `'${req.params.user}' ` + 'ORDER by "snapshots"."createdAt" DESC',
    {model: db.users})
    .then(results => {

        benchmarkList.push(results[0].dataValues.benchmark);
        
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

                // Obtain benchmarkList using benchmarkTitle
                benchmarkList = assetMapper(benchmarkList.shift());

                console.log(benchmarkList);

                // Loop through every snapshot account
                results[0].dataValues.accounts.forEach((account, accountIndex) => {

                    assetArrays = [];

                    // Log each benchmark asset amount into the array
                    benchmarkList.forEach((asset, index) => {

                        // If asset isn't cash, log using normal format, otherwise log cash
                        if(asset.asset !== "cash"){

                            assetArrays.push(results[0].dataValues.accounts[accountIndex].dataValues[asset.table].dataValues[asset.asset]);


                        } else {

                            assetArrays.push(results[0].dataValues.accounts[accountIndex].dataValues["moneyMarket"]);
                                
                        }

                    })

                    arrayOfAssetArrays.push(assetArrays);

                })

                returnList = percentageFinder(arrayOfAssetArrays);

                res.json({data: returnList});

            })
            
        } else {

            res.json({data: "doesn't exist"});

        }

    })

});

module.exports = router;

// Maps Asset List to Search for Using Benchmark Title
function assetMapper(benchmarkTitle){

    var assetList = [];

    // Map and find asset list by benchmark title
    switch(benchmarkTitle){

        case "Total Stock Market":
            assetList = [{table: "stock", asset: "tsm"}];
            break;

        case "Classic 60/40":
            assetList = [{table: "stock", asset: "tsm"}, {table: "fixed_income", asset: "itb"}];
            break;

        case "Three-Fund Portfolio":
            assetList = [{table: "stock", asset: "dlcb"}, {table: "stock", asset: "ilcb"}, {table: "fixed_income", asset: "itb"}];
            break;

        case "No-Brainer Portfolio":
            assetList = [{table: "stock", asset: "dlcb"}, {table: "stock", asset: "dscb"}, {table: "stock", asset: "ilcb"}, {table: "fixed_income", asset: "stb"}];
            break;

        case "Rick Ferri Core Four":
            assetList = [{table: "stock", asset: "dlcb"}, {table: "stock", asset: "ilcb"}, {table: "fixed_income", asset: "itb"}, {table: "real_asset", asset: "reits"}];
            break;

        case "Ivy Portfolio":
            assetList = [{table: "stock", asset: "dlcb"}, {table: "stock", asset: "ilcb"}, {table: "fixed_income", asset: "itb"}, {table: "real_asset", asset: "commodoties"}, {table: "real_asset", asset: "reits"}];
            break;

        case "Permanent Portfolio":
            assetList = [{table: "stock", asset: "dlcb"}, {table: "fixed_income", asset: "ltb"}, {table: "real_asset", asset: "gold"}, {table: "account", asset: "cash"}];
            break;

        case "Golden Butterfly":
            assetList = [{table: "stock", asset: "dlcb"}, {table: "stock", asset: "dscv"}, {table: "fixed_income", asset: "ltb"}, {table: "fixed_income", asset: "stb"}, {table: "real_asset", asset: "gold"}];
            break;

        default:
            assetList = [{table: "account", asset: "cash"}];
            break;
    }

    return assetList;

}


// Finds percentage of each benchmark asset
function percentageFinder(arrayOfAssetArrays){

    // Initialize Variables
    var amountOne = 0;
    var amountTwo = 0;
    var amountThree = 0;
    var amountFour = 0;
    var amountFive = 0;
    var amountSix = 0;

    var returnList = [];

    // Loop through [ [assets], [assets], [assets] ]
    arrayOfAssetArrays.forEach(assetArray => {

        // Loop through [assets]
        assetArray.forEach((asset, index) => {

            if(index === 0){

                amountOne += parseFloat(asset);

            } else if (index === 1) {

                amountTwo += parseFloat(asset);

            } else if (index === 2) {

                amountThree += parseFloat(asset);

            } else if (index === 3) {

                amountFour += parseFloat(asset);

            } else if (index === 4) {

                amountFive += parseFloat(asset);

            } else if (index === 5) {

                amountSix += parseFloat(asset);

            }

        })
    })

    // Push non-zero amounts back into array
    if(amountOne){
        returnList.push(parseFloat(amountOne).toFixed(2));
    }
    if(amountTwo){
        returnList.push(parseFloat(amountTwo).toFixed(2));
    }
    if(amountThree){
        returnList.push(parseFloat(amountThree).toFixed(2));
    }
    if(amountFour){
        returnList.push(parseFloat(amountFour).toFixed(2));
    }
    if(amountFive){
        returnList.push(parseFloat(amountFive).toFixed(2));
    }
    if(amountSix){
        returnList.push(parseFloat(amountSix).toFixed(2));
    }

    return percent(returnList);

}

// Return percentages
function percent(assetList){

    var sum = 0;
    var returnList = [];

    // Find sum
    assetList.forEach(asset => {
        sum += parseFloat(asset);
    })

    // Find percentage
    assetList.forEach(asset => {
        returnList.push((asset / sum * 100).toFixed(2));
    })

    return returnList;

}