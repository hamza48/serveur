class Api{
	
	
	const user = {
		"email": "clyx",
		"password": "test"
	};

	const pousseslegumes = [
		{
			"id": 1,
			"name": "Pousse Légume Salon",
			"type": "Particulier"
		},
		{
			"id": 2,
			"name": "Pousse Légume Restaurant",
			"type": "Professionnel"
		},
		{
			"id": 3,
			"name": "Pousse Légume Bite",
			"type": "Professionnel"
		}
	];

	let app;
	
	constructor(app){
		this.app = app;
	}

	this.app.post('/login', function (req, res) {
	  console.log("post");
	  
	  console.log(req.body);
	  
	  if(req.body.email === user.email && req.body.password === user.password){
		setTimeout(function(){
			res.send({
			  "success": true,
			  "user": {
				"name": "Clyx"
			  }
			});
		}, 0)
		
	  }else{
		res.send({
		  "success": false
	   });
	  }
	   
	})
	
	this.app.get('/getpl', function(req, res){
		res.send({
		  "success": true,
		  "pousse_legumes": pousseslegumes
		});
	});

}

module.exports = Api;

