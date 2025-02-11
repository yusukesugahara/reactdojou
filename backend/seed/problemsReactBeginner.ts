import { TypeProblems } from "../type/typeProblems" ;

const problemsReactBeginner: TypeProblems = 
[
  {
    title: 'JSXで正しい書き方はどれですか？',
    difficulty: '初級',
    content: 'JSX内でJavaScript式を埋め込むには波括弧を使用します。下記の選択肢から正しいものを選んでください。',
    sampleCode: `
function Greeting() {
  const name = "Alice";
  return (
    <div>
      Hello, ???
    </div>
  );
}
`,
    answerCode: 2,
    explanation: 'JSXでは文字列の結合や変数を埋め込む場合に { } を使います。',
    options: [
      { number: 1, text: '<div>Hello, name</div>' },
      { number: 2, text: '<div>Hello, {name}</div>' },
      { number: 3, text: '<div>Hello, "name"</div>' },
      { number: 4, text: '<div>Hello, (name)</div>' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'Functional Componentの定義方法',
    difficulty: '初級',
    content: 'Reactで関数コンポーネントを定義する正しい方法はどれですか？',
    sampleCode: `
  // 以下のうち正しい関数コンポーネントの定義はどれですか？
    `,
    answerCode: 2,
    explanation: '関数コンポーネントはfunctionキーワードを使い、括弧付きの引数とreturnでJSXを返します。',
    options: [
      { number: 1, text: 'function MyComponent { return <div>Hello</div>; }' },
      { number: 2, text: 'function MyComponent() { return <div>Hello</div>; }' },
      { number: 3, text: 'const MyComponent = () => { <div>Hello</div>; }' },
      { number: 4, text: 'const MyComponent = new Function("return <div>Hello</div>;");' }
    ],
    tags: ['React', 'Functional Component', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'Reactコンポーネントのインポート方法',
    difficulty: '初級',
    content: 'Reactコンポーネントを使用するために必要なインポート文はどれですか？',
    sampleCode: `
  // どのインポート文が正しいですか？
    `,
    answerCode: 1,
    explanation: 'React 17以降は必須ではありませんが、基本的にはReactをインポートします。',
    options: [
      { number: 1, text: 'import React from "react";' },
      { number: 2, text: 'import { React } from "react";' },
      { number: 3, text: 'require("react");' },
      { number: 4, text: 'import * as ReactDOM from "react";' }
    ],
    tags: ['React', 'インポート', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'ReactDOM.renderの使用方法',
    difficulty: '初級',
    content: 'ReactアプリをDOMに描画するための正しい方法はどれですか？',
    sampleCode: `
  // どのコードが正しい描画方法ですか？
    `,
    answerCode: 3,
    explanation: 'ReactDOM.renderはReact要素を指定したDOMノードに描画します。',
    options: [
      { number: 1, text: 'React.render(<App />, document.getElementById("root"));' },
      { number: 2, text: 'ReactDOM.create(<App />, document.getElementById("root"));' },
      { number: 3, text: 'ReactDOM.render(<App />, document.getElementById("root"));' },
      { number: 4, text: 'render(<App />, document.getElementById("root"));' }
    ],
    tags: ['React', 'ReactDOM', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'propsの基本使用方法',
    difficulty: '初級',
    content: '親コンポーネントから子コンポーネントへデータを渡すために使用される仕組みは何ですか？',
    sampleCode: `
  function Child(props) {
    return <div>{props.message}</div>;
  }
    `,
    answerCode: 1,
    explanation: 'propsは親から子へデータを渡すためのオブジェクトです。',
    options: [
      { number: 1, text: 'props' },
      { number: 2, text: 'state' },
      { number: 3, text: 'context' },
      { number: 4, text: 'ref' }
    ],
    tags: ['React', 'props', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'コンポーネントの再利用性について',
    difficulty: '初級',
    content: 'Reactのコンポーネントはどのような利点がありますか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'コンポーネントは再利用可能なUIパーツとして設計され、複数箇所で利用できます。',
    options: [
      { number: 1, text: 'コードの分割ができない' },
      { number: 2, text: '再利用が困難' },
      { number: 3, text: '再利用可能なUIパーツを作成できる' },
      { number: 4, text: 'パフォーマンスが低下する' }
    ],
    tags: ['React', 'コンポーネント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'イベントハンドリングの設定',
    difficulty: '初級',
    content: 'ボタンがクリックされたときに関数を実行する正しい書き方はどれですか？',
    sampleCode: `
  function App() {
    const handleClick = () => { console.log("Clicked"); };
    return <button ???>Click me</button>;
  }
    `,
    answerCode: 2,
    explanation: 'JSXではイベントハンドラをcamelCaseで指定し、関数を渡します。',
    options: [
      { number: 1, text: 'onclick="handleClick()"' },
      { number: 2, text: 'onClick={handleClick}' },
      { number: 3, text: 'onClick="handleClick()"' },
      { number: 4, text: 'click={handleClick}' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'useStateの基本的な使い方',
    difficulty: '初級',
    content: 'Reactで状態を管理するためのフックはどれですか？',
    sampleCode: `
  import React, { ??? } from 'react';
  function Counter() {
    const [count, setCount] = ???(0);
    return <div>{count}</div>;
  }
    `,
    answerCode: 1,
    explanation: 'useStateフックはReactで状態を管理するために使います。',
    options: [
      { number: 1, text: 'useState, useState' },
      { number: 2, text: 'useEffect, useEffect' },
      { number: 3, text: 'useContext, useContext' },
      { number: 4, text: 'useRef, useRef' }
    ],
    tags: ['React', 'useState', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'useStateで状態を更新する方法',
    difficulty: '初級',
    content: 'useStateフックで管理される状態を更新する正しい方法はどれですか？',
    sampleCode: `
  const [count, setCount] = useState(0);
  // 正しく状態を更新する方法は？
    `,
    answerCode: 3,
    explanation: '状態を更新するには、更新関数に新しい値を渡します。',
    options: [
      { number: 1, text: 'count = count + 1' },
      { number: 2, text: 'useState(count + 1)' },
      { number: 3, text: 'setCount(count + 1)' },
      { number: 4, text: 'updateState(count + 1)' }
    ],
    tags: ['React', 'useState', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'useEffectの基本的な使い方',
    difficulty: '初級',
    content: 'Reactで副作用を扱うためのフックはどれですか？',
    sampleCode: `
  import React, { useEffect } from 'react';
  function App() {
    useEffect(() => {
      console.log("Mounted");
    }, []);
    return <div>Hello</div>;
  }
    `,
    answerCode: 1,
    explanation: 'useEffectフックは副作用を実行するために使われ、第二引数で実行タイミングを制御します。',
    options: [
      { number: 1, text: 'useEffect' },
      { number: 2, text: 'useState' },
      { number: 3, text: 'useContext' },
      { number: 4, text: 'useReducer' }
    ],
    tags: ['React', 'useEffect', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'フラグメントの使用',
    difficulty: '初級',
    content: '複数の子要素をラップするために、不要なDOM要素を追加しない方法はどれですか？',
    sampleCode: `
  function List() {
    return (
      ???
      <Child1 />
      <Child2 />
      ???
    );
  }
    `,
    answerCode: 2,
    explanation: 'React.Fragmentや<>...</>を使って複数の要素をラップできます。',
    options: [
      { number: 1, text: '<div>...</div>' },
      { number: 2, text: '<>...</>' },
      { number: 3, text: '<span>...</span>' },
      { number: 4, text: '<section>...</section>' }
    ],
    tags: ['React', 'Fragment', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '条件付きレンダリングの基本',
    difficulty: '初級',
    content: 'JSX内で条件に応じて要素を表示する正しい方法はどれですか？',
    sampleCode: `
  function App({ isLoggedIn }) {
    return (
      <div>
        { isLoggedIn ? ??? : <p>ログインしてください</p> }
      </div>
    );
  }
    `,
    answerCode: 1,
    explanation: '三項演算子を使って条件付きレンダリングが可能です。',
    options: [
      { number: 1, text: '<p>ようこそ</p>' },
      { number: 2, text: '"ようこそ"' },
      { number: 3, text: '<p>{ "ようこそ" }</p>' },
      { number: 4, text: 'p("ようこそ")' }
    ],
    tags: ['React', '条件付きレンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'リストレンダリングとkey属性',
    difficulty: '初級',
    content: 'リストをレンダリングする際に、各要素にkey属性を付与する理由は何ですか？',
    sampleCode: `
  const items = [1,2,3];
  const list = items.map(item => <li key={???}>{item}</li>);
    `,
    answerCode: 2,
    explanation: 'key属性は各要素の一意性を保証し、再レンダリング時の最適化に役立ちます。',
    options: [
      { number: 1, text: 'スタイル指定のため' },
      { number: 2, text: '要素の一意性を保証するため' },
      { number: 3, text: 'イベントバインディングのため' },
      { number: 4, text: 'デバッグ用のIDとして' }
    ],
    tags: ['React', 'リストレンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSX内のコメントの書き方',
    difficulty: '初級',
    content: 'JSX内でコメントを書く正しい方法はどれですか？',
    sampleCode: `
  function App() {
    return (
      <div>
        ???
        <p>Hello</p>
      </div>
    );
  }
    `,
    answerCode: 3,
    explanation: 'JSX内では{/* コメント */}を使ってコメントを書く必要があります。',
    options: [
      { number: 1, text: '<!-- コメント -->' },
      { number: 2, text: '// コメント' },
      { number: 3, text: '{/* コメント */}' },
      { number: 4, text: '/* コメント */' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'propsとstateの違い',
    difficulty: '初級',
    content: 'Reactにおけるpropsとstateの違いは何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'propsは親から渡される読み取り専用のデータ、stateはコンポーネント内で管理される変更可能なデータです。',
    options: [
      { number: 1, text: 'どちらも変更可能なデータ' },
      { number: 2, text: 'propsは読み取り専用、stateは変更可能' },
      { number: 3, text: 'propsは関数、stateはオブジェクト' },
      { number: 4, text: 'propsは外部API、stateは内部API' }
    ],
    tags: ['React', 'props', 'state', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'preventDefaultの使い方',
    difficulty: '初級',
    content: 'フォーム送信時にページリロードを防ぐためのメソッドはどれですか？',
    sampleCode: `
  function handleSubmit(e) {
    ???
    // フォーム送信処理
  }
    `,
    answerCode: 1,
    explanation: 'e.preventDefault()を呼び出すことでデフォルトのフォーム送信動作を防げます。',
    options: [
      { number: 1, text: 'e.preventDefault()' },
      { number: 2, text: 'e.stopPropagation()' },
      { number: 3, text: 'return false' },
      { number: 4, text: 'e.cancel()' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'input要素のonChangeイベント',
    difficulty: '初級',
    content: 'テキスト入力の変更を検知するために使用するイベントはどれですか？',
    sampleCode: `
  <input type="text" ??? />
    `,
    answerCode: 2,
    explanation: 'onChangeイベントを使用して入力値の変更を検知します。',
    options: [
      { number: 1, text: 'onInput' },
      { number: 2, text: 'onChange' },
      { number: 3, text: 'onKeyPress' },
      { number: 4, text: 'onSubmit' }
    ],
    tags: ['React', 'フォーム', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでのclassNameの使用',
    difficulty: '初級',
    content: 'JSXでHTMLのclass属性を指定する場合、どの属性名を使用すべきですか？',
    sampleCode: `
  <div ???="container"></div>
    `,
    answerCode: 3,
    explanation: 'JSXではclassは予約語であるため、classNameを使用します。',
    options: [
      { number: 1, text: 'class' },
      { number: 2, text: 'classname' },
      { number: 3, text: 'className' },
      { number: 4, text: 'cls' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '単一の親要素でのラップ',
    difficulty: '初級',
    content: 'JSXで複数の要素を返す場合、なぜ単一の親要素でラップする必要があるのですか？',
    sampleCode: `
  function App() {
    return (
      ??? 
      <h1>Title</h1>
      <p>Paragraph</p>
      ???
    );
  }
    `,
    answerCode: 4,
    explanation: 'JSXは単一の親要素を返す必要があり、Fragmentなどを使用してラップできます。',
    options: [
      { number: 1, text: '理由は特になし' },
      { number: 2, text: 'ブラウザの制約' },
      { number: 3, text: 'HTMLの仕様' },
      { number: 4, text: 'JSXの構文ルールによる' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'コンポーネントの命名規則',
    difficulty: '初級',
    content: 'Reactコンポーネントの名前はどのように命名するのが一般的ですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'Reactコンポーネントは大文字で始まる名前が推奨されます。',
    options: [
      { number: 1, text: '大文字で始める' },
      { number: 2, text: '小文字で始める' },
      { number: 3, text: '数字で始める' },
      { number: 4, text: '記号で始める' }
    ],
    tags: ['React', '命名規則', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'propsを利用したデータの受け渡し',
    difficulty: '初級',
    content: '親コンポーネントから子コンポーネントへデータを渡す方法はどれですか？',
    sampleCode: `
  function Parent() {
    return <Child ???="Hello" />;
  }
  function Child(props) {
    return <div>{props.message}</div>;
  }
    `,
    answerCode: 2,
    explanation: '親コンポーネントは子コンポーネントにpropsを介してデータを渡します。',
    options: [
      { number: 1, text: 'state' },
      { number: 2, text: 'props' },
      { number: 3, text: 'context' },
      { number: 4, text: 'ref' }
    ],
    tags: ['React', 'props', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '状態変更と再レンダリング',
    difficulty: '初級',
    content: 'Reactコンポーネントでstateが更新されると再レンダリングが行われる理由は何ですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'stateの変更によりUIが最新の状態に更新されるため、再レンダリングが行われます。',
    options: [
      { number: 1, text: 'パフォーマンス向上のため' },
      { number: 2, text: '開発者の指示がないと再レンダリングされない' },
      { number: 3, text: '状態の変更を反映するため' },
      { number: 4, text: 'エラー防止のため' }
    ],
    tags: ['React', 'state', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'Stateless Functional Componentの特徴',
    difficulty: '初級',
    content: '状態を持たないReactコンポーネントは何と呼ばれますか？',
    sampleCode: '',
    answerCode: 4,
    explanation: '状態を持たず、受け取ったpropsのみで描画するコンポーネントはStateless Functional Componentと呼ばれます。',
    options: [
      { number: 1, text: 'クラスコンポーネント' },
      { number: 2, text: '状態コンポーネント' },
      { number: 3, text: 'ホットコンポーネント' },
      { number: 4, text: 'ステートレスコンポーネント' }
    ],
    tags: ['React', 'Functional Component', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '動的リスト生成の方法',
    difficulty: '初級',
    content: '配列のデータから動的にリストを生成する際に使用するメソッドはどれですか？',
    sampleCode: `
  const items = [1, 2, 3];
  const list = items.???(item => <li key={item}>{item}</li>);
    `,
    answerCode: 2,
    explanation: 'mapメソッドを使って配列の各要素からリストを生成します。',
    options: [
      { number: 1, text: 'forEach' },
      { number: 2, text: 'map' },
      { number: 3, text: 'filter' },
      { number: 4, text: 'reduce' }
    ],
    tags: ['React', 'リスト', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'onSubmitイベントの利用',
    difficulty: '初級',
    content: 'フォーム送信時に呼び出されるイベントハンドラはどれですか？',
    sampleCode: `
  <form ???={handleSubmit}>
    <input type="text" />
  </form>
    `,
    answerCode: 4,
    explanation: 'フォームの送信はonSubmitイベントでハンドリングします。',
    options: [
      { number: 1, text: 'onClick' },
      { number: 2, text: 'onChange' },
      { number: 3, text: 'onKeyPress' },
      { number: 4, text: 'onSubmit' }
    ],
    tags: ['React', 'フォーム', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '制御コンポーネントとは',
    difficulty: '初級',
    content: 'フォームの入力値をReactで状態管理するコンポーネントは何と呼ばれますか？',
    sampleCode: `
  function Form() {
    const [value, setValue] = useState("");
    return <input type="text" value={value} onChange={e => setValue(e.target.value)} />;
  }
    `,
    answerCode: 1,
    explanation: '入力値をstateで管理するコンポーネントは「制御コンポーネント」と呼ばれます。',
    options: [
      { number: 1, text: '制御コンポーネント' },
      { number: 2, text: '非制御コンポーネント' },
      { number: 3, text: '状態コンポーネント' },
      { number: 4, text: '無状態コンポーネント' }
    ],
    tags: ['React', 'フォーム', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '論理演算子による条件レンダリング',
    difficulty: '初級',
    content: 'JSX内で論理AND (&&) を使った条件付きレンダリングの正しい書き方はどれですか？',
    sampleCode: `
  { isVisible && <p>表示されます</p> }
    `,
    answerCode: 1,
    explanation: '&&演算子は条件がtrueの場合のみ後続の要素をレンダリングします。',
    options: [
      { number: 1, text: '{ isVisible && <p>表示されます</p> }' },
      { number: 2, text: '{ isVisible || <p>表示されます</p> }' },
      { number: 3, text: '{ isVisible ? null : <p>表示されます</p> }' },
      { number: 4, text: '{ isVisible ? <p>表示されます</p> }' }
    ],
    tags: ['React', '条件付きレンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'アロー関数によるイベントハンドラの利点',
    difficulty: '初級',
    content: 'onClickイベント内でアロー関数を使用するメリットは何ですか？',
    sampleCode: `
  <button onClick={() => console.log("Clicked")}>
    Click
  </button>
    `,
    answerCode: 1,
    explanation: 'アロー関数はthisのバインディングを必要とせず、シンプルに記述できるため好まれます。',
    options: [
      { number: 1, text: 'シンプルで記述が容易なため' },
      { number: 2, text: 'パフォーマンスが向上するため' },
      { number: 3, text: '自動でイベントがバインドされるため' },
      { number: 4, text: '再レンダリングが防止されるため' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '条件付きクラスの設定',
    difficulty: '初級',
    content: 'JSXで条件に応じてクラス名を変更する一般的な方法はどれですか？',
    sampleCode: `
  <div className={ isActive ? "active" : "inactive" }>Content</div>
    `,
    answerCode: 1,
    explanation: '三項演算子を使って条件に応じたクラス名を設定できます。',
    options: [
      { number: 1, text: 'className={ isActive ? "active" : "inactive" }' },
      { number: 2, text: 'class={ isActive ? "active" : "inactive" }' },
      { number: 3, text: 'className="isActive ? active : inactive"' },
      { number: 4, text: 'class={isActive && "active"}' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'Fragmentの短縮記法',
    difficulty: '初級',
    content: 'React.Fragmentの短縮記法はどれですか？',
    sampleCode: `
  function List() {
    return (
      ??? 
      <li>Item1</li>
      <li>Item2</li>
      ???
    );
  }
    `,
    answerCode: 2,
    explanation: '<>と</>で囲むことでFragmentの短縮記法が使えます。',
    options: [
      { number: 1, text: '<Fragment>...</Fragment>' },
      { number: 2, text: '<>...</>' },
      { number: 3, text: '<frag>...</frag>' },
      { number: 4, text: '<React.Fragment>...</React.Fragment>' }
    ],
    tags: ['React', 'Fragment', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'Functional ComponentとClass Componentの違い',
    difficulty: '初級',
    content: 'Reactコンポーネントを関数として定義する場合とクラスとして定義する場合の主な違いは何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: '関数コンポーネントはシンプルでhooksが使え、クラスコンポーネントはライフサイクルメソッドを持ちます。',
    options: [
      { number: 1, text: '機能は全く同じである' },
      { number: 2, text: '定義方法とライフサイクルの管理が異なる' },
      { number: 3, text: '関数コンポーネントは状態を持たない' },
      { number: 4, text: 'クラスコンポーネントは再利用できない' }
    ],
    tags: ['React', 'コンポーネント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'import/exportの基本',
    difficulty: '初級',
    content: 'Reactコンポーネントを他のファイルで使用するために必要な構文はどれですか？',
    sampleCode: `
  // MyComponent.js
  export default MyComponent;
  
  // App.js
  import MyComponent from './MyComponent';
    `,
    answerCode: 1,
    explanation: 'ES6のexport/import構文を使ってコンポーネントを共有します。',
    options: [
      { number: 1, text: 'export default / import' },
      { number: 2, text: 'module.exports / require' },
      { number: 3, text: 'export / include' },
      { number: 4, text: 'define / use' }
    ],
    tags: ['React', 'モジュール', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'React Developer Toolsの利用',
    difficulty: '初級',
    content: 'React Developer Toolsを使用する目的は何ですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'React Developer Toolsはコンポーネントツリーやstate、propsを確認するために使用します。',
    options: [
      { number: 1, text: 'コードの最適化' },
      { number: 2, text: '新しいコンポーネントの作成' },
      { number: 3, text: 'デバッグと状態の確認' },
      { number: 4, text: 'CSSの編集' }
    ],
    tags: ['React', '開発ツール', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'onClickイベントの基本',
    difficulty: '初級',
    content: 'ボタンがクリックされた際に実行されるイベントハンドラの正しい記述はどれですか？',
    sampleCode: `
  <button ???={handleClick}>Click</button>
    `,
    answerCode: 2,
    explanation: 'JSXではonClickプロパティに関数を渡してイベントハンドリングを行います。',
    options: [
      { number: 1, text: 'click={handleClick}' },
      { number: 2, text: 'onClick={handleClick}' },
      { number: 3, text: 'onclick="handleClick()"' },
      { number: 4, text: 'on-click={handleClick}' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '条件付きレンダリング（&&演算子）',
    difficulty: '初級',
    content: 'JSXで&&演算子を使った条件付きレンダリングの例として正しいものはどれですか？',
    sampleCode: `
  { isLoggedIn && <p>Welcome</p> }
    `,
    answerCode: 1,
    explanation: '&&演算子を使うと、条件がtrueの場合にのみ後続の要素がレンダリングされます。',
    options: [
      { number: 1, text: '{ isLoggedIn && <p>Welcome</p> }' },
      { number: 2, text: '{ isLoggedIn || <p>Welcome</p> }' },
      { number: 3, text: '{ isLoggedIn ? <p>Welcome</p> }' },
      { number: 4, text: '{ isLoggedIn, <p>Welcome</p> }' }
    ],
    tags: ['React', '条件付きレンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの複数行テキスト表示',
    difficulty: '初級',
    content: 'JSXで複数行のテキストを表示する正しい方法はどれですか？',
    sampleCode: `
  function Text() {
    return (
      <p>
        Line1
        Line2
      </p>
    );
  }
    `,
    answerCode: 1,
    explanation: '複数行のテキストは1つの要素内で改行して記述できます。',
    options: [
      { number: 1, text: '改行を含む1つの要素内で記述する' },
      { number: 2, text: '各行ごとに<p>タグで囲む' },
      { number: 3, text: '配列で返す' },
      { number: 4, text: 'フラグメントで囲む' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '子から親へのイベント伝達',
    difficulty: '初級',
    content: '子コンポーネントから親コンポーネントにイベントを伝達する方法として正しいものはどれですか？',
    sampleCode: `
  function Parent() {
    const handleChildEvent = () => { console.log("Event from child"); };
    return <Child onEvent={handleChildEvent} />;
  }
  function Child({ onEvent }) {
    return <button onClick={onEvent}>Click</button>;
  }
    `,
    answerCode: 1,
    explanation: '親コンポーネントはコールバック関数を子に渡し、子で呼び出すことでイベントを伝達します。',
    options: [
      { number: 1, text: 'コールバック関数を渡す' },
      { number: 2, text: 'stateで共有する' },
      { number: 3, text: 'contextを使う' },
      { number: 4, text: 'refを使用する' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '文字列リテラルとJSX内の式',
    difficulty: '初級',
    content: 'JSX内で文字列リテラルとJavaScript式を区別する方法は何ですか？',
    sampleCode: `
  <div>
    "Hello" vs { "Hello" }
  </div>
    `,
    answerCode: 2,
    explanation: '文字列はダブルクォートで囲むが、式は波括弧で囲みます。',
    options: [
      { number: 1, text: 'どちらも同じ書き方' },
      { number: 2, text: '文字列は""、式は{}で囲む' },
      { number: 3, text: '文字列は{}、式は""で囲む' },
      { number: 4, text: '違いはない' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'クラスコンポーネントのライフサイクル',
    difficulty: '初級',
    content: 'クラスコンポーネントで初回レンダリング後に呼ばれるライフサイクルメソッドはどれですか？',
    sampleCode: `
  class MyComponent extends React.Component {
    componentDidMount() {
      // 初回レンダリング後
    }
    render() {
      return <div>Hello</div>;
    }
  }
    `,
    answerCode: 1,
    explanation: 'componentDidMountはコンポーネントがマウントされた直後に呼ばれます。',
    options: [
      { number: 1, text: 'componentDidMount' },
      { number: 2, text: 'componentWillMount' },
      { number: 3, text: 'componentDidUpdate' },
      { number: 4, text: 'render' }
    ],
    tags: ['React', 'ライフサイクル', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '論理AND演算子を使った条件レンダリング',
    difficulty: '初級',
    content: 'JSX内で論理AND (&&) 演算子を使用して要素を表示する場合、正しい記述はどれですか？',
    sampleCode: `
  { isLoggedIn && <p>Welcome</p> }
    `,
    answerCode: 1,
    explanation: '&&演算子は条件がtrueの場合にのみ後続の要素をレンダリングします。',
    options: [
      { number: 1, text: '{ isLoggedIn && <p>Welcome</p> }' },
      { number: 2, text: '{ isLoggedIn || <p>Welcome</p> }' },
      { number: 3, text: '{ isLoggedIn ? <p>Welcome</p> }' },
      { number: 4, text: '{ isLoggedIn, <p>Welcome</p> }' }
    ],
    tags: ['React', '条件付きレンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの複数行テキスト表示再確認',
    difficulty: '初級',
    content: 'JSXで複数行のテキストを表示するための正しい方法はどれですか？',
    sampleCode: `
  function Message() {
    return (
      <p>
        Line1<br/>
        Line2
      </p>
    );
  }
    `,
    answerCode: 1,
    explanation: '改行タグやCSSを使って複数行のテキストを表現します。',
    options: [
      { number: 1, text: '改行タグを使用する' },
      { number: 2, text: 'テキストは1行で表示される' },
      { number: 3, text: '配列で返す' },
      { number: 4, text: 'Fragmentで囲む' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '子から親へのイベント伝達再確認',
    difficulty: '初級',
    content: '子コンポーネントから親コンポーネントへイベントを伝達する正しい方法はどれですか？',
    sampleCode: `
  function Parent() {
    const handleChildEvent = () => { console.log("Event from child"); };
    return <Child onEvent={handleChildEvent} />;
  }
  function Child({ onEvent }) {
    return <button onClick={onEvent}>Click</button>;
  }
    `,
    answerCode: 1,
    explanation: '親はコールバック関数を子に渡し、子で呼び出すことでイベントを伝達します。',
    options: [
      { number: 1, text: 'コールバック関数を渡す' },
      { number: 2, text: 'stateで共有する' },
      { number: 3, text: 'contextを使う' },
      { number: 4, text: 'refを使用する' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '文字列リテラルとJSX内の式再確認',
    difficulty: '初級',
    content: 'JSX内で文字列と変数を結合して表示する正しい方法はどれですか？',
    sampleCode: `
  function App() {
    const name = "Bob";
    return <div>{"Hello, " + ???}</div>;
  }
    `,
    answerCode: 1,
    explanation: '文字列と変数の結合は+演算子で行います。',
    options: [
      { number: 1, text: 'name' },
      { number: 2, text: '{name}' },
      { number: 3, text: '"name"' },
      { number: 4, text: 'greet(name)' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'イベントハンドラの引数渡し',
    difficulty: '初級',
    content: 'onClickイベントで関数に引数を渡す正しい方法はどれですか？',
    sampleCode: `
  function handleClick(id) {
    console.log(id);
  }
  <button onClick={() => handleClick(5)}>Click</button>
    `,
    answerCode: 1,
    explanation: 'アロー関数を使用して引数を渡すのが一般的な方法です。',
    options: [
      { number: 1, text: 'onClick={() => handleClick(5)}' },
      { number: 2, text: 'onClick={handleClick(5)}' },
      { number: 3, text: 'onClick={handleClick}' },
      { number: 4, text: 'onClick={handleClick.bind(this, 5)}' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでのラッパー要素の必要性',
    difficulty: '初級',
    content: 'JSXで複数の要素を返す場合、なぜラッパー要素で囲む必要があるのでしょうか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'JSXは1つのルート要素を返す必要があるため、ラッパーで囲む必要があります。',
    options: [
      { number: 1, text: 'ブラウザの制約による' },
      { number: 2, text: 'JSXの構文ルールにより単一要素が必要' },
      { number: 3, text: 'パフォーマンスのため' },
      { number: 4, text: '可読性向上のため' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'フォーム入力の制御',
    difficulty: '初級',
    content: 'Reactでフォームの入力値を制御する方法はどれですか？',
    sampleCode: `
  function Form() {
    const [value, setValue] = useState("");
    return <input type="text" value={value} onChange={e => setValue(e.target.value)} />;
  }
    `,
    answerCode: 1,
    explanation: '制御コンポーネントでは、入力値をstateで管理し、onChangeで更新します。',
    options: [
      { number: 1, text: '制御コンポーネントとして実装する' },
      { number: 2, text: '非制御コンポーネントとして実装する' },
      { number: 3, text: 'stateを使用しない' },
      { number: 4, text: 'onSubmitのみで制御する' }
    ],
    tags: ['React', 'フォーム', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'onChangeイベントの基本',
    difficulty: '初級',
    content: '入力値の変更を検知するために、Reactで使用されるイベントはどれですか？',
    sampleCode: `
  <input type="text" onChange={handleChange} />
    `,
    answerCode: 1,
    explanation: 'onChangeイベントが入力値の変更を検知するために使用されます。',
    options: [
      { number: 1, text: 'onChange' },
      { number: 2, text: 'onInput' },
      { number: 3, text: 'onKeyDown' },
      { number: 4, text: 'onSubmit' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの複数行文字列の表示',
    difficulty: '初級',
    content: 'JSX内で複数行のテキストを表示するために必要な方法はどれですか？',
    sampleCode: `
  function Message() {
    return (
      <p>
        Line1<br/>
        Line2
      </p>
    );
  }
    `,
    answerCode: 1,
    explanation: '改行タグやCSSを使って複数行のテキストを表現します。',
    options: [
      { number: 1, text: '改行タグを使用する' },
      { number: 2, text: 'テキストは1行で表示される' },
      { number: 3, text: '配列で返す' },
      { number: 4, text: 'Fragmentで囲む' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'シンプルなボタンコンポーネントの作成',
    difficulty: '初級',
    content: '関数コンポーネントとしてシンプルなボタンを作成する正しい方法はどれですか？',
    sampleCode: `
  function Button({ onClick, label }) {
    return <button onClick={onClick}>{label}</button>;
  }
    `,
    answerCode: 1,
    explanation: '関数コンポーネントはpropsを受け取り、JSXを返すシンプルな構造です。',
    options: [
      { number: 1, text: '関数コンポーネントとして定義する' },
      { number: 2, text: 'クラスコンポーネントとして定義する' },
      { number: 3, text: 'HTMLの<button>タグのみ使用する' },
      { number: 4, text: 'divタグでラップする' }
    ],
    tags: ['React', 'コンポーネント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'defaultPropsの設定方法',
    difficulty: '初級',
    content: 'Reactでコンポーネントのpropsにデフォルト値を設定する正しい方法はどれですか？',
    sampleCode: `
  function Greeting({ message }) {
    return <p>{message}</p>;
  }
  Greeting.defaultProps = {
    message: "Hello"
  };
    `,
    answerCode: 1,
    explanation: 'defaultPropsを利用してpropsのデフォルト値を設定できます。',
    options: [
      { number: 1, text: 'ComponentName.defaultProps = { ... }' },
      { number: 2, text: 'ComponentName.props = { ... }' },
      { number: 3, text: 'defaultProps = { ... }' },
      { number: 4, text: 'props.default = { ... }' }
    ],
    tags: ['React', 'props', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの属性値の設定',
    difficulty: '初級',
    content: 'JSXで文字列とJavaScript式の属性値を設定する際の違いは何ですか？',
    sampleCode: `
  <div id="main" data-value={123}></div>
    `,
    answerCode: 4,
    explanation: '文字列はダブルクォート、JavaScript式は波括弧で囲みます。',
    options: [
      { number: 1, text: 'どちらも波括弧で囲む' },
      { number: 2, text: 'どちらもダブルクォートで囲む' },
      { number: 3, text: '文字列は波括弧、式はダブルクォート' },
      { number: 4, text: '文字列はダブルクォート、式は波括弧' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'Functional vs Class Componentの違い',
    difficulty: '初級',
    content: 'Reactコンポーネントを関数として定義する場合とクラスとして定義する場合の主な違いは何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: '関数コンポーネントはシンプルでhooksが使え、クラスコンポーネントはライフサイクルメソッドを持ちます。',
    options: [
      { number: 1, text: '機能は全く同じである' },
      { number: 2, text: '定義方法とライフサイクルの管理が異なる' },
      { number: 3, text: '関数コンポーネントは状態を持たない' },
      { number: 4, text: 'クラスコンポーネントは再利用できない' }
    ],
    tags: ['React', 'コンポーネント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'import/exportの基本',
    difficulty: '初級',
    content: 'Reactコンポーネントを他のファイルで使用するために必要な構文はどれですか？',
    sampleCode: `
  // MyComponent.js
  export default MyComponent;
  
  // App.js
  import MyComponent from './MyComponent';
    `,
    answerCode: 1,
    explanation: 'ES6のexport/import構文を使ってコンポーネントを共有します。',
    options: [
      { number: 1, text: 'export default / import' },
      { number: 2, text: 'module.exports / require' },
      { number: 3, text: 'export / include' },
      { number: 4, text: 'define / use' }
    ],
    tags: ['React', 'モジュール', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'React Developer Toolsの利用',
    difficulty: '初級',
    content: 'React Developer Toolsを使用する目的は何ですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'React Developer Toolsはコンポーネントツリーやstate、propsを確認するために使用します。',
    options: [
      { number: 1, text: 'コードの最適化' },
      { number: 2, text: '新しいコンポーネントの作成' },
      { number: 3, text: 'デバッグと状態の確認' },
      { number: 4, text: 'CSSの編集' }
    ],
    tags: ['React', '開発ツール', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'onClickイベントの基本',
    difficulty: '初級',
    content: 'ボタンがクリックされた際に実行されるイベントハンドラの正しい記述はどれですか？',
    sampleCode: `
  <button ???={handleClick}>Click</button>
    `,
    answerCode: 2,
    explanation: 'JSXではonClickプロパティに関数を渡してイベントハンドリングを行います。',
    options: [
      { number: 1, text: 'click={handleClick}' },
      { number: 2, text: 'onClick={handleClick}' },
      { number: 3, text: 'onclick="handleClick()"' },
      { number: 4, text: 'onClick="handleClick()"' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '条件付きレンダリング（&&演算子）再確認',
    difficulty: '初級',
    content: 'JSXで&&演算子を使った条件付きレンダリングの例として正しいものはどれですか？',
    sampleCode: `
  { isLoggedIn && <p>Welcome</p> }
    `,
    answerCode: 1,
    explanation: '&&演算子を使うと、条件がtrueの場合にのみ後続の要素がレンダリングされます。',
    options: [
      { number: 1, text: '{ isLoggedIn && <p>Welcome</p> }' },
      { number: 2, text: '{ isLoggedIn || <p>Welcome</p> }' },
      { number: 3, text: '{ isLoggedIn ? <p>Welcome</p> }' },
      { number: 4, text: '{ isLoggedIn, <p>Welcome</p> }' }
    ],
    tags: ['React', '条件付きレンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの複数行テキスト表示再確認',
    difficulty: '初級',
    content: 'JSXで複数行のテキストを表示するための正しい方法はどれですか？',
    sampleCode: `
  function Message() {
    return (
      <p>
        Line1<br/>
        Line2
      </p>
    );
  }
    `,
    answerCode: 1,
    explanation: '改行タグやCSSを使って複数行のテキストを表現します。',
    options: [
      { number: 1, text: '改行タグを使用する' },
      { number: 2, text: 'テキストは1行で表示される' },
      { number: 3, text: '配列で返す' },
      { number: 4, text: 'Fragmentで囲む' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '子から親へのイベント伝達再確認',
    difficulty: '初級',
    content: '子コンポーネントから親コンポーネントにイベントを伝達する正しい方法はどれですか？',
    sampleCode: `
  function Parent() {
    const handleChildEvent = () => { console.log("Event from child"); };
    return <Child onEvent={handleChildEvent} />;
  }
  function Child({ onEvent }) {
    return <button onClick={onEvent}>Click</button>;
  }
    `,
    answerCode: 1,
    explanation: '親はコールバック関数を子に渡し、子で呼び出すことでイベントを伝達します。',
    options: [
      { number: 1, text: 'コールバック関数を渡す' },
      { number: 2, text: 'stateで共有する' },
      { number: 3, text: 'contextを使う' },
      { number: 4, text: 'refを使用する' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '文字列リテラルとJSX内の式',
    difficulty: '初級',
    content: 'JSX内で文字列リテラルとJavaScript式を区別する方法は何ですか？',
    sampleCode: `
  <div>
    "Hello" vs { "Hello" }
  </div>
    `,
    answerCode: 2,
    explanation: '文字列はダブルクォートで囲むが、式は波括弧で囲みます。',
    options: [
      { number: 1, text: 'どちらも同じ書き方' },
      { number: 2, text: '文字列は""、式は{}で囲む' },
      { number: 3, text: '文字列は{}、式は""で囲む' },
      { number: 4, text: '違いはない' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'クラスコンポーネントのライフサイクル再確認',
    difficulty: '初級',
    content: 'クラスコンポーネントで初回レンダリング後に呼ばれるライフサイクルメソッドはどれですか？',
    sampleCode: `
  class MyComponent extends React.Component {
    componentDidMount() {
      // 初回レンダリング後
    }
    render() {
      return <div>Hello</div>;
    }
  }
    `,
    answerCode: 1,
    explanation: 'componentDidMountはコンポーネントがマウントされた直後に呼ばれます。',
    options: [
      { number: 1, text: 'componentDidMount' },
      { number: 2, text: 'componentWillMount' },
      { number: 3, text: 'componentDidUpdate' },
      { number: 4, text: 'render' }
    ],
    tags: ['React', 'ライフサイクル', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '論理AND演算子を使った条件レンダリング再確認',
    difficulty: '初級',
    content: 'JSX内で論理AND (&&) 演算子を使用して要素を表示する場合、正しい記述はどれですか？',
    sampleCode: `
  { isLoggedIn && <p>Welcome</p> }
    `,
    answerCode: 1,
    explanation: '&&演算子は条件がtrueの場合にのみ後続の要素がレンダリングされます。',
    options: [
      { number: 1, text: '{ isLoggedIn && <p>Welcome</p> }' },
      { number: 2, text: '{ isLoggedIn || <p>Welcome</p> }' },
      { number: 3, text: '{ isLoggedIn ? <p>Welcome</p> }' },
      { number: 4, text: '{ isLoggedIn, <p>Welcome</p> }' }
    ],
    tags: ['React', '条件付きレンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの要素のネスト',
    difficulty: '初級',
    content: 'JSXで複数の要素を正しくネストするためのルールは何ですか？',
    sampleCode: `
  function App() {
    return (
      <div>
        <h1>Title</h1>
        <p>Paragraph</p>
      </div>
    );
  }
    `,
    answerCode: 1,
    explanation: 'JSXでは複数の要素は単一の親要素でラップする必要があります。',
    options: [
      { number: 1, text: '単一の親要素でラップする' },
      { number: 2, text: '複数の親要素で囲む' },
      { number: 3, text: '直接返す' },
      { number: 4, text: 'ネストは不要' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの要素の正しい閉じ方',
    difficulty: '初級',
    content: 'JSXで必ず閉じる必要がある要素はどれですか？',
    sampleCode: `
  // 以下の中で自己閉じタグとして正しいものは？
    `,
    answerCode: 3,
    explanation: '自己閉じタグは開始タグの末尾に/を付けて記述します。',
    options: [
      { number: 1, text: '<div>' },
      { number: 2, text: '<span>' },
      { number: 3, text: '<img />' },
      { number: 4, text: '<p>' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '再レンダリングのトリガー',
    difficulty: '初級',
    content: 'Reactコンポーネントが再レンダリングされる主な原因は何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'propsやstateの変更により再レンダリングが発生します。',
    options: [
      { number: 1, text: 'コンポーネントの初期化' },
      { number: 2, text: 'propsまたはstateの変更' },
      { number: 3, text: 'コンポーネントの分割' },
      { number: 4, text: 'レンダリング関数の呼び出しがない' }
    ],
    tags: ['React', '再レンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'stateの変更時の挙動',
    difficulty: '初級',
    content: 'useStateで管理されるstateが更新されると、コンポーネントはどのように動作しますか？',
    sampleCode: `
  const [value, setValue] = useState(0);
  setValue(value + 1);
    `,
    answerCode: 3,
    explanation: 'stateの更新後、コンポーネントは再レンダリングされ、新しいstateが反映されます。',
    options: [
      { number: 1, text: '更新前のまま維持される' },
      { number: 2, text: 'エラーが発生する' },
      { number: 3, text: '再レンダリングされる' },
      { number: 4, text: '初期状態に戻る' }
    ],
    tags: ['React', 'state', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの複数属性の指定方法',
    difficulty: '初級',
    content: 'JSXでHTML要素に複数の属性を指定する際の正しい書き方はどれですか？',
    sampleCode: `
  <input type="text" placeholder="Enter text" />
    `,
    answerCode: 1,
    explanation: 'JSXではHTML属性をカンマ区切りではなく、スペースで区切って指定します。',
    options: [
      { number: 1, text: 'スペースで区切る' },
      { number: 2, text: 'カンマで区切る' },
      { number: 3, text: 'セミコロンで区切る' },
      { number: 4, text: '改行で区切る' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'コンポーネント名の大文字ルール',
    difficulty: '初級',
    content: 'なぜReactコンポーネントの名前は大文字で始める必要があるのでしょうか？',
    sampleCode: '',
    answerCode: 4,
    explanation: '大文字で始まることで、JSXがそれをコンポーネントとして認識します。',
    options: [
      { number: 1, text: '慣習だから' },
      { number: 2, text: 'パフォーマンス向上のため' },
      { number: 3, text: '自動補完のため' },
      { number: 4, text: 'JSXがコンポーネントと認識するため' }
    ],
    tags: ['React', '命名規則', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '子コンポーネントへのプロパティ渡し',
    difficulty: '初級',
    content: '親コンポーネントから子コンポーネントへ値を渡す際、どのプロパティ名を使うのが一般的ですか？',
    sampleCode: `
  <Child message="Hello" />
    `,
    answerCode: 2,
    explanation: 'propsを使って親から子へデータを渡します。',
    options: [
      { number: 1, text: 'state' },
      { number: 2, text: 'props' },
      { number: 3, text: 'context' },
      { number: 4, text: 'ref' }
    ],
    tags: ['React', 'props', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'イベントハンドラのバインディング不要',
    difficulty: '初級',
    content: '関数コンポーネントではなぜイベントハンドラのthisバインディングが不要なのですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: '関数コンポーネントはthisを持たず、関数内の変数として定義されるためバインディングが不要です。',
    options: [
      { number: 1, text: '関数コンポーネントはthisを持たないから' },
      { number: 2, text: '自動でバインドされるから' },
      { number: 3, text: 'バインディングが必要な状況がないから' },
      { number: 4, text: 'イベントが発生しないから' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'コンポーネント内の変数定義のスコープ',
    difficulty: '初級',
    content: '関数コンポーネント内で定義された変数はどこで利用可能ですか？',
    sampleCode: `
  function App() {
    const greeting = "Hello";
    return <p>{greeting}</p>;
  }
    `,
    answerCode: 1,
    explanation: '変数はその関数内でのみ有効です。',
    options: [
      { number: 1, text: 'コンポーネント内でのみ利用可能' },
      { number: 2, text: '全体で利用可能' },
      { number: 3, text: '他のコンポーネントでも利用可能' },
      { number: 4, text: 'グローバル変数になる' }
    ],
    tags: ['React', 'JavaScript', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSX内での配列出力',
    difficulty: '初級',
    content: '配列をJSX内で直接出力する場合、どのような結果になりますか？',
    sampleCode: `
  const items = ["A", "B", "C"];
  function List() {
    return <div>{items}</div>;
  }
    `,
    answerCode: 3,
    explanation: '配列内の各要素が連結されて出力されます。',
    options: [
      { number: 1, text: 'エラーになる' },
      { number: 2, text: '空白で区切られる' },
      { number: 3, text: '連結されて表示される' },
      { number: 4, text: '配列として表示される' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでのif文の利用',
    difficulty: '初級',
    content: 'JSX内で直接if文を使用できない理由は何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'JSXは式を評価するため、if文のような文は使用できません。',
    options: [
      { number: 1, text: '構文エラーになるから' },
      { number: 2, text: 'JSXは式しか評価しないため' },
      { number: 3, text: 'if文は非同期処理だから' },
      { number: 4, text: '特に理由はない' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'useStateの初期値設定',
    difficulty: '初級',
    content: 'useStateフックで状態の初期値を設定する方法はどれですか？',
    sampleCode: `
  const [value, setValue] = useState(???);
    `,
    answerCode: 1,
    explanation: 'useStateの引数に初期値を渡すことで状態を初期化します。',
    options: [
      { number: 1, text: '初期値を引数に渡す' },
      { number: 2, text: 'setValueで初期化する' },
      { number: 3, text: '初期値は自動で0になる' },
      { number: 4, text: '初期値をstateに直接代入する' }
    ],
    tags: ['React', 'useState', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'インラインスタイルの注意点',
    difficulty: '初級',
    content: 'JSXでインラインスタイルを設定する際に気を付けるべき点は何ですか？',
    sampleCode: `
  <div style={{ backgroundColor: "blue" }}>Content</div>
    `,
    answerCode: 3,
    explanation: 'CSSプロパティはキャメルケースで記述し、値は文字列として指定します。',
    options: [
      { number: 1, text: 'CSSファイルを別に用意する必要がある' },
      { number: 2, text: 'スタイルは常にクラスで指定する' },
      { number: 3, text: 'プロパティ名はキャメルケースで記述する' },
      { number: 4, text: 'JavaScriptオブジェクトは使えない' }
    ],
    tags: ['React', 'スタイル', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'コンポーネント再利用のためのprops',
    difficulty: '初級',
    content: '同じコンポーネントを異なるデータで再利用する際に重要な仕組みは何ですか？',
    sampleCode: `
  function Card({ title, content }) {
    return (
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    );
  }
    `,
    answerCode: 2,
    explanation: 'propsを使うことで、コンポーネントに異なるデータを渡し再利用性を高めます。',
    options: [
      { number: 1, text: 'state' },
      { number: 2, text: 'props' },
      { number: 3, text: 'context' },
      { number: 4, text: 'ref' }
    ],
    tags: ['React', 'props', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '親コンポーネントからのデータ共有',
    difficulty: '初級',
    content: '複数の子コンポーネントに同じデータを渡すために一般的に使用される方法はどれですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: '親コンポーネントから各子にpropsを渡すことでデータ共有が行われます。',
    options: [
      { number: 1, text: 'stateを直接共有する' },
      { number: 2, text: '各子で個別に定義する' },
      { number: 3, text: '親からpropsとして渡す' },
      { number: 4, text: 'グローバル変数を使用する' }
    ],
    tags: ['React', 'props', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSX内での式の評価タイミング',
    difficulty: '初級',
    content: 'JSX内で記述されたJavaScript式はいつ評価されますか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'JSX内の式はレンダリング時に評価されます。',
    options: [
      { number: 1, text: 'ビルド時に評価される' },
      { number: 2, text: 'レンダリング時に評価される' },
      { number: 3, text: '初期化時に評価される' },
      { number: 4, text: 'イベント発生時に評価される' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'シンプルなカウンターコンポーネントの作成',
    difficulty: '初級',
    content: 'useStateを用いてカウンターを実装する際、正しい初期化と更新方法はどれですか？',
    sampleCode: `
  function Counter() {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>{count}</p>
        <button onClick={???}>Increment</button>
      </div>
    );
  }
    `,
    answerCode: 4,
    explanation: 'ボタンのクリックでsetCountを呼び出し、countを更新します。',
    options: [
      { number: 1, text: 'setCount(count)' },
      { number: 2, text: 'count++' },
      { number: 3, text: 'setCount(1)' },
      { number: 4, text: 'setCount(count + 1)' }
    ],
    tags: ['React', 'useState', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSX内での関数呼び出し',
    difficulty: '初級',
    content: 'JSX内で関数を呼び出す場合、正しい記述方法はどれですか？',
    sampleCode: `
  function greet() {
    return "Hello";
  }
  function App() {
    return <div>{???}</div>;
  }
    `,
    answerCode: 2,
    explanation: 'JSX内では関数呼び出しは波括弧内に記述します。',
    options: [
      { number: 1, text: 'greet' },
      { number: 2, text: 'greet()' },
      { number: 3, text: '"greet()"' },
      { number: 4, text: '{greet}' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'レンダリング再実行のタイミング',
    difficulty: '初級',
    content: 'Reactコンポーネントはどのタイミングで再レンダリングされますか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'コンポーネントはpropsやstateが変更された際に再レンダリングされます。',
    options: [
      { number: 1, text: '常に一定間隔で再レンダリングされる' },
      { number: 2, text: '初回レンダリングのみ行われる' },
      { number: 3, text: 'propsまたはstateの変更時に再レンダリングされる' },
      { number: 4, text: 'ユーザーの操作に関係なく再レンダリングされない' }
    ],
    tags: ['React', 'レンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '簡単なリスト表示の作成',
    difficulty: '初級',
    content: '配列からリストを生成する際、正しい記述はどれですか？',
    sampleCode: `
  const items = ["Apple", "Banana", "Cherry"];
  function FruitList() {
    return (
      <ul>
        { items.map((item, index) => <li key={index}>{item}</li>) }
      </ul>
    );
  }
    `,
    answerCode: 1,
    explanation: 'map関数を使用して、各要素にkey属性を指定しながらリストを生成します。',
    options: [
      { number: 1, text: 'map関数を使用する' },
      { number: 2, text: 'for文を使用する' },
      { number: 3, text: 'while文を使用する' },
      { number: 4, text: '直接配列を出力する' }
    ],
    tags: ['React', 'リスト', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの式と文字列の結合',
    difficulty: '初級',
    content: 'JSX内で文字列と変数を結合して表示する正しい方法はどれですか？',
    sampleCode: `
  function App() {
    const name = "Bob";
    return <div>{"Hello, " + ???}</div>;
  }
    `,
    answerCode: 1,
    explanation: '文字列と変数の結合は+演算子で行います。',
    options: [
      { number: 1, text: 'name' },
      { number: 2, text: '{name}' },
      { number: 3, text: '"name"' },
      { number: 4, text: 'greet(name)' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'イベントハンドラの引数渡し',
    difficulty: '初級',
    content: 'onClickイベントで関数に引数を渡す正しい方法はどれですか？',
    sampleCode: `
  function handleClick(id) {
    console.log(id);
  }
  <button onClick={() => handleClick(5)}>Click</button>
    `,
    answerCode: 1,
    explanation: 'アロー関数を使用して引数を渡すのが一般的な方法です。',
    options: [
      { number: 1, text: 'onClick={() => handleClick(5)}' },
      { number: 2, text: 'onClick={handleClick(5)}' },
      { number: 3, text: 'onClick={handleClick}' },
      { number: 4, text: 'onClick={handleClick.bind(this, 5)}' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでのラッパー要素の必要性',
    difficulty: '初級',
    content: 'JSXで複数の要素を返す場合、なぜラッパー要素で囲む必要があるのでしょうか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'JSXは1つのルート要素を返す必要があるため、ラッパーで囲む必要があります。',
    options: [
      { number: 1, text: 'ブラウザの制約による' },
      { number: 2, text: 'JSXの構文ルールにより単一要素が必要' },
      { number: 3, text: 'パフォーマンスのため' },
      { number: 4, text: '可読性向上のため' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'フォーム入力の制御',
    difficulty: '初級',
    content: 'Reactでフォームの入力値を制御する方法はどれですか？',
    sampleCode: `
  function Form() {
    const [value, setValue] = useState("");
    return <input type="text" value={value} onChange={e => setValue(e.target.value)} />;
  }
    `,
    answerCode: 1,
    explanation: '制御コンポーネントでは、入力値をstateで管理し、onChangeで更新します。',
    options: [
      { number: 1, text: '制御コンポーネントとして実装する' },
      { number: 2, text: '非制御コンポーネントとして実装する' },
      { number: 3, text: 'stateを使用しない' },
      { number: 4, text: 'onSubmitのみで制御する' }
    ],
    tags: ['React', 'フォーム', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'onChangeイベントの基本',
    difficulty: '初級',
    content: '入力値の変更を検知するために、Reactで使用されるイベントはどれですか？',
    sampleCode: `
  <input type="text" onChange={handleChange} />
    `,
    answerCode: 1,
    explanation: 'onChangeイベントが入力値の変更を検知するために使用されます。',
    options: [
      { number: 1, text: 'onChange' },
      { number: 2, text: 'onInput' },
      { number: 3, text: 'onKeyDown' },
      { number: 4, text: 'onSubmit' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの複数行文字列の表示',
    difficulty: '初級',
    content: 'JSX内で複数行のテキストを表示するために必要な方法はどれですか？',
    sampleCode: `
  function Message() {
    return (
      <p>
        Line1<br/>
        Line2
      </p>
    );
  }
    `,
    answerCode: 1,
    explanation: '改行タグやCSSを使って複数行のテキストを表現します。',
    options: [
      { number: 1, text: '改行タグを使用する' },
      { number: 2, text: 'テキストは1行で表示される' },
      { number: 3, text: '配列で返す' },
      { number: 4, text: 'Fragmentで囲む' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'シンプルなボタンコンポーネントの作成',
    difficulty: '初級',
    content: '関数コンポーネントとしてシンプルなボタンを作成する正しい方法はどれですか？',
    sampleCode: `
  function Button({ onClick, label }) {
    return <button onClick={onClick}>{label}</button>;
  }
    `,
    answerCode: 1,
    explanation: '関数コンポーネントはpropsを受け取り、JSXを返すシンプルな構造です。',
    options: [
      { number: 1, text: '関数コンポーネントとして定義する' },
      { number: 2, text: 'クラスコンポーネントとして定義する' },
      { number: 3, text: 'HTMLの<button>タグのみ使用する' },
      { number: 4, text: 'divタグでラップする' }
    ],
    tags: ['React', 'コンポーネント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'defaultPropsの設定方法再確認',
    difficulty: '初級',
    content: 'Reactでコンポーネントのpropsにデフォルト値を設定する正しい方法はどれですか？',
    sampleCode: `
  function Greeting({ message }) {
    return <p>{message}</p>;
  }
  Greeting.defaultProps = {
    message: "Hello"
  };
    `,
    answerCode: 1,
    explanation: 'defaultPropsを利用して、propsのデフォルト値を設定できます。',
    options: [
      { number: 1, text: 'ComponentName.defaultProps = { ... }' },
      { number: 2, text: 'ComponentName.props = { ... }' },
      { number: 3, text: 'defaultProps = { ... }' },
      { number: 4, text: 'props.default = { ... }' }
    ],
    tags: ['React', 'props', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSXでの属性名のキャメルケース',
    difficulty: '初級',
    content: 'JSXでHTMLの属性を指定する際、なぜキャメルケースを使用するのですか？',
    sampleCode: `
  <div tabIndex={0}></div>
    `,
    answerCode: 1,
    explanation: 'JSXではJavaScriptのオブジェクトとして扱うため、キャメルケースで指定します。',
    options: [
      { number: 1, text: 'JavaScriptのオブジェクト記法に合わせるため' },
      { number: 2, text: 'HTMLの仕様に合わせるため' },
      { number: 3, text: 'ブラウザの制約のため' },
      { number: 4, text: '特に理由はない' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'フラグメントの使用理由',
    difficulty: '初級',
    content: 'Reactで余分なDOMノードを追加せずに複数要素を返す方法はどれですか？',
    sampleCode: `
  function List() {
    return (
      ???
      <li>Item1</li>
      <li>Item2</li>
      ???
    );
  }
    `,
    answerCode: 2,
    explanation: 'React.Fragmentまたは短縮記法を使用して、不要なDOM要素を作成しないようにします。',
    options: [
      { number: 1, text: '<div>' },
      { number: 2, text: 'Fragmentまたは<> </>' },
      { number: 3, text: '<span>' },
      { number: 4, text: '<section>' }
    ],
    tags: ['React', 'Fragment', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSX内での式の評価タイミング再確認',
    difficulty: '初級',
    content: 'JSX内で記述されたJavaScript式はいつ評価されますか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'JSX内の式はレンダリング時に評価されます。',
    options: [
      { number: 1, text: 'ビルド時に評価される' },
      { number: 2, text: 'レンダリング時に評価される' },
      { number: 3, text: '初期化時に評価される' },
      { number: 4, text: 'イベント発生時に評価される' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'シンプルなカウンターの作成再確認',
    difficulty: '初級',
    content: 'useStateを利用してシンプルなカウンターコンポーネントを実装する正しい方法はどれですか？',
    sampleCode: `
  function Counter() {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  }
    `,
    answerCode: 1,
    explanation: 'useStateを使い、状態更新関数でカウンターの値を更新します。',
    options: [
      { number: 1, text: '正しい実装' },
      { number: 2, text: 'stateを直接変更する' },
      { number: 3, text: 'setStateを使用する' },
      { number: 4, text: 'propsを更新する' }
    ],
    tags: ['React', 'useState', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSX内での関数呼び出し再確認',
    difficulty: '初級',
    content: 'JSX内で関数を呼び出す際、正しく評価される方法はどれですか？',
    sampleCode: `
  function getMessage() {
    return "Hello, World!";
  }
  function App() {
    return <div>{getMessage()}</div>;
  }
    `,
    answerCode: 1,
    explanation: '関数呼び出しは波括弧内で実行し、返り値が表示されます。',
    options: [
      { number: 1, text: '{getMessage()}' },
      { number: 2, text: 'getMessage()' },
      { number: 3, text: '"getMessage()"' },
      { number: 4, text: '{getMessage}' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'レンダリング再実行のタイミング再確認',
    difficulty: '初級',
    content: 'コンポーネントはいつ再レンダリングされるか、正しいものを選んでください。',
    sampleCode: '',
    answerCode: 3,
    explanation: 'propsやstateの変更時にコンポーネントは再レンダリングされます。',
    options: [
      { number: 1, text: '常に1秒ごとに再レンダリングされる' },
      { number: 2, text: '初回レンダリングのみ行われる' },
      { number: 3, text: 'propsまたはstateが変更されたとき' },
      { number: 4, text: 'ユーザーが操作したときのみ' }
    ],
    tags: ['React', 'レンダリング', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: '簡単なHello Worldコンポーネント',
    difficulty: '初級',
    content: 'Reactで"Hello, World!"を表示するシンプルなコンポーネントを作成する正しい方法はどれですか？',
    sampleCode: `
  function HelloWorld() {
    return <h1>Hello, World!</h1>;
  }
    `,
    answerCode: 1,
    explanation: '関数コンポーネントとしてシンプルにJSXを返す実装です。',
    options: [
      { number: 1, text: 'function HelloWorld() { return <h1>Hello, World!</h1>; }' },
      { number: 2, text: 'class HelloWorld extends React.Component { render() { return <h1>Hello, World!</h1>; } }' },
      { number: 3, text: 'const HelloWorld = <h1>Hello, World!</h1>;' },
      { number: 4, text: 'function HelloWorld() { <h1>Hello, World!</h1>; }' }
    ],
    tags: ['React', 'Hello World', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'JSX内での式と文字列の結合再確認',
    difficulty: '初級',
    content: 'JSX内で文字列と変数を結合して表示する正しい方法はどれですか？',
    sampleCode: `
  function App() {
    const name = "Charlie";
    return <div>{"Welcome, " + name}</div>;
  }
    `,
    answerCode: 1,
    explanation: '文字列と変数は+演算子で結合します。',
    options: [
      { number: 1, text: '{"Welcome, " + name}' },
      { number: 2, text: '{"Welcome, " + {name}}' },
      { number: 3, text: '"Welcome, " + "name"' },
      { number: 4, text: '{ "Welcome, " + name }' }
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'イベントハンドラの正しい設定',
    difficulty: '初級',
    content: 'JSXでボタンのクリックイベントを正しく設定する方法はどれですか？',
    sampleCode: `
  <button ???={handleClick}>Submit</button>
    `,
    answerCode: 2,
    explanation: 'onClickイベントをcamelCaseで設定し、関数を渡します。',
    options: [
      { number: 1, text: 'onclick={handleClick}' },
      { number: 2, text: 'onClick={handleClick}' },
      { number: 3, text: 'click={handleClick}' },
      { number: 4, text: 'onClick="handleClick()"' }
    ],
    tags: ['React', 'イベント', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'コンポーネントの初期状態設定',
    difficulty: '初級',
    content: 'useStateを使ってコンポーネントの初期状態を設定する方法はどれですか？',
    sampleCode: `
  const [text, setText] = useState("default");
    `,
    answerCode: 1,
    explanation: 'useStateの引数に初期値を渡すことで状態を設定します。',
    options: [
      { number: 1, text: 'useState("default")' },
      { number: 2, text: 'setText("default")' },
      { number: 3, text: 'state = "default"' },
      { number: 4, text: 'defaultState = "default"' }
    ],
    tags: ['React', 'useState', '初心者向け'],
    collectionName: 'React 初級'
  },
  {
    title: 'シンプルなフォームの作成',
    difficulty: '初級',
    content: 'Reactでシンプルなフォームを作成する際、正しい制御コンポーネントの実装はどれですか？',
    sampleCode: `
  function Form() {
    const [value, setValue] = useState("");
    return (
      <form>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      </form>
    );
  }
    `,
    answerCode: 1,
    explanation: '制御コンポーネントとして、stateで入力値を管理し、onChangeで更新します。',
    options: [
      { number: 1, text: '制御コンポーネントとして実装する' },
      { number: 2, text: '非制御コンポーネントとして実装する' },
      { number: 3, text: 'stateを使用しない' },
      { number: 4, text: 'onSubmitのみで制御する' }
    ],
    tags: ['React', 'フォーム', '初心者向け'],
    collectionName: 'React 初級'
  }
]

module.exports = problemsReactBeginner;