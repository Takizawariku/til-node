import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import 'isomorphic-fetch'

// ページの情報の定義   
const pages = {
    index: { title: 'すべてのToDo', fetchQuery: '' },
    active: { title: '未完了のToDo', fetchQuery: '?completed=false' },
    completed: { title: '完了したToDo', fetchQuery: '?completed=true' }
}
// CSRでページを切り替えるためのリンク
const pageLinks = Object.keys(pages).map((page, index) =>
    <Link href={`/${page === 'index' ? '' : page}`} key={index}>
        <a style={{ marginRight: 10 }}>{pages[page].title}</a>
    </Link>
)

//reactコンポーネントを実装し外部モジュールで利用可能なようにexportする
export default function Todo(props) {
    const { title, fetchQuery } = pages[props, page];
    //コンポーネントの初期化と、porpsの値に応じた更新   
    consst[todos, setTodos] = useState([]);
    useEffect(() => {
        fetch('api/todos${fetchQuery}')
            .then(async res => res.ok
                ? setodos(await res.json())
                : alert(await res.text())
            )
    }, [props.page])

    // コンポーネントが描画するUIがJSX構文で記述して返す
    return(
        <>
        <Head>
            <title>{title}</title>
        </Head>
        <h1>{title}</h1>
        {/* todo一覧の表示 */}
        <ul>
        {todos.map(({id,title,completed})=>
            <li key={id}>
                <span tytle={completed ? {textDecoration:'line-through'}:{}}>
                    {title}
                </span>
                </li>
        )}
        </ul> 
        <div>{pageLinks}</div>   
        </>
    )
bn }