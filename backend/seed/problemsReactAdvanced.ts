import { TypeProblems } from "../type/typeProblems" ;

const problemsReactAdvanced: TypeProblems  = [
    // --- Block 1 ---
    {
      title: "Context APIでのパフォーマンス最適化",
      difficulty: "上級",
      content:
        "Contextを使用する際、再レンダリングを最小限にするための方法はどれですか？",
      sampleCode: `// Contextの作成
  const MyContext = React.createContext();
  
  function Parent() {
    // contextの値をuseMemoでメモ化する
    const value = useMemo(() => ({ count: 0 }), []);
    return (
      <MyContext.Provider value={value}>
        <Child />
      </MyContext.Provider>
    );
  }
  
  function Child() {
    const context = useContext(MyContext);
    return <div>{context.count}</div>;
  }`,
      answerCode: 2,
      explanation:
        "useMemoを利用してcontextの値をメモ化することで、不要な再レンダリングを防止できます。",
      options: [
        { number: 1, text: "Provider外で状態を管理する" },
        { number: 2, text: "useMemoを利用してcontextの値をメモ化する" },
        { number: 3, text: "React.memoでProviderをラップする" },
        { number: 4, text: "contextの値を毎回新規作成する" },
      ],
      tags: ["React", "Context", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "カスタムフックの依存配列の最適化",
      difficulty: "上級",
      content:
        "カスタムフックを作成する際、依存配列に入れるべきでない値はどれですか？",
      sampleCode: `function useCustomHook(param) {
    const [state, setState] = useState(0);
    useEffect(() => {
      // 副作用処理
    }, [param, {}]); // {}は毎回新しい参照となる
    return state;
  }`,
      answerCode: 3,
      explanation:
        "直接定義したオブジェクトリテラルは毎回新しい参照となるため、依存配列に入れると副作用が不必要に再実行されます。",
      options: [
        { number: 1, text: "定数や安定した値" },
        { number: 2, text: "コンポーネントのprops" },
        { number: 3, text: "直接定義したオブジェクトリテラル" },
        { number: 4, text: "useStateで管理される値" },
      ],
      tags: ["React", "Hooks", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Error Boundariesの役割と使い方",
      difficulty: "上級",
      content: "Error Boundaryの主な目的は何ですか？",
      sampleCode: `class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
      // エラーログの送信などの処理
    }
    render() {
      if (this.state.hasError) {
        return <h1>何かがうまくいっていません。</h1>;
      }
      return this.props.children; 
    }
  }`,
      answerCode: 1,
      explanation:
        "Error Boundaryは子コンポーネントで発生したエラーをキャッチし、フォールバックUIを表示するために使用されます。",
      options: [
        { number: 1, text: "子コンポーネントのエラーをキャッチしてフォールバックUIを提供する" },
        { number: 2, text: "エラーを無視して通常通りレンダリングを続ける" },
        { number: 3, text: "全てのエラーを自動修正する" },
        { number: 4, text: "エラーログを送信するのみ" },
      ],
      tags: ["React", "Error Boundary", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "React Suspenseの利用目的",
      difficulty: "上級",
      content:
        "Suspenseコンポーネントは、どのような状況で使用するのが適切でしょうか？",
      sampleCode: `const LazyComponent = React.lazy(() => import('./LazyComponent'));
  
  function App() {
    return (
      <React.Suspense fallback={<div>読み込み中...</div>}>
        <LazyComponent />
      </React.Suspense>
    );
  }`,
      answerCode: 2,
      explanation:
        "Suspenseは、非同期で読み込むコンポーネントのロード中にフォールバックUIを表示するために使用されます。",
      options: [
        { number: 1, text: "エラーハンドリングのために使用する" },
        { number: 2, text: "非同期読み込み中のフォールバックUIを提供するために使用する" },
        { number: 3, text: "パフォーマンスの最適化のために使用する" },
        { number: 4, text: "状態管理をシンプルにするために使用する" },
      ],
      tags: ["React", "Suspense", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "useMemoとuseCallbackの違い",
      difficulty: "上級",
      content:
        "次のうち、useCallbackの主な用途はどれですか？",
      sampleCode: `function MyComponent({ onClick }) {
    const memoizedCallback = useCallback(() => {
      onClick();
    }, [onClick]);
    return <button onClick={memoizedCallback}>Click</button>;
  }`,
      answerCode: 2,
      explanation:
        "useCallbackは関数をメモ化して再生成を防ぐために使用されます。一方、useMemoは値のメモ化に使用されます。",
      options: [
        { number: 1, text: "値をメモ化して再計算を防ぐ" },
        { number: 2, text: "関数をメモ化して再生成を防ぐ" },
        { number: 3, text: "コンポーネント全体をメモ化する" },
        { number: 4, text: "副作用を管理するために使用する" },
      ],
      tags: ["React", "Hooks", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "React Portalsの利用例",
      difficulty: "上級",
      content:
        "React Portalsは、どのような場合に使用するのが適切ですか？",
      sampleCode: `function Modal({ children }) {
    return ReactDOM.createPortal(
      <div className="modal">
        {children}
      </div>,
      document.getElementById('modal-root')
    );
  }`,
      answerCode: 1,
      explanation:
        "Portalsは、モーダルウィンドウやツールチップなど、DOMツリーの外にコンポーネントをレンダリングする必要がある場合に有用です。",
      options: [
        { number: 1, text: "モーダルやツールチップをDOMの別の場所にレンダリングする" },
        { number: 2, text: "データフェッチのパフォーマンスを向上させる" },
        { number: 3, text: "グローバルな状態管理を行う" },
        { number: 4, text: "イベントハンドラを最適化する" },
      ],
      tags: ["React", "Portals", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "forwardRefの利用目的",
      difficulty: "上級",
      content:
        "forwardRefは、どのような場合に有用でしょうか？",
      sampleCode: `const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));
  
  function Parent() {
    const ref = useRef();
    return <FancyButton ref={ref}>Click me!</FancyButton>;
  }`,
      answerCode: 3,
      explanation:
        "forwardRefは、親コンポーネントから子コンポーネントへDOMノードの参照を渡すために使用され、ラップされたコンポーネントの内部DOMにアクセス可能にします。",
      options: [
        { number: 1, text: "子コンポーネントの状態を直接変更するため" },
        { number: 2, text: "関数を子コンポーネントに渡すため" },
        { number: 3, text: "親から子へDOMノードの参照を渡すため" },
        { number: 4, text: "コンポーネントの再レンダリングを防ぐため" },
      ],
      tags: ["React", "forwardRef", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "サーバーサイドレンダリング(SSR)のメリット",
      difficulty: "上級",
      content:
        "SSRを使用することで得られる主なメリットは何ですか？",
      sampleCode: `// サーバーサイドでのレンダリング例
  import express from 'express';
  import ReactDOMServer from 'react-dom/server';
  import App from './App';
  
  const app = express();
  app.get('*', (req, res) => {
    const html = ReactDOMServer.renderToString(<App />);
    res.send(html);
  });
  app.listen(3000);`,
      answerCode: 2,
      explanation:
        "SSRは初回ロード時のパフォーマンス向上とSEOの改善に寄与します。",
      options: [
        { number: 1, text: "クライアントサイドでのインタラクションが向上する" },
        { number: 2, text: "初回ロード時のパフォーマンス向上とSEO改善が期待できる" },
        { number: 3, text: "全てのユーザーに同じ状態を保証する" },
        { number: 4, text: "APIレスポンスの速度が向上する" },
      ],
      tags: ["React", "SSR", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "useReducerの適切な使用場面",
      difficulty: "上級",
      content:
        "複雑な状態管理においてuseReducerを選ぶ理由として最も適切なものは？",
      sampleCode: `function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      default:
        throw new Error();
    }
  }
  
  function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      </>
    );
  }`,
      answerCode: 1,
      explanation:
        "useReducerは状態遷移ロジックを明確に分離し、複雑な状態管理を予測可能にするために使用されます。",
      options: [
        { number: 1, text: "状態遷移ロジックを分離して予測可能な管理を行うため" },
        { number: 2, text: "コンポーネントの再レンダリングを防ぐため" },
        { number: 3, text: "外部ライブラリ不要で状態管理を行うため" },
        { number: 4, text: "同期的なAPI呼び出しを行うため" },
      ],
      tags: ["React", "Hooks", "useReducer", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "高階コンポーネント(HOC)とレンダープロップの違い",
      difficulty: "上級",
      content:
        "高階コンポーネントとレンダープロップのパターンの主な違いはどれですか？",
      sampleCode: `// 高階コンポーネント(HOC)の例
  function withLogger(WrappedComponent) {
    return function(props) {
      console.log('Render');
      return <WrappedComponent {...props} />;
    };
  }
  
  // レンダープロップの例
  function DataProvider({ render }) {
    const data = { /* データ取得ロジック */ };
    return render(data);
  }`,
      answerCode: 4,
      explanation:
        "レンダープロップは関数を介してUIを動的に決定するのに対し、高階コンポーネントはコンポーネントをラップして機能を拡張します。",
      options: [
        { number: 1, text: "高階コンポーネントは状態管理を行い、レンダープロップはUIを直接レンダリングする" },
        { number: 2, text: "レンダープロップは再利用性が低く、高階コンポーネントは再利用性が高い" },
        { number: 3, text: "高階コンポーネントはコンポーネントを分割し、レンダープロップは1つのコンポーネントにまとめる" },
        { number: 4, text: "レンダープロップは関数を介してUIを動的に決定し、高階コンポーネントは機能を拡張する" },
      ],
      tags: ["React", "HOC", "レンダープロップ", "上級"],
      collectionName: "React 上級",
    },
    // --- Block 2 ---
    {
      title: "Automatic Batchingの効果",
      difficulty: "上級",
      content: "React 18以降で導入されたAutomatic Batchingのメリットは何ですか？",
      sampleCode: `function updateStates() {
    setCount(count + 1);
    setFlag(!flag);
    // 複数の状態更新が一括で処理される
  }`,
      answerCode: 1,
      explanation:
        "Automatic Batchingにより、複数の状態更新が一度にバッチ処理され、再レンダリング回数が減少しパフォーマンスが向上します。",
      options: [
        { number: 1, text: "再レンダリング回数の削減" },
        { number: 2, text: "各更新が個別に処理される" },
        { number: 3, text: "更新が同期的に行われる" },
        { number: 4, text: "メモリリークを引き起こす" },
      ],
      tags: ["React", "Automatic Batching", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Concurrent Modeの特徴",
      difficulty: "上級",
      content: "ReactのConcurrent Modeを使用する主な利点はどれですか？",
      sampleCode: `// Concurrent Modeでのルート作成例
  import { createRoot } from 'react-dom/client';
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);`,
      answerCode: 2,
      explanation:
        "Concurrent Modeはレンダリングを非同期的に行い、ユーザーインターフェースの応答性を向上させます。",
      options: [
        { number: 1, text: "同期的なレンダリングを強制する" },
        { number: 2, text: "非同期レンダリングでUIの応答性を向上させる" },
        { number: 3, text: "常に最短経路でレンダリングする" },
        { number: 4, text: "自動的にエラーを修正する" },
      ],
      tags: ["React", "Concurrent Mode", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Suspense for Data Fetchingの利点",
      difficulty: "上級",
      content:
        "Suspenseをデータフェッチに利用する際の主なメリットは何ですか？",
      sampleCode: `const resource = fetchData();
  function MyComponent() {
    const data = resource.read();
    return <div>{data}</div>;
  }
  function App() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </React.Suspense>
    );
  }`,
      answerCode: 2,
      explanation:
        "Suspenseを使うことで、データ読み込み中にフォールバックUIを表示し、ユーザーエクスペリエンスを向上させることができます。",
      options: [
        { number: 1, text: "全てのエラーを自動で処理する" },
        { number: 2, text: "データ読み込み中のフォールバックUIを提供する" },
        { number: 3, text: "状態管理の複雑性を減少させる" },
        { number: 4, text: "コード分割を不要にする" },
      ],
      tags: ["React", "Suspense", "Data Fetching", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "React Server Componentsの動作",
      difficulty: "上級",
      content:
        "React Server Componentsの特徴として正しいものはどれですか？",
      sampleCode: `// サーバーコンポーネントの例
  export default function ServerComponent() {
    return <div>これはサーバー側でレンダリングされます</div>;
  }`,
      answerCode: 2,
      explanation:
        "React Server Componentsはサーバー側でレンダリングされ、クライアントに不要なJavaScriptを送信しないことでパフォーマンスを向上させます。",
      options: [
        { number: 1, text: "クライアントサイドでのみレンダリングされる" },
        { number: 2, text: "サーバーサイドでレンダリングされ、クライアントに軽量なコードを送信する" },
        { number: 3, text: "両方でレンダリングされ、冗長なコードが送信される" },
        { number: 4, text: "静的サイトジェネレーション専用である" },
      ],
      tags: ["React", "Server Components", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "useTransitionの役割",
      difficulty: "上級",
      content:
        "useTransitionフックはどのような場合に使用するのが適切ですか？",
      sampleCode: `function App() {
    const [isPending, startTransition] = useTransition();
    const [input, setInput] = useState("");
    const handleChange = (e) => {
      const value = e.target.value;
      startTransition(() => {
        setInput(value);
      });
    };
    return (
      <>
        {isPending && <span>Loading...</span>}
        <input value={input} onChange={handleChange} />
      </>
    );
  }`,
      answerCode: 2,
      explanation:
        "useTransitionは低優先度の更新を非同期で行い、UIの応答性を維持するために使用されます。",
      options: [
        { number: 1, text: "非同期データフェッチを実装するため" },
        { number: 2, text: "低優先度の更新を非同期で行い、UIの応答性を維持するため" },
        { number: 3, text: "エラーハンドリングを自動化するため" },
        { number: 4, text: "高優先度の更新を同期的に行うため" },
      ],
      tags: ["React", "Hooks", "useTransition", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "React.lazyによるコード分割",
      difficulty: "上級",
      content:
        "React.lazyを使用する際の主なメリットは何ですか？",
      sampleCode: `const LazyComponent = React.lazy(() => import('./LazyComponent'));
  function App() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </React.Suspense>
    );
  }`,
      answerCode: 1,
      explanation:
        "React.lazyは必要な時にのみコンポーネントを読み込むため、初回ロード時のパフォーマンス向上に寄与します。",
      options: [
        { number: 1, text: "初回ロードのパフォーマンス向上" },
        { number: 2, text: "状態管理が簡素化される" },
        { number: 3, text: "自動的なエラーハンドリングが実現される" },
        { number: 4, text: "全てのコンポーネントが同時に読み込まれる" },
      ],
      tags: ["React", "Lazy Loading", "コード分割", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Optimistic UI Updateの実装",
      difficulty: "上級",
      content:
        "Optimistic UI Updateの主なメリットは何ですか？",
      sampleCode: `function addItem(newItem) {
    // UI上ですぐにアイテムを追加する
    setItems([...items, newItem]);
    // バックエンドへのAPI呼び出し
    api.addItem(newItem).catch(() => {
      // エラー時にはロールバック
      setItems(items);
    });
  }`,
      answerCode: 2,
      explanation:
        "Optimistic UI UpdateはAPIの応答を待たずにUIを更新することで、ユーザーエクスペリエンスを向上させます。",
      options: [
        { number: 1, text: "API呼び出しを省略する" },
        { number: 2, text: "ユーザーエクスペリエンスを向上させる" },
        { number: 3, text: "状態管理を簡素化する" },
        { number: 4, text: "エラーハンドリングが不要になる" },
      ],
      tags: ["React", "Optimistic UI", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "メモリリーク防止のための対策",
      difficulty: "上級",
      content:
        "Reactコンポーネント内でのメモリリークを防ぐための一般的な対策はどれですか？",
      sampleCode: `useEffect(() => {
    const subscription = api.subscribe();
    return () => {
      // クリーンアップでサブスクリプションを解除
      subscription.unsubscribe();
    };
  }, []);`,
      answerCode: 2,
      explanation:
        "useEffectのクリーンアップ関数を実装することで、コンポーネントのアンマウント時に副作用を解除し、メモリリークを防ぎます。",
      options: [
        { number: 1, text: "useEffectを使用しない" },
        { number: 2, text: "副作用のクリーンアップ関数を実装する" },
        { number: 3, text: "グローバル変数を使用する" },
        { number: 4, text: "常に新しいインスタンスを作成する" },
      ],
      tags: ["React", "メモリリーク", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Immutable Data Structuresの重要性",
      difficulty: "上級",
      content:
        "Reactで不変性を保つ理由として最も適切なものはどれですか？",
      sampleCode: `const newState = { ...state, count: state.count + 1 };`,
      answerCode: 1,
      explanation:
        "不変性を保つことで、変更検知が容易になり、再レンダリングの最適化や予測可能な状態管理が可能になります。",
      options: [
        { number: 1, text: "再レンダリングの最適化と変更検知の容易化" },
        { number: 2, text: "メモリ使用量の削減" },
        { number: 3, text: "API通信の高速化" },
        { number: 4, text: "状態管理の複雑性の向上" },
      ],
      tags: ["React", "Immutable", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "React Profilerの活用方法",
      difficulty: "上級",
      content:
        "React Profilerコンポーネントの主な利用目的はどれですか？",
      sampleCode: `<Profiler id="App" onRender={(id, phase, actualDuration) => {
    console.log({ id, phase, actualDuration });
  }}>
    <App />
  </Profiler>`,
      answerCode: 1,
      explanation:
        "React Profilerはコンポーネントのレンダリング時間を計測し、パフォーマンスのボトルネックを特定するために使用されます。",
      options: [
        { number: 1, text: "レンダリング時間の計測とパフォーマンスの解析" },
        { number: 2, text: "状態管理の最適化" },
        { number: 3, text: "エラーハンドリングの自動化" },
        { number: 4, text: "コンポーネントの自動キャッシュ" },
      ],
      tags: ["React", "Profiler", "上級"],
      collectionName: "React 上級",
    },
    // --- Block 3 ---
    {
      title: "useIdの活用方法",
      difficulty: "上級",
      content:
        "useIdフックはどのような目的で使用されるべきでしょうか？",
      sampleCode: 
  `function InputWithLabel({ label, ...props }) {
    const id = useId();
    return (
      <>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} />
      </>
    );
  }`,
      answerCode: 1,
      explanation:
        "useIdは、各レンダリングごとに重複しない一意なIDを生成し、アクセシブルなフォームラベルなどに利用されます。",
      options: [
        { number: 1, text: "複数の要素で重複しない一意なIDを生成する" },
        { number: 2, text: "コンポーネントの再レンダリングを防ぐ" },
        { number: 3, text: "値のメモ化に利用する" },
        { number: 4, text: "フォームのバリデーションを実行する" },
      ],
      tags: ["React", "useId", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "useDeferredValueの用途",
      difficulty: "上級",
      content:
        "useDeferredValueフックは、どのようなシナリオで利用すべきでしょうか？",
      sampleCode:
  `function SearchResults({ query }) {
    const deferredQuery = useDeferredValue(query);
    const results = useSearch(deferredQuery);
    return <ResultsList results={results} />;
  }`,
      answerCode: 2,
      explanation:
        "useDeferredValueは、入力値の急速な変化により重い処理が連続して走る場合に、UIの応答性を保つために使用されます。",
      options: [
        { number: 1, text: "即時に重い処理を実行するため" },
        { number: 2, text: "入力の急速な変化時にUIの応答性を維持するため" },
        { number: 3, text: "非同期通信のキャッシュ管理のため" },
        { number: 4, text: "コンポーネントのメモ化最適化のため" },
      ],
      tags: ["React", "useDeferredValue", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "useSyncExternalStoreの利点",
      difficulty: "上級",
      content:
        "useSyncExternalStoreフックの主な目的は何ですか？",
      sampleCode:
  `function useExternalData(store) {
    return useSyncExternalStore(store.subscribe, store.getSnapshot);
  }`,
      answerCode: 3,
      explanation:
        "useSyncExternalStoreは、外部ストアの状態とReactの状態を同期し、最新の状態を安全に反映させるために使用されます。",
      options: [
        { number: 1, text: "外部API呼び出しを同期的に行うため" },
        { number: 2, text: "内部状態の最適化を行うため" },
        { number: 3, text: "外部ストアの状態と同期して最新の状態を取得するため" },
        { number: 4, text: "パフォーマンス計測を行うため" },
      ],
      tags: ["React", "useSyncExternalStore", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Error BoundaryとHooksの制限",
      difficulty: "上級",
      content:
        "Hooks内でError Boundaryを直接使用できない理由は何でしょうか？",
      sampleCode:
  `function MyComponent() {
    // Error Boundaryはフック内では利用できない
    const [state, setState] = useState(null);
    // ...
  }`,
      answerCode: 1,
      explanation:
        "Error Boundaryはクラスコンポーネントの機能であり、Hooks内で直接利用することはできないため、コンポーネント構造を分離する必要があります。",
      options: [
        { number: 1, text: "Error Boundaryはクラスコンポーネントの機能であり、Hooksで使用できないため" },
        { number: 2, text: "Hooksは非同期処理に対応していないため" },
        { number: 3, text: "Error Boundaryはメモ化できないため" },
        { number: 4, text: "HooksとError Boundaryは設計思想が異なるため" },
      ],
      tags: ["React", "Error Boundary", "Hooks", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "React.memoによるレンダリング最適化",
      difficulty: "上級",
      content:
        "React.memoを使用する主な利点は何でしょうか？",
      sampleCode:
  `const MemoizedComponent = React.memo(function Component({ data }) {
    return <div>{data}</div>;
  });`,
      answerCode: 1,
      explanation:
        "React.memoは、同じpropsの場合に再レンダリングを防ぎ、パフォーマンスの最適化に寄与します。",
      options: [
        { number: 1, text: "同じpropsの場合、再レンダリングを防ぐ" },
        { number: 2, text: "状態管理を簡略化する" },
        { number: 3, text: "エラーハンドリングを自動化する" },
        { number: 4, text: "非同期処理を同期的に扱う" },
      ],
      tags: ["React", "React.memo", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "useLayoutEffectの適切な使用シーン",
      difficulty: "上級",
      content:
        "useLayoutEffectはどのようなケースで使用するのが適切でしょうか？",
      sampleCode:
  `function Component() {
    useLayoutEffect(() => {
      // DOM更新直後に同期的に処理を実行する
    });
    return <div>Hello</div>;
  }`,
      answerCode: 1,
      explanation:
        "useLayoutEffectは、DOMの更新直後に副作用を同期的に実行する必要がある場合に使用され、レイアウト計算やDOM測定に適しています。",
      options: [
        { number: 1, text: "DOM更新直後の同期的処理が必要な場合" },
        { number: 2, text: "非同期データフェッチを行う場合" },
        { number: 3, text: "レンダリング最適化のため" },
        { number: 4, text: "イベントハンドラの登録のため" },
      ],
      tags: ["React", "useLayoutEffect", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "カスタムフックにおける抽象化の注意点",
      difficulty: "上級",
      content:
        "カスタムフックを作成する際、過度な抽象化が招く問題は何でしょうか？",
      sampleCode:
  `function useDataFetcher(url) {
    // 過度な抽象化により柔軟性が失われる可能性がある
    const [data, setData] = useState(null);
    useEffect(() => {
      fetch(url).then(res => res.json()).then(setData);
    }, [url]);
    return data;
  }`,
      answerCode: 1,
      explanation:
        "カスタムフックで過度に抽象化すると、特定のケースにしか対応できなくなり、再利用性や柔軟性が低下する恐れがあります。",
      options: [
        { number: 1, text: "柔軟性の欠如と再利用性の低下" },
        { number: 2, text: "パフォーマンスの向上" },
        { number: 3, text: "コードの可読性の向上" },
        { number: 4, text: "セキュリティリスクの低減" },
      ],
      tags: ["React", "カスタムフック", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "SuspenseとError Boundaryの組み合わせ利用",
      difficulty: "上級",
      content:
        "SuspenseコンポーネントとError Boundaryを組み合わせる主な利点は何でしょうか？",
      sampleCode:
  `<ErrorBoundary>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  </ErrorBoundary>`,
      answerCode: 1,
      explanation:
        "SuspenseとError Boundaryを組み合わせることで、非同期コンポーネントの読み込み中の遅延と、発生したエラー双方に適切に対処できます。",
      options: [
        { number: 1, text: "非同期エラーとレンダリング遅延の両方に対処できる" },
        { number: 2, text: "コンポーネントの再利用性が向上する" },
        { number: 3, text: "状態管理が簡単になる" },
        { number: 4, text: "イベント処理が高速化する" },
      ],
      tags: ["React", "Suspense", "Error Boundary", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "React Strict Modeの目的",
      difficulty: "上級",
      content:
        "React Strict Modeを利用する主な目的は何でしょうか？",
      sampleCode:
  `<React.StrictMode>
    <App />
  </React.StrictMode>`,
      answerCode: 2,
      explanation:
        "Strict Modeは、潜在的な問題を早期に検出し、将来的な互換性の問題に備えるための警告を促進します。",
      options: [
        { number: 1, text: "UIのパフォーマンス向上" },
        { number: 2, text: "潜在的な問題の検出と警告の促進" },
        { number: 3, text: "状態管理の簡略化" },
        { number: 4, text: "エラーハンドリングの自動化" },
      ],
      tags: ["React", "Strict Mode", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Concurrent Features導入時の注意点",
      difficulty: "上級",
      content:
        "ReactのConcurrent Featuresを導入する際に注意すべき点は何でしょうか？",
      sampleCode:
  `// Concurrent Featuresを使用した例
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);`,
      answerCode: 2,
      explanation:
        "Concurrent Featuresは強力ですが、既存コードとの互換性や副作用の管理など、従来と異なる挙動に注意が必要です。",
      options: [
        { number: 1, text: "パフォーマンスが常に向上する" },
        { number: 2, text: "既存コードとの互換性や副作用の扱いに注意が必要" },
        { number: 3, text: "自動的に全てのエラーが解消される" },
        { number: 4, text: "コード量が大幅に削減される" },
      ],
      tags: ["React", "Concurrent Features", "上級"],
      collectionName: "React 上級",
    },
    // --- Block 4 ---
    {
      title: "useInsertionEffectの利用例と目的",
      difficulty: "上級",
      content:
        "React 18で導入されたuseInsertionEffectは、どのような目的で使用されるべきでしょうか？",
      sampleCode:
  `useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = '.my-class { color: red; }';
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);`,
      answerCode: 1,
      explanation:
        "useInsertionEffectは、DOMが更新される前に同期的に副作用を実行する必要がある場合、特にCSS-in-JSライブラリでのスタイル注入に適しています。",
      options: [
        { number: 1, text: "CSSやスタイルの挿入など、DOM変更前に同期的な副作用を実行するため" },
        { number: 2, text: "非同期データフェッチの実装のため" },
        { number: 3, text: "イベントリスナーの登録のため" },
        { number: 4, text: "コンポーネントのキャッシュ管理のため" },
      ],
      tags: ["React", "useInsertionEffect", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Callback Refsの再生成による問題点",
      difficulty: "上級",
      content:
        "Callback Refを使用する際、インラインで定義すると毎回新しい関数が生成されることによる問題は何でしょうか？",
      sampleCode:
  `function MyComponent() {
    return <div ref={(el) => console.log(el)} />;
  }`,
      answerCode: 1,
      explanation:
        "毎回新しい関数が生成されると、DOMノードの参照が更新されるたびにコールバックが呼ばれ、不要な副作用や再レンダリングが発生する可能性があります。",
      options: [
        { number: 1, text: "不要な副作用と再レンダリングが発生する" },
        { number: 2, text: "メモリリークの原因となる" },
        { number: 3, text: "イベントハンドラが無効化される" },
        { number: 4, text: "スタイルが適用されなくなる" },
      ],
      tags: ["React", "Callback Ref", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "SSRハイドレーションの不一致の原因と対策",
      difficulty: "上級",
      content:
        "サーバーサイドレンダリング後のハイドレーションで不一致が発生する主な原因は何でしょうか？",
      sampleCode:
  `function TimeComponent() {
    // サーバーとクライアントで異なる値が生成される
    return <div>{Date.now()}</div>;
  }`,
      answerCode: 1,
      explanation:
        "レンダリング時に動的な値（例: Date.now()）を使用すると、サーバーとクライアントで異なる出力が生成され、ハイドレーション時に不一致が発生します。",
      options: [
        { number: 1, text: "サーバーとクライアントで出力が異なるため" },
        { number: 2, text: "スタイルが適用されないため" },
        { number: 3, text: "イベントハンドラが同期されないため" },
        { number: 4, text: "コンポーネントが重複してレンダリングされるため" },
      ],
      tags: ["React", "SSR", "Hydration", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Context分割によるパフォーマンス改善",
      difficulty: "上級",
      content:
        "大規模なアプリケーションでContextを分割する主な理由として、適切なものはどれですか？",
      sampleCode:
  `// 状態ごとにContextを分割する例
  const ThemeContext = React.createContext();
  const UserContext = React.createContext();`,
      answerCode: 1,
      explanation:
        "一つのContextに多くの状態をまとめると、部分的な更新でも全ての子コンポーネントが再レンダリングされるため、Contextを分割して管理することで不要な再レンダリングを防げます。",
      options: [
        { number: 1, text: "不要な再レンダリングを防ぐため" },
        { number: 2, text: "コードの可読性向上のため" },
        { number: 3, text: "セキュリティを強化するため" },
        { number: 4, text: "外部API連携を簡素化するため" },
      ],
      tags: ["React", "Context", "パフォーマンス", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "React.memoでのカスタム比較関数の役割",
      difficulty: "上級",
      content:
        "React.memoでカスタム比較関数を利用する主な利点は何でしょうか？",
      sampleCode:
  `function areEqual(prevProps, nextProps) {
    return prevProps.value === nextProps.value;
  }
  const MemoComponent = React.memo(Component, areEqual);`,
      answerCode: 1,
      explanation:
        "カスタム比較関数を使用することで、単純な浅い比較以上の柔軟なprops比較が可能になり、不要な再レンダリングを防止できます。",
      options: [
        { number: 1, text: "propsの変更判定を柔軟に制御できるため" },
        { number: 2, text: "状態管理が不要になるため" },
        { number: 3, text: "イベントハンドラの再生成を防ぐため" },
        { number: 4, text: "CSSの適用を最適化するため" },
      ],
      tags: ["React", "React.memo", "カスタム比較関数", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "useReducerとuseContextによるグローバル状態管理",
      difficulty: "上級",
      content:
        "useReducerとuseContextを組み合わせることで得られる主なメリットは何でしょうか？",
      sampleCode:
  `const GlobalStateContext = React.createContext();
  
  function globalReducer(state, action) {
    switch (action.type) {
      case 'update':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }
  
  function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(globalReducer, {});
    return (
      <GlobalStateContext.Provider value={{ state, dispatch }}>
        {children}
      </GlobalStateContext.Provider>
    );
  }`,
      answerCode: 1,
      explanation:
        "この組み合わせにより、状態の更新ロジックを一元管理し、コンポーネントツリー全体でシンプルにグローバルな状態を共有できます。",
      options: [
        { number: 1, text: "コンポーネントツリー全体で状態管理をシンプルにできるため" },
        { number: 2, text: "サーバーサイドレンダリングが容易になるため" },
        { number: 3, text: "個々のコンポーネントのスタイルが最適化されるため" },
        { number: 4, text: "非同期処理が簡単になるため" },
      ],
      tags: ["React", "useReducer", "useContext", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "非同期処理におけるstale closureの回避策",
      difficulty: "上級",
      content:
        "useEffect内で非同期処理を行う際、stale closureを回避するための適切な方法はどれですか？",
      sampleCode:
  `function Component({ propValue }) {
    useEffect(() => {
      let isMounted = true;
      async function fetchData() {
        const data = await getData(propValue);
        if (isMounted) {
          // 状態更新
        }
      }
      fetchData();
      return () => { isMounted = false; };
    }, [propValue]);
    return <div />;
  }`,
      answerCode: 1,
      explanation:
        "非同期処理中にコンポーネントがアンマウントされた場合の不要な状態更新を防ぐため、クリーンアップ関数でフラグを管理するパターンが有効です。",
      options: [
        { number: 1, text: "クリーンアップ関数でisMountedフラグを利用する" },
        { number: 2, text: "依存配列を空にする" },
        { number: 3, text: "useCallbackで非同期関数をメモ化する" },
        { number: 4, text: "setTimeoutでラップする" },
      ],
      tags: ["React", "stale closure", "非同期", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "カスタムフックでのキャンセル可能な非同期処理",
      difficulty: "上級",
      content:
        "カスタムフック内で非同期処理を実装する際、処理のキャンセルを行う主な理由は何でしょうか？",
      sampleCode:
  `function useCancelableFetch(url) {
    const [data, setData] = useState(null);
    useEffect(() => {
      const controller = new AbortController();
      fetch(url, { signal: controller.signal })
        .then(res => res.json())
        .then(setData)
        .catch(err => {
          if(err.name !== 'AbortError'){
            // エラーハンドリング
          }
        });
      return () => controller.abort();
    }, [url]);
    return data;
  }`,
      answerCode: 1,
      explanation:
        "コンポーネントのアンマウント時に不要な非同期処理をキャンセルすることで、メモリリークや不適切な状態更新を防ぎます。",
      options: [
        { number: 1, text: "コンポーネントのアンマウント時に不要な処理をキャンセルするため" },
        { number: 2, text: "APIリクエストの高速化のため" },
        { number: 3, text: "エラーメッセージ表示の簡略化のため" },
        { number: 4, text: "非同期処理結果のキャッシュのため" },
      ],
      tags: ["React", "カスタムフック", "非同期", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Reconciliationにおけるkeyの最適な選択",
      difficulty: "上級",
      content:
        "リストレンダリング時において、keyとして適切でないものはどれでしょうか？",
      sampleCode:
  `const listItems = items.map((item, index) => <li key={index}>{item.name}</li>);`,
      answerCode: 1,
      explanation:
        "配列のインデックスをkeyに使用すると、項目の順序変更や削除時に不具合が生じる可能性があるため、安定した一意のIDを使用することが推奨されます。",
      options: [
        { number: 1, text: "配列のindexをkeyにすること" },
        { number: 2, text: "ユニークなIDをkeyにすること" },
        { number: 3, text: "文字列リテラルをkeyにすること" },
        { number: 4, text: "オブジェクトそのものをkeyにすること" },
      ],
      tags: ["React", "Reconciliation", "key", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "実験的フックuseEventの利用上の注意点",
      difficulty: "上級",
      content:
        "実験的なuseEventフックを使用する際、どの点に注意すべきでしょうか？",
      sampleCode:
  `function Button({ onClick }) {
    const stableOnClick = useEvent(onClick);
    return <button onClick={stableOnClick}>Click</button>;
  }`,
      answerCode: 1,
      explanation:
        "useEventはイベントハンドラを安定化させるためのフックですが、実験的なAPIであるため、将来的に仕様が変更される可能性がある点に注意が必要です。",
      options: [
        { number: 1, text: "安定したイベントハンドラを生成するが、APIが変更される可能性がある" },
        { number: 2, text: "常に同期的にイベントを処理する" },
        { number: 3, text: "イベントリスナーの自動解除を行う" },
        { number: 4, text: "非同期イベント処理を行う" },
      ],
      tags: ["React", "useEvent", "実験的", "上級"],
      collectionName: "React 上級",
    },
    // --- Block 5 ---
    {
      title: "Fiberアーキテクチャのメリット",
      difficulty: "上級",
      content:
        "ReactのFiberアーキテクチャがもたらす主な利点は何でしょうか？",
      sampleCode:
  `// Fiberアーキテクチャの内部処理の一例（疑似コード）
  function renderFiber(fiber) {
    // レンダリング処理を中断可能な単位に分割
    // 優先度に基づいたスケジューリングを実現
    performWork(fiber);
  }`,
      answerCode: 1,
      explanation:
        "Fiberアーキテクチャはレンダリング処理を中断・再開可能に分割することで、ユーザーインターフェースの応答性を向上させます。",
      options: [
        { number: 1, text: "中断可能なレンダリングにより高い応答性を実現する" },
        { number: 2, text: "全ての更新を同期的に処理する" },
        { number: 3, text: "レンダリング回数を増加させる" },
        { number: 4, text: "内部状態を完全に固定する" },
      ],
      tags: ["React", "Fiber", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "非同期レンダリングの中断と再開",
      difficulty: "上級",
      content:
        "Reactはどのようにして非同期レンダリング中に中断と再開を実現しているでしょうか？",
      sampleCode:
  `function update() {
    startTransition(() => {
      setState(newState);
    });
    // 内部スケジューラが優先度に応じて更新を制御
  }`,
      answerCode: 1,
      explanation:
        "Reactは内部のスケジューラを用い、更新の優先度に応じてレンダリング処理を中断・再開することで、スムーズなユーザー体験を実現します。",
      options: [
        { number: 1, text: "内部スケジューラが優先度に基づいて更新を制御する" },
        { number: 2, text: "全ての更新を一度に処理する" },
        { number: 3, text: "レンダリング処理を完全に停止する" },
        { number: 4, text: "外部ライブラリに依存して更新を管理する" },
      ],
      tags: ["React", "非同期レンダリング", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "並列レンダリングと優先度管理",
      difficulty: "上級",
      content:
        "Reactの並列レンダリングはどのようにして更新の優先度を管理しているでしょうか？",
      sampleCode:
  `// React内部の疑似コード例
  function scheduleUpdate(update) {
    // 各更新に優先度を付与し、適切な順序で処理する
    enqueueUpdate(update, update.priority);
  }`,
      answerCode: 1,
      explanation:
        "Reactは更新ごとに優先度を設定し、重要な更新を優先して処理することで、ユーザーインターフェースの一貫性と応答性を保ちます。",
      options: [
        { number: 1, text: "更新に優先度を付与し、重要な更新を優先的に処理する" },
        { number: 2, text: "全ての更新を同じ優先度で一括処理する" },
        { number: 3, text: "優先度に関係なくFIFO順に処理する" },
        { number: 4, text: "外部から優先度を設定できない" },
      ],
      tags: ["React", "並列レンダリング", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "SuspenseListの利用シナリオ",
      difficulty: "上級",
      content:
        "SuspenseListを使用することで得られる主な利点は何でしょうか？",
      sampleCode:
  `<SuspenseList revealOrder="forwards">
    <Suspense fallback={<div>Loading A...</div>}>
      <ComponentA />
    </Suspense>
    <Suspense fallback={<div>Loading B...</div>}>
      <ComponentB />
    </Suspense>
  </SuspenseList>`,
      answerCode: 1,
      explanation:
        "SuspenseListは、複数のSuspenseコンポーネントの表示順序を制御し、全体としての読み込み体験を最適化するために使用されます。",
      options: [
        { number: 1, text: "複数のSuspenseコンポーネントの読み込み順序を制御できる" },
        { number: 2, text: "各Suspense内のエラーを自動でリカバリーする" },
        { number: 3, text: "全てのコンポーネントを同時にレンダリングする" },
        { number: 4, text: "非同期データフェッチを不要にする" },
      ],
      tags: ["React", "SuspenseList", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "ESLintルール: react-hooks/exhaustive-depsの目的",
      difficulty: "上級",
      content:
        "ESLintルールreact-hooks/exhaustive-depsが果たす役割として正しいものはどれでしょうか？",
      sampleCode:
  `useEffect(() => {
    doSomething(value);
  }, [value]);`,
      answerCode: 1,
      explanation:
        "このルールは、依存配列に必要な依存関係が漏れていないかを検出し、副作用の実行を予測可能にするために使用されます。",
      options: [
        { number: 1, text: "依存配列の漏れを防ぎ、副作用の予測可能な実行を促す" },
        { number: 2, text: "不要な副作用を完全に排除する" },
        { number: 3, text: "すべてのuseEffectを同期的に実行させる" },
        { number: 4, text: "非同期処理を強制的に同期化する" },
      ],
      tags: ["React", "ESLint", "Hooks", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "仮想DOM差分アルゴリズムの特徴",
      difficulty: "上級",
      content:
        "Reactが仮想DOMを利用する主な理由はどれでしょうか？",
      sampleCode:
  `// 仮想DOMによる差分検出の概念例
  const newVDOM = render(newState);
  const patches = diff(oldVDOM, newVDOM);`,
      answerCode: 1,
      explanation:
        "仮想DOMは、実際のDOM更新前に差分計算を行い、必要最小限の更新だけを実施することでパフォーマンスを向上させます。",
      options: [
        { number: 1, text: "効率的な差分計算で最小限のDOM更新を実現する" },
        { number: 2, text: "全ての更新を一度に再描画する" },
        { number: 3, text: "DOM更新を完全に排除する" },
        { number: 4, text: "仮想DOMを用いず直接DOM操作を行う" },
      ],
      tags: ["React", "仮想DOM", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "hydrateRootの利用シーン",
      difficulty: "上級",
      content:
        "React 18で導入されたhydrateRootの主な用途は何でしょうか？",
      sampleCode:
  `import { hydrateRoot } from 'react-dom/client';
  hydrateRoot(document.getElementById('root'), <App />);`,
      answerCode: 1,
      explanation:
        "hydrateRootは、サーバーサイドレンダリング後のHTMLに対して、クライアント側でReactのイベントや状態をバインドするために使用されます。",
      options: [
        { number: 1, text: "サーバーサイドレンダリング後のハイドレーションを行うため" },
        { number: 2, text: "新規にDOMを構築するため" },
        { number: 3, text: "完全な再レンダリングを実行するため" },
        { number: 4, text: "静的サイトジェネレーションを行うため" },
      ],
      tags: ["React", "hydrateRoot", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "SyntheticEventとイベントプーリング",
      difficulty: "上級",
      content:
        "ReactのSyntheticEventが持つ特徴として正しいものはどれでしょうか？",
      sampleCode:
  `function handleClick(e) {
    console.log(e.type);
  }
  <button onClick={handleClick}>Click</button>`,
      answerCode: 1,
      explanation:
        "ReactのSyntheticEventはパフォーマンス向上のために再利用されるため、非同期処理で利用する際にはe.persist()などの対策が必要です。",
      options: [
        { number: 1, text: "イベントオブジェクトが再利用され、非同期処理で注意が必要" },
        { number: 2, text: "各イベントで常に新しいオブジェクトが生成される" },
        { number: 3, text: "ネイティブイベントと同様に扱われる" },
        { number: 4, text: "イベントハンドラ内で状態変更が禁止される" },
      ],
      tags: ["React", "SyntheticEvent", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "高階コンポーネント(HOC)とカスタムフックの使い分け",
      difficulty: "上級",
      content:
        "ロジックの再利用において、高階コンポーネントよりカスタムフックを選択すべき理由は何でしょうか？",
      sampleCode:
  `function useLogic() {
    // 再利用可能なロジックを実装
    return computedValue;
  }
  function Component() {
    const value = useLogic();
    return <div>{value}</div>;
  }`,
      answerCode: 1,
      explanation:
        "カスタムフックはUI構造に影響を与えずロジックのみを共有できるため、コンポーネントの分離とシンプルな構造を保つことが可能です。",
      options: [
        { number: 1, text: "UIをラップせず、ロジックだけを再利用できるため" },
        { number: 2, text: "高階コンポーネントはパフォーマンスが劣るため" },
        { number: 3, text: "カスタムフックは状態管理が自動化されるため" },
        { number: 4, text: "HOCは非同期処理が困難なため" },
      ],
      tags: ["React", "HOC", "カスタムフック", "上級"],
      collectionName: "React 上級",
    },
    {
      title: "Strict Effectsモードの目的",
      difficulty: "上級",
      content:
        "React 18のStrictModeで副作用が二重に実行される理由は何でしょうか？",
      sampleCode:
  `<React.StrictMode>
    <App />
  </React.StrictMode>`,
      answerCode: 1,
      explanation:
        "Strict Effectsモードは、開発中に潜在的な副作用を検出し、クリーンな実装を促すために意図的に副作用を二重に実行します。",
      options: [
        { number: 1, text: "潜在的な副作用を検出し、問題を早期に発見するため" },
        { number: 2, text: "パフォーマンス向上のために副作用を意図的に増加させる" },
        { number: 3, text: "副作用の実行順序を保証するため" },
        { number: 4, text: "非同期処理の挙動を統一するため" },
      ],
      tags: ["React", "StrictMode", "上級"],
      collectionName: "React 上級",
    }
  ];
  

export default  problemsReactAdvanced;
