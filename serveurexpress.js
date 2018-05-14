var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var app = express()

app.use(bodyParser.json({type: 'application/json'}))

// Command pour se connecter sur la base de donne
//param: le nom de base de donnee
// Note: Il faut istaller un systeme de gestion de 
// base de donnee MySQL Exemple:MySQL
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'PousseLegume',
  port : 8889 
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
 
 app.get('/',function(req,res){
  connection.query('SELECT * FROM mesures WHERE id = 1', function (error, results, fields) {
 res.send(results[0]);
  })

 })


   

 
// respond with "hello world" when a GET request is made to the homepage
app.post('/', function (req, res) {
	res.send('Well received.')
	console.log('New request')
	console.log('start body')
	console.log(req.body)
	//console.log('end body');
	//console.log('----------')
	// Sauvgarde les donnees dans la base de donnee
	// NOTE: une requete sql cad langauage sql
	
  var temperature = req.body.temperature;
  var humidite = req.body.humidite;
  var temperature_liquide = req.body.temperature_liquide;

  connection.query('SELECT * FROM mesures WHERE id = 1', function (error, results, fields) {
  if (error) throw error;
    
    //Si il n'y a rien dans la base alors on ajoute sinon on met a jour
    if(results.length == 0){
      connection.query('INSERT INTO mesures (temperature, humidite, temperature_liquide) VALUES(' + temperature + ', ' + humidite + ', ' + temperature_liquide + ')', function(error, results, fields){
        if (error) throw error;  
      });
    }else{
      connection.query('UPDATE mesures SET temperature = ' + temperature + ', humidite = ' + humidite + ', temperature_liquide = ' + temperature_liquide + ' WHERE id = 1', function(error, results, fields){
        if (error) throw error;  
      });
    }
  });

})

app.listen(3000, function(){
	console.log('Server started');
})
