 var bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.text())


app.post('/', function(req,res){
	console.log("données recu")
	res.set({ 'content-type': 'text/plain; charset=utf-8' })
	res.send("ABCDEFGHIJKLtestMNOPQRSTUVWXYZ"); 
})


app.get('/', function(req,res){
	console.log("get recu")
	res.set({ 'content-type': 'text/plain; charset=utf-8' })
	res.send(
		{
			"success": true,
		}
	); 
})

// app.post('/', function (req, res) {
//   console.log(" données recu ")

// })

app.listen(3000, function () {
  
  //console.log('Example app listening on port 3000!')
   console.log("serveur started")
})
