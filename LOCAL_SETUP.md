# ローカル開発環境セットアップガイド

## 必要な環境

- Node.js 18.0.0以上
- npm 8.0.0以上

## セットアップ手順

### 1. リポジトリのクローンと依存関係のインストール

```bash
git clone <your-repository-url>
cd <project-name>
npm install
```

### 2. 環境設定（オプション）

`.env.local`ファイルを作成してポートを変更する場合:

```bash
# .env.local
PORT=3000
NODE_ENV=development
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5000` (または設定したポート) にアクセス

## トラブルシューティング

### エラー: "Cannot resolve module"

**解決方法1: Node.js バージョン確認**
```bash
node --version
# 18.0.0以上であることを確認
```

**解決方法2: 依存関係の再インストール**
```bash
rm -rf node_modules package-lock.json
npm install
```

**解決方法3: TypeScript設定の確認**
```bash
npm run check
```

### エラー: "Port already in use"

**解決方法: 別のポートを使用**
```bash
PORT=3000 npm run dev
```

### エラー: "Path resolution failed"

これは通常、以下の原因によるものです:

1. **TypeScript設定**: `tsconfig.json`でパスマッピングが正しく設定されている
2. **Vite設定**: エイリアスが適切に設定されている
3. **Node.js互換性**: ESモジュール形式を使用

### Windows環境での注意点

PowerShellを使用する場合:
```powershell
$env:PORT=3000; npm run dev
```

### macOS/Linux環境での注意点

権限エラーが発生する場合:
```bash
sudo chown -R $(whoami) ~/.npm
```

## プロダクションビルド

```bash
npm run build
npm start
```

## ファイル構造の説明

```
project/
├── client/           # フロントエンドソース
│   ├── src/
│   │   ├── components/  # Reactコンポーネント
│   │   ├── data/       # 静的データ
│   │   ├── hooks/      # カスタムフック
│   │   ├── pages/      # ページコンポーネント
│   │   └── types/      # 型定義
│   └── index.html
├── server/           # バックエンドソース
│   ├── index.ts      # サーバーエントリーポイント
│   ├── routes.ts     # APIルート
│   └── vite.ts       # Vite設定
├── public/           # 静的ファイル
└── dist/            # ビルド出力
```

## 開発のヒント

### HMR (Hot Module Replacement)
ファイルを保存すると自動的にブラウザが更新されます。

### TypeScript エラーチェック
```bash
npm run check
```

### コードフォーマット
プロジェクトはPrettierとESLintの設定を推奨します（手動設定が必要）。

## よくある問題と解決策

### 1. "Cannot find module '@/components/...'"

`tsconfig.json`のパス設定を確認:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/src/*"]
    }
  }
}
```

### 2. ビルドエラー

依存関係の不整合の可能性:
```bash
npm ci  # package-lock.jsonから正確にインストール
```

### 3. メモリエラー (大きなプロジェクトの場合)

Node.jsのメモリ制限を増やす:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run dev
```

## 追加設定

### VS Code 推奨設定

`.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true
}
```

### 推奨拡張機能
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense

## サポート

問題が解決しない場合は、以下の情報を含めてissueを作成してください:

1. Node.js バージョン (`node --version`)
2. npm バージョン (`npm --version`)
3. OS情報
4. エラーメッセージの全文
5. 実行したコマンド