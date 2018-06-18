var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var app = express()
const config = require('./env/config.json')
app.use(bodyParser.json({type: 'application/json'}))

// Command pour se connecter sur la base de donne
//param: le nom de base de donnee
// Note: Il faut istaller un systeme de gestion de 
// base de donnee MySQL Exemple:MySQL
var connection = mysql.createConnection({
  host     : config.db_host,
  user     : config.db_user,
  password : config.db_pass,
  database : config.db_name,
  port : config.db_port 
});

const ACTION_ALLUMER = 1;
const ACTION_ETEINDRE = 2;

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
 
 app.get('/actions',function(req,res){
  connection.query('SELECT A.id as id, A.element as element, ATY.type as type FROM actions as A INNER JOIN action_types as ATY ON A.action_type_id = ATY.id', function (error, results, fields) {
   if(results.length === 0) return;
    var action = results[0];
    console.log(action);
  res.send(
    {
      "success": true,
      "action" : action
    }
  );

  })

 })

app.get('/mesures', function(req, res){
  connection.query('SELECT * FROM mesures', function(error, results, fields) {
    if(results.length == 0) return;
    var mesure = results[0];
    res.send({
      "success": true,
      "mesure": mesure
    });
  })
})

app.delete('/action/delete/:id', function(req, res){
  var id = req.params.id;

  connection.query('DELETE FROM actions WHERE id = ?', [ id ], function(error, results, fields){
    res.send({
     "success": true
    })
  })
})
 

app.post('/action', function(req, res) {
  var action_type_id = req.body.action_type;
  var element = req.body.element;

  connection.query('INSERT INTO actions (action_type_id, element) VALUES (?, ?)', [action_type_id, element], function(error, results, fields){
    res.send({
     "success": true
    });
  });
 // res.status(200);
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
  var Ph = req.body.Ph;

  connection.query('SELECT * FROM mesures WHERE id = 1', function (error, results, fields) {
  if (error) throw error;
    
    //Si il n'y a rien dans la base alors on ajoute sinon on met a jour
    if(results.length == 0){
      connection.query('INSERT INTO mesures (temperature, humidite, temperature_liquide,Ph) VALUES(' + temperature + ', ' + humidite + ', ' + temperature_liquide + ','+Ph+')', function(error, results, fields){
        if (error) throw error;  
      });
    }else{
      connection.query('UPDATE mesures SET temperature = ' + temperature + ', humidite = ' + humidite + ', temperature_liquide = ' + temperature_liquide + ',ph = '+Ph+' WHERE id = 1', function(error, results, fields){
        if (error) throw error;  
      });
    }
  });

})

app.listen(3000, function(){
	console.log('Server started');
})
