function portfolioReducer(state, action){
    
    // Initialize States
    if (state === undefined){

        return {user: "", benchmarkName: "", benchmarkTitles: [], benchmarkRatios: [], user: "", coreAssets: [], hasSnapshots: false};

    }

    // Determine State Changes Based on Action Received
    switch (action.type){

        case 'initializeUser':

            return {
                ...state,
                user: action.user,
                benchmarkName: action.benchmarkName,
                benchmarkTitles: action.benchmarkTitles,
                benchmarkRatios: action.benchmarkRatios,
                hasSnapshots: true
            }

        case 'removeUser':

            return {
                ...state,
                user: "", 
                benchmarkName: "", 
                benchmarkTitles: [], 
                benchmarkRatios: [], 
                coreAssets: [],
                hasSnapshots: false
            }

        case 'setBenchmark':

            return {
                ...state,
                user: action.user,
                benchmarkName: action.benchmarkName,
                benchmarkTitles: action.benchmarkTitles,
                benchmarkRatios: action.benchmarkRatios
            };

        case 'addCoreAsset':

            let newCore = state.coreAssets.slice();

            // Add or replace object into current array
            newCore = addCore(newCore, action.account);

            // Sort array
            newCore = sortAccounts(newCore);

            return {
                ...state,
                coreAssets: newCore
            };

        case "addOtherAsset":

            let otherCore = addOther(state.coreAssets, action.other);

            otherCore = sortAccounts(otherCore);

            return {
                ...state,
                coreAssets: otherCore
            }

        case "saveSnapshot":

            return {
                ...state,
                coreAssets: [],
                hasSnapshots: true
            }

        default:
            return state;
    }
}

export default portfolioReducer;

// Updates stateArray with new account info when triggered from "addCore" action
function addCore(stateArray, newObject){
    
    // Initialize Variables
    var newStateArray = stateArray.slice();
    var accountIndex = null;
    var newAccount = {};

    // Find if "account" exists and check if "object" attribute exists within "account"
    stateArray.forEach((object, index) => {

        if ((object.location === newObject.location) && (object.type === newObject.type)) {

            accountIndex = index;
        }
    });

    // If Account Exists
    if (accountIndex !== null){

        newStateArray[accountIndex].amountOne = parseFloat(newObject.amountOne).toFixed(2);
        newStateArray[accountIndex].amountTwo = parseFloat(newObject.amountTwo).toFixed(2);
        newStateArray[accountIndex].amountThree = parseFloat(newObject.amountThree).toFixed(2);
        newStateArray[accountIndex].amountFour = parseFloat(newObject.amountFour).toFixed(2);
        newStateArray[accountIndex].amountFive = parseFloat(newObject.amountFive).toFixed(2);
        newStateArray[accountIndex].amountSix = parseFloat(newObject.amountSix).toFixed(2);

        newStateArray[accountIndex].total = objectTotal(newStateArray[accountIndex]);
        
    }
    // If Account Does Not Exist
    else {

        newAccount.location = newObject.location;
        newAccount.type = newObject.type;
        newAccount.amountOne = parseFloat(newObject.amountOne).toFixed(2);
        newAccount.amountTwo = parseFloat(newObject.amountTwo).toFixed(2);
        newAccount.amountThree = parseFloat(newObject.amountThree).toFixed(2);
        newAccount.amountFour = parseFloat(newObject.amountFour).toFixed(2);
        newAccount.amountFive = parseFloat(newObject.amountFive).toFixed(2);
        newAccount.amountSix = parseFloat(newObject.amountSix).toFixed(2);

        newAccount.total = objectTotal(newObject);

        newStateArray.push(newAccount);
        
    }

    return newStateArray;

}

// Sort Locations Alphabetically
function sortAccounts(myArray){
    
    var sortedLocations = myArray.map(account => (account.location.toLowerCase() + account.type.toLowerCase()));
    var unsortedLocations = sortedLocations.slice();
    var sortedList = [];

    sortedLocations.sort();

    sortedLocations.forEach((account) => {
        sortedList.push(myArray[unsortedLocations.indexOf(account)]);
    })

    return sortedList;

}

// Updates stateArray with new "other" account info
function addOther(stateArray, otherObject){
    
    // Initialize Variables
    var newStateArray = stateArray.slice();
    var objectIndex = null;
    var objectArrayExists = false;
    var newAccount = {};
    var otherPush = {};

    // Filter what we want to push into "other" array
    otherPush.assetType = otherObject.assetType;
    otherPush.amount = parseFloat(otherObject.amount).toFixed(2);

    // Find if stateArray position exists and check if "object" attribute exists
    stateArray.forEach((object, index) => {

        if ((object.location === otherObject.location) && (object.type === otherObject.type)) {

            objectIndex = index;

            // Check if "other" attribute already exists
            if (stateArray[objectIndex].hasOwnProperty("other")){
                objectArrayExists = true;
            }   

        }
    });

    // If Object Exists and "other" Attribute Exists
    if ((objectIndex !== null) && (objectArrayExists)){

        // Push Updated Object
        newStateArray[objectIndex].other.push(otherPush);

        // Assign "total" attribute
        newStateArray[objectIndex].total = objectTotal(newStateArray[objectIndex]);
    }
    // If Object Exists but "other" Attribute Does Not Exist
    else if ((objectIndex !== null) && !(objectArrayExists)) {

        // Initialize Object Attribute and Push
        newStateArray[objectIndex].other = [];
        newStateArray[objectIndex].other.push(otherPush);

        // Assign "total" attribute
        newStateArray[objectIndex].total = objectTotal(newStateArray[objectIndex]);
    }
    // If Object Does not Exist
    else {
        newAccount.location = otherObject.location;
        newAccount.type = otherObject.type;
        newAccount.other = [];
        newAccount.other.push(otherPush);
        newAccount.total = parseFloat(otherObject.amount).toFixed(2);
        newStateArray.push(newAccount);
    }

    return newStateArray;

}

// Find Account Total ($)
function objectTotal(myObject){

    var total = 0.00;

    // Compute Total
    for (var property in myObject) {

        // Add all attributes that have number values minus "other"
        if ((property !== "location") && (property !== "other") && (property !== "type") && (property !== "total") && (myObject[property] !== "")){

            total += parseFloat(myObject[property]);

        }

        // If the "other", loops separately and add to total
        if(property === "other"){

            myObject[property].forEach(other => {
                total += parseFloat(other.amount);
            });

        }

    }

    total = total.toFixed(2);

    return total;

}