const router = require('express').Router();

const agendaController = require('../controllers/agendaController');

router.get('/', agendaController.list);
router.post('/add', agendaController.save);
router.get('/update/:id', agendaController.edit);
router.post('/update/:id', agendaController.update);
router.get('/delete/:id', agendaController.delete);

module.exports = router;

