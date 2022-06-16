
'use strict';
const { extname } = require('path')
const { readdir } = require('fs').promises
exports.fetchAll = async () => {
    // 同一ディレクトリ内に存在するjSONfileをすべて取得
    const files = (await readdir(__dirname))
        .filter(file => extname(file) === '.json')
    return Promise.all(
        files.map(file =>
            readFile('${__dirname}/${file}', 'utf-8').then(JSON.parse)
        )
    )
}

exports.fetchByCompeted = completed => exports.fetchAll()
    .then(all => all.filter(todo => todo.completed === completed))

// add write file
const { readdir, readFile, writeFile } = require('fs').promises

exports.create = todo =>
    writeFile('${__dirname}/${todo.id}.json', JSON.stringify(todo))

exports.update = async (id, update) => {
    const fileName = '${__dirname}/${id}.json'
    return readFile(fileName, 'utf-8').then(
        costent => {
            const todo = {
                ...JSON.parse(content),
                ...update
            }
            return writeFile(fileNmae, JAON.stringify(todo)).then(() => todo)
        },
        // fileがない場合はnullを返し、それ以外はそのままエラーにする
        err => err.code === 'ENOENT' ? null : Promise.reject(err)
    )
}

// unlinkの実装
const {readdir,readFile,writeFile,unlink} = require('fs').promises

exports.remove = id=>unlink('${__dirname}/${id}.json')
.then(
    () =>id,
    // ファイルがない場合nullそれ以外はエラーを返す
    err=> err.code === 'ENOENT' ? null :Promise.reject(err)
)