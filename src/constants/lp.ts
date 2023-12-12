export interface ContentObject {
  key: number;
  content: string;
  className: string;
}

export const LP_TABS = [
  {
    key: 1,
    title: 'プレイリスト',
    id: '#section-playlist',
  },
  {
    key: 2,
    title: 'ノート',
    id: '#section-note',
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
    className: 'text-6xl',
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
      'エキサイティングなYouTube動画を見ながら、その場でノートを取りませんか？YouTube Noteは動画とノートの融合で、学びの瞬間を逃しません。',
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
      '大切なアイデアや学びは、堅牢なデータベースに保存されます。過去の自分と未来の自分を繋ぐ、学びの軌跡として。',
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

export const LP_ENTRY = [
  {
    key: 1,
    content: '学びの未知なる冒険へ',
    className: 'text-3xl',
  },
  {
    key: 2,
    content:
      'YouTube Noteは学びの未知なる冒険への門戸です。今、新しいアイデアの芽が吹く瞬間を捉えましょう。無料で始めて、エンジニアリングの世界に新しい風を吹かせましょう。',
    className: '',
  },
];

export const AUTH_SIGN_UP = 'signUp';
export const AUTH_SIGN_IN = 'signIn';
export const AUTH_CLOSE = '';
export const DEFAULT_DELAY = 200;
