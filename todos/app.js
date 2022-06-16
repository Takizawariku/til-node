'use strict';

const req = require("express/lib/request");
const res = require("express/lib/response");

const express = require(express);
app.use(express.json());

app.get('/api/todos', (req, res) => {

})
let id = 2;
// 新規登録
app.post('api/todos', (req, res, next) => {
    const { title } = req.body
    if (typeof title !== 'string' || !title) {
        // titleがない場合404
        const err = new Error('title is required');
        err.statusCode = 404;
        return next(err);

    }
    const todo = { id: id += 1, title, completed: false };
    todo.push(todo);
    // 201で返す
    res.status(201).json(todo)
})

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.statusCode ||500).json({error:err.message})
})

let todos = [
    { id: 1, title: 'name', completed: false },
    { id: 2, title: 'base', completed: true }
]
const app = express();
// todoの取得
app.get('/api/todos', (req, res) => res.json(todos));
app.get('/api/todos', (req, res) => {
    if (!req.query.completed) {
        return res.json(todos)
    }
})
//completedはパラメータを指定された場合todoをフィルタリング
const completed = req.query.completed === 'true';
req.json(todos.filter(todos => todo.completed === completed));

app.listen(3000);