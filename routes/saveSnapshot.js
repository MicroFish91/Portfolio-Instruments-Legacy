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
            portfolioBenchmark: req.body.benchmarkName,
            stockTotal: parseFloat(summedValues[0]).toFixed(2),
            fixedTotal: parseFloat(summedValues[1]).toFixed(2),
            realTotal: parseFloat(summedValues[2]).toFixed(2),
            cashTotal: parseFloat(summedValues[3]).toFixed(2),
            date: req.body.date,
            notes: req.body.notes,
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
                    moneyMarket: parseFloat(categorizedAssets[index].assets[3]).toFixed(2),
                    total: parseFloat((parseFloat(categorizedAssets[index].assets[0][19]) + parseFloat(categorizedAssets[index].assets[1][4]) + parseFloat(categorizedAssets[index].assets[2][3]) + parseFloat(categorizedAssets[index].assets[3]))).toFixed(2),
                    snapshotId: result.dataValues.id
                })
                // Create new assets and link to the made account
                .then(result => {

                    // Creative way to handle finding async promise index (FIFO)
                    var myIndex = indexArray.shift();

                    // Add Row to "stocks" database
                    db.stocks.create({
                        tsm: parseFloat(categorizedAssets[myIndex].assets[0][0]).toFixed(2),
                        dlcb: parseFloat(categorizedAssets[myIndex].assets[0][1]).toFixed(2),
                        dlcv: parseFloat(categorizedAssets[myIndex].assets[0][2]).toFixed(2),
                        dlcg: parseFloat(categorizedAssets[myIndex].assets[0][3]).toFixed(2),
                        dmcb: parseFloat(categorizedAssets[myIndex].assets[0][4]).toFixed(2),
                        dmcv: parseFloat(categorizedAssets[myIndex].assets[0][5]).toFixed(2),
                        dmcg: parseFloat(categorizedAssets[myIndex].assets[0][6]).toFixed(2),
                        dscb: parseFloat(categorizedAssets[myIndex].assets[0][7]).toFixed(2),
                        dscv: parseFloat(categorizedAssets[myIndex].assets[0][8]).toFixed(2),
                        dscg: parseFloat(categorizedAssets[myIndex].assets[0][9]).toFixed(2),
                        ilcb: parseFloat(categorizedAssets[myIndex].assets[0][10]).toFixed(2),
                        ilcv: parseFloat(categorizedAssets[myIndex].assets[0][11]).toFixed(2),
                        ilcg: parseFloat(categorizedAssets[myIndex].assets[0][12]).toFixed(2),
                        imcb: parseFloat(categorizedAssets[myIndex].assets[0][13]).toFixed(2),
                        imcv: parseFloat(categorizedAssets[myIndex].assets[0][14]).toFixed(2), 
                        imcg: parseFloat(categorizedAssets[myIndex].assets[0][15]).toFixed(2), 
                        iscb: parseFloat(categorizedAssets[myIndex].assets[0][16]).toFixed(2), 
                        iscv: parseFloat(categorizedAssets[myIndex].assets[0][17]).toFixed(2), 
                        iscg: parseFloat(categorizedAssets[myIndex].assets[0][18]).toFixed(2),
                        accountId: result.dataValues.id
                    })

                    // Add Row to "fixed_incomes" database
                    db.fixed_incomes.create({
                        ltb: parseFloat(categorizedAssets[myIndex].assets[1][0]).toFixed(2),
                        itb: parseFloat(categorizedAssets[myIndex].assets[1][1]).toFixed(2),
                        stb: parseFloat(categorizedAssets[myIndex].assets[1][2]).toFixed(2),
                        bills: parseFloat(categorizedAssets[myIndex].assets[1][3]).toFixed(2),
                        accountId: result.dataValues.id
                    })
                        
                    // Add Row to "real_assets" database
                    db.real_assets.create({
                        commodoties: parseFloat(categorizedAssets[myIndex].assets[2][0]).toFixed(2), 
                        gold: parseFloat(categorizedAssets[myIndex].assets[2][1]).toFixed(2), 
                        reits: parseFloat(categorizedAssets[myIndex].assets[2][2]).toFixed(2),
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

        if (account.assets[0][19]){
            stockTotal += parseFloat(account.assets[0][19]);
        }

        if (account.assets[1][4]) {
            fixedTotal += parseFloat(account.assets[1][4]);
        }

        if (account.assets[2][3]) {
            realTotal += parseFloat(account.assets[2][3]);
        }

        if(account.assets[3]) {
            cashTotal += parseFloat(account.assets[3]);
        }

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
                        newAsset.amount = parseFloat(accounts.amountOne).toFixed(2);

                    }
                    break;

                case "amountTwo":

                    if (benchmarkAssets.length >= 2) {

                        newAsset.table = categorizeAsset(benchmarkAssets[1]);
                        newAsset.ticker = benchmarkAssets[1];
                        newAsset.amount = parseFloat(accounts.amountTwo).toFixed(2);
                    }
                    break;

                case "amountThree":

                    if (benchmarkAssets.length >= 3) {

                        newAsset.table = categorizeAsset(benchmarkAssets[2]);
                        newAsset.ticker = benchmarkAssets[2];
                        newAsset.amount = parseFloat(accounts.amountThree).toFixed(2);
                    }
                    break;

                case "amountFour":

                    if (benchmarkAssets.length >= 4) {

                        newAsset.table = categorizeAsset(benchmarkAssets[3]);
                        newAsset.ticker = benchmarkAssets[3];
                        newAsset.amount = parseFloat(accounts.amountFour).toFixed(2);
                    }
                    break;

                case "amountFive":

                    if (benchmarkAssets.length >= 5) {

                        newAsset.table = categorizeAsset(benchmarkAssets[4]);
                        newAsset.ticker = benchmarkAssets[4];
                        newAsset.amount = parseFloat(accounts.amountFive).toFixed(2);
                    }
                    break;

                case "amountSix":

                    if (benchmarkAssets.length >= 6) {

                        newAsset.table = categorizeAsset(benchmarkAssets[5]);
                        newAsset.ticker = benchmarkAssets[5];
                        newAsset.amount = parseFloat(accounts.amountSix).toFixed(2);
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
                        otherAsset.amount = parseFloat(asset.amount).toFixed(2);

                        newAssets.push(otherAsset);

                        console.log(otherAsset);

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
    var tsm = 0,
        dlcb = 0,
        dlcv = 0,
        dlcg = 0, 
        dmcb = 0,
        dmcv = 0, 
        dmcg = 0, 
        dscb = 0, 
        dscv = 0, 
        dscg = 0, 
        ilcb = 0, 
        ilcv = 0, 
        ilcg = 0, 
        imcb = 0, 
        imcv = 0, 
        imcg = 0, 
        iscb = 0, 
        iscv = 0, 
        iscg = 0;
    var ltb = 0, 
        itb = 0, 
        stb = 0, 
        bills = 0;
    var commodoties = 0, 
        gold = 0, 
        reits = 0;
    var moneyMarket = 0;

    // Cycle through assets and assign values in order
    objectArray.forEach(asset => {

        switch(asset.ticker){

            case "tsm":
                tsm = parseFloat(asset.amount).toFixed(2);
                break;

            case "dlcb":
                dlcb = parseFloat(asset.amount).toFixed(2);
                break;

            case "dlcv":
                dlcv = parseFloat(asset.amount).toFixed(2);
                break;

            case "dlcg":
                dlcg = parseFloat(asset.amount).toFixed(2);
                break;

            case "dmcb":
                dmcb = parseFloat(asset.amount).toFixed(2);
                break;

            case "dmcv":
                dmcv = parseFloat(asset.amount).toFixed(2);
                break;

            case "dmcg":
                dmcg = parseFloat(asset.amount).toFixed(2);
                break;

            case "dscb":
                dscb = parseFloat(asset.amount).toFixed(2);
                break;

            case "dscv":
                dscv = parseFloat(asset.amount).toFixed(2);
                break;

            case "dscg":
                dscg = parseFloat(asset.amount).toFixed(2);
                break;

            case "ilcb":
                ilcb = parseFloat(asset.amount).toFixed(2);
                break;

            case "ilcv":
                ilcv = parseFloat(asset.amount).toFixed(2);
                break;

            case "ilcg":
                ilcg = parseFloat(asset.amount).toFixed(2);
                break;

            case "imcb":
                imcb = parseFloat(asset.amount).toFixed(2);
                break;

            case "imcv":
                imcv = parseFloat(asset.amount).toFixed(2);
                break;

            case "imcg":
                imcg = parseFloat(asset.amount).toFixed(2);
                break;

            case "iscb":
                iscb = parseFloat(asset.amount).toFixed(2);
                break;

            case "iscv":
                iscv = parseFloat(asset.amount).toFixed(2);
                break;

            case "iscg":
                iscg = parseFloat(asset.amount).toFixed(2);
                break;
            
            case "ltb":
                ltb = parseFloat(asset.amount).toFixed(2);
                break;

            case "itb":
                itb = parseFloat(asset.amount).toFixed(2);
                break;

            case "stb":
                stb = parseFloat(asset.amount).toFixed(2);
                break;
            
            case "bills":
                bills = parseFloat(asset.amount).toFixed(2);
                break;

            case "commodoties":
                commodoties = parseFloat(asset.amount).toFixed(2);
                break;

            case "gold":
                gold = parseFloat(asset.amount).toFixed(2);
                break;

            case "reits":
                reits = parseFloat(asset.amount).toFixed(2);
                break;

            case "cash":
                moneyMarket = parseFloat(asset.amount).toFixed(2);
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

    return [stocks, fixedIncome, realAssets, moneyMarket];

}

// Return the sum of the asset arrays
function sumTotal(assetArray){

    var sum = 0;

    assetArray.forEach(amount => {
        if (amount !== 0){
            sum += parseFloat(amount);
        }
    })

    return sum;

}