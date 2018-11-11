function setBenchmark(user, benchmarkName){
    
    // Post to database
    fetch("/setBenchmark", {
        headers: {
            'content-type': "application/json"
        },
        method: "POST",
        body: JSON.stringify({user: user, benchmarkName: benchmarkName})
    })
    .then(results => console.log(results))

    // e.g. ["TSM", "DSCV", "LTB", "Bills", "Gold", ....]
    // stretch goal: add a 'custom' case

    switch (benchmarkName) {
        
        case "Total Stock Market":

            return {
                user: user,
                type: "setBenchmark",
                benchmarkName: benchmarkName,
                benchmarkTitles: ["tsm"],
                benchmarkRatios: [100]
            };

        case "Classic 60/40":

            return {
                user: user,
                type: "setBenchmark",
                benchmarkName: benchmarkName,
                benchmarkTitles: ["tsm", "itb"],
                benchmarkRatios: [60, 40]
            };

        case "Three-Fund Portfolio":

            return {
                user: user,
                type: "setBenchmark",
                benchmarkName: benchmarkName,
                benchmarkTitles: ["dlcb", "ilcb", "itb"],
                benchmarkRatios: [40, 20, 40]
            };

        case "No-Brainer Portfolio":

            return {
                user: user,
                type: "setBenchmark",
                benchmarkName: benchmarkName,
                benchmarkTitles: ["dlcb", "dscb", "ilcb", "stb"],
                benchmarkRatios: [25, 25, 25, 25]
            };

        case "Rick Ferri Core Four":

            return {
                user: user,
                type: "setBenchmark",
                benchmarkName: benchmarkName,
                benchmarkTitles: ["dlcb", "ilcb", "itb", "reits"],
                benchmarkRatios: [48, 24, 20, 8]
            };

        case "Ivy Portfolio":

            return {
                user: user,
                type: "setBenchmark",
                benchmarkName: benchmarkName,
                benchmarkTitles: ["dlcb", "ilcb", "itb", "commodoties", "reits"],
                benchmarkRatios: [20, 20, 20, 20, 20]
            };

        case "Permanent Portfolio":

            return {
                user: user,
                type: "setBenchmark",
                benchmarkName: benchmarkName,
                benchmarkTitles: ["dlcb", "ltb", "gold", "cash"],
                benchmarkRatios: [25, 25, 25, 25]
            };

        case "Golden Butterfly":

            return {
                user: user,
                type: "setBenchmark",
                benchmarkName: benchmarkName,
                benchmarkTitles: ["dlcb", "dscv", "ltb", "stb", "gold"],
                benchmarkRatios: [20, 20, 20, 20, 20]
            }

    }

}

export default setBenchmark;