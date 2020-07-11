const express = require('express');
const router = express.Router();

const controlador = require('../controler/userControler');

//calling functions
router.get('/', controlador.index);

router.get('/aboutUs', controlador.about_Us);

router.get('/contact', controlador.contact);

router.get('/help', controlador.help);

router.get('/login', controlador.login); 

router.get('/restaurants', controlador.restaurants); 

router.get('/registroU', controlador.RU);

router.post('/authenticate', controlador.authenticate);

router.get('/restaurantR', controlador.RR);

router.get('/userR', controlador.listUser);

router.post('/add', controlador.addUser);

router.post('/checkin', controlador.new_check);

router.get('/delete/:cedula', controlador.delete);

router.get('/update/:cedula', controlador.dataUpdate);

router.post('/update/:cedula', controlador.update);

module.exports = router;
