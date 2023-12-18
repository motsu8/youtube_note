export interface ContentObject {
  key: number;
  content: string;
  className: string;
}

export interface ImageObject {
  alt: string;
  src: string;
}

export interface StartStepContent {
  key: number;
  alt: string;
  src: string;
  content: string;
  title: string;
}

export const IMAGE = {
  playlist: {
    alt: 'プレイリストのイメージ画像',
    src: '/playlist.gif',
  },
  database: {
    alt: 'データベースに保存',
    src: '/save.gif',
  },
};

export const LP_TABS = [
  {
    key: 1,
    title: 'プレイリスト',
    id: '#section-playlist',
  },
  {
    key: 2,
    title: 'エディタ',
    id: '#section-note',
  },
  {
    key: 3,
    title: 'データベース',
    id: '#section-database',
  },
  {
    key: 4,
    title: '認証',
    id: '#section-auth',
  },
  {
    key: 5,
    title: '手引き',
    id: '#section-start',
  },
];

export const LP_NOTE_CARD = [
  {
    key: 1,
    title: 'アイデアの花咲くマークダウンエディタ',
    contents:
      'YouTube動画を見ながら、シンプルで力強いマークダウンエディタを使用し、アイデアを花開かせましょう。あなたのクリエイティビティがコードとなり、未知なるプロジェクトへと変わります。',
    url: '/markdown.png',
  },
  {
    key: 2,
    title: 'GitHubスタイルのHTMLプレビュー',
    contents:
      'プロジェクトの未来を感じるために、GitHubの美学を採用したHTMLプレビューが利用できます。スタイリッシュなコードを手に入れ、あなたのアイデアを輝かせましょう。',
    url: '/preview.png',
  },
];

export const LP_TITLE = [
  {
    key: 1,
    content: 'エンジニア志向ノートアプリ',
    className: 'text-5xl',
  },
  {
    key: 2,
    content:
      'YouTube Noteは、エンジニアリングの新しい学び方を提案します。YouTube動画を視聴しながらノートをとり、マークダウンエディタでアイデアを育て、GitHubのスタイルを纏ったHTMLプレビューで未来のコードを予見しましょう。',
    className: '',
  },
];

export const LP_PLAYLIST = [
  {
    key: 1,
    content: '動画とノートの融合',
    className: 'text-3xl',
  },
  {
    key: 2,
    content:
      'YouTube動画を見ながら、その場でノートを取りませんか？YouTube Noteは動画とノートの融合で、学びの瞬間を逃しません。YouTube動画を検索して直接アプリ内で視聴可能で、フォルダを作成することでノートを効果的に整理できます。',
    className: '',
  },
];

export const LP_DATABASE = [
  {
    key: 1,
    content: 'ノートはデータベースへ保存',
    className: 'text-3xl',
  },
  {
    key: 2,
    content:
      '大切なアイデアや学びは、堅牢なデータベースに保存されます。過去の自分と未来の自分を繋ぐ、学びの軌跡として。データベースにアクセスして、どこからでもあなたのノートにアクセス可能です。プロジェクトごとにノートを整理し、進捗を簡単に追跡しましょう！',
    className: '',
  },
];

export const LP_AUTH = [
  {
    key: 1,
    content: '安全な手段で始めよう',
    className: 'text-3xl',
  },
  {
    key: 2,
    content:
      'EmailやGoogleアカウントでログイン。セキュリティと利便性を両立させた認証で、クリエイティブな学びの旅路をスムーズにスタート。',
    className: '',
  },
];

export const LP_START_STEP = [
  {
    key: 1,
    alt: 'ログインイメージ',
    src: '/login.gif',
    title: 'アプリにログイン',
    content:
      'メールまたはGoogleアカウントで簡単に登録可能。数秒でアプリの利用を開始できます。',
  },
  {
    key: 2,
    alt: 'YouTube動画の検索イメージ',
    src: '/playlist.gif',
    title: 'YouTube動画を検索',
    content:
      'アプリ内でYouTube動画を検索して見つけ、即座に視聴開始。アプリ内で保存した動画はURLで検索可能。',
  },
  {
    key: 3,
    alt: '動画と同時にノートをとる',
    src: '/note.gif',
    title: '動画視聴と同時にノートを取る',
    content:
      'マークダウンエディタを使いながら動画を見ながらノートをとりましょう。重要なポイントやコードを逃さず記録。マークダウンで記入した内容をHTMLプレビューで確認することができます',
  },
  {
    key: 4,
    alt: 'データベースに保存',
    src: '/save.gif',
    title: 'データベースに保存',
    content:
      'ノートはデータベースに安全に保存。必要なときにどこからでもアクセス可能です。学習の進捗を追い、新しいスキルを効率的に習得。',
  },
];

export const LP_ENTRY = [
  {
    key: 1,
    content: '未知なる学びの冒険へ',
    className: 'text-3xl',
  },
  {
    key: 2,
    content:
      'YouTube Noteは学びの未知なる冒険への門戸です。今、新しいアイデアの芽が吹く瞬間を捉えましょう。無料で始めて、エンジニアリングの世界に新しい風を吹かせましょう。',
    className: '',
  },
];

/**
 * キー
 */
export const AUTH_SIGN_UP = 'signUp';
export const AUTH_SIGN_IN = 'signIn';
export const AUTH_CLOSE = '';
export const DEFAULT_DELAY = 200;
export const DEFAULT_DURATION = 1000;
export const DEFAULT_MOVE_TO = 'top';

/**
 * スタイルクラス
 */
export const PARALLAX_CHILD_CLASS = 'w-full h-full';
export const PARALLAX_PARENT_TITLE_SIZE_CLASS =
  'absolute lg:w-[700px] lg:h-[350px]';
export const PARALLAX_PARENT_SIZE_CLASS =
  'absolute aspect-[19/9] w-[700px] lg:w-[1000px]';
export const PARALLAX_PARENT_TITLE_POSITION_CLASS =
  'top-3/4 -translate-y-3/4 lg:top-1/2 lg:-translate-y-1/2 lg:left-1/3';
export const PARALLAX_PARENT_CENTER_POSITION_CLASS =
  'top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2';
export const PARALLAX_IMAGE_CLASS =
  'w-full h-full rounded-lg border-solid shadow-lg object-contain border-neutral-200';
