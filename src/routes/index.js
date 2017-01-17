const express = require('express'); 
const router = express.Router();

const auth = require('../auth');  
const middleware = require('../middleware/auth');

const config = require('../config');
const jwtService = require('../services/jwt');


router.post('/auth/signup', auth.emailSignup);  
router.post('/auth/login', auth.emailLogin);

router.get('/prueba', (req, res) => res.status(200).send({data: "mensaje de prueba"}));
router.get('/auth/token', auth.checkToken);

router.get('/private', 
						middleware.ensureAuthenticated, 
						(req, res) => res.status(200).send("Tu token esta bien " + req.user.email));


module.exports = router;