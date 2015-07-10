/*var restful = require('node-restful');
var mongoose = restful.mongoose;

var app = express();
*/
var restful = require('node-restful');
var mongoose = restful.mongoose;
var app = express();

var User = app.user = restful.model('user', mongoose.Schema({
    //"_id" : {type:mongoose.Schema.Types.ObjectId, required: true }, // hm?
	"name": { type: String},
	"username" : { type: String, required: true },
	"password" : {type: String, required: true, select: false}, // requires select("+password")
	"permissions" :[String],
	"createdOn" : {type: Date,default: Date.now},
	
	//"concepts": [{type:mongoose.Schema.Types.ObjectId, ref:'concept'}],
  }))
  .methods(['get', 'post', 'put', 'delete']);

User.route('login',function(req, res, next) {
	//console.log('USER login post HIT WOOO: ');
	//res.send('work');
	//.populate('boxes')
  return User.findOne({"username":req.body.username,"password":req.body.password})
			//.populate('concepts')
			//.populate('notebooks')
			//.populate('pages')
			.select("+password") // skip password
			.exec(function (err, user) {
    //user.name = req.body.name;
    //console.log('USER login post HIT WOOO: ',err,user);
	if (!err) {
		
		if(user === null || user === "") {
			return res.status(404).end();
		}
		return res.send(user);	
		/*Concept.populate(user.concepts,{path:'tags',model:'tag'},function(err,concepts) {
			console.log('concepts:',concepts);
					
		});*/

    } else {
        console.log('err:',err);
		return res.status(404).end();
    }
    
    
  });
});

User.register(app, '/user'); 