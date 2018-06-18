class Api{
	
	
	
	constructor(app){
		this.app = app;
		
		this.user = {
			"email": "clyx",
			"password": "test"
		};

		this.pousseslegumes = [
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
		
		
		this.app.post('/login', function (req, res) {
		  console.log("post");
		  
		  console.log(req.body);
		  
		  if(req.body.email === this.user.email && req.body.password === this.user.password){
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
			  "pousse_legumes": this.pousseslegumes
			});
		});
		
	}

}

module.exports = Api;

