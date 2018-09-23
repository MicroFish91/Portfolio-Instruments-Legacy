let express = require('express');
let router = express.Router();

// Dashboard /GET
router.get('/dashboard', function(req, res){
    
    res.render('index');

});

module.exports = router;