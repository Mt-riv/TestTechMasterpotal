# ソフトウェアテスト教育アプリケーション

ソフトウェアテスト技法の学習を支援するインタラクティブなWebアプリケーションです。

## 機能

- 🎯 **包括的なテスト技法**: 同値分割法、境界値分析、状態遷移テスト、VSTeP等の実践的な技法
- 📚 **実践演習**: 各技法に対応したクイズ形式の演習問題
- 🏆 **バッジシステム**: 学習進捗を可視化するバッジ獲得機能
- 🔍 **検索・フィルタ**: カテゴリ別・技法別の効率的な学習ナビゲーション
- 🌙 **ダークモード**: 目に優しい表示モード切り替え

## 技術スタック

- **フロントエンド**: React 18, TypeScript, Tailwind CSS
- **ルーティング**: Wouter
- **アイコン**: Lucide React
- **UIコンポーネント**: Radix UI
- **バックエンド**: Express.js, Node.js
- **ビルドツール**: Vite

## ローカル開発環境のセットアップ

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール手順

1. **リポジトリのクローン**
```bash
git clone <repository-url>
cd <project-directory>
```

2. **依存関係のインストール**
```bash
npm install
```

3. **開発サーバーの起動**
```bash
npm run dev
```

4. **ブラウザでアクセス**
```
http://localhost:5000
```

### ビルド

プロダクション用ビルドを作成する場合:

```bash
npm run build
npm start
```

## プロジェクト構造

```
├── client/                 # フロントエンドソース
│   └── src/
│       ├── components/     # Reactコンポーネント
│       │   ├── ui/        # 再利用可能なUIコンポーネント
│       │   └── exercise/   # 演習関連コンポーネント
│       ├── data/          # 静的データ（技法、演習、バッジ）
│       ├── hooks/         # カスタムReactフック
│       ├── pages/         # ページコンポーネント
│       ├── context/       # Reactコンテキスト
│       ├── services/      # ビジネスロジック
│       └── types/         # TypeScript型定義
├── server/                # バックエンドソース
│   ├── index.ts          # サーバーエントリーポイント
│   ├── routes.ts         # API ルート
│   └── vite.ts           # Vite開発サーバー設定
├── public/               # 静的ファイル
└── dist/                 # ビルド出力
```

## 利用可能なスクリプト

- `npm run dev` - 開発サーバー起動
- `npm run build` - プロダクションビルド
- `npm start` - プロダクションサーバー起動
- `npm run check` - TypeScript型チェック

## データ構造

### 技法データ (client/src/data/techniques.ts)
各テスト技法には以下の情報が含まれます:
- 基本情報（名前、カテゴリ、難易度）
- 詳細説明と歴史
- 適用手順と実例
- メリット・デメリット
- 関連技法

### 演習データ (client/src/data/exercises.ts)
各演習には以下が含まれます:
- シナリオ設定
- 段階的な手順
- クイズ問題（多肢選択式）
- 採点システム

### バッジシステム
学習者の進捗に応じて以下のバッジが獲得可能:
- 技法マスターバッジ（各技法完了時）
- カテゴリ達人バッジ（カテゴリ全技法完了時）
- 総合マエストロバッジ（全技法完了時）

## トラブルシューティング

### パスエラーが発生する場合

1. Node.js バージョンを確認:
```bash
node --version  # 18以上であることを確認
```

2. 依存関係を再インストール:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. TypeScript設定を確認:
```bash
npm run check
```

### ポート競合の場合

環境変数でポートを変更できます:
```bash
PORT=3000 npm run dev
```

## コントリビューション

1. フィーチャーブランチを作成
2. 変更をコミット
3. プルリクエストを作成

## ライセンス

MIT License