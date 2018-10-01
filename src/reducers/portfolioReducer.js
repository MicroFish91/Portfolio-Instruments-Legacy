function portfolioReducer(state, action){

    // Determine State Changes Based on Action Received
    switch (action.type){

        case 'setBenchmark':

            return {
                ...state,
                benchmarkName: action.benchmarkName,
                benchmarkTitles: action.benchmarkTitles,
                benchmarkRatios: action.benchmarkRatios
            };

        case 'addCoreAsset':

            let newCore = state.coreAssets.slice();

            // Add or replace object into current array
            newCore = addAccount(newCore, action.account);

            // Sort array
            newCore = sortAccounts(newCore);

            console.log(newCore);

            return {
                ...state,
                coreAssets: newCore
            };

        default:
            return state;
    }
}

export default portfolioReducer;


 // Filter for Duplicate, Will Overwrite existing account/type
function addAccount(myArray, myObject){

    var total = 0;

    // Filter out Duplicates
    myArray = myArray.filter(object => {

        return (!((object.location === myObject.location) && (object.type === myObject.type)));

    })

    // Compute Total
    for (var property in myObject) {

        if ((property !== "location") && (property !== "type") && (myObject[property] !== "")){

            console.log(myObject[property]);

            total += parseInt(myObject[property]);
        }

    }

    myObject.total = total;

    myArray.push(myObject);

    return myArray;

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