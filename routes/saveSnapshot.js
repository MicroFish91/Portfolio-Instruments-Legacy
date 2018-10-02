let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');

// Set up Body Parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Dashboard /POST
router.post('/saveSnapshot', (req, res) => {

    var userId = 0;
    var categorizedAssets = categorizeForDatabase(req.body.coreAssets, req.body.benchmarkTitles);

    console.log(categorizedAssets[1].assets);

    // db.users.find({
    //     where: {
    //         userName: req.body.user
    //     },
    // })
    // .then(result => {

    //     userId = result.dataValues.id;
        
    //     db.snapshots.create({
    //         title: req.body.snapshotName,
    //         notes: "this is a note",
    //         userId: userId
    //     })
    //     .then(result => {

    //         console.log(result.dataValues.id);
            
            

    // })
    
});

module.exports = router;


// Categorize assets
function categorizeForDatabase(accountsArray, benchmarkAssets){

    // accountsArray => [{}, {}, {}]
    // {} => {location, type, amountOne - amountSix, other, total}
    // benchmarkAssets => [tsm, itb]

    var newAccountsArray = [];

    // Loops through Accounts
    accountsArray.forEach(accounts => {

        var newObject = {};
        var newAssets = [];

        newObject.holding = accounts.holding;
        newObject.type = accounts.type;

        // Loop through Assets
        for (var property in accounts){

            var newAsset = {};

            // Assign newAsset property
            switch(property) {

                case "amountOne":

                    if (benchmarkAssets.length >= 1) {

                        newAsset.table = categorizeAsset(benchmarkAssets[0]);
                        newAsset.ticker = benchmarkAssets[0];
                        newAsset.amount = accounts.amountOne;

                    }

                case "amountTwo":

                    if (benchmarkAssets.length >= 2) {

                        newAsset.table = categorizeAsset(benchmarkAssets[1]);
                        newAsset.ticker = benchmarkAssets[1];
                        newAsset.amount = accounts.amountTwo;
                    }

                case "amountThree":

                    if (benchmarkAssets.length >= 3) {

                        newAsset.table = categorizeAsset(benchmarkAssets[2]);
                        newAsset.ticker = benchmarkAssets[2];
                        newAsset.amount = accounts.amountThree;
                    }

                case "amountFour":

                    if (benchmarkAssets.length >= 4) {

                        newAsset.table = categorizeAsset(benchmarkAssets[3]);
                        newAsset.ticker = benchmarkAssets[3];
                        newAsset.amount = accounts.amountFour;
                    }

                case "amountFive":

                    if (benchmarkAssets.length >= 5) {

                        newAsset.table = categorizeAsset(benchmarkAssets[4]);
                        newAsset.ticker = benchmarkAssets[4];
                        newAsset.amount = accounts.amountFive;
                    }

                case "amountSix":

                    if (benchmarkAssets.length >= 6) {

                        newAsset.table = categorizeAsset(benchmarkAssets[5]);
                        newAsset.ticker = benchmarkAssets[5];
                        newAsset.amount = accounts.amountSix;
                    }
                }

                // If new asset found, push into newAssets Array
                if(newAsset.hasOwnProperty("ticker")){

                    newAssets.push(newAsset);

                }

                
                // If other attribute, loop through array
                if(property === "other"){

                    accounts.other.forEach(asset => {

                        var otherAsset = {};

                        otherAsset.table = categorizeAsset(asset.assetType);
                        otherAsset.ticker = asset.assetType;
                        otherAsset.amount = asset.amount;

                        newAssets.push(otherAsset);

                    })
                
                }

        }

        newObject.assets = newAssets;

        newAccountsArray.push(newObject);

    })


    // return array of Accounts: [{}, {}, {}]
    // Account {} => {location, type. assets}
    // assets => [{}, {}, {}]
    // Asset {} => {table, ticker, amount}

    return newAccountsArray;

}

// Categorize by Major Asset Class
function categorizeAsset(asset){

    var stocks = ["tsm", "dlcb", "dlcv", "dlcg", "dmcb", "dmcv", "dmcg", "dscb", "dscv", "dscg", "ilcb", "ilcv", "ilcg", "imcb", "imcv", "imcg", "iscb", "iscv", "iscg"];
    var fixedIncome = ["ltb", "itb", "stb", "bills"];
    var realAssets = ["commodoties", "gold", "reits"];

    if (stocks.includes(asset)){
        return "stocks";
    }
    else if (fixedIncome.includes(asset)){
        return "fixed_incomes";
    }
    else if (realAssets.includes(asset)) {
        return "real_assets";
    }
    else {
        return "moneyMarket";
    }

}