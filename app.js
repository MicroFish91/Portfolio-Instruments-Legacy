var express = require('express');
var app = express();

// Set Pathway for Public
app.use(express.static('public'));

// ** Routes Section **
app.use(require('./routes/setBenchmark'));
app.use(require('./routes/saveSnapshot'));

app.listen(3001);