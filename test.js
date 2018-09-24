var db = require('./models');

// db.accounts.create({
//   holdingLocation: "Vanguard",
//   accountType: "Taxable",
//   moneyMarket: JSON.stringify({ticker: "VTSOS", value: 300.00}),
// })
// .then(function(user){
  
// })

// db.stocks.create({tsm: JSON.stringify({ticker: "VTSAX", value: 500.27, expense: 0.27}),
//     d_lcb: null,
//     d_lcv: null,
//     d_lcg: null,
//     d_mcb: null,
//     d_mcv: null,
//     d_mcg: null,
//     d_scb: null,
//     d_scv: null,
//     d_scg: null,
//     i_lcb: null,
//     i_lcv: null,
//     i_lcg: null,
//     i_mcb: null,
//     i_mcv: null,
//     i_mcg: null,
//     i_scb: null,
//     i_scv: null,
//     i_scg: null,
//     accountId: 1
//   })
// .then(function(user){
    
// })

// db.fixed_incomes.create({
//   ltb: {ticker: "ABC", value: 230.25, expense: 0.29},
//   itb: null,
//   stb: null,
//   bills: null,
//   accountId: 1
// })
// .then(function(user){
  
// })

// db.real_assets.create({
//   commodoties: {ticker: "IAU", value: 102.53, expense: 0.19},
//   gold: null,
//   reits: null,
//   accountId: 1
// })
// .then(function(user){
  
// })

db.accounts.findAll({
  where: {id: 1},
  include: [{
      model: db.fixed_incomes,
      required: true
    },
    {
      model: db.stocks,
      required: true
    },
    {
      model: db.real_assets,
      required: true
    }]
}).then(results => {
  // console.log(results[0].dataValues);
  console.log("made it");
  console.log(results[0].dataValues.stock.dataValues.tsm);
  console.log(results[0].dataValues.fixed_income.dataValues.ltb);
  console.log(results[0].dataValues.real_asset.dataValues.commodoties)
});