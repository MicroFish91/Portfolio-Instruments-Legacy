function portfolioReducer(state, action){

    // Initialize State
    if (state === undefined){
        
        return {
            benchmarkTitles: [],
            benchmarkRatios: []
        }

    }

    // Determine State Changes Based on Action Received
    switch (action.type){

        case 'setBenchmark':

            return {
                ...state,
                benchmarkTitles: action.benchmarkTitles,
                benchmarkRatios: action.benchmarkRatios
            };

        default:
            return state;
    }
}

export default portfolioReducer;