var db = require('./models');

// db.users.create({

//   userName: "Matt",
//   userPassword: "mattPass",
//   benchmark: "Permanent Portfolio"

// })
// .then(function(user){
  
// })

// db.snapshots.create({

//   title: "August 2018",
//   stockTotal: 525.23,
//   fixedIncomeTotal: 1082.23,
//   cashTotal: 125.23,
//   commodotiesTotal: 1245.23,
//   weightedER: 0.27,
//   notes: "This is a note.",
//   userId: 1

// })
// .then(function(user){
  
// })

// db.accounts.create({
//   holdingLocation: "Vanguard",
//   accountType: "Taxable",
//   moneyMarket: JSON.stringify({ticker: "VTSOS", value: 300.00}),
//   snapshotId: 1
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

// db.accounts.findAll({
//   where: {id: 1},
//   include: [{
//       model: db.fixed_incomes,
//       required: true
//     },
//     {
//       model: db.stocks,
//       required: true
//     },
//     {
//       model: db.real_assets,
//       required: true
//     }]
// }).then(results => {
//   // console.log(results[0].dataValues);
//   console.log("made it");
//   console.log(results[0].dataValues.stock.dataValues.tsm);
//   console.log(results[0].dataValues.fixed_income.dataValues.ltb);
//   console.log(results[0].dataValues.real_asset.dataValues.commodoties)
// });

// db.snapshots.findAll({
//   where: {
//     id: 1
//   },
//   include: { 
//       association: 'accounts', // <---- First Level
//       include: [{all: true}],
//       required: true
//   }
// })
// .then(results =>{
//   console.log(results[0].dataValues.accounts[0].stock.dataValues.tsm);
// })

// db.users.findAll({
//   where: {
//     userName: "Matt"
//   },
//   include: { 
//       association: 'snapshots', // <---- First Level
//       include: {
//           association: 'accounts',
//           include: [{all: true}],
//           required: true
//       },
//       required: true
//   }
// })
// .then(results =>{
//   console.log(results[0].dataValues.snapshots[0].dataValues.accounts[0].dataValues.stock.dataValues.tsm);
// })

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

console.log(findDateRanges());