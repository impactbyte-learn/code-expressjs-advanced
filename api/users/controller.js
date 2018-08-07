const DATA_USERS = require('./model')

const controller = {
    get: (req, res, next) => {
        res.send(DATA_USERS);
    },

    getOneById: (req, res, next) => {
        const user = DATA_USERS.find(user => {
            return user.id === Number(req.params.id)
        })

        res.send(user);
    },

    getOneUserById: (req, res, next) => {
        const user = DATA_USERS.find(user => {
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
    },

    search: (req, res, next) => {
        const {
            username,
            todos
        } = req.query

        if (username && todos) {
            res.status(200).send(filterByUsernameWithTodos({
                username,
                todos
            }))
        } else if (username) {
            res.status(200).send(filterByUsername(username))
        } else if (todos) {
            res.status(200).send(filterUsersWithTodos(todos))
        } else {
            res.status(400).send({
                message: "You should use a query"
            })
        }

    }
}

const filterByUsernameWithTodos = ({
    username,
    todos
}) => {
    const users = DATA_USERS
        .filter(user => {
            return user.username.toLowerCase().includes(username.toLowerCase())
        }).filter(user => {
            return (todos === "1") == (user.todos.length > 0)
        })
    return users
}

const filterByUsername = (username) => {
    const users = DATA_USERS.filter(user => {
        return user.username.toLowerCase().includes(username.toLowerCase())
    })
    return users
}

const filterUsersWithTodos = (todos) => {
    if (todos === "1") {
        return DATA_USERS.filter(user => {
            return user.todos.length > 0
        })
    } else if (todos === "0") {
        return DATA_USERS.filter(user => {
            return user.todos.length === 0
        })
    }
}

module.exports = controller