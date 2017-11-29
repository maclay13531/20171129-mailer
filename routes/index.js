var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

const creds = require('../config/config');

var transport = {
	host: 'smtp.gmail.com',
	auth: {
		user: creds.USER,
		pass: creds.PASS
	}
}

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success)=>{
	if(error){
		console.log(error);
	}else{
		console.log('SERVER IS RDY TO TAKE MESSAGES!');
	}
})

/* GET home page. */
router.get('/', function(req, res, next) {
	var message = '';

	if(req.query.msg != undefined){
		message = req.query.msg;
	}
	res.render('index', { title: 'Express', message: message });
});

router.post('/send', function(req, res, next) {
	// var {email, content, name, phone} = req.body;
	var email = req.body.email;
	var content = req.body.content;
	var name = req.body.name;
	var phone = req.body.phone;
	var finalMessage = `${content} \n\n phone: ${phone} \n email: ${email}`;

	var mail = {
		from: email,
		to: 'maclay13531@gmail.com',
		subject: 'test',
		text: finalMessage
	}
	transporter.sendMail(mail, (err, data)=>{
		if(err){
			console.log(err);
			res.redirect('/?msg=Fail')
		}else{
			console.log("SENDING WAS A SUCCESS");
			res.redirect('/?msg=Success')
		}
	})
});

module.exports = router;
