// Instantiate Variables
let express = require('express');
let router = express.Router();
let db = require('../models');

// Dashboard /GET
router.get('/dashboardLineChart:user', (req, res) => {

    // Variable to Hold Return Parameters
    var returnObject = {};
    var queryDates = findDateRanges();

    // Find User Id
    db.users.find({
        where: {userName: req.params.user}
    })
    // Get List of Snapshots
    .then(result => {

        temp.id = result.dataValues.id;

        db.snapshots.findAll({
            where: {
                userId: result.dataValues.id,
                date: { lte: Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 00, 00) }
            }
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