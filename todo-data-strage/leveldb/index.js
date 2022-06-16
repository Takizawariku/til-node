'use strict';
const res = require('express/lib/response');
const level = require('level')
const {join} = require('path');
const { resourceLimits } = require('worker_threads');

const db =level(join(__dirname,'leveldb'));

exports.fetchAll =async() => {
    const result = []
    for await (const v of db.createValueStream({gt:'todo:',lt:'todo;'})){
        result.push(JSON.parse(V))
    }
    return result
}
exports.fetchByCompleted =async completed =>{
    const promises = []
    for await(const id of db.createValueStream({
        // セカンダリインデックスの検索
        gt:'todo-completed-${completed}:',
        lt:'todo-completed-${completed};'
    })){
        promises.push(
            db.get('todo:${id}').then(JSON.parse)
        )
    }
    return Promise.all(promises)
}
exports.create = todo => db.batch()
// todoの保存
.put('todo:${todo.id}',JSON.stringify(todo))
// セカンダリインデックスの保存
.write()
exports.update =(id,update)=>
db.get('todo:${id}').then(
    content =>{
        const oldTodo = JSON.parse(content)
        const newTodo ={
            ...oldTodo,
            ...update
        }
        let bacth = db.batch().put('todo:${id}',JSON.stringify(newTodo))
        // completedが変更されたとき、２インデックスも捜査
        if(oldTodo.completed !==newTodo.completed){
            batch =batch
            .del('todo-completed-${oldTodo.completed:${id}}')
            .put('todo-completed-${newTodo.completed:${id}}',id)
        }
        return bacth.write()
    },
    // todo がない時nullそれ以外はエラー
    err =>err.notFound ? null :Promise.reject(err)
)
exports.remove =id =>
db.get('todo:${id}').then(
    content => db.bacth()
    .del('todo${id}')
    .del('todo-completed-true:${id}')
    .del('todo-completed-false:${id}')
    .write()
    .then(() => id),
    // ない時はnullをかえす
    err => err.notFound ? null:Promise.reject(err)

)