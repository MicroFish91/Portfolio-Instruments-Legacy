// Instantiate Variables
let express = require('express');
let router = express.Router();
let db = require('../models');

// Dashboard /GET
router.get('/dashboardLineChart:user', (req, res) => {

    // Variable to Hold Return Parameters
    var queryDates = findDateRanges();

    // Find User Id
    db.users.find({
        where: {userName: req.params.user}
    })
    // Get List of Snapshots
    .then(result => {

        // Query List of Snapshots within the last 2 years
        var queryOne = db.snapshots.findAll({
            where: {
                userId: result.dataValues.id,
                date: { lte: queryDates.endDate,
                        gte: queryDates.middleDate }
            }
        })

        // Query List of Snapshots from 5 years to 2 years ago
        var queryTwo = db.snapshots.findAll({
            where: {
                userId: result.dataValues.id,
                date: { lte: queryDates.middleDate,
                        gte: queryDates.startDate }
            }
        })

        // Wait for Both Database Queries to Return Before Proceeding
        Promise.all([queryOne, queryTwo])
        .then(values => {

            var listOne = categorizeData(values[0], queryDates.middleDate);
            var listTwo = categorizeData(values[1], queryDates.startDate);
            var labels = getLabels(queryDates.startDate, queryDates.middleDate, queryDates.endDate);

            listOne = clusterTotals(listOne);
            listTwo = clusterTotals(listTwo);

            res.json({data: [listOne, listTwo], labels: labels.month, labelOne: `${labels.startYear} - ${labels.middleYear}`, labelTwo: `${labels.middleYear} - ${labels.endYear}`});

        })
        .catch(error => console.log(error))
            
    })

});

module.exports = router;


// Finds Date Ranges Needed for DB Query
function findDateRanges(){

    var endDate = new Date();
    var middleDate = new Date();
    var startDate = new Date();

    // Set Middle Date 2 Years from Today
    middleDate.setMonth(middleDate.getMonth() - 24);

    // Set Start Date 4 Years from Today
    startDate.setMonth(startDate.getMonth() - 48);

    return {endDate: endDate, middleDate: middleDate, startDate: startDate};
    
}

// Categorize List by Monthly Data (2 Year Range)
function categorizeData(myList, start){

    // Initialize Variables
    var newList = [];
    var startTime = start;
    var tempList = [];
    var total = 0;

    // Cycle through each month in the 2 year interval (24 month divisions)
    for(let month = 0; month <= 24; month++){

        // Set cycled interval
        startTime.setMonth(startTime.getMonth() + month);

        // Attributes: stockTotal, fixedTotal, realTotal, cashTotal, date
        myList.forEach((data, index) => {

            var tempDate = new Date(data.dataValues.date);
            
            // If year and month are same, log it for comparison
            if ((tempDate.getFullYear() === startTime.getFullYear()) && (tempDate.getMonth() === startTime.getMonth())){

                tempList.push(data.dataValues);
            }
    
        });

        newList.push(findLargestDate(tempList));

        // Reset Date
        startTime = new Date(start);
        tempList = [];

    }

    return newList;

}


// Find largest date in the list
function findLargestDate(newList){

    // If length is 0, return 0, if length exists, find largest date and return
    if (newList.length > 0) {

        // Initialize Variables
        var myDate = new Date(newList[0].createdAt);
        var compareDate;
        var myIndex = 0;

        // Cycle through List and Compare
        newList.forEach((date, index) => {

            compareDate = new Date(date.createdAt);

            // See if latest date
            if (compareDate > myDate){

                myDate = compareDate;
                myIndex = index;

            }

        })

        return newList[myIndex];

    } else {

        return 0;

    }

}

// Refine List to total $ Values
function clusterTotals(myList){

    // Initialize Variables
    var lastNumber = myList[0];
    var newList = [];
    var total = 0; 

    // Go Through List
    for(let index = 0; index < myList.length; index++){

        // If zero
        if(myList[index] === 0){

            newList.push(lastNumber);
            lastNumber = myList[index];

        } 
        // If data object
        else {

            // Add total of all assset categories
            total = parseFloat(myList[index]['stockTotal']) + parseFloat(myList[index]['fixedTotal']) + parseFloat(myList[index]['realTotal']) + parseFloat(myList[index]['cashTotal']);

            newList.push(total.toFixed(2));

            lastNumber = total.toFixed(2);
            total = 0;

        }

    }

    return newList;

}


// Get Chart Labels for Front End
function getLabels(startDate, middleDate, endDate){

    var months = [];
    var returnObject = {};
    var startTime = new Date(startDate);

    // Cycle through each month in the 2 year interval (24 month divisions)
    for(let month = 0; month <= 24; month++){

        // Set cycled interval
        startTime.setMonth(startTime.getMonth() + month);

        // Find Month
        switch (startTime.getMonth()){

            case 0:
                months.push("January");
                break;

            case 1:
                months.push("February");
                break;

            case 2: 
                months.push("March");
                break;

            case 3:
                months.push("April");
                break;

            case 4:
                months.push("May");
                break;

            case 5:
                months.push("June");
                break;

            case 6:
                months.push("July");
                break;

            case 7:
                months.push("August");
                break;

            case 8:
                months.push("September");
                break;

            case 9:
                months.push("October");
                break;

            case 10:
                months.push("November");
                break;

            case 11:
                months.push("December");
                break;
        }

        var startTime = new Date(startDate);

    }

    returnObject.month = months;
    returnObject.startYear = startDate.getFullYear();
    returnObject.middleYear = middleDate.getFullYear();
    returnObject.endYear = endDate.getFullYear();

    return returnObject;

}