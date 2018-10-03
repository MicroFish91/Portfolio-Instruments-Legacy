// Instantiate Variables
let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');

// Set up Body Parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Dashboard /GET
router.get('/dashboardRowOne:user', (req, res) => {

    // Latest Snapshot Query
    db.sequelize.query('SELECT "users"."id", "users"."userName",  "users"."userPassword", "users"."benchmark", "users"."createdAt", "users"."updatedAt", "snapshots"."id" AS "snapshots.id", "snapshots"."title" AS "snapshots.title", "snapshots"."notes" AS "snapshots.notes", "snapshots"."userId" AS "snapshots.userId", "snapshots"."createdAt" AS "snapshots.createdAt", "snapshots"."updatedAt" AS "snapshots.updatedAt" FROM "users" AS "users" LEFT OUTER JOIN "snapshots" AS "snapshots" ON "users"."id" = "snapshots"."userId" WHERE "users"."userName" = ' + `'${req.params.user}' ` + 'ORDER by "snapshots"."createdAt" DESC',
    {model: db.users})
    .then(results => {
        console.log(results[0].dataValues['snapshots.id']);
    })

    


    // let roth;

    // let traditional;

    // res.json({data: "here is my data"});

    // console.log(req.params.user);


    // where: {
    //     userName: req.params.user
    // },
    // include: { 
    //     association: 'snapshots', // <---- First Level
    //     order: [['createdAt', 'DESC']],
    //     required: true
    // }


    });

module.exports = router;