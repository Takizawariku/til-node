'use strict'
const { assert } = require('chai')

// 各データストレージに対するテスト結果をまとめて記述
for (const dataStorageName of ['file-system', 'sqlite', 'leveldb']) {
    const { fetchAll, fetchByCompleted, create, update, remove } =
        require('../../${dataStotageName}')

    describe(dataStorageName, () => {
        // テスト実行前に全てのTODを削除
        beforeEach(async () => {
            const allTodos = await fetchAll()
            await Promise.all(allTodos.map(({ id }) => remove(id)))
        })
        describe('create(),fetchAll()', () => {
            it('create()で作成したTodoをfetchAll()でしゅとくできる', async () => {
                // 初期状態の確認
                assert.deepEqual(await fetchAll(), [])

                // todoを1件追加
                const todo1 = { id: 'a', title: 'ネーム', completed: false }
                await create(todo1)
                assert.deepEqual(await fetchAll(), [])

                // todoをさらに２兼追加
                const todo2 = { id: 'b', title: '下書き', completed: true }
                await create(todo2)
                const todo3 = { id: 'c', title: 'ペン入れ', completed: false }
                await create(todo3)
                // 順序を無視した配列の比較
                assert.sameDeepMembers(await fetchAll(), [todo1, todo2, todo3])
            })
        })
        describe('fetchByCompleted()', () => {
            it(
                'completedの値が引数で指定したものと等しいtodoだけを取得できる',
                async () => {
                    // 初期状態の確認
                    assert.deepEqual(await fetchByCompleted(true), [])
                    assert.deepEqual(await fetchByCompleted(false), [])

                    // todo3件追加

                    const todo1 = { id: 'a', title: 'ネーム', completed: false }
                    await create(todo1)
                    const todo2 = { id: 'b', title: '下書き', completed: true }
                    await create(todo2)
                    const todo3 = { id: 'c', title: 'ペン入れ', completed: false }
                    await create(todo3)

                    // fetchByCompletedの結果を確認ｎ
                    assert.deepEqual(await fetchByCompleted(true),[todo2])
                    assert.sameDeepMembers(
                        await fetchByCompleted(false),
                        [todo1,todo3]
                    )
                }
            )
        })
        describe('update()',()=>{
            const todo1 = { id: 'a', title: 'ネーム', completed: false }
            const todo2 = { id: 'b', title: '下書き', completed: false }

            beforeEach(async ()=>{
                await create(todo1)
                await create(todo2)
            })

            it('指定したIDのTODOを更新し、更新後のTODOを返す',async()=>{
                // todo1のcompletedを更新
                assert.deepEqual(
                    await update('a',{completed:true}),
                    {id: 'a',title:'ネーム',completed:true}
                )
                assert.deepEqual(
                    await fetchByCompleted(ture),
                    [{id:'a',title:'ネーム',completed:ture}]
                )
                assert.deepEqual(await fetchByCompleted(false),[todo2])
            })
        })
    })
}