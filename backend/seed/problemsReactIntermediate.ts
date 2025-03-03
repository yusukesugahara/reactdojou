import { TypeProblems } from "../type/typeProblems" ;

const problemsReactIntermediate: TypeProblems = [

    {
      title: "useEffectの依存配列の挙動",
      difficulty: "中級",
      content:
        "次のコードで、useEffectの依存配列にcountを入れる場合と入れない場合の違いを答えなさい。サンプルコードを参考にしてください。",
      sampleCode:
  `import React, { useState, useEffect } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
    useEffect(() => {
      console.log("Countが更新されました:", count);
    }, [count]); // 依存配列にcountが入っている場合
    return (
      <div>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>増やす</button>
      </div>
    );
  }`,
      answerCode: 1,
      explanation:
        "依存配列に変数を指定すると、その変数が更新された時にのみuseEffectが実行されるため、countが変化するたびに副作用が実行されます。",
      options: [
        { number: 1, text: "依存配列にcountを入れると、countが変化するたびにuseEffectが実行される" },
        { number: 2, text: "依存配列にcountを入れると、初回レンダリング時のみ実行される" },
        { number: 3, text: "依存配列にcountを入れると、コンポーネントのアンマウント時のみ実行される" },
        { number: 4, text: "依存配列にcountを入れると、useEffectは全く実行されなくなる" }
      ],
      tags: ["React", "Hooks", "useEffect"],
      collectionName: "React 中級"
    },
    {
      title: "useCallbackの利用場面",
      difficulty: "中級",
      content:
        "次のコードにおいて、useCallbackを利用する主な目的は何ですか？",
      sampleCode:
  `import React, { useState, useCallback } from 'react';
  
  function List({ items, onItemClick }) {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id} onClick={() => onItemClick(item.id)}>{item.name}</li>
        ))}
      </ul>
    );
  }
  
  function App() {
    const [count, setCount] = useState(0);
    const [items] = useState([{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }]);
  
    const handleItemClick = useCallback((id) => {
      console.log('Clicked', id);
    }, []);
  
    return (
      <div>
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>
        <List items={items} onItemClick={handleItemClick} />
      </div>
    );
  }`,
      answerCode: 1,
      explanation:
        "useCallbackは、関数の参照を固定し、不要な再レンダリングを防ぐために利用されます。",
      options: [
        { number: 1, text: "再レンダリングを防ぐために、関数の参照を固定する" },
        { number: 2, text: "stateの更新を同期的に行うため" },
        { number: 3, text: "コンポーネントのアンマウント時に副作用を実行するため" },
        { number: 4, text: "パフォーマンス向上のために、リストの項目をキャッシュするため" }
      ],
      tags: ["React", "Hooks", "useCallback"],
      collectionName: "React 中級"
    },
    {
      title: "React Context APIの利用シーン",
      difficulty: "中級",
      content:
        "React Context APIはどのような場合に使用するのが適切か。下記の選択肢から正しいものを選びなさい。",
      sampleCode:
  `import React, { createContext, useState } from 'react';
  
  export const ThemeContext = createContext();
  
  function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }`,
      answerCode: 2,
      explanation:
        "Context APIは、複数のコンポーネント間でグローバルに状態を共有する場合に適しています。",
      options: [
        { number: 1, text: "小さなコンポーネント間の状態共有には必ずContextを使う" },
        { number: 2, text: "複数のコンポーネント間でグローバルに状態を共有する場合に使用する" },
        { number: 3, text: "コンポーネント内でのみ状態管理を行う場合に使用する" },
        { number: 4, text: "一度しかレンダリングされない静的データを管理するために使用する" }
      ],
      tags: ["React", "Context API"],
      collectionName: "React 中級"
    },
    {
      title: "React.memoの効果",
      difficulty: "中級",
      content:
        "React.memoを使うことで、どのような効果が期待できますか。次の選択肢から最も適切なものを選んでください。",
      sampleCode:
  `import React from 'react';
  
  const Child = React.memo(({ value }) => {
    console.log("Child render");
    return <div>{value}</div>;
  });
  
  function Parent({ count }) {
    return <Child value={count} />;
  }`,
      answerCode: 2,
      explanation:
        "React.memoは、propsが変更された場合にのみ子コンポーネントを再レンダリングさせるため、不要なレンダリングを防ぎます。",
      options: [
        { number: 1, text: "子コンポーネントの再レンダリングを完全に防ぐ" },
        { number: 2, text: "子コンポーネントがpropsの変更時のみ再レンダリングされる" },
        { number: 3, text: "親コンポーネントのレンダリング回数を減らす" },
        { number: 4, text: "コンポーネントの状態管理を簡略化する" }
      ],
      tags: ["React", "パフォーマンス", "React.memo"],
      collectionName: "React 中級"
    },
    {
      title: "カスタムフックの作成",
      difficulty: "中級",
      content:
        "次のコードはウィンドウサイズを取得するカスタムフックuseWindowSizeの例です。コードの中で不適切な部分を選んでください。",
      sampleCode:
  `import { useState, useEffect } from 'react';
  
  function useWindowSize() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
      const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
  }`,
      answerCode: 1,
      explanation:
        "サーバーサイドレンダリング環境ではwindowオブジェクトが存在しないため、初期値としてwindowに依存するのは不適切です。",
      options: [
        { number: 1, text: "初期値としてwindowオブジェクトに依存している点" },
        { number: 2, text: "useEffectの依存配列が空である点" },
        { number: 3, text: "イベントリスナーの登録と解除の方法" },
        { number: 4, text: "stateの更新が非同期である点" }
      ],
      tags: ["React", "カスタムフック", "useEffect"],
      collectionName: "React 中級"
    },
    {
      title: "useReducerの適用例",
      difficulty: "中級",
      content:
        "useStateの代わりにuseReducerを使うメリットとして、適切なものを選びなさい。",
      sampleCode:
  `import React, { useReducer } from 'react';
  
  function reducer(state, action) {
    switch(action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        return state;
    }
  }
  
  function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return (
      <div>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <span>{state.count}</span>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      </div>
    );
  }`,
      answerCode: 2,
      explanation:
        "useReducerは、複雑な状態遷移を一元管理できるため、状態変更のロジックを集中させるのに適しています。",
      options: [
        { number: 1, text: "状態の初期化が容易になる" },
        { number: 2, text: "複雑な状態遷移を一元管理できる" },
        { number: 3, text: "パフォーマンスの向上が自動的に図られる" },
        { number: 4, text: "非同期処理を簡単に扱える" }
      ],
      tags: ["React", "Hooks", "useReducer"],
      collectionName: "React 中級"
    },
    {
      title: "Error Boundaryの実装",
      difficulty: "中級",
      content:
        "Error Boundaryの実装において、下記コードの中で正しいライフサイクルメソッドはどれですか。",
      sampleCode:
  `import React from 'react';
  
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
      // エラーログを記録する
    }
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
  }`,
      answerCode: 3,
      explanation:
        "Error Boundaryでは、getDerivedStateFromErrorとcomponentDidCatchの両方が適切に使用され、エラーのキャッチとログ記録が行われます。",
      options: [
        { number: 1, text: "componentDidCatchのみ" },
        { number: 2, text: "getDerivedStateFromErrorのみ" },
        { number: 3, text: "getDerivedStateFromErrorとcomponentDidCatchの両方" },
        { number: 4, text: "renderのみ" }
      ],
      tags: ["React", "Error Boundary"],
      collectionName: "React 中級"
    },
    {
      title: "useMemoの使いどころ",
      difficulty: "中級",
      content:
        "次のコードでuseMemoが利用される目的として、適切なものを選んでください。",
      sampleCode:
  `import React, { useMemo } from 'react';
  
  function ExpensiveComponent({ num }) {
    const computedValue = useMemo(() => {
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += num;
      }
      return result;
    }, [num]);
    
    return <div>{computedValue}</div>;
  }`,
      answerCode: 2,
      explanation:
        "useMemoは、依存関係が変化しない限り計算結果をキャッシュすることで、不要な再計算を防ぎパフォーマンスを向上させます。",
      options: [
        { number: 1, text: "レンダリング回数を減らすため" },
        { number: 2, text: "計算結果をキャッシュし、不要な再計算を防ぐため" },
        { number: 3, text: "コンポーネントの状態管理を行うため" },
        { number: 4, text: "サイドエフェクトを実行するため" }
      ],
      tags: ["React", "Hooks", "useMemo"],
      collectionName: "React 中級"
    },
    {
      title: "React Portalsの利用例",
      difficulty: "中級",
      content:
        "React Portalsを利用することで、どのようなメリットがありますか。正しい選択肢を選んでください。",
      sampleCode:
  `import React from 'react';
  import ReactDOM from 'react-dom';
  
  function Modal({ children }) {
    return ReactDOM.createPortal(
      <div className="modal">{children}</div>,
      document.getElementById('modal-root')
    );
  }`,
      answerCode: 1,
      explanation:
        "React Portalsは、親コンポーネントのDOM階層の外に子コンポーネントをレンダリングできるため、UIの構造を柔軟に設計できます。",
      options: [
        { number: 1, text: "親コンポーネントのDOM階層の外に子コンポーネントをレンダリングできる" },
        { number: 2, text: "コンポーネント間で状態を共有できる" },
        { number: 3, text: "CSSのスコープを制限できる" },
        { number: 4, "text": "非同期レンダリングを実現できる" }
      ],
      tags: ["React", "Portals"],
      collectionName: "React 中級"
    },
    {
      title: "Suspenseの使い道",
      difficulty: "中級",
      content:
        "React Suspenseは主にどのような目的で使用されるか、正しい選択肢を選びなさい。",
      sampleCode:
  `import React, { Suspense, lazy } from 'react';
  
  const LazyComponent = lazy(() => import('./LazyComponent'));
  
  function App() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    );
  }`,
      answerCode: 2,
      explanation:
        "Suspenseは、非同期に読み込むコンポーネントの読み込み中に表示するフォールバックUIを提供するために利用されます。",
      options: [
        { number: 1, text: "コンポーネントのエラーハンドリング" },
        { number: 2, text: "非同期に読み込むコンポーネントの読み込み中の表示を提供する" },
        { number: 3, text: "パフォーマンスを向上させるためのキャッシュ機能" },
        { number: 4, text: "状態管理をシンプルにするため" }
      ],
      tags: ["React", "Suspense"],
      collectionName: "React 中級"
    },
    {
      title: "React StrictModeの効果と目的",
      difficulty: "中級",
      content:
        "React.StrictModeはコンポーネントにどのような影響を与え、どのような問題を検出するために使われるか？",
      sampleCode:
  `import React from 'react';
  
  function App() {
    return <div>Hello World</div>;
  }
  
  export default function Root() {
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }`,
      answerCode: 2,
      explanation:
        "React.StrictModeは開発モードでのみ有効になり、潜在的な問題や非推奨のライフサイクルメソッドの使用を検出し、警告を発するためのツールです。",
      options: [
        { number: 1, text: "本番環境でパフォーマンスを向上させるための機能" },
        { number: 2, text: "潜在的な問題を検出し、警告を発するための開発ツール" },
        { number: 3, text: "サーバーサイドレンダリングを有効にするための機能" },
        { number: 4, text: "状態管理を自動化するための仕組み" }
      ],
      tags: ["React", "StrictMode"],
      collectionName: "React 中級"
    },
    {
      title: "クラスコンポーネントのthisバインディングの修正",
      difficulty: "中級",
      content:
        "次のクラスコンポーネントコードで、イベントハンドラ内のthisがundefinedになり正しく動作しません。constructor内でのbindを利用して修正する場合、正しい方法はどれか？",
      sampleCode:
  `import React from 'react';
  
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      // 修正が必要な箇所
    }
    handleClick() {
      console.log(this);
    }
    render() {
      return <button onClick={this.handleClick}>Click</button>;
    }
  }`,
      answerCode: 1,
      explanation:
        "constructor内でthis.handleClickをthisにバインドすることで、handleClick内のthisが正しくインスタンスを参照できるようになります。",
      options: [
        { number: 1, text: "constructor内でthis.handleClick = this.handleClick.bind(this)を追加する" },
        { number: 2, text: "render内でonClick={() => this.handleClick()}とする" },
        { number: 3, text: "handleClickをstaticメソッドとして定義する" },
        { number: 4, text: "何も修正せずそのまま使用する" }
      ],
      tags: ["React", "クラスコンポーネント", "this"],
      collectionName: "React 中級"
    },
    {
      title: "Controlled ComponentとUncontrolled Componentの違い",
      difficulty: "中級",
      content:
        "Reactでフォームの状態を管理する際、Controlled ComponentとUncontrolled Componentの主な違いは何ですか？",
      sampleCode:
  `import React, { useState } from 'react';
  
  function ControlledInput() {
    const [value, setValue] = useState('');
    return (
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    );
  }`,
      answerCode: 2,
      explanation:
        "Controlled ComponentはReactの状態で値を管理し、Uncontrolled ComponentはDOMが内部状態を管理するため、状態の同期方法が異なります。",
      options: [
        { number: 1, text: "Controlled Componentは値の初期設定が必要だが、Uncontrolled Componentは不要である" },
        { number: 2, text: "Controlled ComponentはReactの状態で管理され、Uncontrolled ComponentはDOMが管理する" },
        { number: 3, text: "Controlled Componentはパフォーマンスが低下し、Uncontrolled Componentは高パフォーマンスである" },
        { number: 4, text: "Controlled Componentは読み取り専用、Uncontrolled Componentは書き込み可能である" }
      ],
      tags: ["React", "フォーム"],
      collectionName: "React 中級"
    },
    {
      title: "React Router v6のルーティング設定",
      difficulty: "中級",
      content:
        "React Router v6では、どのようにルートを定義するのが正しいか？下記の選択肢から正しい使い方を選んでください。",
      sampleCode:
  `import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import Home from './Home';
  import About from './About';
  
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    );
  }`,
      answerCode: 2,
      explanation:
        "React Router v6では、Routesコンポーネント内にRouteを子要素として定義し、それぞれにelementプロパティでレンダリングするコンポーネントを指定します。",
      options: [
        { number: 1, text: "Routeコンポーネントの外でRoutesを定義する" },
        { number: 2, text: "Routesコンポーネント内でRouteを子要素として定義する" },
        { number: 3, text: "Routeコンポーネントはelementプロパティを必要としない" },
        { number: 4, text: "RoutesコンポーネントはReact Router v6で非推奨である" }
      ],
      tags: ["React", "React Router", "ルーティング"],
      collectionName: "React 中級"
    },
    {
      title: "Higher-Order Componentsの利点",
      difficulty: "中級",
      content: "Higher-Order Component (HOC) はどのような目的で使用されるのか？",
      sampleCode:
  `import React from 'react';
  
  function withLogger(WrappedComponent) {
    return function(props) {
      console.log('Props:', props);
      return <WrappedComponent {...props} />;
    }
  }
  
  function MyComponent({ message }) {
    return <div>{message}</div>;
  }
  
  const MyComponentWithLogger = withLogger(MyComponent);`,
      answerCode: 2,
      explanation:
        "HOCは、共通のロジックや機能を複数のコンポーネントに再利用するために、コンポーネントをラップして機能拡張を行うパターンです。",
      options: [
        { number: 1, text: "コンポーネントのパフォーマンスを向上させるため" },
        { number: 2, text: "共通のロジックを再利用し、機能を追加するため" },
        { number: 3, text: "コンポーネントのスタイルを動的に変更するため" },
        { number: 4, text: "子コンポーネントの状態を管理するため" }
      ],
      tags: ["React", "HOC"],
      collectionName: "React 中級"
    },
    {
      title: "レンダープロップスのパターン",
      difficulty: "中級",
      content:
        "レンダープロップスパターンは、どのような目的で使用されるのでしょうか？",
      sampleCode:
  `import React from 'react';
  
  function DataProvider({ render }) {
    const data = { message: "Hello" };
    return render(data);
  }
  
  function App() {
    return (
      <DataProvider render={(data) => <div>{data.message}</div>} />
    );
  }`,
      answerCode: 1,
      explanation:
        "レンダープロップスは、関数をプロップとして渡すことで、子コンポーネントのレンダリングロジックを柔軟に制御し、再利用性を向上させるために用いられます。",
      options: [
        { number: 1, text: "レンダリングロジックを動的に制御し、再利用性を向上させるため" },
        { number: 2, text: "コンポーネントのパフォーマンスを大幅に向上させるため" },
        { number: 3, text: "状態管理を簡略化するため" },
        { number: 4, text: "イベント処理を効率化するため" }
      ],
      tags: ["React", "レンダープロップス"],
      collectionName: "React 中級"
    },
    {
      title: "非同期処理とuseEffect内でのクリーンアップ",
      difficulty: "中級",
      content:
        "useEffect内で非同期処理を行う際、クリーンアップ関数が必要となる理由は何ですか？",
      sampleCode:
  `import React, { useState, useEffect } from 'react';
  
  function DataFetcher() {
    const [data, setData] = useState(null);
    useEffect(() => {
      let isMounted = true;
      async function fetchData() {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        if (isMounted) {
          setData(result);
        }
      }
      fetchData();
      return () => { isMounted = false; };
    }, []);
    return <div>{data ? data.message : 'Loading...'}</div>;
  }`,
      answerCode: 2,
      explanation:
        "クリーンアップ関数は、コンポーネントのアンマウント後に非同期処理が状態更新を行わないようにし、メモリリークやエラーを防止するために必要です。",
      options: [
        { number: 1, text: "非同期処理の実行回数を減らすため" },
        { number: 2, text: "コンポーネントがアンマウントされた後の不要な状態更新を防ぐため" },
        { number: 3, text: "エラーハンドリングを簡素化するため" },
        { number: 4, text: "依存配列の警告を回避するため" }
      ],
      tags: ["React", "Hooks", "useEffect", "非同期処理"],
      collectionName: "React 中級"
    },
    {
      title: "リストレンダリングにおけるkey属性の役割",
      difficulty: "中級",
      content:
        "Reactでリストをレンダリングする際、key属性が重要な理由は何ですか？",
      sampleCode:
  `import React from 'react';
  
  function ItemList({ items }) {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }`,
      answerCode: 2,
      explanation:
        "key属性は、各リストアイテムを一意に識別し、再レンダリング時の差分検出を効率化するために必要です。",
      options: [
        { number: 1, text: "リストの項目数を制限するため" },
        { number: 2, text: "各アイテムを一意に識別し、効率的な再レンダリングを行うため" },
        { number: 3, text: "スタイリングを適用するため" },
        { number: 4, text: "非表示アイテムを自動的に削除するため" }
      ],
      tags: ["React", "リスト", "key"],
      collectionName: "React 中級"
    },
    {
      title: "PropTypesを使った型チェックの利点",
      difficulty: "中級",
      content:
        "ReactでPropTypesを利用することで得られる主なメリットは何でしょうか？",
      sampleCode:
  `import React from 'react';
  import PropTypes from 'prop-types';
  
  function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
  }
  
  Greeting.propTypes = {
    name: PropTypes.string.isRequired,
  };`,
      answerCode: 1,
      explanation:
        "PropTypesは、コンポーネントが受け取るプロパティの型を検証し、不正な値が渡された場合に警告を出すことで、開発時のバグを早期に発見するのに役立ちます。",
      options: [
        { number: 1, text: "プロパティの型を検証し、バグの早期発見を助ける" },
        { number: 2, text: "コンポーネントのパフォーマンスを向上させる" },
        { number: 3, text: "サーバーサイドレンダリングを容易にする" },
        { number: 4, text: "コンポーネントのスタイルの整合性を保証する" }
      ],
      tags: ["React", "PropTypes", "型チェック"],
      collectionName: "React 中級"
    },
    {
      title: "SuspenseとError Boundaryの組み合わせ",
      difficulty: "中級",
      content:
        "React SuspenseとError Boundaryを組み合わせる場合、どのような利点があり、どのような点に注意すべきでしょうか？",
      sampleCode:
  `import React, { Suspense, lazy } from 'react';
  
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    componentDidCatch(error, info) {
      console.error(error, info);
    }
    render() {
      if (this.state.hasError) {
        return <h1>エラーが発生しました。</h1>;
      }
      return this.props.children;
    }
  }
  
  const LazyComponent = lazy(() => import('./LazyComponent'));
  
  function App() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>読み込み中...</div>}>
          <LazyComponent />
        </Suspense>
      </ErrorBoundary>
    );
  }`,
      answerCode: 2,
      explanation:
        "Suspenseは非同期コンポーネントの読み込み中にフォールバックUIを提供し、Error Boundaryはエラー発生時に適切なフォールバックUIを表示するため、両者を併用することでユーザー体験を向上させます。",
      options: [
        { number: 1, text: "Suspenseはエラーをキャッチし、Error Boundaryは非同期処理を管理する" },
        { number: 2, text: "Suspenseは読み込み中のUIを提供し、Error Boundaryはエラーをキャッチして適切な対応を行う" },
        { number: 3, text: "どちらも同じ役割を持つため、併用する必要はない" },
        { number: 4, text: "Error BoundaryがフォールバックUIを提供し、Suspenseがエラーをログに記録する" }
      ],
      tags: ["React", "Suspense", "Error Boundary"],
      collectionName: "React 中級"
    },
    {
      title: "React Fragmentの活用とメリット",
      difficulty: "中級",
      content:
        "React Fragmentを使用するメリットとその利用方法として最も適切なものを選んでください。",
      sampleCode:
  `import React from 'react';
  
  function List() {
    return (
      <React.Fragment>
        <li>Item 1</li>
        <li>Item 2</li>
      </React.Fragment>
    );
  }`,
      answerCode: 1,
      explanation:
        "Fragmentは余分なDOMノードを生成せずに複数の子要素をグループ化でき、DOM構造をシンプルに保つことができます。",
      options: [
        { number: 1, text: "複数の子要素をラップするが、余分なDOM要素を生成しない" },
        { number: 2, text: "スタイルを適用するための特別なラッパー" },
        { number: 3, text: "エラーバウンダリとして機能する" },
        { number: 4, text: "状態管理を行うためのコンテナ" }
      ],
      tags: ["React", "Fragment"],
      collectionName: "React 中級"
    },
    {
      title: "React Portalsのイベント伝播",
      difficulty: "中級",
      content:
        "React Portalsを使用した場合、内部で発生したイベントはどのように伝播するか、最も適切な説明を選んでください。",
      sampleCode:
  `import React from 'react';
  import ReactDOM from 'react-dom';
  
  function Modal() {
    return (
      <button onClick={() => console.log('Clicked in portal')}>Click Me</button>
    );
  }
  
  function App() {
    return (
      <div onClick={() => console.log('Clicked in parent')}>
        {ReactDOM.createPortal(<Modal />, document.getElementById('modal-root'))}
      </div>
    );
  }`,
      answerCode: 2,
      explanation:
        "React Portals内で発生したイベントは、通常のバブリングルールに従い、親コンポーネントまで伝播します。",
      options: [
        { number: 1, text: "ポータル内でイベントが止まり、親には伝播しない" },
        { number: 2, text: "通常通りバブリングし、親コンポーネントに伝播する" },
        { number: 3, text: "キャプチャリングフェーズのみで伝播する" },
        { number: 4, text: "独自のイベントシステムが働く" }
      ],
      tags: ["React", "Portals", "イベント"],
      collectionName: "React 中級"
    },
    {
      title: "関数コンポーネントでのライフサイクル管理",
      difficulty: "中級",
      content:
        "関数コンポーネントでクラスコンポーネントのライフサイクルメソッドの代替として一般的に利用されるフックはどれか？",
      sampleCode:
  `import React, { useEffect } from 'react';
  
  function MyComponent() {
    useEffect(() => {
      // componentDidMount相当の処理
      console.log('Mounted');
      return () => {
        // componentWillUnmount相当の処理
        console.log('Unmounted');
      };
    }, []);
    return <div>Hello</div>;
  }`,
      answerCode: 1,
      explanation:
        "useEffectフックは、マウント、更新、アンマウント時の処理を一括で扱えるため、ライフサイクルメソッドの代替として使用されます。",
      options: [
        { number: 1, text: "useEffect" },
        { number: 2, text: "useCallback" },
        { number: 3, text: "useMemo" },
        { number: 4, text: "useReducer" }
      ],
      tags: ["React", "Hooks", "ライフサイクル"],
      collectionName: "React 中級"
    },
    {
      title: "カスタムフックでの入力管理",
      difficulty: "中級",
      content:
        "以下のカスタムフックuseInputを利用するメリットとして最も適切なものを選んでください。",
      sampleCode:
  `import { useState } from 'react';
  
  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
      setValue(e.target.value);
    }
    return { value, onChange: handleChange };
  }
  
  function InputField() {
    const inputProps = useInput('');
    return <input {...inputProps} />;
  }`,
      answerCode: 2,
      explanation:
        "カスタムフックは、入力管理のロジックを複数のコンポーネントで再利用可能な形に切り出すことで、コードの重複を避け、保守性を向上させます。",
      options: [
        { number: 1, text: "入力のバリデーションを自動化する" },
        { number: 2, text: "複数コンポーネントで再利用可能な入力管理ロジックを提供する" },
        { number: 3, text: "外部ライブラリの必要性をなくす" },
        { number: 4, text: "レンダリング回数を削減する" }
      ],
      tags: ["React", "カスタムフック", "useState"],
      collectionName: "React 中級"
    },
    {
      title: "React Lazy Loadingの潜在的なデメリット",
      difficulty: "中級",
      content:
        "React.lazyを使用してコンポーネントを遅延読み込みする際に考慮すべき潜在的なデメリットはどれか？",
      sampleCode:
  `import React, { Suspense, lazy } from 'react';
  const LazyComponent = lazy(() => import('./LazyComponent'));
  
  function App() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    );
  }`,
      answerCode: 3,
      explanation:
        "遅延読み込みにより初回の読み込み時にフォールバックUIが表示されるため、一時的にユーザー体験が低下する可能性があります。",
      options: [
        { number: 1, text: "コンポーネントのレンダリングパフォーマンスが常に低下する" },
        { number: 2, text: "非同期エラーが必ず発生する" },
        { number: 3, text: "初回読み込み時にフォールバックUIが表示され、UXが一時的に低下する可能性がある" },
        { number: 4, text: "状態管理が複雑になる" }
      ],
      tags: ["React", "Lazy Loading", "Suspense"],
      collectionName: "React 中級"
    },
    {
      title: "Context利用時のパフォーマンス最適化手法",
      difficulty: "中級",
      content:
        "React Contextを使用する際、不要な再レンダリングを防ぐための最適化手法として適切なものはどれか？",
      sampleCode:
  `import React, { createContext, useContext, memo } from 'react';
  
  const MyContext = createContext();
  
  function Child() {
    const value = useContext(MyContext);
    return <div>{value}</div>;
  }
  
  const MemoizedChild = memo(Child);
  
  function Parent({ value }) {
    return (
      <MyContext.Provider value={value}>
        <MemoizedChild />
      </MyContext.Provider>
    );
  }`,
      answerCode: 2,
      explanation:
        "Contextの値が更新されると、そのコンテキストを利用する全てのコンポーネントが再レンダリングされるため、必要な部分だけに分割するかメモ化で最適化する必要があります。",
      options: [
        { number: 1, text: "Contextを使用しない" },
        { number: 2, text: "コンテキストの値を分割し、必要な部分だけを更新する" },
        { number: 3, text: "全てのコンポーネントを常に再レンダリングさせる" },
        { number: 4, text: "Contextの値を常に同じに保つ" }
      ],
      tags: ["React", "Context", "パフォーマンス"],
      collectionName: "React 中級"
    },
    {
      title: "クラスコンポーネントにおける再レンダリング最適化",
      difficulty: "中級",
      content:
        "クラスコンポーネントで不要な再レンダリングを防ぐために、適切な方法として最も正しいものはどれか？",
      sampleCode:
  `import React from 'react';
  
  class MyComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.value !== this.props.value;
    }
    render() {
      return <div>{this.props.value}</div>;
    }
  }`,
      answerCode: 1,
      explanation:
        "shouldComponentUpdateを実装することで、必要な場合のみ再レンダリングが行われ、パフォーマンスを向上させることができます。",
      options: [
        { number: 1, text: "shouldComponentUpdateでpropsの変更を検出し、再レンダリングを制御する" },
        { number: 2, text: "renderメソッド内で直接stateを更新する" },
        { number: 3, text: "componentDidMountで再レンダリングを防ぐ" },
        { number: 4, text: "setStateを使用しない" }
      ],
      tags: ["React", "クラスコンポーネント", "パフォーマンス"],
      collectionName: "React 中級"
    },
    {
      title: "Reactと外部状態管理ライブラリの連携メリット",
      difficulty: "中級",
      content:
        "ReduxやMobXなどの外部状態管理ライブラリをReactと連携する主なメリットとして最も適切なものはどれか？",
      sampleCode:
  `import React from 'react';
  import { Provider } from 'react-redux';
  import store from './store';
  import App from './App';
  
  function Root() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }`,
      answerCode: 2,
      explanation:
        "外部状態管理ライブラリは、グローバルな状態を一元管理することで、状態の変更追跡やデバッグが容易になるメリットがあります。",
      options: [
        { number: 1, text: "コンポーネント間のローカルな状態を完全に排除する" },
        { number: 2, text: "アプリ全体の状態を一元管理し、状態の追跡とデバッグを容易にする" },
        { number: 3, text: "コンポーネントのレンダリングを完全に停止する" },
        { number: 4, text: "外部APIとの通信を自動化する" }
      ],
      tags: ["React", "Redux", "MobX", "状態管理"],
      collectionName: "React 中級"
    },
    {
      title: "JSXにおける条件付きレンダリングの実装方法",
      difficulty: "中級",
      content:
        "JSXで条件付きレンダリングを実装する際、最も一般的な方法として正しいものはどれか？",
      sampleCode:
  `import React from 'react';
  
  function Greeting({ isLoggedIn }) {
    return (
      <div>
        {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>}
      </div>
    );
  }`,
      answerCode: 1,
      explanation:
        "三項演算子を用いることで、条件に応じた異なる要素を簡潔にレンダリングすることができます。",
      options: [
        { number: 1, text: "三項演算子を使用して条件に応じたコンポーネントを返す" },
        { number: 2, text: "if文を直接JSX内に記述する" },
        { number: 3, text: "switch文を用いて条件を分岐する" },
        { number: 4, text: "全てのコンポーネントを同時にレンダリングし、CSSで表示/非表示を制御する" }
      ],
      tags: ["React", "JSX", "条件付きレンダリング"],
      collectionName: "React 中級"
    },
    {
      title: "Hooksの利用ルールの遵守",
      difficulty: "中級",
      content:
        "React Hooksを正しく利用するための基本ルールとして、最も適切なものはどれか？",
      sampleCode:
  `import React, { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
  }`,
      answerCode: 2,
      explanation:
        "Hooksは必ずコンポーネントの最上位で呼び出す必要があり、条件分岐やループ内での呼び出しは禁止されています。",
      options: [
        { number: 1, text: "Hooksは任意の場所で呼び出しても問題ない" },
        { number: 2, text: "Hooksは必ずコンポーネントの最上位で呼び出す必要がある" },
        { number: 3, text: "Hooksはクラスコンポーネントでも利用可能である" },
        { number: 4, text: "Hooksは副作用を持たないため、どこで呼び出してもよい" }
      ],
      tags: ["React", "Hooks", "ルール"],
      collectionName: "React 中級"
    },
    {
      title: "useLayoutEffectの適切な利用シーン",
      difficulty: "中級",
      content:
        "useLayoutEffectはuseEffectと似ていますが、レンダリング後、ブラウザの描画前に同期的に実行されます。どのような状況でuseLayoutEffectを使用するのが適切でしょうか？",
      sampleCode:
  `import React, { useLayoutEffect, useState } from 'react';
  
  function MeasureComponent() {
    const [width, setWidth] = useState(0);
    const ref = React.useRef(null);
    
    useLayoutEffect(() => {
      if (ref.current) {
        setWidth(ref.current.getBoundingClientRect().width);
      }
    }, []);
    
    return (
      <div ref={ref}>
        幅: {width}
      </div>
    );
  }`,
      answerCode: 1,
      explanation:
        "useLayoutEffectはDOMのレイアウトを計測し、ブラウザが画面に描画する前に同期的に処理を行いたい場合に適しています。",
      options: [
        { number: 1, text: "DOMの計測や即時のレイアウト変更が必要な場合に使用する" },
        { number: 2, text: "非同期データの取得に使用する" },
        { number: 3, text: "アニメーションの実装に必ず使用する" },
        { number: 4, text: "通常の副作用処理はuseLayoutEffectで行う" }
      ],
      tags: ["React", "Hooks", "useLayoutEffect"],
      collectionName: "React 中級"
    },
    {
      title: "React Router v6におけるネストされたルートの設定",
      difficulty: "中級",
      content:
        "React Router v6でネストされたルートを設定する際、正しい記述方法はどれか？",
      sampleCode:
  `import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import Dashboard from './Dashboard';
  import Analytics from './Analytics';
  import Reports from './Reports';
  
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }`,
      answerCode: 2,
      explanation:
        "React Router v6では、親Routeの子要素としてネストされたRouteを定義することで、子ルートが親ルートのレイアウト内でレンダリングされます。",
      options: [
        { number: 1, text: "親コンポーネントの中で直接子コンポーネントをレンダリングする" },
        { number: 2, text: "Routes内で親Routeの子要素としてネストされたRouteを定義する" },
        { number: 3, text: "Routeのelementプロパティ内に子Routeを記述する" },
        { number: 4, text: "BrowserRouter内でネストされたRouteを自動的に生成する" }
      ],
      tags: ["React", "React Router", "ルーティング"],
      collectionName: "React 中級"
    },
    {
      title: "useImperativeHandleフックの目的",
      difficulty: "中級",
      content:
        "useImperativeHandleは、forwardRefと組み合わせて使用されるフックですが、どのような状況で利用するのが適切か？",
      sampleCode:
  `import React, { forwardRef, useImperativeHandle, useRef } from 'react';
  
  const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      }
    }));
    return <input ref={inputRef} {...props} />;
  });
  
  function Parent() {
    const ref = useRef();
    return (
      <div>
        <CustomInput ref={ref} />
        <button onClick={() => ref.current.focus()}>Focus Input</button>
      </div>
    );
  }`,
      answerCode: 2,
      explanation:
        "useImperativeHandleを使用すると、子コンポーネントの内部実装を隠蔽し、親コンポーネントに対して特定のメソッドだけを公開できます。",
      options: [
        { number: 1, text: "子コンポーネントの全てのメソッドを親に公開するため" },
        { number: 2, text: "子コンポーネントの特定のメソッドのみを親に公開し、実装を隠蔽するため" },
        { number: 3, text: "状態管理を簡略化するために使用する" },
        { number: 4, text: "副作用を制御するために使用する" }
      ],
      tags: ["React", "Hooks", "useImperativeHandle"],
      collectionName: "React 中級"
    },
    {
      title: "forwardRefの利用目的と動作",
      difficulty: "中級",
      content:
        "ReactのforwardRefを使用する目的は何でしょうか？下記のコード例を参考に、正しい説明を選んでください。",
      sampleCode:
  `import React, { forwardRef } from 'react';
  
  const FancyButton = forwardRef((props, ref) => (
    <button ref={ref} className="fancy-button">
      {props.children}
    </button>
  ));
  
  function Parent() {
    const buttonRef = React.useRef();
    return <FancyButton ref={buttonRef}>Click Me</FancyButton>;
  }`,
      answerCode: 1,
      explanation:
        "forwardRefを使用することで、関数コンポーネントでも親コンポーネントから子コンポーネントのDOM要素やインスタンスに直接アクセスできるようになります。",
      options: [
        { number: 1, text: "親コンポーネントから子コンポーネントのDOM要素やインスタンスへの参照を渡すため" },
        { number: 2, text: "子コンポーネントの状態管理を親に委譲するため" },
        { number: 3, text: "コンポーネントのレンダリングを制御するため" },
        { number: 4, text: "エラーハンドリングを簡略化するため" }
      ],
      tags: ["React", "forwardRef", "Hooks"],
      collectionName: "React 中級"
    },
    {
      title: "usePreviousフックの目的と実装",
      difficulty: "中級",
      content:
        "カスタムフックusePreviousは、どのような目的で使用されるか？以下の実装例を参考に、正しい説明を選んでください。",
      sampleCode:
  `import { useRef, useEffect } from 'react';
  
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
  
  function MyComponent({ count }) {
    const prevCount = usePrevious(count);
    return <div>現在: {count}, 前回: {prevCount}</div>;
  }`,
      answerCode: 3,
      explanation:
        "usePreviousは、前回のレンダリング時の値を保持し、比較するためにuseRefを利用して実装されます。",
      options: [
        { number: 1, text: "最新の値を常に保持するために使用する" },
        { number: 2, text: "前回のレンダリング時のDOM状態を取得するために使用する" },
        { number: 3, text: "前回のレンダリング時の値を保持し、比較するためにuseRefを利用する" },
        { number: 4, text: "非同期処理の結果をキャッシュするために使用する" }
      ],
      tags: ["React", "カスタムフック", "useRef"],
      collectionName: "React 中級"
    },
    {
      title: "useStateの非同期更新とバッチ処理",
      difficulty: "中級",
      content:
        "ReactでuseStateの更新が非同期にバッチ処理される主な理由は何でしょうか？",
      sampleCode:
  `import React, { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
    function handleClick() {
      setCount(count + 1);
      setCount(count + 1);
    }
    return <button onClick={handleClick}>Count: {count}</button>;
  }`,
      answerCode: 2,
      explanation:
        "Reactはパフォーマンス向上のため、複数の状態更新をまとめて一度に処理し、不要な再レンダリングを防いでいます。",
      options: [
        { number: 1, text: "状態更新を同期的に処理するため" },
        { number: 2, text: "パフォーマンス向上のために複数の更新をバッチ処理するため" },
        { number: 3, text: "状態の変更を追跡できるようにするため" },
        { number: 4, text: "非同期処理を排除するため" }
      ],
      tags: ["React", "Hooks", "useState", "非同期"],
      collectionName: "React 中級"
    },
    {
      title: "useEffectの依存配列が空の場合の動作",
      difficulty: "中級",
      content:
        "useEffectフックの依存配列が空の場合、どのタイミングで副作用が実行されるか正しいものを選んでください。",
      sampleCode:
  `import React, { useEffect } from 'react';
  
  function Example() {
    useEffect(() => {
      console.log('Effect executed');
    }, []);
    return <div>Hello</div>;
  }`,
      answerCode: 1,
      explanation:
        "依存配列が空の場合、useEffectはコンポーネントのマウント時に一度だけ実行されます。",
      options: [
        { number: 1, text: "コンポーネントの初回レンダリング時のみ実行される" },
        { number: 2, text: "毎回レンダリング時に実行される" },
        { number: 3, text: "コンポーネントのアンマウント時にのみ実行される" },
        { number: 4, text: "レンダリングとは無関係に定期的に実行される" }
      ],
      tags: ["React", "Hooks", "useEffect"],
      collectionName: "React 中級"
    },
    {
      title: "useMemoを使った計算結果のメモ化",
      difficulty: "中級",
      content:
        "useMemoフックはどのようなケースで使用するのが適切か、下記のサンプルコードを参考に正しい説明を選んでください。",
      sampleCode:
  `import React, { useMemo } from 'react';
  
  function ExpensiveCalculation({ num }) {
    const computedValue = useMemo(() => {
      let total = 0;
      for (let i = 0; i < 1000000; i++) {
        total += num;
      }
      return total;
    }, [num]);
    
    return <div>{computedValue}</div>;
  }`,
      answerCode: 1,
      explanation:
        "useMemoは、依存する値が変更されない限り、計算結果を再利用してパフォーマンスを向上させるために使用されます。",
      options: [
        { number: 1, text: "依存する値が変更されない限り、計算結果を再利用してパフォーマンスを向上させるため" },
        { number: 2, text: "常に最新の計算結果を取得するために使用する" },
        { number: 3, text: "状態管理を簡略化するために使用する" },
        { number: 4, text: "副作用を排除するために使用する" }
      ],
      tags: ["React", "Hooks", "useMemo"],
      collectionName: "React 中級"
    },
    {
      title: "PureComponentの利用効果",
      difficulty: "中級",
      content:
        "クラスコンポーネントでPureComponentを使用する主な利点は何でしょうか？",
      sampleCode:
  `import React from 'react';
  
  class MyPureComponent extends React.PureComponent {
    render() {
      return <div>{this.props.value}</div>;
    }
  }`,
      answerCode: 2,
      explanation:
        "PureComponentは、propsとstateの浅い比較を行い、変更がない場合は再レンダリングをスキップすることでパフォーマンスを向上させます。",
      options: [
        { number: 1, text: "全ての状態更新を同期的に処理する" },
        { number: 2, text: "propsとstateの浅い比較により、不要な再レンダリングを防ぐ" },
        { number: 3, text: "内部で自動的にエラーハンドリングを行う" },
        { number: 4, text: "外部APIとの通信を自動化する" }
      ],
      tags: ["React", "PureComponent", "パフォーマンス"],
      collectionName: "React 中級"
    },
    {
      title: "Hooksでエラーハンドリングを行う方法の限界",
      difficulty: "中級",
      content:
        "Reactではエラーバウンダリはクラスコンポーネントで実装されます。Hooksでは同様のエラーハンドリングが難しい理由は何でしょうか？",
      sampleCode:
  `import React, { useEffect } from 'react';
  
  function FaultyComponent() {
    useEffect(() => {
      throw new Error("Test error");
    }, []);
    return <div>Faulty</div>;
  }`,
      answerCode: 3,
      explanation:
        "現時点でHooksはエラーバウンダリとして機能するライフサイクルメソッド（componentDidCatchなど）を提供しておらず、エラーをキャッチする仕組みが組み込まれていません。",
      options: [
        { number: 1, text: "Hooksはエラーを自動的に処理するためエラーバウンダリは不要である" },
        { number: 2, text: "Hooksはエラーバウンダリを内部で実装している" },
        { number: 3, text: "エラーバウンダリはライフサイクルメソッドが必要で、Hooksではそれらを使用できない" },
        { number: 4, text: "Hooksは同期的に動作するため、エラーバウンダリが不要である" }
      ],
      tags: ["React", "Hooks", "エラーバウンダリ"],
      collectionName: "React 中級"
    },
    {
      title: "useDebugValueの使用目的",
      difficulty: "中級",
      content:
        "Reactのカスタムフック内でuseDebugValueはどのような目的で使用されるか、正しい説明を選んでください。",
      sampleCode:
  `import { useDebugValue } from 'react';
  
  function useCustomHook(value) {
    useDebugValue(value);
    // 他のロジック
    return value;
  }`,
      answerCode: 2,
      explanation:
        "useDebugValueは、カスタムフックの内部状態をReact Developer Toolsで見やすくするために使用されます。",
      options: [
        { number: 1, text: "カスタムフックのパフォーマンスを向上させるため" },
        { number: 2, text: "カスタムフックの内部状態を開発者ツールに表示するため" },
        { number: 3, text: "非同期処理の結果をキャッシュするため" },
        { number: 4, text: "エラーハンドリングを簡略化するため" }
      ],
      tags: ["React", "Hooks", "useDebugValue"],
      collectionName: "React 中級"
    },
    {
      title: "Contextの再レンダリング最適化",
      difficulty: "中級",
      content:
        "Context APIでコンテキストの値が更新された際、全てのコンテキスト利用コンポーネントが再レンダリングされる現象を防ぐための最適な対策はどれか？",
      sampleCode:
  `import React, { createContext, useContext } from 'react';
  
  const MyContext = createContext();
  
  function Child() {
    const value = useContext(MyContext);
    return <div>{value}</div>;
  }`,
      answerCode: 3,
      explanation:
        "コンテキストの値を適切に分割し、必要な部分だけ更新することで、不要な再レンダリングを最小限に抑えることができます。",
      options: [
        { number: 1, text: "全てのコンテキスト利用コンポーネントをReact.memoでラップする" },
        { number: 2, text: "Contextの値を常に同一オブジェクトにする" },
        { number: 3, text: "コンテキストの値を細かく分割し、必要な部分のみ更新する" },
        { number: 4, text: "Context APIを使用せず、propsで全て伝達する" }
      ],
      tags: ["React", "Context", "パフォーマンス"],
      collectionName: "React 中級"
    },
    {
      title: "React Concurrent Modeの基本",
      difficulty: "中級",
      content:
        "React Concurrent Modeはどのようなメリットを提供するか、最も適切な説明を選んでください。",
      sampleCode: "",
      answerCode: 2,
      explanation:
        "Concurrent Modeは、ユーザーインタラクション中にレンダリングを中断し、レスポンスを向上させるための仕組みです。",
      options: [
        { number: 1, text: "全てのレンダリングを同期的に行うため、予測可能な動作を保証する" },
        { number: 2, text: "ユーザーインタラクション中にレンダリングを中断し、レスポンスを向上させる" },
        { number: 3, text: "バックグラウンドでのみデータのプリフェッチを行う" },
        { number: 4, text: "非同期データのフェッチを完全に自動化する" }
      ],
      tags: ["React", "Concurrent Mode", "パフォーマンス"],
      collectionName: "React 中級"
    },
    {
      title: "Suspense for Data Fetchingの注意点",
      difficulty: "中級",
      content:
        "Suspenseを用いてデータフェッチングを行う際、開発者が注意すべき点として最も正しいものはどれか？",
      sampleCode:
  `import React, { Suspense, lazy } from 'react';
  
  const DataComponent = lazy(() => import('./DataComponent'));
  
  function App() {
    return (
      <Suspense fallback={<div>Loading data...</div>}>
        <DataComponent />
      </Suspense>
    );
  }`,
      answerCode: 2,
      explanation:
        "Suspenseを利用する際は、非同期データの読み込み状態を適切に管理するためにfallbackが必要です。",
      options: [
        { number: 1, text: "データフェッチ中は全てのコンポーネントが停止する" },
        { number: 2, text: "非同期データの読み込み状態を適切に管理するためにfallbackが必要" },
        { number: 3, text: "必ずエラーが発生するため使用しない方が良い" },
        { number: 4, text: "同期的にデータが読み込まれるので特別な対策は不要" }
      ],
      tags: ["React", "Suspense", "Data Fetching"],
      collectionName: "React 中級"
    },
    {
      title: "React.memoとuseMemoの違い",
      difficulty: "中級",
      content:
        "React.memoとuseMemoはそれぞれどのような目的で使用されるか、正しい説明を選んでください。",
      sampleCode:
  `import React, { useMemo } from 'react';
  
  const ExpensiveComponent = React.memo(({ value }) => {
    const computedValue = useMemo(() => value * 2, [value]);
    return <div>{computedValue}</div>;
  });`,
      answerCode: 3,
      explanation:
        "React.memoはコンポーネントの再レンダリングを防ぎ、useMemoは計算結果をキャッシュするために使用されます。",
      options: [
        { number: 1, text: "どちらも同じ目的で、再レンダリングを完全に防ぐ" },
        { number: 2, text: "React.memoは関数コンポーネント専用で、useMemoはクラスコンポーネント専用" },
        { number: 3, text: "React.memoはコンポーネントの再レンダリングを防ぎ、useMemoは計算結果をキャッシュする" },
        { number: 4, text: "React.memoはキャッシュを行い、useMemoはレンダリングをスキップする" }
      ],
      tags: ["React", "Hooks", "パフォーマンス"],
      collectionName: "React 中級"
    },
    {
      title: "useReducerの初期化関数の違い",
      difficulty: "中級",
      content:
        "useReducerフックで初期状態を設定する際、初期化関数を使用するメリットは何か、正しいものを選んでください。",
      sampleCode:
  `import React, { useReducer } from 'react';
  
  function reducer(state, action) {
    switch(action.type) {
      case 'increment':
        return { count: state.count + 1 };
      default:
        return state;
    }
  }
  
  function init(initialCount) {
    return { count: initialCount };
  }
  
  function Counter({ initialCount }) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);
    return <div>{state.count}</div>;
  }`,
      answerCode: 1,
      explanation:
        "初期化関数を使用することで、初期状態の計算が必要な場合にその計算を1度だけ実行し、パフォーマンスの向上が期待できます。",
      options: [
        { number: 1, text: "初期化関数を渡すと、初期状態の計算が必要な場合にのみ実行される" },
        { number: 2, text: "初期化関数は常に再実行され、最新の状態に更新される" },
        { number: 3, text: "初期化関数を使用すると、状態管理が自動的に最適化される" },
        { number: 4, text: "useReducerでは初期化関数は無視される" }
      ],
      tags: ["React", "Hooks", "useReducer"],
      collectionName: "React 中級"
    },
    {
      title: "カスタムフックの依存関係管理",
      difficulty: "中級",
      content:
        "カスタムフックを作成する際、依存配列に含めるべき値の管理で重要なポイントは何か、正しいものを選んでください。",
      sampleCode:
  `import { useEffect } from 'react';
  
  function useCustomEffect(callback, deps) {
    useEffect(callback, deps);
  }`,
      answerCode: 2,
      explanation:
        "依存配列には、フック内で使用される全ての外部変数を正確に含める必要があり、これにより意図しない挙動や stale closure を防止できます。",
      options: [
        { number: 1, text: "依存配列は常に空にして、副作用を固定する" },
        { number: 2, text: "依存配列には、外部から参照される全ての変数を正確に含める必要がある" },
        { number: 3, text: "依存配列は常に関数型アップデートで管理する" },
        { number: 4, text: "依存配列はuseCallbackでラップする必要がある" }
      ],
      tags: ["React", "カスタムフック", "Hooks"],
      collectionName: "React 中級"
    },
    {
      title: "Hooksコンポーネントでのエラーバウンダリの制約",
      difficulty: "中級",
      content:
        "Hooksを使用した関数コンポーネントでは、なぜエラーバウンダリを実装できないのか、正しい理由を選んでください。",
      sampleCode:
  `import React, { useEffect } from 'react';
  
  function FaultyComponent() {
    useEffect(() => {
      throw new Error("Test error");
    }, []);
    return <div>Error Component</div>;
  }`,
      answerCode: 3,
      explanation:
        "エラーバウンダリは、componentDidCatchなどのライフサイクルメソッドが必要で、Hooksではそれらを使用できないため、実装できません。",
      options: [
        { number: 1, text: "Hooksはエラーを自動的に処理するため、エラーバウンダリは不要である" },
        { number: 2, text: "Hooksはエラーバウンダリを内部で実装している" },
        { number: 3, text: "エラーバウンダリはライフサイクルメソッドが必要で、Hooksではそれらを使用できない" },
        { number: 4, text: "Hooksは同期的に動作するため、エラーバウンダリが不要である" }
      ],
      tags: ["React", "Hooks", "エラーバウンダリ"],
      collectionName: "React 中級"
    },
    {
      title: "React Profiler APIによるパフォーマンス計測",
      difficulty: "中級",
      content:
        "Reactアプリケーションのレンダリングパフォーマンスを計測するために、最適なツールはどれか？",
      sampleCode: "",
      answerCode: 2,
      explanation:
        "React Profiler APIは、各コンポーネントのレンダリング時間や更新回数を計測でき、パフォーマンスのボトルネックを特定するのに役立ちます。",
      options: [
        { number: 1, text: "React.memo" },
        { number: 2, text: "React Profiler API" },
        { number: 3, text: "useState" },
        { number: 4, text: "React.lazy" }
      ],
      tags: ["React", "パフォーマンス", "Profiler"],
      collectionName: "React 中級"
    },
    {
      title: "StrictModeによる副作用の二重実行の理由",
      difficulty: "中級",
      content:
        "React.StrictModeが開発環境で副作用の処理を意図的に2回実行する理由として、最も正しいものはどれか？",
      sampleCode:
  `import React, { useEffect } from 'react';
  
  function Example() {
    useEffect(() => {
      console.log('Effect executed');
    }, []);
    return <div>Test</div>;
  }`,
      answerCode: 1,
      explanation:
        "StrictModeは、開発環境で副作用の安全性を確認するために意図的に2回実行される仕様になっています。",
      options: [
        { number: 1, text: "開発環境で副作用の安全性を確認するために意図的に2回実行される" },
        { number: 2, text: "StrictModeは常に非同期処理を2回実行するため" },
        { number: 3, text: "StrictModeはエラー処理のために副作用を2回実行する" },
        { number: 4, text: "StrictModeはレンダリングの最適化を行うために副作用を2回実行する" }
      ],
      tags: ["React", "StrictMode", "副作用"],
      collectionName: "React 中級"
    }
  ];
  

export default  problemsReactIntermediate;
