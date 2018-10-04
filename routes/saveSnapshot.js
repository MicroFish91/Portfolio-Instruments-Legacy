// Instantiate Variables
let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');

// Set up Body Parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Dashboard /POST
router.post('/saveSnapshot', (req, res) => {

    // Instantiate Variables
    var userId = null;
    var indexArray = [];
    var categorizedAssets = categorizeForDatabase(req.body.coreAssets, req.body.benchmarkTitles);
    var summedValues = majorAssetTotal(categorizedAssets);

    // Query database to find userId
    db.users.find({
        where: {
            userName: req.body.user
        },
    })
    // Use userId to create a new "snapshot" in the database
    .then(result => {

        userId = result.dataValues.id;
        
        db.snapshots.create({
            title: req.body.snapshotName,
            notes: "this is a note",
            stockTotal: summedValues[0],
            fixedTotal: summedValues[1],
            realTotal: summedValues[2],
            cashTotal: summedValues[3],
            userId: userId
        })
        // Use returned snapshotId to create and link new Accounts found in categorizedAssets
        .then(result => {
            
            // Loop through each account
            categorizedAssets.forEach((account, index) => {

                // Creative way to handle finding async promise index (FIFO)
                indexArray.push(index);

                // Create new account
                db.accounts.create({
                    holdingLocation: account.location,
                    accountType: account.type,
                    moneyMarket: parseInt(categorizedAssets[index].assets[3]),
                    total: (parseInt(categorizedAssets[index].assets[0][19]) + parseInt(categorizedAssets[index].assets[1][4]) + parseInt(categorizedAssets[index].assets[2][3]) + parseInt(categorizedAssets[index].assets[3])),
                    snapshotId: result.dataValues.id
                })
                // Create new assets and link to the made account
                .then(result => {

                    // Creative way to handle finding async promise index (FIFO)
                    var myIndex = indexArray.shift();

                    // Add Row to "stocks" database
                    db.stocks.create({
                        tsm: categorizedAssets[myIndex].assets[0][0],
                        dlcb: categorizedAssets[myIndex].assets[0][1],
                        dlcv: categorizedAssets[myIndex].assets[0][2],
                        dlcg: categorizedAssets[myIndex].assets[0][3],
                        dmcb: categorizedAssets[myIndex].assets[0][4],
                        dmcv: categorizedAssets[myIndex].assets[0][5],
                        dmcg: categorizedAssets[myIndex].assets[0][6],
                        dscb: categorizedAssets[myIndex].assets[0][7],
                        dscv: categorizedAssets[myIndex].assets[0][8],
                        dscg: categorizedAssets[myIndex].assets[0][9],
                        ilcb: categorizedAssets[myIndex].assets[0][10],
                        ilcv: categorizedAssets[myIndex].assets[0][11],
                        ilcg: categorizedAssets[myIndex].assets[0][12],
                        imcb: categorizedAssets[myIndex].assets[0][13],
                        imcv: categorizedAssets[myIndex].assets[0][14], 
                        imcg: categorizedAssets[myIndex].assets[0][15], 
                        iscb: categorizedAssets[myIndex].assets[0][16], 
                        iscv: categorizedAssets[myIndex].assets[0][17], 
                        iscg: categorizedAssets[myIndex].assets[0][18],
                        accountId: result.dataValues.id
                    })

                    // Add Row to "fixed_incomes" database
                    db.fixed_incomes.create({
                        ltb: categorizedAssets[myIndex].assets[1][0],
                        itb: categorizedAssets[myIndex].assets[1][1],
                        stb: categorizedAssets[myIndex].assets[1][2],
                        bills: categorizedAssets[myIndex].assets[1][3],
                        accountId: result.dataValues.id
                    })
                        
                    // Add Row to "real_assets" database
                    db.real_assets.create({
                        commodoties: categorizedAssets[myIndex].assets[2][0], 
                        gold: categorizedAssets[myIndex].assets[2][1], 
                        reits: categorizedAssets[myIndex].assets[2][2],
                        accountId: result.dataValues.id
                    })
                })
            });
        })   
    })
})

module.exports = router;


// Computes major asset totals
function majorAssetTotal(objectArray){

    var stockTotal = 0;
    var fixedTotal = 0;
    var realTotal = 0;
    var cashTotal = 0;
    
    // Cycle through each account and add up sums
    objectArray.forEach(account => {

        stockTotal += parseInt(account.assets[0][19]);
        fixedTotal += parseInt(account.assets[1][4]);
        realTotal += parseInt(account.assets[2][3]);
        cashTotal += parseInt(account.assets[3]);

    })

    return [stockTotal, fixedTotal, realTotal, cashTotal];

}


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

        newObject.location = accounts.location;
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
                    break;

                case "amountTwo":

                    if (benchmarkAssets.length >= 2) {

                        newAsset.table = categorizeAsset(benchmarkAssets[1]);
                        newAsset.ticker = benchmarkAssets[1];
                        newAsset.amount = accounts.amountTwo;

                        console.log
                    }
                    break;

                case "amountThree":

                    if (benchmarkAssets.length >= 3) {

                        newAsset.table = categorizeAsset(benchmarkAssets[2]);
                        newAsset.ticker = benchmarkAssets[2];
                        newAsset.amount = accounts.amountThree;
                    }
                    break;

                case "amountFour":

                    if (benchmarkAssets.length >= 4) {

                        newAsset.table = categorizeAsset(benchmarkAssets[3]);
                        newAsset.ticker = benchmarkAssets[3];
                        newAsset.amount = accounts.amountFour;
                    }
                    break;

                case "amountFive":

                    if (benchmarkAssets.length >= 5) {

                        newAsset.table = categorizeAsset(benchmarkAssets[4]);
                        newAsset.ticker = benchmarkAssets[4];
                        newAsset.amount = accounts.amountFive;
                    }
                    break;

                case "amountSix":

                    if (benchmarkAssets.length >= 6) {

                        newAsset.table = categorizeAsset(benchmarkAssets[5]);
                        newAsset.ticker = benchmarkAssets[5];
                        newAsset.amount = accounts.amountSix;
                    }
                    break;
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

        newObject.assets = sortAsset(newAssets);


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

    // Instantiate Major Asset Arrays
    var stocks = ["tsm", "dlcb", "dlcv", "dlcg", "dmcb", "dmcv", "dmcg", "dscb", "dscv", "dscg", "ilcb", "ilcv", "ilcg", "imcb", "imcv", "imcg", "iscb", "iscv", "iscg"];
    var fixedIncome = ["ltb", "itb", "stb", "bills"];
    var realAssets = ["commodoties", "gold", "reits"];

    // Categorize by Major Asset
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


function sortAsset(objectArray){

    // Object Array => [{table, ticker, amount}, {}...]

    // Instantiate Variables
    var stocks, fixedIncome, realAssets;
    var stockTotal, fixedTotal, realTotal;
    var tsm = null,
        dlcb = null,
        dlcv = null,
        dlcg = null, 
        dmcb = null,
        dmcv = null, 
        dmcg = null, 
        dscb = null, 
        dscv = null, 
        dscg = null, 
        ilcb = null, 
        ilcv = null, 
        ilcg = null, 
        imcb = null, 
        imcv = null, 
        imcg = null, 
        iscb = null, 
        iscv = null, 
        iscg = null;
    var ltb = null, 
        itb = null, 
        stb = null, 
        bills = null;
    var commodoties = null, 
        gold = null, 
        reits = null;
    var moneyMarket = null;

    // Cycle through assets and assign values in order
    objectArray.forEach(asset => {

        switch(asset.ticker){

            case "tsm":
                tsm = asset.amount;
                break;

            case "dlcb":
                dlcb = asset.amount;
                break;

            case "dlcv":
                dlcv = asset.amount;
                break;

            case "dlcg":
                dlcg = asset.amount;
                break;

            case "dmcb":
                dmcb = asset.amount;
                break;

            case "dmcv":
                dmcv = asset.amount;
                break;

            case "dmcg":
                dmcg = asset.amount;
                break;

            case "dscb":
                dscb = asset.amount;
                break;

            case "dscv":
                dscv = asset.amount;
                break;

            case "dscg":
                dscg = asset.amount;
                break;

            case "ilcb":
                ilcb = asset.amount;
                break;

            case "ilcv":
                ilcv = asset.amount;
                break;

            case "ilcg":
                ilcg = asset.amount;
                break;

            case "imcb":
                imcb = asset.amount;
                break;

            case "imcv":
                imcv = asset.amount;
                break;

            case "imcg":
                imcg = asset.amount;
                break;

            case "iscb":
                iscb = asset.amount;
                break;

            case "iscv":
                iscv = asset.amount;
                break;

            case "iscg":
                iscg = asset.amount;
                break;
            
            case "ltb":
                ltb = asset.amount;
                break;

            case "itb":
                itb = asset.amount;
                break;

            case "stb":
                stb = asset.amount;
                break;
            
            case "bills":
                bills = asset.amount;
                break;

            case "commodoties":
                commodoties = asset.amount;
                break;

            case "gold":
                gold = asset.amount;
                break;

            case "reits":
                reits = asset.amount;
                break;

            case "mm":
                moneyMarket = asset.amount;
                break;

        }

    })

    // Categorize asset values
    stocks = [tsm, dlcb, dlcv, dlcg, dmcb, dmcv, dmcg, dscb, dscv, dscg, ilcb, ilcv, ilcg, imcb, imcv, imcg, iscb, iscv, iscg];
    fixedIncome = [ltb, itb, stb, bills];
    realAssets = [commodoties, gold, reits];

    // Find Totals
    stockTotal = sumTotal(stocks);
    fixedTotal = sumTotal(fixedIncome);
    realTotal = sumTotal(realAssets);

    // Push the sums into the end of each asset array
    stocks.push(stockTotal);
    fixedIncome.push(fixedTotal);
    realAssets.push(realTotal);

    // If money market null, set to 0 as total
    if (moneyMarket === null) {
        moneyMarket = 0;
    }

    return [stocks, fixedIncome, realAssets, moneyMarket];

}

// Return the sum of the asset arrays
function sumTotal(assetArray){

    var sum = 0;

    assetArray.forEach(amount => {
        if (amount !== null){
            sum += parseInt(amount);
        }
    })

    return sum;

}