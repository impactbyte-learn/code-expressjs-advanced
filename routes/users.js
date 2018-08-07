var express = require('express');
var router = express.Router();

const users = [{
    id: 0,
    username: "mhaidarhanif",
    todos: [{
      id: 0,
      text: "Doing something first"
    }]
  },
  {
    id: 1,
    username: "arieyosua",
    todos: [{
      id: 0,
      text: "Doing something second"
    }]
  },
  {
    id: 2,
    username: "indroguntur",
    todos: [{
      id: 0,
      text: "Doing something third"
    }]
  }
]

const controllers = {
  get: (req, res, next) => {
    res.send(users);
  },

  getOneById: (req, res, next) => {
    const user = users.find(user => {
      return user.id === Number(req.params.id)
    })

    res.send(user);
  },

  getOneUserById: (req, res, next) => {
    const user = users.find(user => {
      return user.id === Number(req.params.id)
    })
    req.user = user
    next()
  },

  // depends on getOneUserById, with req.user
  getOneByTodoId: (req, res, next) => {
    const todo = req.user.todos.find(todo => {
      return todo.id === Number(req.params.todoId)
    })
    res.status(200).send(todo)
  }
}

router.get('/', controllers.get);
router.get('/:id', controllers.getOneById);
router.get('/:id/todos/:todoId', controllers.getOneUserById, controllers.getOneByTodoId);

module.exports = router;