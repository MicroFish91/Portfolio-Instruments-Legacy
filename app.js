var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser');

    // db              = require('./models'),
    // var myStore = new SequelizeStore({ db: db.sequelize })

// Set up Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set Pathways for EJS and Public
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ** Routes Section **
app.use(require('./routes/dashboard'));


app.listen(3000);