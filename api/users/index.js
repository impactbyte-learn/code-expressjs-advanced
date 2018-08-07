const express = require('express');
const router = express.Router();

const controller = require('./controller')

router.get('/', controller.get);
router.get('/search', controller.search) // req.query: ?q=keyword
router.get('/:id', controller.getOneById);
router.get('/:id/todos/:todoId', controller.getOneUserById, controller.getOneByTodoId);

module.exports = router;