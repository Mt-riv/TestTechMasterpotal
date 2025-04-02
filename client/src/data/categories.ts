export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export const categories: Category[] = [
  {
    id: "all",
    name: "すべての技法",
    description: "すべてのテスト技法を表示します",
  },
  {
    id: "blackbox",
    name: "ブラックボックステスト",
    description: "プログラムの内部構造を意識せず、外部仕様に基づくテスト技法のカテゴリーです。入力と期待される出力に焦点を当て、システムの機能や振る舞いを検証します。",
  },
  {
    id: "whitebox",
    name: "ホワイトボックステスト",
    description: "プログラムの内部構造を理解し、コードの実行パスを考慮したテスト技法のカテゴリーです。コードカバレッジの観点から、テストの品質を測定します。",
  },
  {
    id: "experience",
    name: "経験ベーステスト",
    description: "テスターの知識、経験、直感に基づいてテストを設計・実行する技法のカテゴリーです。体系的な技法を補完するアプローチとして重要です。",
  },
  {
    id: "specialized",
    name: "特殊テスト技法",
    description: "特定のコンテキストやニーズに焦点を当てた専門的なテスト技法のカテゴリーです。特殊な要件や複雑な状況に対応するための技法を含みます。",
  },
];
