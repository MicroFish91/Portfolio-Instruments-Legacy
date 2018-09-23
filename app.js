var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser');

// Set up Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set Pathways for EJS and Public
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ** Routes Section **
app.use(require('./routes/dashboard'));


app.listen(3000);