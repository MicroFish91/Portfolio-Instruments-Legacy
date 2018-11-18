let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');

// Set up Body Parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// Dashboard /GET
router.get('/getBenchmark:user', (req, res) => {

    db.users.find({
        where: {
            userName: req.params.user
        }
    })
    .then(result => {
        
        res.json({benchmark: result.dataValues.benchmark});

    })
    .catch(error => console.log(error))
    
});

// Dashboard /POST
router.post('/setBenchmark', (req, res) => {

    console.log(req.body.user);

    db.users.find({
        where: {
            userName: req.body.user
        },
    })
    .then(result => {
        db.users.update(
            {benchmark: req.body.benchmarkName},
            {where: {id: result.id}}
        )
    })
    .then(result => console.log(result))
    .catch(error => console.log(error))
    
});

module.exports = router;