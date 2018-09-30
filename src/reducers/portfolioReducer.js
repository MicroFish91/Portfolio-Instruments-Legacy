function portfolioReducer(state, action){

    // Initialize State
    if (state === undefined){
        
        return {
            benchmarkName: "",
            benchmarkTitles: [],
            benchmarkRatios: [],
            user: "Matt"
        }

    }

    // Determine State Changes Based on Action Received
    switch (action.type){

        case 'setBenchmark':

            return {
                ...state,
                benchmarkName: action.benchmarkName,
                benchmarkTitles: action.benchmarkTitles,
                benchmarkRatios: action.benchmarkRatios
            };

        default:
            return state;
    }
}

export default portfolioReducer;