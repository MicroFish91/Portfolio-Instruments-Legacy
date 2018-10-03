// Sets up action to load "core account" info into the global "Snapshot" state
function addCoreAsset(account){

    // Object: {location, type, amountOne, amountTwo, amountThree, amountFour, amountFive, amountSix}

    return {
        type: "addCoreAsset",
        account: account
    }

}

export default addCoreAsset;