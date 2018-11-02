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

        // Query List of Snapshots within the last 2.5 years
        var queryOne = db.snapshots.findAll({
            where: {
                userId: result.dataValues.id,
                date: { lte: queryDates.endDate,
                        gte: queryDates.middleDate }
            }
        })

        // Query List of Snapshots from 5 years to 2.5 years ago
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

            // console.log(result[0].dataValues)

            var listOne = categorizeData(values[0], queryDates.middleDate, queryDates.endDate);
            var listTwo = categorizeData(values[1], queryDates.startDate, queryDates.middleDate);

            res.json({data: [listOne, listTwo]});

        })
            
    })

});

module.exports = router;


// Finds Date Ranges Needed for DB Query
function findDateRanges(){

    var endDate = new Date();
    var middleDate = new Date();
    var startDate = new Date();

    // Set Middle Date 2.5 Years from Today
    middleDate.setMonth(middleDate.getMonth() - 30);

    // Set Start Date 5 Years from Today
    startDate.setMonth(startDate.getMonth() - 60);

    return {endDate: endDate, middleDate: middleDate, startDate: startDate};
    
}

// Categorize List by Monthly Data
function categorizeData(myList, start, end){

    

    return null;

}