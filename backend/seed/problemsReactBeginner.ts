import { TypeProblems } from "../type/typeProblems" ;

const problemsReactBeginner: TypeProblems = 
  // Set1: reactProblems (10問)
  [{
    title: "JSXで正しいコメントの書き方は？",
    difficulty: "初級",
    content:
      "JSX内でコメントを書く場合、どのように記述しますか？以下の選択肢から正しい記述を選んでください。",
    sampleCode: 
`function Component() {
  return (
    <div>
      {/* Comment */}
      Content
    </div>
  );
}`,
    answerCode: 2,
    explanation:
      "JSX内ではコメントは{/* Comment */}で記述する必要があります。",
    options: [
      { number: 1, text: "<!-- Comment -->" },
      { number: 2, text: "{/* Comment */}" },
      { number: 3, text: "// Comment" },
      { number: 4, text: "{// Comment}" },
    ],
    tags: ["React", "JSX", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "Reactコンポーネントの基本的な作成方法",
    difficulty: "初級",
    content:
      "Reactで関数コンポーネントを作成する正しい方法はどれですか？",
    sampleCode: 
`function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
    answerCode: 1,
    explanation:
      "関数コンポーネントはJavaScriptの関数として定義され、propsを引数に取ります。",
    options: [
      { number: 1, text: "関数コンポーネントはJavaScriptの関数として定義する" },
      { number: 2, text: "React.createComponent()を使う" },
      { number: 3, text: "クラスコンポーネントのみがサポートされる" },
      { number: 4, text: "コンポーネントはHTMLのタグとして直接書く" },
    ],
    tags: ["React", "コンポーネント", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "propsの正しい利用方法",
    difficulty: "初級",
    content:
      "propsを使用して親から子コンポーネントへデータを渡す正しい方法はどれですか？",
    sampleCode: 
`function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
    answerCode: 1,
    explanation:
      "propsは親コンポーネントから子コンポーネントへ一方向にデータを渡すために使用されます。",
    options: [
      { number: 1, text: "propsは親コンポーネントから子コンポーネントへ一方向にデータを渡す" },
      { number: 2, text: "propsは双方向にデータをやり取りできる" },
      { number: 3, text: "propsは状態管理に使う" },
      { number: 4, text: "propsはReactのライフサイクルを制御する" },
    ],
    tags: ["React", "props", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "状態変更による再レンダリング",
    difficulty: "初級",
    content:
      "Reactでは状態が変わるとコンポーネントが再レンダリングされます。正しい状態変更方法はどれですか？",
    sampleCode: 
`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
    answerCode: 1,
    explanation:
      "ReactではuseStateフックを使用して状態を管理し、状態の更新によりコンポーネントが再レンダリングされます。",
    options: [
      { number: 1, text: "useStateフックを使用して状態を変更する" },
      { number: 2, text: "直接変数に新しい値を代入する" },
      { number: 3, text: "状態は変更されずに常に同じ値を返す" },
      { number: 4, text: "レンダリングはReactでは自動的に行われない" },
    ],
    tags: ["React", "useState", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "イベントハンドラの記述方法",
    difficulty: "初級",
    content:
      "Reactでクリックイベントを扱う際、正しいイベントハンドラの書き方はどれですか？",
    sampleCode: 
`function Button() {
  function handleClick() {
    alert("Clicked!");
  }
  return <button onClick={handleClick}>Click me</button>;
}`,
    answerCode: 2,
    explanation:
      "Reactではイベントハンドラに関数を直接渡す形式を使用します。",
    options: [
      { number: 1, text: "<button onclick='handleClick()'>Click me</button>" },
      { number: 2, text: "<button onClick={handleClick}>Click me</button>" },
      { number: 3, text: "<button onClick='handleClick'>Click me</button>" },
      { number: 4, text: "<button onClick={handleClick()}>Click me</button>" },
    ],
    tags: ["React", "イベント", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "リストのレンダリングとkeyの使用",
    difficulty: "初級",
    content:
      "Reactでリストをレンダリングする際、各要素に一意なkeyを設定する理由は何ですか？",
    sampleCode: 
`function ItemList({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}`,
    answerCode: 1,
    explanation:
      "keyは各要素を一意に識別し、レンダリング最適化に役立ちます。",
    options: [
      { number: 1, text: "keyは各要素を一意に識別するために使用され、再レンダリングの最適化に役立つ" },
      { number: 2, text: "keyはCSSのスタイリングに使われる" },
      { number: 3, text: "keyはイベントハンドラの識別に使用される" },
      { number: 4, text: "keyはフォームの送信時に必要" },
    ],
    tags: ["React", "リスト", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "条件付きレンダリングの方法",
    difficulty: "初級",
    content:
      "Reactで条件に応じたレンダリングを行う一般的な方法はどれですか？",
    sampleCode: 
`function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>}
    </div>
  );
}`,
    answerCode: 3,
    explanation:
      "条件付きレンダリングには三項演算子が一般的に用いられます。",
    options: [
      { number: 1, text: "if文を直接JSX内に書く" },
      { number: 2, text: "switch文を使用する" },
      { number: 3, text: "三項演算子を使用する" },
      { number: 4, text: "for文でループしながらレンダリングする" },
    ],
    tags: ["React", "条件付きレンダリング", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "React Fragmentsの利用方法",
    difficulty: "初級",
    content:
      "複数の子要素をグループ化するためのReactの仕組みはどれですか？",
    sampleCode: 
`function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}`,
    answerCode: 4,
    explanation:
      "React Fragmentsを使うことで不要なDOM要素を追加せずに複数の子要素をグループ化できます。",
    options: [
      { number: 1, text: "divタグでラップする" },
      { number: 2, text: "spanタグでラップする" },
      { number: 3, text: "React.Fragmentタグでラップする" },
      { number: 4, text: "空のタグ <> </> を使用する" },
    ],
    tags: ["React", "Fragments", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "JSXにおけるJavaScript式の埋め込み方法",
    difficulty: "初級",
    content:
      "JSX内でJavaScriptの値や式を埋め込む際の正しい記法はどれですか？",
    sampleCode: 
`function Sum() {
  const a = 5;
  const b = 10;
  return <div>{a + b}</div>;
}`,
    answerCode: 2,
    explanation:
      "JSX内では、JavaScript式は中括弧{}で囲んで埋め込む必要があります。",
    options: [
      { number: 1, text: "return <div> a + b </div>;" },
      { number: 2, text: "return <div>{a + b}</div>;" },
      { number: 3, text: "return <div>(a + b)</div>;" },
      { number: 4, text: "return <div>[a + b]</div>;" },
    ],
    tags: ["React", "JSX", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "コンポーネント間のデータ共有の基本",
    difficulty: "初級",
    content:
      "親コンポーネントから子コンポーネントへデータを渡す際、どの仕組みを使うのが一般的ですか？",
    sampleCode: 
`function Parent() {
  const message = "Hello from Parent!";
  return <Child message={message} />;
}

function Child({ message }) {
  return <div>{message}</div>;
}`,
    answerCode: 1,
    explanation:
      "親から子へのデータの受け渡しはpropsが最も一般的な方法です。",
    options: [
      { number: 1, text: "propsを使用する" },
      { number: 2, text: "stateを使用する" },
      { number: 3, text: "コンテキストAPIを使用する" },
      { number: 4, text: "Reduxを使用する" },
    ],
    tags: ["React", "props", "初心者向け"],
    collectionName: "React 初級",
  },

  // Set2: reactProblemsAdditional (10問)
  {
    title: "useEffectの基本的な使い方",
    difficulty: "初級",
    content:
      "ReactのuseEffectフックを利用して、コンポーネントのマウント時にのみ実行される処理を実装するためにはどのように記述すれば良いですか？",
    sampleCode:
`import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    console.log("Component mounted");
  }, []);
  
  return <div>My Component</div>;
}`,
    answerCode: 1,
    explanation:
      "依存配列に空配列([])を渡すことで、useEffectはコンポーネントのマウント時にのみ実行されます。",
    options: [
      { number: 1, text: "依存配列に空配列を渡すことでマウント時のみ実行する" },
      { number: 2, text: "依存配列を省略して全レンダリング時に実行する" },
      { number: 3, text: "useEffectは初回レンダリングでのみ実行されない" },
      { number: 4, text: "クリーンアップ関数が不要である" },
    ],
    tags: ["React", "useEffect", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "defaultPropsの設定方法",
    difficulty: "初級",
    content:
      "Reactで関数コンポーネントにおいて、propsの初期値を設定する一般的な方法はどれですか？",
    sampleCode:
`function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

Greeting.defaultProps = {
  name: "Guest"
};`,
    answerCode: 2,
    explanation:
      "関数コンポーネントでは、コンポーネントのdefaultPropsプロパティにデフォルト値を設定することで、propsの初期値を定義できます。",
    options: [
      { number: 1, text: "コンポーネント内で変数を初期化する" },
      { number: 2, text: "コンポーネントにdefaultPropsを直接設定する" },
      { number: 3, text: "propsに直接値を渡す" },
      { number: 4, text: "stateの初期値として設定する" },
    ],
    tags: ["React", "defaultProps", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "コンポーネントの再利用性",
    difficulty: "初級",
    content:
      "Reactコンポーネントの再利用性を高めるための基本的な考え方として正しいものはどれですか？",
    sampleCode:
`function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}`,
    answerCode: 1,
    explanation:
      "propsを活用して汎用的なコンポーネントを作成することで、様々な場面で再利用が可能になります。",
    options: [
      { number: 1, text: "propsを利用して汎用的なコンポーネントを作成する" },
      { number: 2, text: "内部状態に依存させて固有の動作にする" },
      { number: 3, text: "コンポーネントをハードコーディングする" },
      { number: 4, text: "CSSを直接埋め込む" },
    ],
    tags: ["React", "再利用", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "イベントオブジェクトの利用方法",
    difficulty: "初級",
    content:
      "Reactのイベントハンドラで、イベントオブジェクトを正しく利用する方法はどれですか？",
    sampleCode:
`function InputComponent() {
  function handleChange(event) {
    console.log(event.target.value);
  }
  return <input onChange={handleChange} />;
}`,
    answerCode: 3,
    explanation:
      "イベントハンドラは、引数として渡されるイベントオブジェクトのtargetプロパティを利用して入力値などの情報を取得します。",
    options: [
      { number: 1, text: "イベントオブジェクトは利用せず直接値を取得する" },
      { number: 2, text: "引数に直接値を渡して処理する" },
      { number: 3, text: "イベントオブジェクトを引数として受け取り、targetプロパティを利用する" },
      { number: 4, text: "グローバルオブジェクトからイベント情報を取得する" },
    ],
    tags: ["React", "イベント", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "フォームの制御コンポーネント",
    difficulty: "初級",
    content:
      "Reactでフォームを制御コンポーネントとして実装する際、基本的な考え方として正しいのはどれですか？",
    sampleCode:
`function Form() {
  const [value, setValue] = useState('');
  return (
    <form>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </form>
  );
}`,
    answerCode: 1,
    explanation:
      "制御コンポーネントでは、入力値をstateで管理し、onChangeイベントで更新することで、フォームの状態をReactで制御します。",
    options: [
      { number: 1, text: "入力値をstateで管理し、onChangeで更新する" },
      { number: 2, text: "DOMから直接値を取得する" },
      { number: 3, text: "value属性を省略して非制御コンポーネントとする" },
      { number: 4, text: "フォームの状態は外部ライブラリで管理する" },
    ],
    tags: ["React", "フォーム", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "親子間のイベント伝搬",
    difficulty: "初級",
    content:
      "Reactにおいて、親コンポーネントが子コンポーネントからのイベントを受け取る一般的な方法はどれですか？",
    sampleCode:
`function Parent() {
  function handleChildEvent(data) {
    console.log(data);
  }
  return <Child onEvent={handleChildEvent} />;
}

function Child({ onEvent }) {
  return <button onClick={() => onEvent("Hello")}>Click</button>;
}`,
    answerCode: 2,
    explanation:
      "親コンポーネントから関数をpropsとして子コンポーネントに渡すことで、子のイベント発生時に親がそのイベントを処理できます。",
    options: [
      { number: 1, text: "子コンポーネント内で直接親のstateを変更する" },
      { number: 2, text: "親コンポーネントから関数をpropsとして子に渡す" },
      { number: 3, text: "React Contextを使用してイベントを共有する" },
      { number: 4, text: "イベントは自動的に伝搬する" },
    ],
    tags: ["React", "イベント伝搬", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "条件付きレンダリングの && 演算子",
    difficulty: "初級",
    content:
      "Reactで条件付きレンダリングを実装する際、&&演算子を使用する正しい方法はどれですか？",
    sampleCode:
`function Notification({ show }) {
  return (
    <div>
      {show && <span>New Message</span>}
    </div>
  );
}`,
    answerCode: 1,
    explanation:
      "&&演算子は、左側の条件がtrueの場合にのみ右側の要素をレンダリングするために使用されます。",
    options: [
      { number: 1, text: "条件がtrueの場合にのみ後続の要素をレンダリングする" },
      { number: 2, text: "条件がfalseの場合にのみ要素をレンダリングする" },
      { number: 3, text: "常に要素をレンダリングする" },
      { number: 4, text: "条件にかかわらずnullを返す" },
    ],
    tags: ["React", "条件付きレンダリング", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "コンポーネントの再レンダリングとstateの更新",
    difficulty: "初級",
    content:
      "Reactでは、stateを更新した際にコンポーネントが再レンダリングされる理由として正しい説明はどれですか？",
    sampleCode:
`function Example() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Increment</button>;
}`,
    answerCode: 2,
    explanation:
      "stateが更新されると、Reactはその変更を検知し、該当コンポーネントを再レンダリングして最新の状態を反映します。",
    options: [
      { number: 1, text: "stateの更新は再レンダリングをトリガーしない" },
      { number: 2, text: "stateの更新によりReactが変更を検知して再レンダリングする" },
      { number: 3, text: "stateは常に同じ値を返すため再レンダリングしない" },
      { number: 4, text: "再レンダリングは手動で行う必要がある" },
    ],
    tags: ["React", "state", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "インラインスタイルの適用方法",
    difficulty: "初級",
    content:
      "Reactでインラインスタイルを適用する際の正しい記述方法はどれですか？",
    sampleCode:
`function StyledDiv() {
  return <div style={{ backgroundColor: 'blue', color: 'white' }}>Styled</div>;
}`,
    answerCode: 1,
    explanation:
      "インラインスタイルはオブジェクト形式でstyleプロパティに渡す必要があります。",
    options: [
      { number: 1, text: "オブジェクト形式でstyleプロパティに渡す" },
      { number: 2, text: "文字列でstyle属性を指定する" },
      { number: 3, text: "CSSクラスを直接記述する" },
      { number: 4, text: "スタイルは外部CSSのみで適用する" },
    ],
    tags: ["React", "スタイル", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "スプレッド構文でのpropsの展開",
    difficulty: "初級",
    content:
      "Reactでスプレッド構文を用いてpropsをコンポーネントに渡す正しい方法はどれですか？",
    sampleCode:
`function Component(props) {
  return <div>{props.title}</div>;
}

const props = { title: "Hello", id: 1 };
<Component {...props} />;`,
    answerCode: 4,
    explanation:
      "スプレッド構文 {...props} を使用することで、オブジェクトの全プロパティを一度にコンポーネントへ渡すことができます。",
    options: [
      { number: 1, text: "propsを直接指定して渡す" },
      { number: 2, text: "スプレッド構文は使用せず個別に指定する" },
      { number: 3, text: "propsの値は直接ハードコーディングする" },
      { number: 4, text: "スプレッド構文を使ってオブジェクトの全プロパティを展開する" },
    ],
    tags: ["React", "スプレッド構文", "初心者向け"],
    collectionName: "React 初級",
  },

  // Set3: reactProblemsExtra (10問 ※重複している「JSXでの式展開の注意点」は除外)
  {
    title: "Classコンポーネントの作成方法",
    difficulty: "初級",
    content:
      "Reactでクラスコンポーネントを作成する正しい方法はどれですか？",
    sampleCode:
`import React from 'react';

class MyComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}`,
    answerCode: 1,
    explanation:
      "クラスコンポーネントはReact.Componentを継承し、renderメソッドを定義する必要があります。",
    options: [
      { number: 1, text: "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }" },
      { number: 2, text: "function MyComponent() { return <div>Hello</div>; }" },
      { number: 3, text: "const MyComponent = () => <div>Hello</div>;" },
      { number: 4, text: "class MyComponent extends Component { return <div>Hello</div>; }" },
    ],
    tags: ["React", "クラスコンポーネント", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "クラスコンポーネントでのstateの初期化",
    difficulty: "初級",
    content:
      "クラスコンポーネントにおいて、stateを正しく初期化する方法はどれですか？",
    sampleCode:
`class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    return <div>{this.state.count}</div>;
  }
}`,
    answerCode: 1,
    explanation:
      "constructor内でsuper(props)を呼び、その後this.stateに初期値を設定するのが正しい方法です。",
    options: [
      { number: 1, text: "constructor(props) { super(props); this.state = { count: 0 }; }" },
      { number: 2, text: "constructor() { this.state = { count: 0 }; }" },
      { number: 3, text: "クラス外でstateを初期化する" },
      { number: 4, text: "constructor(props) { this.state = { count: 0 }; }" },
    ],
    tags: ["React", "state", "クラスコンポーネント", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "PropTypesによるpropsの型チェック",
    difficulty: "初級",
    content:
      "Reactでコンポーネントのpropsの型チェックを行う一般的な方法はどれですか？",
    sampleCode:
`import PropTypes from 'prop-types';

function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

Greeting.propTypes = {
  name: PropTypes.string
};`,
    answerCode: 2,
    explanation:
      "PropTypesを使用してpropsの型チェックを行うことで、型の不一致を検出できます。",
    options: [
      { number: 1, text: "コンポーネントにdefaultPropsを設定する" },
      { number: 2, text: "コンポーネントにpropTypesを設定する" },
      { number: 3, text: "コンポーネントのstateを利用する" },
      { number: 4, text: "React.createElementで型を指定する" },
    ],
    tags: ["React", "PropTypes", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "クラスコンポーネントでのイベントバインディング",
    difficulty: "初級",
    content:
      "クラスコンポーネントでイベントハンドラを正しくバインドする方法はどれですか？",
    sampleCode:
`class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("Clicked");
  }
  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}`,
    answerCode: 1,
    explanation:
      "constructor内でthis.handleClickを.bind(this)することで、正しくthisがバインドされます。",
    options: [
      { number: 1, text: "constructor内でthis.handleClick = this.handleClick.bind(this)" },
      { number: 2, text: "onClickにthis.handleClick()を記述する" },
      { number: 3, text: "イベントハンドラをarrow functionで定義しない" },
      { number: 4, text: "bindを使用せずにそのままthis.handleClickを渡す" },
    ],
    tags: ["React", "イベントバインディング", "クラスコンポーネント", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "条件付きクラス名の適用",
    difficulty: "初級",
    content:
      "Reactで条件に応じたクラス名を適用する正しい方法はどれですか？",
    sampleCode:
`function Item({ isActive }) {
  return <div className={isActive ? "active" : "inactive"}>Item</div>;
}`,
    answerCode: 1,
    explanation:
      "三項演算子を使用して、条件に応じたクラス名を適用するのが一般的です。",
    options: [
      { number: 1, text: "className={isActive ? 'active' : 'inactive'}" },
      { number: 2, text: "className={isActive && 'active'}" },
      { number: 3, text: "className='active' && className='inactive'" },
      { number: 4, text: "className={isActive ? 'inactive' : 'active'}" },
    ],
    tags: ["React", "クラス名", "条件付きレンダリング", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "JSX内での配列レンダリング",
    difficulty: "初級",
    content:
      "JSX内で配列の要素をレンダリングする際、どの記述が正しいですか？",
    sampleCode:
`function List() {
  return [
    <li key="1">Item 1</li>,
    <li key="2">Item 2</li>
  ];
}`,
    answerCode: 2,
    explanation:
      "JSXでは配列の要素を返す際に、各要素に一意のkeyを付与する必要があります。",
    options: [
      { number: 1, text: "return <li>Item 1</li><li>Item 2</li>;" },
      { number: 2, text: "return [<li key='1'>Item 1</li>, <li key='2'>Item 2</li>];" },
      { number: 3, text: "return (<li key='1'>Item 1</li>, <li key='2'>Item 2</li>);" },
      { number: 4, text: "return {<li key='1'>Item 1</li>, <li key='2'>Item 2</li>};" },
    ],
    tags: ["React", "JSX", "レンダリング", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "Reactでのrefの利用方法",
    difficulty: "初級",
    content:
      "ReactでDOM要素に直接アクセスするために使用するフックはどれですか？",
    sampleCode:
`import React, { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);
  return <input ref={inputRef} />;
}`,
    answerCode: 3,
    explanation:
      "useRefフックを利用することで、DOM要素に直接アクセスすることができます。",
    options: [
      { number: 1, text: "useState" },
      { number: 2, text: "useEffect" },
      { number: 3, text: "useRef" },
      { number: 4, text: "useContext" },
    ],
    tags: ["React", "ref", "Hooks", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "複数クラス名の結合方法",
    difficulty: "初級",
    content:
      "Reactで複数のCSSクラスを適用する正しい方法はどれですか？",
    sampleCode:
`function Box({ isActive }) {
  return <div className={\`box \${isActive ? 'active' : ''}\`}>Content</div>;
}`,
    answerCode: 1,
    explanation:
      "テンプレートリテラルを使用して、条件に応じた複数のクラス名を結合することが一般的です。",
    options: [
      { number: 1, text: "className={`box ${isActive ? 'active' : ''}`}" },
      { number: 2, text: "className='box, active'" },
      { number: 3, text: "className={'box' + isActive}" },
      { number: 4, text: "className={['box', isActive && 'active']}" },
    ],
    tags: ["React", "クラス名", "テンプレートリテラル", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "条件によりコンポーネントを非表示にする方法",
    difficulty: "初級",
    content:
      "Reactで特定の条件下でコンポーネントを非表示にする一般的な方法はどれですか？",
    sampleCode:
`function HiddenComponent({ show }) {
  if (!show) return null;
  return <div>Visible</div>;
}`,
    answerCode: 2,
    explanation:
      "条件に応じてnullを返すことで、コンポーネントを非表示にすることができます。",
    options: [
      { number: 1, text: "return <div></div>;" },
      { number: 2, text: "if (!show) return null;" },
      { number: 3, text: "return undefined;" },
      { number: 4, text: "render() { return null; }" },
    ],
    tags: ["React", "条件付きレンダリング", "初心者向け"],
    collectionName: "React 初級",
  },
  // ※ 重複のため「JSXでの式展開の注意点」は除外します

  // Set4: reactProblemsMore (10問)
  {
    title: "フォーム送信時のpreventDefaultの利用方法",
    difficulty: "初級",
    content:
      "Reactでフォーム送信時にページのリロードを防ぐため、イベントのデフォルト動作をキャンセルする正しい方法はどれですか？",
    sampleCode:
`function MyForm() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");
  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}`,
    answerCode: 2,
    explanation:
      "フォーム送信時にevent.preventDefault()を呼び出すことで、ブラウザのデフォルト動作であるページリロードを防ぎます。",
    options: [
      { number: 1, text: "handleSubmit関数内でreturn falseを返す" },
      { number: 2, text: "handleSubmit関数内でevent.preventDefault()を呼び出す" },
      { number: 3, text: "onSubmitイベントを削除する" },
      { number: 4, text: "フォームのbuttonにtype='button'を指定する" },
    ],
    tags: ["React", "フォーム", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "React.StrictModeの役割",
    difficulty: "初級",
    content:
      "<React.StrictMode>を使用する主な目的は何でしょうか？以下の選択肢から正しいものを選んでください。",
    sampleCode:
`import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`,
    answerCode: 1,
    explanation:
      "<React.StrictMode>は、開発中に潜在的な問題を検出するための警告やチェックを行い、より安全なコードを書くために役立ちます。",
    options: [
      { number: 1, text: "潜在的な問題を検出し、開発環境で警告を表示する" },
      { number: 2, text: "アプリケーションのパフォーマンスを向上させる" },
      { number: 3, text: "グローバルなスタイルを適用する" },
      { number: 4, text: "サーバーサイドレンダリングをサポートする" },
    ],
    tags: ["React", "StrictMode", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "componentDidMountの利用",
    difficulty: "初級",
    content:
      "クラスコンポーネントで、コンポーネントがマウントされた直後に一度だけ呼ばれるライフサイクルメソッドはどれですか？",
    sampleCode:
`class MyComponent extends React.Component {
  componentDidMount() {
    console.log("Component mounted");
  }
  render() {
    return <div>Hello</div>;
  }
}`,
    answerCode: 1,
    explanation:
      "componentDidMountは、コンポーネントがDOMに挿入された直後に呼ばれるため、初期データの取得などに適しています。",
    options: [
      { number: 1, text: "componentDidMount" },
      { number: 2, text: "componentWillMount" },
      { number: 3, text: "componentDidUpdate" },
      { number: 4, text: "componentWillUnmount" },
    ],
    tags: ["React", "ライフサイクル", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "React Routerの基本的な設定",
    difficulty: "初級",
    content:
      "React Routerを使ってアプリ全体にルーティングを設定する際、全体をラップするために使用するコンポーネントはどれですか？",
    sampleCode:
`import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
    </BrowserRouter>
  );
}`,
    answerCode: 2,
    explanation:
      "<BrowserRouter>は、React Routerでルート全体を管理するために使用されるコンポーネントです。",
    options: [
      { number: 1, text: "<Router>" },
      { number: 2, text: "<BrowserRouter>" },
      { number: 3, text: "<Switch>" },
      { number: 4, text: "<Link>" },
    ],
    tags: ["React", "React Router", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "JSXでHTML属性を指定する方法",
    difficulty: "初級",
    content:
      "ReactのJSXで、HTMLのclass属性を指定する場合の正しい属性名はどれですか？",
    sampleCode:
`function MyComponent() {
  return <div className="container">Content</div>;
}`,
    answerCode: 2,
    explanation:
      "JSXでは、HTMLのclass属性に対応するプロパティとしてclassNameを使用します。",
    options: [
      { number: 1, text: "class" },
      { number: 2, text: "className" },
      { number: 3, text: "classname" },
      { number: 4, text: "cssClass" },
    ],
    tags: ["React", "JSX", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "React.memoの利用",
    difficulty: "初級",
    content:
      "React.memoはどのような目的で使用されるでしょうか？",
    sampleCode:
`const MyComponent = React.memo(function({ value }) {
  return <div>{value}</div>;
});`,
    answerCode: 3,
    explanation:
      "React.memoは、同じpropsの場合に再レンダリングを防ぐことで、パフォーマンス向上に寄与します。",
    options: [
      { number: 1, text: "コンポーネントの状態を管理するため" },
      { number: 2, text: "副作用を実行するため" },
      { number: 3, text: "不要な再レンダリングを防ぐため" },
      { number: 4, text: "コンポーネントを非同期で読み込むため" },
    ],
    tags: ["React", "パフォーマンス", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "条件付きレンダリングでの || 演算子",
    difficulty: "初級",
    content:
      "JSXで||演算子を使用した条件付きレンダリングの挙動として正しいものはどれですか？",
    sampleCode:
`function Message({ text }) {
  return <div>{text || "Default message"}</div>;
}`,
    answerCode: 2,
    explanation:
      "||演算子は、左側の値がfalsyの場合に右側の値を返すため、textがfalsyの場合に'Default message'が表示されます。",
    options: [
      { number: 1, text: "textが真の場合に'Default message'を表示する" },
      { number: 2, text: "textが偽の場合に'Default message'を表示する" },
      { number: 3, text: "常に'Default message'を表示する" },
      { number: 4, text: "textの値に関係なくtextを表示する" },
    ],
    tags: ["React", "JSX", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "stateとpropsの違い",
    difficulty: "初級",
    content:
      "Reactにおいて、stateとpropsの主な違いとして正しいのはどれですか？",
    sampleCode:
`function Child({ name }) {
  return <div>{name}</div>;
}`,
    answerCode: 3,
    explanation:
      "stateはコンポーネント内部で管理される変更可能なデータであり、propsは外部から渡される読み取り専用のデータです。",
    options: [
      { number: 1, text: "どちらも変更可能なデータである" },
      { number: 2, text: "propsはコンポーネント内部で管理され、stateは外部から渡される" },
      { number: 3, text: "stateは内部で変更可能なデータ、propsは外部から渡される読み取り専用のデータ" },
      { number: 4, text: "stateは同期的に更新され、propsは非同期的に更新される" },
    ],
    tags: ["React", "state", "props", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "アロー関数を使ったイベントハンドラの利点",
    difficulty: "初級",
    content:
      "Reactのイベントハンドラでアロー関数を使用する際の主な利点はどれですか？",
    sampleCode:
`function MyButton() {
  return <button onClick={() => console.log("Clicked")}>Click</button>;
}`,
    answerCode: 3,
    explanation:
      "アロー関数を使用することで、thisのバインディングを気にせずにイベントハンドラを定義でき、コードがシンプルになります。",
    options: [
      { number: 1, text: "コードが短くなる" },
      { number: 2, text: "パフォーマンスが向上する" },
      { number: 3, text: "thisのバインディングが不要になる" },
      { number: 4, text: "コンポーネントが自動的に再レンダリングされる" },
    ],
    tags: ["React", "イベント", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "条件式の簡略化手法",
    difficulty: "初級",
    content:
      "ReactのJSXで条件付きレンダリングを簡略化するために、よく使用される手法はどれですか？",
    sampleCode:
`function Alert({ show }) {
  return <div>{show && <span>Alert!</span>}</div>;
}`,
    answerCode: 3,
    explanation:
      "&&演算子を使用することで、条件がtrueの場合のみ後続の要素をレンダリングする簡潔な記述が可能になります。",
    options: [
      { number: 1, text: "||演算子を使用する" },
      { number: 2, text: "if文を直接JSX内に書く" },
      { number: 3, text: "&&演算子を使用して条件付きレンダリングする" },
      { number: 4, text: "switch文を使用する" },
    ],
    tags: ["React", "条件付きレンダリング", "初心者向け"],
    collectionName: "React 初級",
  },

  // Set5: reactProblemsNext (10問)
  {
    title: "Reactコンポーネントの正しいインポート方法",
    difficulty: "初級",
    content:
      "Reactで他のコンポーネントをインポートする際の正しい記述方法はどれですか？",
    sampleCode:
`// Header.js (default export)
export default function Header() {
  return <header>Header</header>;
}

// App.js
import Header from './Header';

function App() {
  return <Header />;
}`,
    answerCode: 1,
    explanation:
      "default exportされたコンポーネントは、import時に任意の名前でインポート可能です。",
    options: [
      { number: 1, text: "import Header from './Header';" },
      { number: 2, text: "import { Header } from './Header';" },
      { number: 3, text: "require('./Header');" },
      { number: 4, text: "include Header from './Header';" },
    ],
    tags: ["React", "インポート", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "React Hooksが使用できる場所",
    difficulty: "初級",
    content:
      "React Hooksはどこで使用することができるか、正しい選択肢はどれですか？",
    sampleCode:
`function MyComponent() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}`,
    answerCode: 1,
    explanation:
      "Hooksは関数コンポーネントまたはカスタムフックの内部でのみ使用できます。",
    options: [
      { number: 1, text: "関数コンポーネントまたはカスタムフック内" },
      { number: 2, text: "クラスコンポーネント内" },
      { number: 3, text: "ループや条件分岐内でのみ" },
      { number: 4, text: "どこでも使用可能" },
    ],
    tags: ["React", "Hooks", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "useStateで初期値に関数を渡す理由",
    difficulty: "初級",
    content:
      "useStateフックで初期値として関数を渡すメリットはどれですか？",
    sampleCode:
`function computeInitial() {
  // 複雑な計算処理
  return 0;
}

function Counter() {
  const [count, setCount] = useState(() => computeInitial());
  return <div>{count}</div>;
}`,
    answerCode: 2,
    explanation:
      "初期値を関数として渡すことで、コンポーネントの初回レンダリング時にのみ計算が実行され、パフォーマンスが向上します。",
    options: [
      { number: 1, text: "毎回再計算される" },
      { number: 2, text: "初回レンダリング時のみ計算され、パフォーマンスが向上する" },
      { number: 3, text: "useStateは関数しか受け取れない" },
      { number: 4, text: "初期値が固定される" },
    ],
    tags: ["React", "useState", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "カスタムフックの命名規則",
    difficulty: "初級",
    content:
      "Reactでカスタムフックを定義する際の命名規則として正しいものはどれですか？",
    sampleCode:
`function useCustomHook() {
  // カスタムフックのロジック
}`,
    answerCode: 1,
    explanation:
      "カスタムフックは必ず「use」で始める名前にする必要があります。",
    options: [
      { number: 1, text: "名前は必ず「use」で始める" },
      { number: 2, text: "名前は必ず「hook」で始める" },
      { number: 3, text: "特に規則はない" },
      { number: 4, text: "大文字で始める必要がある" },
    ],
    tags: ["React", "Hooks", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "childrenプロパティの役割",
    difficulty: "初級",
    content:
      "Reactコンポーネントのchildrenプロパティはどのような役割を果たしますか？",
    sampleCode:
`function Container({ children }) {
  return <div>{children}</div>;
}`,
    answerCode: 2,
    explanation:
      "childrenプロパティは、親コンポーネントから渡された要素を表示するために使用されます。",
    options: [
      { number: 1, text: "内部の状態を管理する" },
      { number: 2, text: "親コンポーネントから渡された要素を表示する" },
      { number: 3, text: "イベントを伝達する" },
      { number: 4, text: "CSSスタイルを適用する" },
    ],
    tags: ["React", "children", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "リストレンダリングでインデックスをkeyに使用する際の注意点",
    difficulty: "初級",
    content:
      "Reactでリストレンダリングを行う際、配列のインデックスをkeyとして使用する場合の注意点はどれですか？",
    sampleCode:
`function List({ items }) {
  return (
    <ul>
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}`,
    answerCode: 2,
    explanation:
      "インデックスをkeyとして使用すると、要素の順序が変化した場合に再レンダリング時のバグが発生する可能性があります。",
    options: [
      { number: 1, text: "パフォーマンスが向上する" },
      { number: 2, text: "リストの順序が変わると予期せぬ再レンダリングが発生する可能性がある" },
      { number: 3, text: "すべての要素がユニークになる" },
      { number: 4, text: "エラーが発生する" },
    ],
    tags: ["React", "リスト", "key", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "React DevToolsの主な利用目的",
    difficulty: "初級",
    content:
      "React DevToolsはどのような目的で使用されるでしょうか？",
    sampleCode:
`// React DevToolsを使用してコンポーネントツリーを検査する`,
    answerCode: 2,
    explanation:
      "React DevToolsは、コンポーネントのツリー、props、stateなどをリアルタイムで検査・デバッグするために使用されます。",
    options: [
      { number: 1, text: "コンポーネントのレンダリングを最適化する" },
      { number: 2, text: "リアルタイムのデバッグと状態の検査を行う" },
      { number: 3, text: "自動テストを実行する" },
      { number: 4, text: "サーバーサイドレンダリングの設定を行う" },
    ],
    tags: ["React", "DevTools", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "イベントハンドラに引数を渡す方法",
    difficulty: "初級",
    content:
      "Reactでイベントハンドラに引数を渡す正しい方法はどれですか？",
    sampleCode:
`function MyButton({ value }) {
  function handleClick(val) {
    console.log(val);
  }
  return <button onClick={() => handleClick(value)}>Click me</button>;
}`,
    answerCode: 2,
    explanation:
      "アロー関数でラップすることで、イベントハンドラに引数を渡すことができます。",
    options: [
      { number: 1, text: "onClick={handleClick(value)}" },
      { number: 2, text: "onClick={() => handleClick(value)}" },
      { number: 3, text: "onClick={handleClick}" },
      { number: 4, text: "onClick={handleClick.bind(this, value)}" },
    ],
    tags: ["React", "イベント", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "コンポーネントの分割の利点",
    difficulty: "初級",
    content:
      "Reactでコンポーネントを小さく分割することの主な利点はどれですか？",
    sampleCode:
`function Header() { return <header>Header</header>; }
function Footer() { return <footer>Footer</footer>; }
function Layout() {
  return (
    <div>
      <Header />
      <main>Content</main>
      <Footer />
    </div>
  );
}`,
    answerCode: 1,
    explanation:
      "小さなコンポーネントに分割することで、コードの再利用性と管理のしやすさが向上します。",
    options: [
      { number: 1, text: "コードの再利用性と管理のしやすさが向上する" },
      { number: 2, text: "レンダリング速度が劇的に向上する" },
      { number: 3, text: "コンポーネント間の依存関係がなくなる" },
      { number: 4, text: "全てのコンポーネントがグローバルにアクセス可能になる" },
    ],
    tags: ["React", "コンポーネント", "初心者向け"],
    collectionName: "React 初級",
  },
  {
    title: "条件付きスタイルの適用方法",
    difficulty: "初級",
    content:
      "Reactで特定の条件に応じたスタイルを適用する正しい方法はどれですか？",
    sampleCode:
`function Alert({ type }) {
  const style = { color: type === 'error' ? 'red' : 'green' };
  return <div style={style}>Message</div>;
}`,
    answerCode: 1,
    explanation:
      "条件に応じたスタイルオブジェクトを作成し、style属性に渡すことで動的なスタイルの適用が可能になります。",
    options: [
      { number: 1, text: "条件に応じたオブジェクトを作成してstyle属性に渡す" },
      { number: 2, text: "常に同じスタイルを適用する" },
      { number: 3, text: "条件付きでCSSファイルをインポートする" },
      { number: 4, text: "style属性に直接条件文を書く" },
    ],
    tags: ["React", "スタイル", "初心者向け"],
    collectionName: "React 初級",
  },  {
    title: "useEffectのクリーンアップ関数の役割",
    difficulty: "初級",
    content:
      "ReactのuseEffectフックにおいて、コンポーネントがアンマウントされる際に実行されるクリーンアップ関数の役割は何ですか？",
    sampleCode:
`import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    const timer = setInterval(() => console.log("Tick"), 1000);
    return () => {
      clearInterval(timer);
      console.log("Cleanup");
    };
  }, []);
  
  return <div>Timer</div>;
}`,
    answerCode: 3,
    explanation:
      "useEffectのクリーンアップ関数は、コンポーネントがアンマウントされる際に、不要になったタイマーやサブスクリプションなどのリソースを解放するために実行されます。",
    options: [
      { number: 1, text: "クリーンアップ関数は、コンポーネントがマウントされる前に初期化処理を行う" },
      { number: 2, text: "クリーンアップ関数は、コンポーネントの再レンダリング時に毎回実行される" },
      { number: 3, text: "クリーンアップ関数は、コンポーネントがアンマウントされる際にリソースの解放などの後始末を行う" },
      { number: 4, text: "クリーンアップ関数は、useEffectの実行を停止するために使用される" },
    ],
    tags: ["React", "useEffect", "Hooks", "初心者向け"],
    collectionName: "React 初級",
  },
];


export default  problemsReactBeginner;