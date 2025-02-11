import { TypeProblems } from "../type/typeProblems" ;

const problemsReactIntermediate: TypeProblems = [
  {
    title: 'useEffectの依存配列の詳細',
    difficulty: '中級',
    content: 'useEffectフックで依存配列が果たす役割と注意点は何ですか？',
    sampleCode: `
useEffect(() => {
  // effect処理
}, [dep]);
    `,
    answerCode: 3,
    explanation: '依存配列に指定された値が変化したときのみ、効果が再実行される仕組みです。',
    options: [
      { number: 1, text: '常に効果が再実行される' },
      { number: 2, text: '依存配列は無視される' },
      { number: 3, text: '依存値が変化したときにのみ再実行される' },
      { number: 4, text: '初回のみ実行される' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useEffectのクリーンアップ関数',
    difficulty: '中級',
    content: 'useEffect内でタイマーやサブスクリプションをクリーンアップする方法は？',
    sampleCode: `
useEffect(() => {
  const timer = setInterval(() => { console.log("tick"); }, 1000);
  return () => clearInterval(timer);
}, []);
    `,
    answerCode: 1,
    explanation: 'クリーンアップ関数を返すことで、コンポーネントのアンマウント時に副作用を解除します。',
    options: [
      { number: 1, text: 'returnでクリーンアップ関数を返す' },
      { number: 2, text: '副作用内で直接clearIntervalを呼ぶ' },
      { number: 3, text: '依存配列にtimerを追加する' },
      { number: 4, text: 'useCleanupフックを使う' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useCallbackの基本',
    difficulty: '中級',
    content: 'useCallbackフックの主な目的は何ですか？',
    sampleCode: `
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
    `,
    answerCode: 2,
    explanation: 'useCallbackは関数の再生成を防ぐために、依存値が変化しない限り同じ関数を返します。',
    options: [
      { number: 1, text: 'コンポーネントをメモ化する' },
      { number: 2, text: '関数をメモ化して再生成を防ぐ' },
      { number: 3, text: '値をキャッシュする' },
      { number: 4, text: 'レンダリングを強制する' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useMemoの使用方法',
    difficulty: '中級',
    content: 'useMemoフックはどのような場面で使用されますか？',
    sampleCode: `
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
    `,
    answerCode: 1,
    explanation: '高コストな計算結果をキャッシュし、依存値が変わらない場合は再計算を避けるために使用されます。',
    options: [
      { number: 1, text: '高コストな計算の結果をキャッシュするため' },
      { number: 2, text: '関数の再生成を防ぐため' },
      { number: 3, text: 'コンポーネント全体をメモ化するため' },
      { number: 4, text: '副作用を管理するため' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useReducerの利点',
    difficulty: '中級',
    content: 'useReducerフックを使用する主な利点は何ですか？',
    sampleCode: `
const [state, dispatch] = useReducer(reducer, initialState);
    `,
    answerCode: 2,
    explanation: '複雑な状態ロジックを一箇所にまとめ、状態更新の管理を明確にできます。',
    options: [
      { number: 1, text: '単純な状態管理に適している' },
      { number: 2, text: '複雑な状態遷移を一元管理できる' },
      { number: 3, text: 'パフォーマンスを向上させる' },
      { number: 4, text: '非同期処理を簡素化する' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'カスタムフックの命名規則',
    difficulty: '中級',
    content: 'カスタムフックはどのような命名規則に従うべきですか？',
    sampleCode: `
function useCustomHook() {
  // カスタムロジック
}
    `,
    answerCode: 1,
    explanation: 'カスタムフックは必ず「use」から始める必要があります。',
    options: [
      { number: 1, text: '必ず「use」から始める' },
      { number: 2, text: '「hook」から始める' },
      { number: 3, text: '特に命名規則はない' },
      { number: 4, text: '大文字で始める' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Context APIの基本手順',
    difficulty: '中級',
    content: 'React Context APIを使用してグローバルな状態を共有する基本手順は？',
    sampleCode: `
const MyContext = React.createContext(defaultValue);
function App() {
  return (
    <MyContext.Provider value={sharedValue}>
      <Child />
    </MyContext.Provider>
  );
}
    `,
    answerCode: 4,
    explanation: 'Context作成→Providerで値を供給→ConsumerまたはuseContextで利用する手順です。',
    options: [
      { number: 1, text: 'Providerのみを使用する' },
      { number: 2, text: 'Contextのみを作成する' },
      { number: 3, text: 'useContextだけで完結する' },
      { number: 4, text: 'Context作成、Providerで供給、ConsumerまたはuseContextで利用する' }
    ],
    tags: ['React', 'Context', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Higher-Order Component (HOC) の概念',
    difficulty: '中級',
    content: 'Higher-Order Component (HOC) とは何ですか？',
    sampleCode: `
function withExtraProps(WrappedComponent) {
  return function(props) {
    return <WrappedComponent extra="value" {...props} />;
  };
}
    `,
    answerCode: 3,
    explanation: 'HOCはコンポーネントを引数に取り、拡張した新しいコンポーネントを返す関数です。',
    options: [
      { number: 1, text: '新しいフックの一種である' },
      { number: 2, text: 'コンポーネントをメモ化する方法である' },
      { number: 3, text: 'コンポーネントを引数に取り拡張する関数である' },
      { number: 4, text: '状態管理ライブラリである' }
    ],
    tags: ['React', 'HOC', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Render Propsパターンの利用',
    difficulty: '中級',
    content: 'Render Propsパターンを使う際の基本的な考え方は何ですか？',
    sampleCode: `
function DataProvider({ render }) {
  const data = fetchData();
  return render(data);
}
    `,
    answerCode: 2,
    explanation: 'Render Propsパターンでは、関数を子として渡し、その結果でUIをレンダリングします。',
    options: [
      { number: 1, text: 'プロパティに直接値を渡す' },
      { number: 2, text: '関数を渡してその結果でUIをレンダリングする' },
      { number: 3, text: 'コンポーネントを直接返す' },
      { number: 4, text: '状態を共有する' }
    ],
    tags: ['React', 'Render Props', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React.memoのメリット',
    difficulty: '中級',
    content: 'React.memoを使用することで得られる主なメリットは何ですか？',
    sampleCode: `
const MemoizedComponent = React.memo(function MyComponent(props) {
  return <div>{props.value}</div>;
});
    `,
    answerCode: 1,
    explanation: 'React.memoは、propsが変化しなければ再レンダリングをスキップしてパフォーマンスを向上させます。',
    options: [
      { number: 1, text: '不要な再レンダリングを防ぐ' },
      { number: 2, text: '副作用を管理する' },
      { number: 3, text: '状態をグローバルに管理する' },
      { number: 4, text: 'コンポーネントを動的に生成する' }
    ],
    tags: ['React', '最適化', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React.lazyとSuspenseの使い方',
    difficulty: '中級',
    content: 'React.lazyとSuspenseを使用してコンポーネントを遅延ロードする方法は？',
    sampleCode: `
const LazyComponent = React.lazy(() => import('./MyComponent'));
function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}
    `,
    answerCode: 3,
    explanation: 'React.lazyで動的インポートし、SuspenseでフォールバックUIを指定します。',
    options: [
      { number: 1, text: 'lazyとSuspenseは使用できない' },
      { number: 2, text: 'import()とawaitで遅延ロードする' },
      { number: 3, text: 'React.lazyとSuspenseを使用する' },
      { number: 4, text: 'コードスプリッティングで自動的に遅延ロードされる' }
    ],
    tags: ['React', 'lazy', 'Suspense', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Error Boundaryの基本',
    difficulty: '中級',
    content: 'Error Boundaryコンポーネントはどのような場合に利用されますか？',
    sampleCode: `
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    logErrorToService(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
    `,
    answerCode: 4,
    explanation: 'Error Boundaryは子コンポーネントで発生したエラーをキャッチしてフォールバックUIを表示するために利用されます。',
    options: [
      { number: 1, text: 'エラーが発生しないようにするため' },
      { number: 2, text: 'パフォーマンス最適化のため' },
      { number: 3, text: '非同期処理の管理のため' },
      { number: 4, text: '子コンポーネントのエラーをキャッチするため' }
    ],
    tags: ['React', 'Error Boundary', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Forwarding Refsの使い方',
    difficulty: '中級',
    content: 'forwardRefを使用してコンポーネントにrefを転送する方法は？',
    sampleCode: `
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));
    `,
    answerCode: 1,
    explanation: 'forwardRefを使うことで、親コンポーネントから子のDOM要素に直接アクセスできます。',
    options: [
      { number: 1, text: 'React.forwardRefを使用する' },
      { number: 2, text: 'useRefを使用する' },
      { number: 3, text: 'createRefを使用する' },
      { number: 4, text: 'refプロパティを直接渡す' }
    ],
    tags: ['React', 'Refs', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'カスタムフックでAPI呼び出し',
    difficulty: '中級',
    content: 'カスタムフックを作成してAPI呼び出しのロジックを共通化する方法は？',
    sampleCode: `
function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data));
  }, [url]);
  return data;
}
    `,
    answerCode: 1,
    explanation: 'カスタムフックを使ってAPI呼び出しのロジックを共通化し、再利用性を向上させます。',
    options: [
      { number: 1, text: 'カスタムフックとして定義する' },
      { number: 2, text: '通常の関数として定義する' },
      { number: 3, text: 'クラスコンポーネントで管理する' },
      { number: 4, text: '外部ライブラリに依存する' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React Routerの基本',
    difficulty: '中級',
    content: 'React Routerを使用して複数ページのルーティングを実装する基本手順は？',
    sampleCode: `
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
    `,
    answerCode: 4,
    explanation: 'React Routerを使ってルートを定義し、Switchで最初に一致したルートのみレンダリングします。',
    options: [
      { number: 1, text: 'Routerコンポーネントだけで完結する' },
      { number: 2, text: 'Routeのみでページ遷移を管理する' },
      { number: 3, text: 'Switchは不要で複数Routeを並べる' },
      { number: 4, text: 'Router, Switch, Routeを組み合わせる' }
    ],
    tags: ['React', 'Router', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'コード分割と動的インポート',
    difficulty: '中級',
    content: 'Reactでコード分割を実現するために使用する機能は？',
    sampleCode: `
const LazyComponent = React.lazy(() => import('./MyComponent'));
    `,
    answerCode: 1,
    explanation: 'React.lazyとSuspenseを利用して、動的にコンポーネントを読み込むことができます。',
    options: [
      { number: 1, text: 'React.lazyとSuspenseを使用する' },
      { number: 2, text: 'コードを分割しない' },
      { number: 3, text: 'import文を動的に書く' },
      { number: 4, text: '高階コンポーネントで対応する' }
    ],
    tags: ['React', 'コード分割', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React.StrictModeの効果',
    difficulty: '中級',
    content: 'React.StrictModeを使用することで得られる主な効果は何ですか？',
    sampleCode: `
<React.StrictMode>
  <App />
</React.StrictMode>
    `,
    answerCode: 2,
    explanation: 'StrictModeは潜在的な問題や非推奨のAPI使用を警告するための追加チェックを行います。',
    options: [
      { number: 1, text: 'パフォーマンスが向上する' },
      { number: 2, text: '潜在的な問題や非推奨APIを警告する' },
      { number: 3, text: '自動的に修正を行う' },
      { number: 4, text: '開発ツールが不要になる' }
    ],
    tags: ['React', 'StrictMode', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'コンポーネント間のデータ共有方法',
    difficulty: '中級',
    content: 'Context API以外に、コンポーネント間でデータを共有する方法はどれですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'ReduxやMobXなどの状態管理ライブラリを利用してデータ共有を行う方法があります。',
    options: [
      { number: 1, text: 'useStateのみを使用する' },
      { number: 2, text: 'props drillingのみで対応する' },
      { number: 3, text: 'ReduxやMobXなどの状態管理ライブラリを使用する' },
      { number: 4, text: '直接DOM操作する' }
    ],
    tags: ['React', '状態管理', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useRefとDOM参照',
    difficulty: '中級',
    content: 'useRefフックを利用してDOM要素を参照する正しい方法はどれですか？',
    sampleCode: `
function InputComponent() {
  const inputRef = useRef(null);
  return <input ref={inputRef} type="text" />;
}
    `,
    answerCode: 1,
    explanation: 'useRefを使うと、レンダリング間で値を保持し、DOM要素に直接アクセスできます。',
    options: [
      { number: 1, text: 'ref属性にuseRefで作成したオブジェクトを渡す' },
      { number: 2, text: 'stateで管理する' },
      { number: 3, text: '直接document.getElementByIdを使用する' },
      { number: 4, text: 'createRefを使用する' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React.PureComponentの特徴',
    difficulty: '中級',
    content: 'React.PureComponentは通常のComponentとどのように異なり、どのように再レンダリングを最適化するか？',
    sampleCode: `
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}
    `,
    answerCode: 2,
    explanation: 'PureComponentはpropsとstateの浅い比較を行い、変化がなければ再レンダリングをスキップします。',
    options: [
      { number: 1, text: '全く同じ挙動をする' },
      { number: 2, text: '浅い比較で再レンダリングを最適化する' },
      { number: 3, text: '常に再レンダリングする' },
      { number: 4, text: '状態管理が不要になる' }
    ],
    tags: ['React', '最適化', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React Portalの利用',
    difficulty: '中級',
    content: 'ReactDOM.createPortalを使って子要素を別のDOMツリーにレンダリングする方法は？',
    sampleCode: `
ReactDOM.createPortal(
  <ChildComponent />,
  document.getElementById('portal-root')
);
    `,
    answerCode: 1,
    explanation: 'Portalを使用することで、親コンポーネントのDOM階層外に要素をレンダリングできます。',
    options: [
      { number: 1, text: 'ReactDOM.createPortalを使用する' },
      { number: 2, text: 'createPortalメソッドは存在しない' },
      { number: 3, text: 'React.lazyを使用する' },
      { number: 4, text: 'Suspenseでラップする' }
    ],
    tags: ['React', 'Portal', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Context APIのパフォーマンス最適化',
    difficulty: '中級',
    content: 'Context APIを使用する際、Providerの値が頻繁に変わるとどのような問題が発生するか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'Providerの値が変わると、すべてのConsumerが再レンダリングされ、パフォーマンスに悪影響を及ぼします。',
    options: [
      { number: 1, text: 'エラーが発生する' },
      { number: 2, text: '無視される' },
      { number: 3, text: '全てのConsumerが再レンダリングされる' },
      { number: 4, text: 'パフォーマンスは向上する' }
    ],
    tags: ['React', 'Context', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'カスタムフックと依存配列の管理',
    difficulty: '中級',
    content: 'カスタムフック内でuseEffectやuseCallbackの依存配列を正しく設定する重要性は？',
    sampleCode: `
function useCustomLogic(param) {
  useEffect(() => {
    // 処理
  }, [param]);
}
    `,
    answerCode: 1,
    explanation: '依存配列が正しく設定されていないと、意図しない再実行や無限ループが発生する可能性があります。',
    options: [
      { number: 1, text: '依存性を正しく設定することが重要' },
      { number: 2, text: '依存配列は不要である' },
      { number: 3, text: '常に空配列を指定する' },
      { number: 4, text: '依存配列は自動的に補完される' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useLayoutEffectとuseEffectの違い',
    difficulty: '中級',
    content: 'useLayoutEffectはuseEffectと比べてどのような挙動の違いがありますか？',
    sampleCode: `
useLayoutEffect(() => {
  // DOM更新直後に同期的に実行される
}, []);
    `,
    answerCode: 4,
    explanation: 'useLayoutEffectはDOMの更新後、ブラウザが描画する前に同期的に実行されるため、描画前の副作用処理に適しています。',
    options: [
      { number: 1, text: '非同期で実行される' },
      { number: 2, text: 'useEffectと同じタイミングで実行される' },
      { number: 3, text: '描画後に非同期で実行される' },
      { number: 4, text: 'DOM更新直後に同期的に実行される' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useEffect内の非同期処理パターン',
    difficulty: '中級',
    content: 'useEffect内で非同期処理を実行する一般的なパターンはどれですか？',
    sampleCode: `
useEffect(() => {
  async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  }
  fetchData();
}, [url]);
    `,
    answerCode: 2,
    explanation: 'useEffect内でasync関数を定義してすぐに実行することで、非同期処理を行います。',
    options: [
      { number: 1, text: 'useEffect自体をasyncにする' },
      { number: 2, text: '内部でasync関数を定義して実行する' },
      { number: 3, text: 'Promise.thenのみを使用する' },
      { number: 4, text: '非同期処理はuseEffect外で行う' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useEffectの空依存配列の意味',
    difficulty: '中級',
    content: 'useEffectの第二引数に空配列を渡すとどのような動作になるか？',
    sampleCode: `
useEffect(() => {
  // 初回マウント時のみ実行される
}, []);
    `,
    answerCode: 3,
    explanation: '空配列を指定すると、コンポーネントの初回マウント時にのみ副作用が実行されます。',
    options: [
      { number: 1, text: '毎回実行される' },
      { number: 2, text: '全く実行されない' },
      { number: 3, text: '初回マウント時のみ実行される' },
      { number: 4, text: '依存値が変わるたびに実行される' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'カスタムフックの再利用性',
    difficulty: '中級',
    content: '同じロジックを複数コンポーネントで利用するためにカスタムフックを作成するメリットは？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'カスタムフックにより、コードの再利用性と可読性が向上します。',
    options: [
      { number: 1, text: 'コードの再利用性と可読性が向上する' },
      { number: 2, text: 'パフォーマンスが大幅に向上する' },
      { number: 3, text: 'コンポーネント間の依存関係がなくなる' },
      { number: 4, text: '状態管理が不要になる' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useReducerの遅延初期化',
    difficulty: '中級',
    content: 'useReducerで初期状態を遅延初期化する方法はどれですか？',
    sampleCode: `
const [state, dispatch] = useReducer(reducer, undefined, init);
    `,
    answerCode: 2,
    explanation: '第三引数に初期化関数を渡すことで、初期状態を遅延初期化できます。',
    options: [
      { number: 1, text: '第二引数に初期値を渡す' },
      { number: 2, text: '第三引数に初期化関数を渡す' },
      { number: 3, text: 'useReducerは遅延初期化に対応していない' },
      { number: 4, text: 'init関数を外部で実行する' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'HOCとRender Propsの違い',
    difficulty: '中級',
    content: 'Higher-Order ComponentとRender Propsパターンの主な違いは何ですか？',
    sampleCode: '',
    answerCode: 4,
    explanation: 'HOCはコンポーネントを拡張する関数であり、Render Propsは関数を子として渡してUIを構築するパターンです。',
    options: [
      { number: 1, text: '全く同じ手法である' },
      { number: 2, text: 'どちらも関数コンポーネントでしか使えない' },
      { number: 3, text: 'HOCは状態管理、Render PropsはUI構築に特化している' },
      { number: 4, text: 'HOCはコンポーネントを拡張し、Render Propsは関数を通じてUIを提供する' }
    ],
    tags: ['React', 'パターン', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React.memoの更新条件',
    difficulty: '中級',
    content: 'React.memoでラップされたコンポーネントはどの条件で再レンダリングされるか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'React.memoは、propsが変更された場合に再レンダリングされます。',
    options: [
      { number: 1, text: '常に再レンダリングされる' },
      { number: 2, text: '状態が変わらなくても再レンダリングされる' },
      { number: 3, text: 'propsが変化した場合に再レンダリングされる' },
      { number: 4, text: 'レンダリングは一度だけ行われる' }
    ],
    tags: ['React', '最適化', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useImperativeHandleの基本',
    difficulty: '中級',
    content: 'useImperativeHandleフックはどのような目的で使用されるか？',
    sampleCode: `
function MyInput(props, ref) {
  useImperativeHandle(ref, () => ({
    focus: () => { /* focus logic */ }
  }));
  return <input />;
}
const ForwardedInput = React.forwardRef(MyInput);
    `,
    answerCode: 1,
    explanation: 'useImperativeHandleは、親コンポーネントが子コンポーネントの内部メソッドにアクセスするために使用します。',
    options: [
      { number: 1, text: '親コンポーネントから子のメソッドにアクセスするため' },
      { number: 2, text: '状態管理を簡素化するため' },
      { number: 3, text: 'イベントの最適化のため' },
      { number: 4, text: 'レンダリングを強制するため' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useDebugValueの用途',
    difficulty: '中級',
    content: 'useDebugValueフックはどのような目的で使用されるか？',
    sampleCode: `
function useFriendStatus(friendID) {
  const isOnline = useFriendStatusAPI(friendID);
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
    `,
    answerCode: 2,
    explanation: 'useDebugValueはカスタムフックのデバッグ情報を表示するために使用されます。',
    options: [
      { number: 1, text: 'パフォーマンスを向上させる' },
      { number: 2, text: 'カスタムフックのデバッグ情報を表示する' },
      { number: 3, text: '状態管理を最適化する' },
      { number: 4, text: 'レンダリングを制御する' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Concurrent Modeの基礎',
    difficulty: '中級',
    content: 'React Concurrent Modeの特徴として正しいものはどれですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'Concurrent Modeではレンダリングが中断・再開可能になり、UIの応答性が向上します。',
    options: [
      { number: 1, text: 'すべての処理が同期的に行われる' },
      { number: 2, text: 'レンダリングが一切中断されない' },
      { number: 3, text: 'レンダリングが中断・再開可能になる' },
      { number: 4, text: '状態管理が自動的に最適化される' }
    ],
    tags: ['React', 'Concurrent Mode', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Suspenseの目的',
    difficulty: '中級',
    content: 'React Suspenseはどのような用途で使用されるか？',
    sampleCode: `
<React.Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</React.Suspense>
    `,
    answerCode: 1,
    explanation: 'Suspenseは非同期で読み込まれるコンポーネントの読み込み中に表示するフォールバックUIを指定するために使用されます。',
    options: [
      { number: 1, text: '非同期読み込み時のフォールバックUIを指定する' },
      { number: 2, text: 'エラー処理を行う' },
      { number: 3, text: '状態管理を簡素化する' },
      { number: 4, text: 'コンポーネントをメモ化する' }
    ],
    tags: ['React', 'Suspense', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React RouterのuseParamsフック',
    difficulty: '中級',
    content: 'React RouterでURLパラメータを取得するためのフックはどれですか？',
    sampleCode: `
import { useParams } from 'react-router-dom';
function Component() {
  const params = useParams();
  return <div>{params.id}</div>;
}
    `,
    answerCode: 4,
    explanation: 'useParamsフックを使うと、URLパラメータをオブジェクト形式で取得できます。',
    options: [
      { number: 1, text: 'useHistory' },
      { number: 2, text: 'useLocation' },
      { number: 3, text: 'useRouteMatch' },
      { number: 4, text: 'useParams' }
    ],
    tags: ['React', 'Router', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React RouterのuseLocationフック',
    difficulty: '中級',
    content: 'useLocationフックはどのような情報を提供しますか？',
    sampleCode: `
import { useLocation } from 'react-router-dom';
function Component() {
  const location = useLocation();
  return <div>{location.pathname}</div>;
}
    `,
    answerCode: 2,
    explanation: 'useLocationは現在のURLの情報（pathname、search、hashなど）を提供します。',
    options: [
      { number: 1, text: 'URLパラメータのみ' },
      { number: 2, text: '現在のURL全体の情報' },
      { number: 3, text: 'ブラウザの履歴情報' },
      { number: 4, text: 'ルートの定義情報' }
    ],
    tags: ['React', 'Router', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React Routerの動的ルーティング',
    difficulty: '中級',
    content: '動的なURLパラメータを使用してコンポーネントをレンダリングする方法は？',
    sampleCode: `
<Route path="/user/:id" component={UserProfile} />
    `,
    answerCode: 3,
    explanation: 'Routeのpathに「:parameter」を設定することで、動的なルートパラメータを扱えます。',
    options: [
      { number: 1, text: '動的ルートは使用できない' },
      { number: 2, text: 'Switchで設定する' },
      { number: 3, text: 'Routeのpathに「:parameter」を設定する' },
      { number: 4, text: 'Linkコンポーネントで指定する' }
    ],
    tags: ['React', 'Router', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'バッチ処理による再レンダリング最適化',
    difficulty: '中級',
    content: 'Reactはどのようにして複数の状態更新を1回のレンダリングにまとめるか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'Reactはイベントハンドラ内での状態更新をバッチ処理して、再レンダリング回数を削減します。',
    options: [
      { number: 1, text: 'イベントハンドラ内での状態更新はバッチ処理される' },
      { number: 2, text: '常に個別にレンダリングされる' },
      { number: 3, text: 'setTimeoutでまとめる必要がある' },
      { number: 4, text: 'バッチ処理は自動では行われない' }
    ],
    tags: ['React', 'パフォーマンス', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'SyntheticEventの仕組み',
    difficulty: '中級',
    content: 'Reactが提供するSyntheticEventとは何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'SyntheticEventは、ブラウザのネイティブイベントをラップして、統一されたAPIで扱えるようにしたオブジェクトです。',
    options: [
      { number: 1, text: '独自のイベントシステムではない' },
      { number: 2, text: 'ブラウザのネイティブイベントをラップした統一イベントオブジェクト' },
      { number: 3, text: '常に非同期で発火する' },
      { number: 4, text: 'エラーハンドリング専用の仕組み' }
    ],
    tags: ['React', 'イベント', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'キー付きリストの重要性',
    difficulty: '中級',
    content: 'リストをレンダリングする際、各要素にkey属性を設定する理由は何ですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'key属性は各要素の同一性を保証し、効率的な差分更新を可能にします。',
    options: [
      { number: 1, text: 'スタイル適用のため' },
      { number: 2, text: 'イベント管理のため' },
      { number: 3, text: '要素の同一性を保証するため' },
      { number: 4, text: 'デバッグ用のIDとして使用する' }
    ],
    tags: ['React', 'リスト', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Promise.allの利用',
    difficulty: '中級',
    content: 'Promise.allはどのような状況で利用されるべきか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'Promise.allは複数のPromiseが全て解決されるのを待つために使用されます。',
    options: [
      { number: 1, text: '複数のPromiseが全て解決されるのを待つ' },
      { number: 2, text: '最初に解決されたPromiseのみを取得する' },
      { number: 3, text: 'Promiseのエラーを無視する' },
      { number: 4, text: 'Promise.allは使用しない' }
    ],
    tags: ['JavaScript', 'Promise', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Promise.raceの利用',
    difficulty: '中級',
    content: 'Promise.raceの主な用途は何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'Promise.raceは最初に解決または拒否されたPromiseの結果を返すために使用されます。',
    options: [
      { number: 1, text: 'すべてのPromiseの結果を待つ' },
      { number: 2, text: '最初に解決または拒否されたPromiseの結果を返す' },
      { number: 3, text: 'エラーを無視する' },
      { number: 4, text: 'Promiseの結果を配列で返す' }
    ],
    tags: ['JavaScript', 'Promise', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'カスタムフックのテスト',
    difficulty: '中級',
    content: 'カスタムフックをテストするための一般的なアプローチはどれですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'React Testing Libraryのhooksテスト用ユーティリティなどを使ってテストします。',
    options: [
      { number: 1, text: 'Jestだけで十分テストできる' },
      { number: 2, text: 'Enzymeのみでテストする' },
      { number: 3, text: 'React Testing Libraryのhooksテストユーティリティを使用する' },
      { number: 4, text: 'テストは不要である' }
    ],
    tags: ['React', 'Hooks', 'テスト', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useTransitionの利用',
    difficulty: '中級',
    content: 'React 18で追加されたuseTransitionフックは何のために使われるか？',
    sampleCode: `
const [isPending, startTransition] = useTransition();
    `,
    answerCode: 1,
    explanation: 'useTransitionは低優先度の状態更新を遅延させ、ユーザー操作の応答性を高めるために使用されます。',
    options: [
      { number: 1, text: '低優先度の状態更新を遅延させるため' },
      { number: 2, text: '状態管理を簡素化するため' },
      { number: 3, text: '非同期処理を同期的に行うため' },
      { number: 4, text: 'レンダリングを強制するため' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useDeferredValueの利用',
    difficulty: '中級',
    content: 'useDeferredValueフックは何を実現するために使用されるか？',
    sampleCode: `
const deferredValue = useDeferredValue(value);
    `,
    answerCode: 2,
    explanation: 'useDeferredValueは値の更新を遅延させ、ユーザー操作の応答性を優先するために使用されます。',
    options: [
      { number: 1, text: '即時に値を更新するため' },
      { number: 2, text: '値の更新を遅延させるため' },
      { number: 3, text: 'コンポーネントの再レンダリングを防ぐため' },
      { number: 4, text: '非同期処理を同期的に行うため' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Error Boundary実装のポイント',
    difficulty: '中級',
    content: 'Error Boundaryコンポーネントで実装すべきライフサイクルメソッドはどれですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'Error BoundaryではgetDerivedStateFromErrorとcomponentDidCatchの2つのライフサイクルメソッドを実装します。',
    options: [
      { number: 1, text: 'renderのみ' },
      { number: 2, text: 'componentDidMountのみ' },
      { number: 3, text: 'getDerivedStateFromErrorとcomponentDidCatch' },
      { number: 4, text: 'shouldComponentUpdateのみ' }
    ],
    tags: ['React', 'Error Boundary', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'イベントハンドラの再生成防止',
    difficulty: '中級',
    content: '子コンポーネントに渡すイベントハンドラの再生成を防ぐための一般的な方法は？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'useCallbackフックを使用して、同じ関数インスタンスを再利用することで不要な再レンダリングを防ぎます。',
    options: [
      { number: 1, text: '関数を毎回再定義する' },
      { number: 2, text: 'useCallbackを使用する' },
      { number: 3, text: 'stateで管理する' },
      { number: 4, text: 'propsとして直接渡す' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: '依存配列の指定ミスによる問題',
    difficulty: '中級',
    content: 'useEffectの依存配列を不適切に指定すると、どのような問題が発生するか？',
    sampleCode: '',
    answerCode: 3,
    explanation: '依存配列を誤ると、無限ループや不要な再実行が発生する可能性があります。',
    options: [
      { number: 1, text: 'エラーが必ず発生する' },
      { number: 2, text: '何も起こらない' },
      { number: 3, text: '無限ループや不要な再実行が発生する' },
      { number: 4, text: 'パフォーマンスが向上する' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'PureComponentの活用',
    difficulty: '中級',
    content: 'React.PureComponentはどのようにして再レンダリングを最適化するか？',
    sampleCode: `
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.text}</div>;
  }
}
    `,
    answerCode: 1,
    explanation: 'PureComponentはpropsとstateの浅い比較により、変更がなければ再レンダリングをスキップします。',
    options: [
      { number: 1, text: 'propsとstateの浅い比較で再レンダリングをスキップする' },
      { number: 2, text: '常に再レンダリングする' },
      { number: 3, text: '状態管理を不要にする' },
      { number: 4, text: 'ライフサイクルメソッドを省略する' }
    ],
    tags: ['React', '最適化', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'サーバーサイドレンダリング(SSR)の利点',
    difficulty: '中級',
    content: 'SSRを利用する主な利点は何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'SSRは初回レンダリング速度の向上やSEO対策に効果的です。',
    options: [
      { number: 1, text: 'クライアント側のレンダリング負荷が増加する' },
      { number: 2, text: '初回表示速度の向上とSEO対策に有効である' },
      { number: 3, text: '状態管理が簡単になる' },
      { number: 4, text: 'エラーハンドリングが自動化される' }
    ],
    tags: ['React', 'SSR', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Hydrationの目的',
    difficulty: '中級',
    content: 'サーバーでレンダリングされたHTMLとクライアント側の状態を同期するHydrationの目的は？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'HydrationはSSR後、サーバーで出力されたHTMLに対してReactのイベントなどをバインドするために行われます。',
    options: [
      { number: 1, text: 'HTMLを静的にするため' },
      { number: 2, text: 'CSSを適用するため' },
      { number: 3, text: 'サーバーでレンダリングされたHTMLとクライアントの状態を同期するため' },
      { number: 4, text: 'エラーハンドリングを行うため' }
    ],
    tags: ['React', 'SSR', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Concurrent Modeのメリット',
    difficulty: '中級',
    content: 'Concurrent Modeを使用することで得られる主なメリットは何ですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'Concurrent ModeによりUIの応答性が向上し、重い処理が中断可能になります。',
    options: [
      { number: 1, text: 'UIの応答性を向上させる' },
      { number: 2, text: 'すべての処理が同期的に行われる' },
      { number: 3, text: '状態管理が不要になる' },
      { number: 4, text: 'コンポーネントの再利用性が向上する' }
    ],
    tags: ['React', 'Concurrent Mode', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Suspenseの制限',
    difficulty: '中級',
    content: '現状のReact Suspenseが対応していない機能はどれですか？',
    sampleCode: '',
    answerCode: 4,
    explanation: '現在のSuspenseはコード分割と遅延ロードに対応しているが、全般的なデータフェッチには対応していません。',
    options: [
      { number: 1, text: 'コンポーネントの遅延ロード' },
      { number: 2, text: 'フォールバックUIの指定' },
      { number: 3, text: '動的インポート' },
      { number: 4, text: '全般的なデータフェッチ' }
    ],
    tags: ['React', 'Suspense', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Concurrent Mode導入時の注意点',
    difficulty: '中級',
    content: 'Concurrent Modeを導入する際に注意すべきポイントは何ですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'Concurrent Modeを導入する際は、既存のコードとの互換性や予期しない挙動に注意する必要があります。',
    options: [
      { number: 1, text: '既存のコードとの互換性に注意する' },
      { number: 2, text: '常に同期的に動作する' },
      { number: 3, text: '状態管理ライブラリが不要になる' },
      { number: 4, text: 'エラーハンドリングが自動で行われる' }
    ],
    tags: ['React', 'Concurrent Mode', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React Routerでのルートコンポーネントの遅延読み込み',
    difficulty: '中級',
    content: 'React Routerでルートコンポーネントを遅延ロードする方法は？',
    sampleCode: `
const LazyPage = React.lazy(() => import('./LazyPage'));
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/lazy" component={LazyPage} />
      </Suspense>
    </Router>
  );
}
    `,
    answerCode: 3,
    explanation: 'React.lazyとSuspenseを組み合わせることで、ルートコンポーネントの遅延読み込みが可能になります。',
    options: [
      { number: 1, text: '通常のimport文で読み込む' },
      { number: 2, text: 'Routeのrenderプロパティで指定する' },
      { number: 3, text: 'React.lazyとSuspenseを使用する' },
      { number: 4, text: '動的ルートはサポートされていない' }
    ],
    tags: ['React', 'Router', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React Profilerの利用',
    difficulty: '中級',
    content: 'React Profilerコンポーネントを使用してパフォーマンスを測定する方法は？',
    sampleCode: `
<Profiler id="App" onRender={(id, phase, actualDuration) => {
  console.log({ id, phase, actualDuration });
}}>
  <App />
</Profiler>
    `,
    answerCode: 2,
    explanation: 'Profilerコンポーネントでラップすることで、各コンポーネントのレンダリング時間などのパフォーマンス情報を取得できます。',
    options: [
      { number: 1, text: 'React.memoでラップする' },
      { number: 2, text: 'Profilerコンポーネントでラップする' },
      { number: 3, text: 'useEffectで測定する' },
      { number: 4, text: '専用のライブラリを使用する' }
    ],
    tags: ['React', 'Profiler', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: '非同期データ管理のパターン',
    difficulty: '中級',
    content: '非同期データの状態管理に推奨されるパターンはどれですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: '非同期データ管理にはuseReducerやReduxなどの外部ライブラリを使うパターンが一般的です。',
    options: [
      { number: 1, text: 'useStateのみで管理する' },
      { number: 2, text: '直接APIから取得する' },
      { number: 3, text: 'useReducerや外部ライブラリを利用する' },
      { number: 4, text: '状態管理は不要である' }
    ],
    tags: ['React', '状態管理', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'コード分割のメリット',
    difficulty: '中級',
    content: 'コード分割を行う主なメリットは何ですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'コード分割により初回ロード時間が短縮され、必要な時だけコードを読み込むことでパフォーマンスが向上します。',
    options: [
      { number: 1, text: '初回ロード時間の短縮とパフォーマンス向上' },
      { number: 2, text: '全てのコードが一度に読み込まれる' },
      { number: 3, text: '状態管理が不要になる' },
      { number: 4, text: 'エラーハンドリングが自動化される' }
    ],
    tags: ['React', 'コード分割', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'SSRとCSRの違い',
    difficulty: '中級',
    content: 'サーバーサイドレンダリング(SSR)とクライアントサイドレンダリング(CSR)の主な違いは？',
    sampleCode: '',
    answerCode: 4,
    explanation: 'SSRは初回表示速度とSEO対策に優れ、CSRはインタラクティブ性に優れます。',
    options: [
      { number: 1, text: 'SSRは常に高速である' },
      { number: 2, text: 'CSRはSEOに適している' },
      { number: 3, text: 'どちらも同じ方式で動作する' },
      { number: 4, text: '初回表示速度とSEO対策の観点で異なる' }
    ],
    tags: ['React', 'SSR', 'CSR', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'shouldComponentUpdateの役割',
    difficulty: '中級',
    content: 'クラスコンポーネントでshouldComponentUpdateを実装する主な目的は何ですか？',
    sampleCode: `
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 比較処理
  }
  render() {
    return <div>{this.props.value}</div>;
  }
}
    `,
    answerCode: 2,
    explanation: 'shouldComponentUpdateは不要な再レンダリングを防ぐために、更新の条件を自分で制御するために使います。',
    options: [
      { number: 1, text: '常に再レンダリングを許可する' },
      { number: 2, text: '不要な再レンダリングを防ぐため' },
      { number: 3, text: 'エラー発生時に使用する' },
      { number: 4, text: '状態管理を簡素化する' }
    ],
    tags: ['React', 'ライフサイクル', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Hooksの呼び出しルール',
    difficulty: '中級',
    content: 'React Hooksはどのルールに従って呼び出す必要がありますか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'Hooksは常にコンポーネントのトップレベルで呼び出す必要があり、条件分岐やループ内で呼び出してはいけません。',
    options: [
      { number: 1, text: '常にコンポーネントのトップレベルで呼び出す' },
      { number: 2, text: '条件分岐内でも呼び出してよい' },
      { number: 3, text: 'ループ内で呼び出しても問題ない' },
      { number: 4, text: 'クラスコンポーネント内でのみ使用する' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'useContextの再レンダリング問題',
    difficulty: '中級',
    content: 'useContextを使用する際、Providerの値が変化するとどのような問題が発生するか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'Providerの値が変わると、そのContextを利用しているすべてのConsumerが再レンダリングされます。',
    options: [
      { number: 1, text: 'エラーが発生する' },
      { number: 2, text: '値が自動的に固定される' },
      { number: 3, text: '全てのConsumerが再レンダリングされる' },
      { number: 4, text: '再レンダリングは起こらない' }
    ],
    tags: ['React', 'Context', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Context APIとReduxの比較',
    difficulty: '中級',
    content: '小規模な状態管理にContext APIを使う利点は何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'Context APIは設定が簡単で、外部ライブラリを必要としないため、小規模な状態管理に適しています。',
    options: [
      { number: 1, text: '必ずReduxを使うべきである' },
      { number: 2, text: '設定が簡単で外部ライブラリ不要である' },
      { number: 3, text: 'パフォーマンスが大幅に向上する' },
      { number: 4, text: 'グローバル状態管理はできない' }
    ],
    tags: ['React', 'Context', 'Redux', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React Profilerで測定できる情報',
    difficulty: '中級',
    content: 'React Profilerを使用して取得できる情報として正しいものはどれですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'Profilerは各コンポーネントのレンダリング時間やレンダリング回数などを測定することができます。',
    options: [
      { number: 1, text: '各コンポーネントのレンダリング時間' },
      { number: 2, text: 'コンポーネントの状態のみ' },
      { number: 3, text: 'エラーメッセージのみ' },
      { number: 4, text: '外部API呼び出し回数' }
    ],
    tags: ['React', 'Profiler', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'カスタムフックの再利用性のメリット',
    difficulty: '中級',
    content: 'カスタムフックを利用することで得られる主なメリットは何ですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'カスタムフックにより、複数のコンポーネント間で共通のロジックを再利用でき、コードの重複を減らせます。',
    options: [
      { number: 1, text: '共通ロジックの再利用性が向上する' },
      { number: 2, text: 'レンダリングが自動的に最適化される' },
      { number: 3, text: '全ての状態がグローバルに管理される' },
      { number: 4, text: 'エラーハンドリングが不要になる' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Reactの仮想DOMの役割',
    difficulty: '中級',
    content: 'Reactが仮想DOMを使用する主な目的は何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: '仮想DOMは、効率的なDOM更新のために差分計算を行い、必要な部分のみ実際のDOMに反映させる仕組みです。',
    options: [
      { number: 1, text: 'DOM操作を完全に排除するため' },
      { number: 2, text: '効率的なDOM更新を実現するため' },
      { number: 3, text: 'レンダリング速度を低下させるため' },
      { number: 4, text: 'グローバル状態管理を行うため' }
    ],
    tags: ['React', '仮想DOM', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'React.memoの再レンダリング条件再確認',
    difficulty: '中級',
    content: 'React.memoでラップされたコンポーネントは、どの条件で再レンダリングされるか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'React.memoは、propsが変化した場合にのみ再レンダリングされます。',
    options: [
      { number: 1, text: '常に再レンダリングされる' },
      { number: 2, text: 'stateが変わらなくても再レンダリングされる' },
      { number: 3, text: 'propsが変化した場合に再レンダリングされる' },
      { number: 4, text: '初回レンダリング後は再レンダリングされない' }
    ],
    tags: ['React', '最適化', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'SyntheticEventのメリット再確認',
    difficulty: '中級',
    content: 'ReactのSyntheticEventが提供するメリットとして正しいものはどれですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'SyntheticEventにより、ブラウザ間のイベントの実装差異を吸収し、統一されたAPIで扱えるようになります。',
    options: [
      { number: 1, text: 'ブラウザ間の互換性を保証する' },
      { number: 2, text: 'イベント発火が遅延する' },
      { number: 3, text: 'イベントが自動的に最適化される' },
      { number: 4, text: 'エラーハンドリングが不要になる' }
    ],
    tags: ['React', 'イベント', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Promise.allSettledの利用',
    difficulty: '中級',
    content: 'Promise.allSettledはどのような状況で有用か？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'Promise.allSettledは、複数のPromiseの結果を待ち、成功・失敗にかかわらず全ての結果を取得できます。',
    options: [
      { number: 1, text: '全てのPromiseが成功するのを待つ' },
      { number: 2, text: '全てのPromiseの結果を取得する' },
      { number: 3, text: '最初のPromiseのみを取得する' },
      { number: 4, text: 'Promiseのエラーを無視する' }
    ],
    tags: ['JavaScript', 'Promise', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'カスタムルートの作成',
    difficulty: '中級',
    content: 'React Routerで独自のルート処理を実装する際、どのプロパティを利用するのが一般的か？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'Routeコンポーネントのrenderプロパティを利用して、カスタムロジックを組み込む方法が一般的です。',
    options: [
      { number: 1, text: 'componentプロパティ' },
      { number: 2, text: 'childrenプロパティ' },
      { number: 3, text: 'renderプロパティ' },
      { number: 4, text: 'pathプロパティ' }
    ],
    tags: ['React', 'Router', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'コンポーネント分割の戦略',
    difficulty: '中級',
    content: '大規模アプリでコンポーネントを分割する際のポイントは何ですか？',
    sampleCode: '',
    answerCode: 4,
    explanation: '責任の分離と再利用性、保守性を考慮してコンポーネントを分割することが重要です。',
    options: [
      { number: 1, text: '全ての処理を1つのコンポーネントにまとめる' },
      { number: 2, text: '状態管理をコンポーネント内に閉じ込める' },
      { number: 3, text: 'コンポーネント数は多ければ良い' },
      { number: 4, text: '責任の分離と再利用性を考慮して分割する' }
    ],
    tags: ['React', '設計', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'カスタムフックでのデータフェッチ',
    difficulty: '中級',
    content: 'useFetchのようなカスタムフックを作成する際に注意すべき点は？',
    sampleCode: '',
    answerCode: 1,
    explanation: '依存配列の設定やクリーンアップ処理、エラーハンドリングを正しく実装する必要があります。',
    options: [
      { number: 1, text: '依存配列とクリーンアップ処理に注意する' },
      { number: 2, text: '特に注意する必要はない' },
      { number: 3, text: '非同期処理は不要である' },
      { number: 4, text: '状態管理ライブラリを必ず使う' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: '複数Contextの利用時の注意点',
    difficulty: '中級',
    content: '複数のContextをネストして利用する際に注意すべき点は何ですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: 'Provider同士の依存関係や更新タイミングに注意する必要があります。',
    options: [
      { number: 1, text: '全てを1つのContextにまとめる' },
      { number: 2, text: 'Provider間の依存関係に注意する' },
      { number: 3, text: 'ネストは避けるべきである' },
      { number: 4, text: 'Consumerは不要になる' }
    ],
    tags: ['React', 'Context', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'パフォーマンス最適化の総合戦略',
    difficulty: '中級',
    content: 'Reactアプリのパフォーマンスを向上させるための一般的な戦略は何ですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'コンポーネントのメモ化、適切なHooksの利用、コード分割など複数のテクニックを組み合わせることが重要です。',
    options: [
      { number: 1, text: '常に全てのコンポーネントを再レンダリングする' },
      { number: 2, text: '状態管理をすべてグローバルにする' },
      { number: 3, text: 'React.memo、useCallback、useMemoを活用する' },
      { number: 4, text: '特に最適化は不要である' }
    ],
    tags: ['React', '最適化', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'カスタムフックのテスト戦略',
    difficulty: '中級',
    content: 'カスタムフックをテストするために推奨される方法はどれですか？',
    sampleCode: '',
    answerCode: 2,
    explanation: '専用のテストライブラリ（例：React Hooks Testing Library）を使用して、フックの挙動を検証します。',
    options: [
      { number: 1, text: 'Jestだけでテストする' },
      { number: 2, text: '専用のテストライブラリを利用する' },
      { number: 3, text: 'テストは不要である' },
      { number: 4, text: 'Enzymeのみでテストする' }
    ],
    tags: ['React', 'Hooks', 'テスト', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Concurrent Mode導入時のリスク',
    difficulty: '中級',
    content: 'Concurrent Modeを導入する際に考慮すべきリスクは何ですか？',
    sampleCode: '',
    answerCode: 4,
    explanation: '既存コードとの互換性や予期しない挙動が発生する可能性があるため、十分な検証が必要です。',
    options: [
      { number: 1, text: 'リスクは全くない' },
      { number: 2, text: 'パフォーマンスが必ず向上する' },
      { number: 3, text: '状態管理が簡単になる' },
      { number: 4, text: '既存コードとの互換性や予期しない挙動に注意する必要がある' }
    ],
    tags: ['React', 'Concurrent Mode', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Suspenseの課題再確認',
    difficulty: '中級',
    content: '現在のSuspenseが対応していない機能として正しいものはどれですか？',
    sampleCode: '',
    answerCode: 3,
    explanation: 'Suspenseはコード分割と遅延ロードには対応しているが、全般的なデータフェッチには未対応です。',
    options: [
      { number: 1, text: 'コンポーネントの遅延ロード' },
      { number: 2, text: 'フォールバックUIの指定' },
      { number: 3, text: '全般的なデータフェッチ' },
      { number: 4, text: '動的インポート' }
    ],
    tags: ['React', 'Suspense', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'レンダリング最適化のためのテクニック',
    difficulty: '中級',
    content: '不要な再レンダリングを防ぐために利用できるテクニックはどれですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'React.memo、useCallback、useMemoなどを活用して再レンダリングを最適化できます。',
    options: [
      { number: 1, text: 'React.memo、useCallback、useMemoを活用する' },
      { number: 2, text: '常に全てのコンポーネントを再レンダリングする' },
      { number: 3, text: '状態管理をグローバルにする' },
      { number: 4, text: 'イベントハンドラを毎回再定義する' }
    ],
    tags: ['React', '最適化', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: 'Hooksの基本ルール再確認',
    difficulty: '中級',
    content: 'React Hooksを正しく使用するために守るべき基本ルールは何ですか？',
    sampleCode: '',
    answerCode: 1,
    explanation: 'Hooksはコンポーネントのトップレベルで呼び出す必要があり、条件分岐やループ内で呼んではならない。',
    options: [
      { number: 1, text: '常にトップレベルで呼び出す' },
      { number: 2, text: '条件付きで呼んでもよい' },
      { number: 3, text: 'ループ内で使用しても問題ない' },
      { number: 4, text: 'クラスコンポーネント内でのみ使用する' }
    ],
    tags: ['React', 'Hooks', '中級'],
    collectionName: 'React 中級'
  },
  {
    title: "useEffectの依存配列省略時の挙動",
    difficulty: "中級",
    content:
      "useEffectの第二引数を省略すると、コンポーネントのレンダリング毎に副作用が実行されます。正しい動作はどれですか？",
    sampleCode: `
useEffect(() => {
  console.log("Effect executed");
});
    `,
    answerCode: 3,
    explanation:
      "依存配列を省略すると、useEffectは毎回レンダリング後に実行されます。",
    options: [
      { number: 1, text: "初回のみ実行される" },
      { number: 2, text: "一度も実行されない" },
      { number: 3, text: "毎回実行される" },
      { number: 4, text: "条件付きで実行される" },
    ],
    tags: ["React", "Hooks", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "useRefの利用例と注意点",
    difficulty: "中級",
    content:
      "useRefはコンポーネントの再レンダリングに影響しない値の保持に利用されます。下記のコード例ではどの用途で使われているか？",
    sampleCode: `
function InputComponent() {
  const inputRef = useRef(null);
  return <input ref={inputRef} />;
}
    `,
    answerCode: 2,
    explanation:
      "useRefはDOM要素への参照を保持するために使用され、レンダリングを引き起こしません。",
    options: [
      { number: 1, text: "状態管理に使用する" },
      { number: 2, text: "DOM要素への参照を保持する" },
      { number: 3, text: "イベントハンドラを最適化する" },
      { number: 4, text: "関数の再生成を防ぐ" },
    ],
    tags: ["React", "Hooks", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "React.memoの使用タイミング",
    difficulty: "中級",
    content:
      "React.memoは関数コンポーネントの再レンダリングを防ぐために使用されます。どの状況で特に効果的か？",
    sampleCode: `
const MemoizedComponent = React.memo(function MyComponent(props) {
  return <div>{props.value}</div>;
});
    `,
    answerCode: 2,
    explanation:
      "propsが頻繁に変わらない場合、React.memoは再レンダリングを防ぎパフォーマンスを向上させます。",
    options: [
      { number: 1, text: "常に効果がある" },
      { number: 2, text: "propsが変わらない場合に効果的" },
      { number: 3, text: "stateが変化した場合に効果的" },
      { number: 4, text: "どの状況でも効果はない" },
    ],
    tags: ["React", "最適化", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "深い比較とReact.memo",
    difficulty: "中級",
    content:
      "React.memoは浅い比較で再レンダリングを判断します。深いオブジェクトをpropsとして渡す場合、どの対策が必要か？",
    sampleCode: "",
    answerCode: 3,
    explanation:
      "深い比較が必要な場合は、propsを個別に分割するか、useMemo等で値をキャッシュする必要があります。",
    options: [
      { number: 1, text: "何もしなくても大丈夫" },
      { number: 2, text: "React.memoは使用しない" },
      { number: 3, text: "propsの値をメモ化または分割する" },
      { number: 4, text: "常にdeepEqualを使う" },
    ],
    tags: ["React", "最適化", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "useContextの活用と注意点",
    difficulty: "中級",
    content:
      "useContextはグローバルな状態共有に便利ですが、Providerの値が頻繁に変わる場合どのような影響があるか？",
    sampleCode: "",
    answerCode: 3,
    explanation:
      "Providerの値が更新されると、それを利用している全てのConsumerが再レンダリングされ、パフォーマンスに影響します。",
    options: [
      { number: 1, text: "影響は全くない" },
      { number: 2, text: "一部のConsumerのみ再レンダリングされる" },
      { number: 3, text: "全てのConsumerが再レンダリングされる" },
      { number: 4, text: "エラーが発生する" },
    ],
    tags: ["React", "Context", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "JSXでの複数行条件式の書き方",
    difficulty: "中級",
    content:
      "JSX内で複数行の条件式を記述する際、正しい書き方はどれですか？",
    sampleCode: `
function Component({ flag }) {
  return (
    <div>
      { flag ? (
          <p>Trueの場合の表示</p>
        ) : (
          <p>Falseの場合の表示</p>
        )
      }
    </div>
  );
}
    `,
    answerCode: 1,
    explanation:
      "条件式が複数行の場合、括弧で囲むことで読みやすく記述できます。",
    options: [
      { number: 1, text: "括弧でグループ化して記述する" },
      { number: 2, text: "if文を直接記述する" },
      { number: 3, text: "ループ内で記述する" },
      { number: 4, text: "コメントアウトして記述する" },
    ],
    tags: ["React", "JSX", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "コンポーネントのレンダリングパフォーマンス最適化",
    difficulty: "中級",
    content:
      "不要な再レンダリングを防ぐために、どのテクニックの併用が有効か？",
    sampleCode: "",
    answerCode: 2,
    explanation:
      "React.memo、useCallback、useMemoを併用することで再レンダリングを最適化できます。",
    options: [
      { number: 1, text: "全てのコンポーネントを常に再レンダリングする" },
      { number: 2, text: "React.memo、useCallback、useMemoの併用" },
      { number: 3, text: "props drillingを利用する" },
      { number: 4, text: "状態管理をグローバルにする" },
    ],
    tags: ["React", "最適化", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "useReducerの基本設計",
    difficulty: "中級",
    content:
      "useReducerフックを用いた状態管理の基本パターンとして正しいものはどれか？",
    sampleCode: `
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}
const [state, dispatch] = useReducer(reducer, 0);
    `,
    answerCode: 1,
    explanation:
      "useReducerは、reducer関数とdispatchを利用して状態管理を行います。",
    options: [
      { number: 1, text: "reducer関数とdispatchを使用する" },
      { number: 2, text: "useStateだけで管理する" },
      { number: 3, text: "直接stateを変更する" },
      { number: 4, text: "各コンポーネントで個別に管理する" },
    ],
    tags: ["React", "Hooks", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "カスタムフックの基本パターン",
    difficulty: "中級",
    content:
      "カスタムフックは共通ロジックの抽象化に有効です。基本パターンとして正しいものはどれか？",
    sampleCode: `
function useCustomLogic(param) {
  const [state, setState] = useState(initialValue);
  useEffect(() => {
    // ロジック
  }, [param]);
  return state;
}
    `,
    answerCode: 1,
    explanation:
      "カスタムフックは、共通のロジックを抽象化して再利用性を高めるために作成します。",
    options: [
      { number: 1, text: "共通ロジックを抽象化して再利用する" },
      { number: 2, text: "状態管理を完全に排除する" },
      { number: 3, text: "直接UIを返す" },
      { number: 4, text: "エフェクトを省略する" },
    ],
    tags: ["React", "Hooks", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "useCallbackで依存性管理",
    difficulty: "中級",
    content:
      "useCallbackを使う際、依存配列に含めるべき値はどれか？",
    sampleCode: `
const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
    `,
    answerCode: 1,
    explanation:
      "useCallbackでは、関数内で使用している全ての外部変数を依存配列に含める必要があります。",
    options: [
      { number: 1, text: "関数内で参照する全ての変数" },
      { number: 2, text: "aのみ" },
      { number: 3, text: "bのみ" },
      { number: 4, text: "依存配列は不要" },
    ],
    tags: ["React", "Hooks", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "React Router v5の基本",
    difficulty: "中級",
    content:
      "React Router v5でルートを定義する基本的な方法はどれか？",
    sampleCode: `
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}
    `,
    answerCode: 1,
    explanation:
      "React Router v5では、BrowserRouter（またはRouter）、Switch、Routeを組み合わせてルートを定義します。",
    options: [
      { number: 1, text: "Router, Switch, Routeを組み合わせる" },
      { number: 2, text: "Routeのみで定義する" },
      { number: 3, text: "Switchのみで定義する" },
      { number: 4, text: "BrowserRouterのみで定義する" },
    ],
    tags: ["React", "Router", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "React Router v6の変更点",
    difficulty: "中級",
    content:
      "React Router v6では、ルート定義がどのように変更されたか？",
    sampleCode: `
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
    `,
    answerCode: 1,
    explanation:
      "v6では、SwitchがRoutesに置き換えられ、Routeにはelementプロパティでコンポーネントを指定します。",
    options: [
      { number: 1, text: "Routesとelementプロパティを使用する" },
      { number: 2, text: "Switchとcomponentプロパティを使用する" },
      { number: 3, text: "単一のRouteで定義する" },
      { number: 4, text: "BrowserRouterのみで定義する" },
    ],
    tags: ["React", "Router", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "コンポーネント再利用性向上のための抽象化",
    difficulty: "中級",
    content:
      "UI部分とロジック部分を分離することで再利用性が向上します。正しい抽象化手法はどれか？",
    sampleCode: "",
    answerCode: 3,
    explanation:
      "プレゼンテーショナルコンポーネントとコンテナコンポーネントに分ける設計が効果的です。",
    options: [
      { number: 1, text: "全てを1つのコンポーネントにまとめる" },
      { number: 2, text: "状態を全て内部で管理する" },
      { number: 3, text: "プレゼンテーショナルとコンテナの分離" },
      { number: 4, text: "各コンポーネントを個別に定義する" },
    ],
    tags: ["React", "設計", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "イベント伝搬とstopPropagationの利用",
    difficulty: "中級",
    content:
      "イベントバブリングを制御するために、どのメソッドを使用すればよいか？",
    sampleCode: `
function handleClick(e) {
  e.stopPropagation();
}
    `,
    answerCode: 1,
    explanation:
      "e.stopPropagation()を呼び出すことで、イベントのバブリングを停止できます。",
    options: [
      { number: 1, text: "e.stopPropagation()" },
      { number: 2, text: "e.preventDefault()" },
      { number: 3, text: "return false" },
      { number: 4, text: "e.cancel()" },
    ],
    tags: ["React", "イベント", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "React Hooksの呼び出し順序",
    difficulty: "中級",
    content:
      "Hooksは必ずコンポーネントのトップレベルで呼び出す必要があります。その理由は？",
    sampleCode: "",
    answerCode: 1,
    explanation:
      "呼び出し順序が保証されないと、状態の紐付けが崩れてバグの原因となるためです。",
    options: [
      { number: 1, text: "呼び出し順序が保証されないとバグの原因になる" },
      { number: 2, text: "順序は関係ない" },
      { number: 3, text: "条件分岐で切り替えられる" },
      { number: 4, text: "順序は自動で整列される" },
    ],
    tags: ["React", "Hooks", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "レンダリング中の副作用管理",
    difficulty: "中級",
    content:
      "レンダリング中に副作用が発生すると問題となるため、どの方法で副作用を管理するのが適切か？",
    sampleCode: "",
    answerCode: 2,
    explanation:
      "レンダリング中に副作用を直接行わず、useEffectで管理することで予期しない動作を防げます。",
    options: [
      { number: 1, text: "レンダリング中に直接副作用を実行する" },
      { number: 2, text: "useEffectで副作用を管理する" },
      { number: 3, text: "副作用は不要である" },
      { number: 4, text: "コンポーネント外で管理する" },
    ],
    tags: ["React", "Hooks", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "State updateの非同期性の理解",
    difficulty: "中級",
    content:
      "Reactの状態更新は非同期で行われる理由として正しいものはどれか？",
    sampleCode: "",
    answerCode: 3,
    explanation:
      "非同期更新により、複数の更新をまとめて一度に再レンダリングでき、パフォーマンスが向上します。",
    options: [
      { number: 1, text: "同期的に更新するとエラーが発生するため" },
      { number: 2, text: "常に即時反映させる必要があるため" },
      { number: 3, text: "バッチ処理によるパフォーマンス向上のため" },
      { number: 4, text: "非同期でなければ状態が変化しないため" },
    ],
    tags: ["React", "state", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "ReactライフサイクルとHooksの違い",
    difficulty: "中級",
    content:
      "クラスコンポーネントのライフサイクルとHooksとの違いについて正しい説明はどれか？",
    sampleCode: "",
    answerCode: 2,
    explanation:
      "Hooksは関数コンポーネント内でシンプルに状態と副作用を管理でき、ライフサイクルメソッドよりも直感的に扱えます。",
    options: [
      { number: 1, text: "ライフサイクルメソッドはHooksと全く同じである" },
      { number: 2, text: "Hooksはよりシンプルな構造で状態と副作用を管理できる" },
      { number: 3, text: "Hooksはクラスコンポーネントでのみ使用できる" },
      { number: 4, text: "両者に大きな違いはない" },
    ],
    tags: ["React", "Hooks", "ライフサイクル", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "useMemoの誤用によるパフォーマンス低下",
    difficulty: "中級",
    content:
      "useMemoを過剰に使用した場合、どのような問題が発生する可能性があるか？",
    sampleCode: "",
    answerCode: 3,
    explanation:
      "不要なメモ化がキャッシュの生成コストを増大させ、逆にパフォーマンス低下を招くことがあります。",
    options: [
      { number: 1, text: "常にパフォーマンスが向上する" },
      { number: 2, text: "エラーが発生する" },
      { number: 3, text: "不要なメモ化がパフォーマンス低下を招く" },
      { number: 4, text: "全く影響しない" },
    ],
    tags: ["React", "Hooks", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "JSXでの条件付き属性設定",
    difficulty: "中級",
    content:
      "JSX内で属性値を条件付きで設定する場合、一般的な手法として正しいものはどれか？",
    sampleCode: `
function Component({ isActive }) {
  return <div className={ isActive ? "active" : "inactive" } />;
}
    `,
    answerCode: 1,
    explanation:
      "条件付き属性設定は、三項演算子を使用して条件に応じた値を設定します。",
    options: [
      { number: 1, text: "三項演算子で設定する" },
      { number: 2, text: "if文を直接使用する" },
      { number: 3, text: "switch文で設定する" },
      { number: 4, text: "属性値は常に固定にする" },
    ],
    tags: ["React", "JSX", "中級"],
    collectionName: "React 中級",
  },
  {
    title: "Context APIを用いたグローバルステート管理実践例",
    difficulty: "中級",
    content:
      "Context APIを利用してグローバルな状態管理を実現する基本的な流れとして正しいものはどれか？",
    sampleCode: `
const MyContext = React.createContext(defaultValue);
function App() {
  return (
    <MyContext.Provider value={sharedValue}>
      <Child />
    </MyContext.Provider>
  );
}
    `,
    answerCode: 1,
    explanation:
      "Context APIは、Contextの作成、Providerで値の供給、ConsumerまたはuseContextで利用するという流れで実装します。",
    options: [
      { number: 1, text: "Context作成、Providerで供給、Consumer/useContextで利用する" },
      { number: 2, text: "Providerだけで実装する" },
      { number: 3, text: "Consumerだけで実装する" },
      { number: 4, text: "全てのコンポーネントで直接値を参照する" },
    ],
    tags: ["React", "Context", "中級"],
    collectionName: "React 中級",
  }
];

module.exports = problemsReactIntermediate;
