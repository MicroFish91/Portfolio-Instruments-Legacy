function setBenchmark(benchmarkName){

    // e.g. ["TSM", "DSCV", "LTB", "Bills", "Gold", ....]
    // stretch goal: add a 'custom' case

    switch (benchmarkName) {
        
        case "Total Stock Market":

            return {
                type: "setBenchmark",
                benchmarkTitles: ["tsm"],
                benchmarkRatios: [100]
            };

        case "Classic 60/40":

            return {
                type: "setBenchmark",
                benchmarkTitles: ["tsm", "itb"],
                benchmarkRatios: [60, 40]
            };

        case "Three-Fund Portfolio":

            return {
                type: "setBenchmark",
                benchmarkTitles: ["dlcb", "ilcb", "itb"],
                benchmarkRatios: [40, 20, 40]
            };

        case "No-Brainer Portfolio":

            return {
                type: "setBenchmark",
                benchmarkTitles: ["dlcb", "dscb", "ilcb", "stb"],
                benchmarkRatios: [25, 25, 25, 25]
            };

        case "Rick Ferri Core Four":

            return {
                type: "setBenchmark",
                benchmarkTitles: ["dlcb", "ilcb", "itb", "reits"],
                benchmarkRatios: [48, 24, 20, 8]
            };

        case "Ivy Portfolio":

            return {
                type: "setBenchmark",
                benchmarkTitles: ["dlcb", "ilcb", "itb", "commodoties", "reits"],
                benchmarkRatios: [20, 20, 20, 20, 20]
            };

        case "Permanent Portfolio":

            return {
                type: "setBenchmark",
                benchmarkTitles: ["dlcb", "ltb", "gold", "cash"],
                benchmarkRatios: [25, 25, 25, 25]
            };

        case "Golden Butterfly":

            return {
                type: "setBenchmark",
                benchmarkTitles: ["dlcb", "dscv", "ltb", "stb", "gold"],
                benchmarkRatios: [20, 20, 20, 20, 20]
            }

    }

}

export default setBenchmark;