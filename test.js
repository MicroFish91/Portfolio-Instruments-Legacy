var db = require('./models');

db.stocks.create({tsm: null,
    d_lcb: null,
    d_lcv: null,
    d_lcg: null,
    d_mcb: null,
    d_mcv: null,
    d_mcg: null,
    d_scb: null,
    d_scv: null,
    d_scg: null,
    i_lcb: null,
    i_lcv: null,
    i_lcg: null,
    i_mcb: null,
    i_mcv: null,
    i_mcg: null,
    i_scb: null,
    i_scv: null,
    i_scg: null,
    accountsId: 1
  })
.then(function(user){
    
})


// db.Tests.create({test: null})
// .then(function(user){
//     console.log(user);
// });

// db.Tests.findAll({})
// .then(results => {
//     var testing = JSON.parse(results[1].test);
//     console.log(testing);
// })

