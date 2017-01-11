const express = require('express'); 
const router = express.Router();

const auth = require('../auth');  
const middleware = require('../middleware/auth');

router.post('/auth/signup', auth.emailSignup);  
router.post('/auth/login', auth.emailLogin);

router.get('/prueba', (req, res) => res.status(200).send({data: "mensaje de prueba"}));


router.get('/private', 
						middleware.ensureAuthenticated, 
						(req, res) => res.status(200).send("Tu token esta bien " + req.user.email));


module.exports = router;