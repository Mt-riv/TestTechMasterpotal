import { PracticalExercise, BadgeDefinition } from '../types/exercise';

// サンプル演習データ
export const exercises: PracticalExercise[] = [
  {
    id: 'ex-001',
    title: '同値分割テストの演習',
    description: '同値分割（Equivalence Partitioning）テスト技法を使った実践演習です。',
    objective: 'この演習では、入力範囲を有効なクラスと無効なクラスに分割し、効率的なテストケースを設計する方法を学びます。',
    scenarioDescription: 
      'あなたは銀行の口座管理システムの開発チームに所属しています。システムには入金機能があり、1回の入金額は1円から100万円までという制約があります。\n\n' +
      'この機能に対して同値分割テスト技法を用いて効率的なテストケースを設計する必要があります。',
    steps: [
      {
        stepNumber: 1,
        description: '入金機能の仕様を確認し、入力の有効範囲と無効範囲を特定する'
      },
      {
        stepNumber: 2,
        description: '有効同値クラスと無効同値クラスを識別する'
      },
      {
        stepNumber: 3,
        description: '各同値クラスから代表値を選んでテストケースを設計する'
      },
      {
        stepNumber: 4,
        description: '設計したテストケースの有効性を評価する'
      }
    ],
    quiz: [
      {
        id: 'q-001-1',
        questionText: '銀行の入金機能（1円〜100万円まで有効）に対する同値分割テストで、以下のテストケースのうち冗長なものはどれですか？',
        options: [
          {
            id: 'q-001-1-a',
            text: '入金額: -10円',
            isCorrect: false,
            explanation: 'これは無効同値クラス（負の値）の代表値であり、重要なテストケースです。'
          },
          {
            id: 'q-001-1-b',
            text: '入金額: 0円',
            isCorrect: false,
            explanation: 'これは境界値（下限の外側）であり、重要なテストケースです。'
          },
          {
            id: 'q-001-1-c',
            text: '入金額: 500円と入金額: 50,000円',
            isCorrect: true,
            explanation: '両方とも有効同値クラス内の値であり、同じクラスから複数のケースをテストすることは冗長です。同値分割の考え方では、各同値クラスから1つのテストケースを選ぶことが効率的です。'
          },
          {
            id: 'q-001-1-d',
            text: '入金額: 1,000,001円',
            isCorrect: false,
            explanation: 'これは上限を超える値で、無効同値クラスの代表値として重要なテストケースです。'
          }
        ],
        explanation: '同値分割テスト技法では、各同値クラスから代表的な1つの値をテストすれば、そのクラス内の他の値も同じ振る舞いをすると仮定します。そのため、同じ同値クラス内から複数の値をテストすることは冗長になります。',
        difficulty: 'medium',
        points: 10
      },
      {
        id: 'q-001-2',
        questionText: '同値分割テストの主な利点は何ですか？',
        options: [
          {
            id: 'q-001-2-a',
            text: 'すべての可能な入力値を網羅的にテストできる',
            isCorrect: false,
            explanation: '同値分割は網羅的テストではなく、入力ドメインを効率的に削減するための技法です。'
          },
          {
            id: 'q-001-2-b',
            text: 'テストケース数を削減しながら効果的なカバレッジを実現できる',
            isCorrect: true,
            explanation: '同値分割の主な利点は、テストケース数を大幅に削減しながらも、効果的なテストカバレッジを実現できることです。'
          },
          {
            id: 'q-001-2-c',
            text: 'コードの複雑度を下げることができる',
            isCorrect: false,
            explanation: '同値分割はテスト設計技法であり、コードの複雑度を直接下げるものではありません。'
          },
          {
            id: 'q-001-2-d',
            text: '特定の境界値のみをテストすればよい',
            isCorrect: false,
            explanation: '境界値のテストは境界値分析の技法であり、同値分割とは異なります（ただし、相補的に使われることが多い）。'
          }
        ],
        explanation: '同値分割テスト技法の主な利点は、入力ドメインを同値クラスに分割し、各クラスから代表値を選ぶことで、テストケース数を削減しながらも効果的なテストを実現できる点にあります。',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'q-001-3',
        questionText: '以下の例で、同値分割によって識別される有効同値クラスの数はいくつですか？\n\n例：ウェブフォームの年齢入力欄。有効な入力は13歳から120歳までの整数。',
        options: [
          {
            id: 'q-001-3-a',
            text: '1つ',
            isCorrect: true,
            explanation: '有効同値クラスは13〜120の範囲内の整数値のみの1つです。'
          },
          {
            id: 'q-001-3-b',
            text: '2つ',
            isCorrect: false,
            explanation: '有効範囲は1つの連続した範囲なので、有効同値クラスは1つです。'
          },
          {
            id: 'q-001-3-c',
            text: '3つ',
            isCorrect: false,
            explanation: '有効範囲が分割されていないため、有効同値クラスは1つです。'
          },
          {
            id: 'q-001-3-d',
            text: '4つ',
            isCorrect: false,
            explanation: '有効範囲が分割されていないため、有効同値クラスは1つです。'
          }
        ],
        explanation: '有効同値クラスは13〜120までの整数の範囲で1つです。無効同値クラスとしては、13未満の値、120を超える値、非整数値などが考えられます。',
        difficulty: 'medium',
        points: 10
      },
      {
        id: 'q-001-4',
        questionText: '同値分割テストを実施する際、次のうち最も適切なアプローチはどれですか？',
        options: [
          {
            id: 'q-001-4-a',
            text: '全ての同値クラスから複数の値をテストする',
            isCorrect: false,
            explanation: '同値分割の考え方では、各クラスから1つの代表値をテストすれば十分です。'
          },
          {
            id: 'q-001-4-b',
            text: '有効同値クラスからのみテストケースを選択する',
            isCorrect: false,
            explanation: '無効同値クラスのテストも重要です。無効な入力に対するシステムの動作も検証する必要があります。'
          },
          {
            id: 'q-001-4-c',
            text: '各同値クラス（有効・無効とも）から少なくとも1つのテストケースを選択する',
            isCorrect: true,
            explanation: '同値分割の基本原則は、各同値クラス（有効・無効とも）から少なくとも1つのテストケースを選択することです。'
          },
          {
            id: 'q-001-4-d',
            text: '境界値のみをテストする',
            isCorrect: false,
            explanation: '境界値のテストは重要ですが、同値分割では各クラスの代表値をテストします。境界値分析は同値分割を補完する別の技法です。'
          }
        ],
        explanation: '同値分割テストでは、各同値クラス（有効クラスと無効クラスの両方）から少なくとも1つのテストケースを選択することが基本原則です。これにより、効率的にテストを行いながらも、有効な入力と無効な入力の両方に対するシステムの振る舞いを検証できます。',
        difficulty: 'hard',
        points: 15
      }
    ],
    techniqueName: '同値分割法',
    techniqueId: 'technique-001',
    categoryId: 'category-001',
    passingScore: 25,
    totalPoints: 40,
    estimatedTime: '20分'
  },
  {
    id: 'ex-002',
    title: '境界値分析の演習',
    description: '境界値分析（Boundary Value Analysis）テスト技法を使った実践演習です。',
    objective: 'この演習では、入力値の境界付近でのバグを効果的に検出するための境界値分析技法を学びます。',
    scenarioDescription: 
      'あなたはオンラインショッピングサイトのテスターです。商品の数量選択機能には以下の制約があります：\n\n' +
      '- 1回の注文につき最小1個から最大10個まで購入可能\n' +
      '- 数量は整数のみ\n\n' +
      'この機能に対して境界値分析を用いて効果的なテストケースを設計してください。',
    steps: [
      {
        stepNumber: 1,
        description: '機能の仕様から境界を特定する'
      },
      {
        stepNumber: 2,
        description: '各境界の内側と外側の値を識別する'
      },
      {
        stepNumber: 3,
        description: '特定した境界値を用いてテストケースを設計する'
      },
      {
        stepNumber: 4,
        description: '設計したテストケースの有効性を評価する'
      }
    ],
    quiz: [
      {
        id: 'q-002-1',
        questionText: '商品数量選択機能（1個から10個まで有効）に対する境界値分析テストで、最も重要なテストケースの組み合わせはどれですか？',
        options: [
          {
            id: 'q-002-1-a',
            text: '数量: 1個、5個、10個',
            isCorrect: false,
            explanation: '中間値（5個）のテストは境界値分析では優先度が低く、境界の外側の値（0個、11個）が含まれていません。'
          },
          {
            id: 'q-002-1-b',
            text: '数量: 0個、1個、10個、11個',
            isCorrect: true,
            explanation: 'これは境界の内側（1個、10個）と外側（0個、11個）の両方をテストしており、境界値分析の基本原則に従っています。'
          },
          {
            id: 'q-002-1-c',
            text: '数量: 1個、2個、9個、10個',
            isCorrect: false,
            explanation: '境界の内側の値は含まれていますが、境界の外側の値（0個、11個）が含まれていません。'
          },
          {
            id: 'q-002-1-d',
            text: '数量: 1個、9個、10個、100個',
            isCorrect: false,
            explanation: '下限の外側の値（0個）が含まれておらず、極端な値（100個）は境界値分析では優先度が低いです。'
          }
        ],
        explanation: '境界値分析では、境界の内側と外側の両方の値をテストすることが重要です。有効範囲が1〜10の場合、最も重要なテストケースは0、1、10、11の4つです。',
        difficulty: 'medium',
        points: 10
      },
      {
        id: 'q-002-2',
        questionText: '境界値分析がバグ検出に特に効果的な理由は何ですか？',
        options: [
          {
            id: 'q-002-2-a',
            text: 'すべての入力可能性を網羅的にテストするため',
            isCorrect: false,
            explanation: '境界値分析はすべての入力をテストするわけではなく、境界付近の値に焦点を当てます。'
          },
          {
            id: 'q-002-2-b',
            text: 'プログラマーが境界条件を誤解することが多いため',
            isCorrect: true,
            explanation: '境界条件の処理はしばしば「off-by-one」エラーなどのバグが発生しやすく、プログラマーが条件を誤解したり、不正確に実装したりすることが多いためです。'
          },
          {
            id: 'q-002-2-c',
            text: 'テスト実行のコストが低いため',
            isCorrect: false,
            explanation: 'テストコストの低さは境界値分析の主な利点ではありません。'
          },
          {
            id: 'q-002-2-d',
            text: 'コードカバレッジを最大化するため',
            isCorrect: false,
            explanation: '境界値分析は特定の境界条件に焦点を当てるもので、コードカバレッジの最大化が主目的ではありません。'
          }
        ],
        explanation: '境界値分析がバグ検出に特に効果的なのは、プログラマーが境界条件（「以上」「より大きい」「以下」「未満」など）を正確に実装することが難しく、これらの条件で「off-by-one」エラーが発生しやすいためです。',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'q-002-3',
        questionText: '次のパスワード要件の境界値分析で、最も重要なテストケースはどれですか？\n\n要件：パスワードは8文字以上16文字以下で、アルファベットと数字を含む必要がある',
        options: [
          {
            id: 'q-002-3-a',
            text: '7文字、8文字、16文字、17文字のパスワード',
            isCorrect: true,
            explanation: 'これは長さの境界（8文字と16文字）の内側と外側の両方をテストしており、最も重要なテストケースです。'
          },
          {
            id: 'q-002-3-b',
            text: '8文字、12文字、16文字のパスワード',
            isCorrect: false,
            explanation: '境界の内側の値のみがテストされており、境界の外側の値（7文字、17文字）が含まれていません。'
          },
          {
            id: 'q-002-3-c',
            text: '1文字、8文字、16文字、20文字のパスワード',
            isCorrect: false,
            explanation: '極端な値（1文字、20文字）は含まれていますが、下限境界の外側（7文字）が含まれていません。'
          },
          {
            id: 'q-002-3-d',
            text: '8文字、9文字、15文字、16文字のパスワード',
            isCorrect: false,
            explanation: '境界の内側の値のみがテストされており、境界の外側の値（7文字、17文字）が含まれていません。'
          }
        ],
        explanation: '境界値分析では、各境界の内側と外側の値をテストすることが重要です。パスワード長の境界が8文字と16文字なので、7文字（下限の外側）、8文字（下限）、16文字（上限）、17文字（上限の外側）が最も重要なテストケースとなります。',
        difficulty: 'medium',
        points: 10
      },
      {
        id: 'q-002-4',
        questionText: '以下のうち、境界値分析に関する記述として正しいものはどれですか？',
        options: [
          {
            id: 'q-002-4-a',
            text: '境界値分析は同値分割と対立する技法である',
            isCorrect: false,
            explanation: '境界値分析は同値分割と対立するのではなく、補完する技法です。'
          },
          {
            id: 'q-002-4-b',
            text: '境界値は常に同値クラスの中間点である',
            isCorrect: false,
            explanation: '境界値は同値クラスの中間点ではなく、同値クラスの境界にある値です。'
          },
          {
            id: 'q-002-4-c',
            text: '境界値分析は同値分割を補完するテスト技法である',
            isCorrect: true,
            explanation: '境界値分析は同値分割を補完する技法で、同値クラスの境界に焦点を当ててテストを行います。'
          },
          {
            id: 'q-002-4-d',
            text: '境界値分析はユーザビリティのテストに最適である',
            isCorrect: false,
            explanation: '境界値分析は主に機能的な境界条件のテストに適しており、ユーザビリティテストが主目的ではありません。'
          }
        ],
        explanation: '境界値分析は同値分割テスト技法を補完するもので、同値クラスの境界にある値（境界値）とその周辺の値をテストすることで、境界付近で発生しやすいバグを検出するための技法です。',
        difficulty: 'hard',
        points: 15
      }
    ],
    techniqueName: '境界値分析',
    techniqueId: 'technique-002',
    categoryId: 'category-001',
    passingScore: 25,
    totalPoints: 40,
    estimatedTime: '25分'
  }
];

// バッジ定義
export const badges: BadgeDefinition[] = [
  {
    id: 'badge-technique-001',
    name: '同値分割マスター',
    description: '同値分割法の演習を高得点で完了しました。効率的なテストケース設計のスキルを証明します。',
    imageUrl: '/badges/equivalence-partitioning.svg',
    type: 'technique',
    relatedId: 'technique-001',
    requirement: {
      type: 'exercise_completion',
      threshold: 0.8, // 80%以上のスコア
      exerciseIds: ['ex-001']
    }
  },
  {
    id: 'badge-technique-002',
    name: '境界値の守護者',
    description: '境界値分析の演習を高得点で完了しました。エッジケースを見つける鋭い目を持っています。',
    imageUrl: '/badges/boundary-value.svg',
    type: 'technique',
    relatedId: 'technique-002',
    requirement: {
      type: 'exercise_completion',
      threshold: 0.8, // 80%以上のスコア
      exerciseIds: ['ex-002']
    }
  },
  {
    id: 'badge-category-001',
    name: 'ブラックボックステストの達人',
    description: 'ブラックボックステストカテゴリのすべての演習を完了しました。入力と出力の関係を分析する専門家です。',
    imageUrl: '/badges/black-box.svg',
    type: 'category',
    relatedId: 'category-001',
    requirement: {
      type: 'category_mastery',
      threshold: 0.7 // 70%以上の平均スコア
    }
  },
  {
    id: 'badge-achievement-all',
    name: 'テストマエストロ',
    description: 'すべてのテスト技法を習得しました。あなたはソフトウェアテストの真のマエストロです！',
    imageUrl: '/badges/test-maestro.svg',
    type: 'achievement',
    requirement: {
      type: 'all_techniques'
    }
  }
];