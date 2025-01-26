const mongoose = require('mongoose');
const Question = require('../models/Question');
const Collection = require('../models/Collection');
require('dotenv').config();

// MongoDB接続
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDBに接続されました');
  } catch (error) {
    console.error('MongoDB接続エラー:', error);
    process.exit(1);
  }
}


async function seedDatabase() {
  await connectDB();

  try {
    // コレクションのリセット
    await Collection.deleteMany({});
    await Question.deleteMany({});
    console.log('既存データを削除しました');

    // 問題集の挿入
    const insertedCollections = await Collection.insertMany(collections);
    console.log('問題集を挿入しました:', insertedCollections);

    // 問題データに対応する collectionId を設定
    const questionsWithCollectionIds = questions.map((question) => {
      const collection = insertedCollections.find((col) => col.name === question.collectionName);
      if (!collection) {
        throw new Error(`コレクションが見つかりません: ${question.collectionName}`);
      }
      return {
        ...question,
        collectionId: collection._id, // collectionId を追加
      };
    });

    await Question.insertMany(questionsWithCollectionIds);
    console.log('問題を挿入しました');
  } catch (error) {
    console.error('データ挿入エラー:', error);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB接続を終了しました');
  }
}

// 問題集データ
const collections = [
  {
    name: 'React 初級',
    description: 'Reactの基本的な内容を学べる問題集です。'
  },
  {
    name: 'React 中級',
    description: 'Reactフックや状態管理など中級的なトピックを学べる問題集です。'
  },
  {
    name: 'React 上級',
    description: 'パフォーマンス最適化やSSRなど高度なトピックを学べる問題集です。'
  },
];

const questions = [
  // ============================
  // React 初級 (30問のうち、サンプルとして一部のみ)
  // ============================
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
    // 「<div>Hello, {name}</div>」が正解 → 元の配列で index=1 → number=2
    answerCode: 2,
    explanation: 'JSXでは文字列の結合や変数を埋め込む場合に { } を使います。',
    options: [
      { number: 1, text: '<div>Hello, name</div>' },
      { number: 2, text: '<div>Hello, {name}</div>' },
      { number: 3, text: '<div>Hello, "name"</div>' },
      { number: 4, text: '<div>Hello, (name)</div>' },
    ],
    tags: ['React', 'JSX', '初心者向け'],
    collectionName: 'React 初級',
  },
  {
    title: 'クラスコンポーネントの正しい定義はどれ？',
    difficulty: '初級',
    content: 'React でクラスコンポーネントを書くときの基本的な書き方を選んでください。',
    sampleCode: `
???
  render() {
    return <h1>Hello Class</h1>;
  }
}
`,
    // 「class MyComponent extends React.Component」が正解 → 元の配列で index=1 → number=2
    answerCode: 2,
    explanation: 'クラスコンポーネントは React.Component を継承して定義します。',
    options: [
      { number: 1, text: 'function MyComponent extends React.Component' },
      { number: 2, text: 'class MyComponent extends React.Component' },
      { number: 3, text: 'class MyComponent extends React.Hooks' },
      { number: 4, text: 'function MyComponent() { return <div>...</div> }' },
    ],
    tags: ['React', 'ClassComponent'],
    collectionName: 'React 初級',
  },
  {
    title: '関数コンポーネントでpropsを受け取るには？',
    difficulty: '初級',
    content: 'Reactの関数コンポーネントで親から受け取ったpropsを使う方法を選んでください。',
    sampleCode: `
function Greet(???) {
  return <p>Hello, {name}</p>;
}
`,
    // 「function Greet({ name }) { ... }」が正解 → 元の配列で index=2 → number=3
    answerCode: 3,
    explanation: '関数コンポーネントは引数のオブジェクトとしてpropsを受け取り、分割代入が便利です。',
    options: [
      { number: 1, text: 'function Greet(props: { name: string })' },
      { number: 2, text: 'function Greet(name) { ... }' },
      { number: 3, text: 'function Greet({ name }) { ... }' },
      { number: 4, text: 'propsを受け取れない' },
    ],
    tags: ['React', 'Props', 'Beginner'],
    collectionName: 'React 初級',
  },
  {
    title: 'コンポーネント名は何から始めるのが一般的？',
    difficulty: '初級',
    content: 'Reactコンポーネントの命名規則として推奨されるものを選んでください。',
    sampleCode: '',
    // 「大文字(パスカルケース)で始める」 → index=1 → number=2
    answerCode: 2,
    explanation: 'React公式推奨で、コンポーネントは必ずパスカルケースで命名する (例: MyComponent)。',
    options: [
      { number: 1, text: '必ず小文字で始める' },
      { number: 2, text: '大文字(パスカルケース)で始める' },
      { number: 3, text: 'スネークケースで書く (my_component)' },
      { number: 4, text: '自由' },
    ],
    tags: ['React', '命名規則'],
    collectionName: 'React 初級',
  },
  {
    title: 'CSSの適用方法として正しいのはどれ？',
    difficulty: '初級',
    content: 'Reactコンポーネントにスタイルを適用する一般的な方法を選んでください。',
    sampleCode: '',
    // answerCode と options が微妙に違うが、近い内容である index=1 => number=2
    answerCode: 2,
    explanation: 'CSSファイルをインポート、styled-components、CSS Modulesなど多様なやり方があります。',
    options: [
      { number: 1, text: 'CSSは使えないのでインラインstyleしか書けない' },
      { number: 2, text: 'CSSファイルをimportし、クラス名を割り当てることなどが可能' },
      { number: 3, text: 'ReactでCSSを当てることはできない' },
      { number: 4, text: 'CSS in JSライブラリのみ使える' },
    ],
    tags: ['React', 'CSS'],
    collectionName: 'React 初級',
  },
  {
    title: 'イベントハンドラの書き方で正しいのは？',
    difficulty: '初級',
    content: 'ReactでonClickなどのイベントハンドラを割り当てる記法を選んでください。',
    sampleCode: `
function MyButton() {
  const handleClick = () => {
    alert("clicked");
  };
  return ???;
}
`,
    // 「<button onClick={handleClick}>Click</button>」 → index=1 → number=2
    answerCode: 2,
    explanation: 'JSXではキャメルケースでイベント名を指定し、コールバックを渡します。',
    options: [
      { number: 1, text: '<button onclick="handleClick()">' },
      { number: 2, text: '<button onClick={handleClick}>Click</button>' },
      { number: 3, text: '<button OnClick=handleClick>' },
      { number: 4, text: '<button #click={handleClick}>' },
    ],
    tags: ['React', 'Event'],
    collectionName: 'React 初級',
  },
  {
    title: 'useStateを使ったステート管理で正しいのは？',
    difficulty: '初級',
    content: '関数コンポーネントでステートを使う場合、useStateフックの基本的な書き方を選んでください。',
    sampleCode: '',
    // 「const [count, setCount] = useState(0)」 → index=1 => number=2
    answerCode: 2,
    explanation: '第一要素が値、第二要素が更新用の関数になります。',
    options: [
      { number: 1, text: 'const state = useState(count, setCount) = 0' },
      { number: 2, text: 'const [count, setCount] = useState(0)' },
      { number: 3, text: 'const count = useState(0)' },
      { number: 4, text: 'useState(count) => [number, function]' },
    ],
    tags: ['React', 'Hooks', 'Beginner'],
    collectionName: 'React 初級',
  },
  {
    title: 'useEffectを使うタイミングはどれ？',
    difficulty: '初級',
    content: 'Reactで副作用を扱うためのuseEffectフックを使用する典型的なシーンを選んでください。',
    sampleCode: '',
    // 「データ取得やDOM操作など、レンダリングの結果に応じて実行したい処理」→ 近いのが index=2 => number=3
    answerCode: 3,
    explanation: 'useEffectはレンダリング後の副作用処理（APIコール等）を行うためによく使われます。',
    options: [
      { number: 1, text: '常にレンダリング前に同期的に実行される' },
      { number: 2, text: '状態の更新ロジックを書くために必須' },
      { number: 3, text: 'データ取得やイベント登録など副作用的処理に使う' },
      { number: 4, text: 'EventLoopを制御するために使う' },
    ],
    tags: ['React', 'Hooks'],
    collectionName: 'React 初級',
  },
  {
    title: 'props.childrenは何を受け取るか？',
    difficulty: '初級',
    content: 'コンポーネントの子要素を表すprops.childrenの基本動作を選んでください。',
    sampleCode: `
function Layout({ children }) {
  return <div>{children}</div>;
}
`,
    // 「コンポーネントの開始タグと終了タグの間に書いた要素を受け取る」 => index=2 => number=3
    answerCode: 3,
    explanation: 'props.childrenを使うと、<Layout> ... </Layout> の間の要素を表示できます。',
    options: [
      { number: 1, text: '常に配列として渡される' },
      { number: 2, text: 'props.childrenは単一要素しか受け取れない' },
      { number: 3, text: '開始タグと終了タグの間の要素を参照' },
      { number: 4, text: 'childrenはコンポーネントの外側のみ参照' },
    ],
    tags: ['React', 'Props'],
    collectionName: 'React 初級',
  },
  {
    title: '再レンダリングが発生する条件で正しいのは？',
    difficulty: '初級',
    content: 'Reactの再レンダリングが起こるタイミングを選んでください。',
    sampleCode: '',
    // 'propsまたはstateが更新されたとき' => 近いのが index=2 => number=3
    answerCode: 3,
    explanation: 'Reactはコンポーネントのpropsやstateが変化すると再レンダリングを行います。',
    options: [
      { number: 1, text: '他のコンポーネントが変化しても必ず再レンダリングされる' },
      { number: 2, text: 'ルート要素が再描画されるたびに全コンポーネント再レンダリング' },
      { number: 3, text: 'propsまたはstateが更新されたコンポーネントのみ再レンダリング' },
      { number: 4, text: '画面をスクロールしたとき' },
    ],
    tags: ['React', 'Render'],
    collectionName: 'React 初級',
  },
  {
    title: 'アロー関数コンポーネントでStateを使うには？',
    difficulty: '初級',
    content: 'Reactでfunctionコンポーネント(アロー関数)にステートを持たせたい場合、正しい方法を選んでください。',
    sampleCode: '',
    // 'useStateフックを利用する' => index=2 => number=3
    answerCode: 3,
    explanation: 'React Hooksの登場により、関数コンポーネントでもuseStateを使って状態管理できます。',
    options: [
      { number: 1, text: 'アロー関数ではstateを使えない' },
      { number: 2, text: 'クラスコンポーネントに変換する' },
      { number: 3, text: 'useStateフックを使う' },
      { number: 4, text: 'state= {} と書けばOK' },
    ],
    tags: ['React', 'Hooks'],
    collectionName: 'React 初級',
  },
  {
    title: 'React.StrictModeの目的は何？',
    difficulty: '初級',
    content: 'React.StrictModeをラップする理由を選んでください。',
    sampleCode: `
<React.StrictMode>
  <App />
</React.StrictMode>
`,
    // '潜在的なエラーや非推奨APIの使用を警告してくれる' → 近いのが 'developmentモードで潜在的な問題を警告' => index=1 => number=2
    answerCode: 2,
    explanation: '開発時の追加チェックとして機能。本番ビルドでは影響しない。',
    options: [
      { number: 1, text: '本番ビルドでのみ動作し、最適化を行う' },
      { number: 2, text: 'developmentモードで潜在的な問題を警告' },
      { number: 3, text: 'JSXを変換するために必須' },
      { number: 4, text: 'イベントループを2回実行する' },
    ],
    tags: ['React', 'StrictMode'],
    collectionName: 'React 初級',
  },
  {
    title: 'defaultPropsの利用目的は？',
    difficulty: '初級',
    content: 'クラスコンポーネントや関数コンポーネントのデフォルトpropsを設定する目的を選んでください。',
    sampleCode: '',
    // 'propsが未指定の時に初期値を設定するため' => index=2 => number=3
    answerCode: 3,
    explanation: 'propsの受け取りが無い場合でも、デフォルト値を使ってエラーを回避できます。',
    options: [
      { number: 1, text: 'propsを変更不可能にするため' },
      { number: 2, text: 'propsの型を厳密に定義するため' },
      { number: 3, text: 'propsが未指定の時に初期値を設定するため' },
      { number: 4, text: 'コンポーネントを常に再レンダリングするため' },
    ],
    tags: ['React', 'Props'],
    collectionName: 'React 初級',
  },
  {
    title: 'create-react-appでプロジェクトを作成するコマンドは？',
    difficulty: '初級',
    content: 'Reactプロジェクトのベースを簡単に作成する公式ツールを使用するコマンドを選んでください。',
    sampleCode: '',
    // 'npx create-react-app my-app' => index=1 => number=2
    answerCode: 2,
    explanation: 'create-react-appは設定済みのReactプロジェクトテンプレートを生成します。',
    options: [
      { number: 1, text: 'npm init react my-app' },
      { number: 2, text: 'npx create-react-app my-app' },
      { number: 3, text: 'yarn start create my-app' },
      { number: 4, text: 'npm install react && mkdir my-app' },
    ],
    tags: ['React', 'CLI'],
    collectionName: 'React 初級',
  },
  {
    title: 'SPA(Single Page Application)とは？',
    difficulty: '初級',
    content: 'Reactで代表的なアプリ形態であるSPAの定義を選んでください。',
    sampleCode: '',
    // 'ページ全体を再読み込みせずにコンテンツを切り替えるWebアプリの形態' => index=2 => number=3
    answerCode: 3,
    explanation: 'Reactはルーティングでもページ切り替え風の体験を作るが、実際には1つのHTMLを使っている。',
    options: [
      { number: 1, text: 'サーバーサイドレンダリングの略' },
      { number: 2, text: '全ページを用意してリンクで移動する形式' },
      { number: 3, text: 'ページリロード無しに画面を切り替える仕組み' },
      { number: 4, text: 'モバイルアプリを指す' },
    ],
    tags: ['React', 'SPA'],
    collectionName: 'React 初級',
  },
  {
    title: 'setStateが非同期である理由は？',
    difficulty: '初級',
    content: 'クラスコンポーネントのsetStateが非同期更新となる理由を選んでください。',
    sampleCode: '',
    // 'バッチ処理でまとめてレンダリングを最適化するため' => index=2 => number=3
    answerCode: 3,
    explanation: '非同期的にまとめて更新することでパフォーマンスを向上させる仕組み。',
    options: [
      { number: 1, text: '実際には同期的である' },
      { number: 2, text: 'サーバーとの通信を行うため' },
      { number: 3, text: 'バッチ処理を行い、レンダリング回数を削減するため非同期' },
      { number: 4, text: 'Hooks以降は同期になる' },
    ],
    tags: ['React', 'ClassComponent'],
    collectionName: 'React 初級',
  },
  {
    title: 'ReactDOM.renderの役割は何？',
    difficulty: '初級',
    content: '旧来のプロジェクト構成(React 17以前)で使われるReactDOM.renderの意味を選んでください。',
    sampleCode: `
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
`,
    // '指定したコンポーネントをroot DOM要素にマウントする' => index=2 => number=3
    answerCode: 3,
    explanation: 'React 18以降はReactDOM.createRoot().render()が推奨されるが、基本は同じ。',
    options: [
      { number: 1, text: '仮想DOMを破棄する' },
      { number: 2, text: 'root要素を削除する' },
      { number: 3, text: 'コンポーネントを指定したDOMにマウントする' },
      { number: 4, text: 'JSXを文字列に変換するだけ' },
    ],
    tags: ['React', 'Render'],
    collectionName: 'React 初級',
  },
  {
    title: 'unmountComponentAtNodeの用途は？',
    difficulty: '初級',
    content: 'ReactDOM.unmountComponentAtNodeを使用する場面を選んでください。',
    sampleCode: '',
    // '指定DOMにマウントされたコンポーネントをアンマウントする' => index=2 => number=3
    answerCode: 3,
    explanation: 'ポータルなどで手動アンマウントが必要なケースや、テストで使われることが多い。',
    options: [
      { number: 1, text: 'コンポーネントのstateだけを削除' },
      { number: 2, text: '指定DOMを破壊してHTMLを消す' },
      { number: 3, text: 'マウントされたReactコンポーネントをアンマウントする' },
      { number: 4, text: '再レンダリングを強制する' },
    ],
    tags: ['React', 'Unmount'],
    collectionName: 'React 初級',
  },
  {
    title: 'BrowserRouterを使う意義は？',
    difficulty: '初級',
    content: 'React RouterでBrowserRouterを使う意味を選んでください。',
    sampleCode: '',
    // 'HTML5のHistory APIを利用し、URLパスでルーティングする' => index=3 => number=4
    answerCode: 4,
    explanation: 'HashRouterとは違い、URLに#が付かない形でのルーティングを実現します。',
    options: [
      { number: 1, text: '常にサーバーサイドレンダリングを行う' },
      { number: 2, text: '古いブラウザでは使えないので推奨されない' },
      { number: 3, text: 'URLにハッシュ(#)を使用してパスを切り替える' },
      { number: 4, text: 'HTML5 History APIでルーティングし、URLがシンプルになる' },
    ],
    tags: ['React', 'Router'],
    collectionName: 'React 初級',
  },
  {
    title: 'フラグメント(<>)の目的は？',
    difficulty: '初級',
    content: 'ReactでDOMを増やさずに複数の要素を返したいときに使うフラグメントの説明を選んでください。',
    sampleCode: `
function MyList() {
  return (
    <>
      <li>Item1</li>
      <li>Item2</li>
    </>
  );
}
`,
    // '不要な包み要素を作らずに複数要素を返せる' => index=2 => number=3
    answerCode: 3,
    explanation: 'Fragmentは<div>のような余計な要素を追加しなくて済む仕組み。',
    options: [
      { number: 1, text: '常に単一の要素しか返せない' },
      { number: 2, text: 'コメントアウト専用シンタックス' },
      { number: 3, text: '不要なDOM要素を増やさず複数要素を返す' },
      { number: 4, text: 'フラグメントはReact 15までの機能' },
    ],
    tags: ['React', 'Fragment'],
    collectionName: 'React 初級',
  },

  // ============================
  // React 中級 (一部)
  // ============================
  {
    title: 'Hooksのルール「最上位でのみ呼び出す」とはどういう意味？',
    difficulty: '中級',
    content: 'Hooksを使う際のルールとして、ループや条件分岐の中で呼ばない、という指針の理由を選択。',
    sampleCode: '',
    // 「呼び出す順番が毎回同じである必要があり～」 → 正解は "条件分岐の中で呼ぶとHook順序が乱れる" => index=2 => number=3
    answerCode: 3,
    explanation: 'Hooksはコンポーネントがレンダリングするたびに同じ順序で呼ばれる必要がある。',
    options: [
      { number: 1, text: 'カスタムフックなら条件分岐で呼んでもいい' },
      { number: 2, text: 'クラスコンポーネントでもHooksを使える' },
      { number: 3, text: '条件分岐の中で呼ぶとHookの呼び出し順序が乱れ、バグを引き起こす' },
      { number: 4, text: 'そもそも複数回呼び出すことは禁止' },
    ],
    tags: ['React', 'Hooks'],
    collectionName: 'React 中級',
  },
  {
    title: 'Reduxで「Reducer」の役割は？',
    difficulty: '中級',
    content: 'Reduxアーキテクチャでのreducer関数の役割を選んでください。',
    sampleCode: '',
    // index=3 => 'アクションを受け取り、stateをどう変えるかを決める純粋関数'
    answerCode: 4, // Wait let's see the array => 0:'アクションをディスパッチ' 1:'非同期処理..' 2:'Viewを...' 3:'アクションを受け取りstateをどう変えるか純粋関数'
    // Actually the correct is the 4th => number=4
    explanation: 'reducerは(state, action) => newState の形で書かれる純粋な関数。',
    options: [
      { number: 1, text: 'アクションをディスパッチするだけの関数' },
      { number: 2, text: '非同期処理を管理する関数' },
      { number: 3, text: 'Viewをレンダリングするためのコンポーネント' },
      { number: 4, text: 'アクションを受け取り、stateをどう変えるかを決める純粋関数' },
    ],
    tags: ['React', 'Redux'],
    collectionName: 'React 中級',
  },
  {
    title: 'Immutableな状態管理が推奨される理由は？',
    difficulty: '中級',
    content: 'ReactやReduxで状態を不変(Immutable)に保つ利点を選択してください。',
    sampleCode: '',
    // "状態変更を追跡しやすく..." => index=2 => number=3
    answerCode: 3,
    explanation: '変更差分を簡単に検知でき、参照比較で再レンダリングを最適化できる。',
    options: [
      { number: 1, text: '再レンダリングを完全に回避できる' },
      { number: 2, text: '常にメモリ使用量が減る' },
      { number: 3, text: '状態変更を追跡しやすく、差分検知が容易' },
      { number: 4, text: 'JavaScriptでは再代入が許可されない' },
    ],
    tags: ['React', 'Redux', 'Immutable'],
    collectionName: 'React 中級',
  },
  {
    title: 'contextAPIとReduxの違いで正しいのは？',
    difficulty: '中級',
    content: '状態をグローバルに管理する手段としてContext APIとReduxのどちらも有名です。違いを選んでください。',
    sampleCode: '',
    // "Reduxは厳密に一元管理し、Contextは軽量なグローバル" => index=2 => number=3
    answerCode: 3,
    explanation: 'Contextはpropsドリリングを回避する単純な仕組み、Reduxは状態管理のルールが整備されている。',
    options: [
      { number: 1, text: 'Contextはステート管理ができずReduxだけが可能' },
      { number: 2, text: 'Reduxは非同期が扱えないがContextは扱える' },
      { number: 3, text: 'Reduxは厳密に一元管理し、Contextは軽量なグローバル参照を提供する' },
      { number: 4, text: '両者に違いは無く完全に同等' },
    ],
    tags: ['React', 'Context', 'Redux'],
    collectionName: 'React 中級',
  },
  // ...以下略。上級なども同様のフォーマットで変換可能...
];



module.exports = questions;


seedDatabase();
