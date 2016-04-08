var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('./server/config/mongoose').initDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.use('/api', require('./modules/ressources_humaines/server/employee/route').init());
app.use('/api', require('./modules/gestion_de_stock/server/stock/route').init());

app.listen(process.env.PORT, process.env.IP);
console.log('==> goto: http://localhost:' + 8000);


