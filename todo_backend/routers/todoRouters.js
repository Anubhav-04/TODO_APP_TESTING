const express = require('express');
const router = express.Router();
const { get_todo, add_todo } = require('../controllers/todos_controllers');

router.use(express.json());  // or use this middleware in server.js once globally

router.get('/get_todo', get_todo);
router.post('/add_todo', add_todo);

module.exports = router;