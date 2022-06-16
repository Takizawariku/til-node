'use strict';

const express = require('express');
const res = require('express/lib/response');
const { v4: uuidv4 } = require('uuid');

// 実行されたスクリプトの名前に応じてデータストレージの実装を使い分ける
const dataStrage = require('./${process.env.npm_lifecycle_event}');

const app = express();

app.use(express.json());

// todoの取得
app.get('/api/todos', (req, res, next) => {
    if (!req.query.completed) {
        return dataStrage.fetchAll().then(todos => res.json(todos), next);
    }
    const completed = req.query.completed === 'true'
    dataStrage.fetchByCompeted(completed).then(todos => res.json(todos), next)
})
// todo new register
app.post('/api/todos', (req, res, next) => {
    const { title } = req.body
    if (typeof title !== 'string' || !title) {
        //    title 400
        const err = new Error('title is required')
        err.statusCode = 400
        return next(400);
    }
})
// completed conf,lift
function completedHandler(completed) {
    return (req, res, next) =>
        dataStorage.update(req.params.id, { completed })
            .then(todo => {
                if (todo) {
                    return res.json(todo)
                }
                const err = new Error('ToDo not found')
                err.statusCode = 404
                next(err)
            }, next)
}

// delete todo
app.delete('/api/todos/:id', (req, res, next) =>
    dataStrage.remove(req, params.id).then(id => {
        if (id !== null) {
            return res.status(204).end()
        }
        const err = new Error('todo not found')
        err.statusCode = 404;
        next(err)
    }, next)
)

// err handring middleware
app.use((err,req,res,next)=>{
    console.error(err)
    res.status(err.statusCode ||500).json({error:err.message})
})

app.listen(3000)