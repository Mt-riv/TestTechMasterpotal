export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string; // 選択肢の説明（正解/不正解の理由）
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
  explanation?: string; // 問題の解説
  difficulty: 'easy' | 'medium' | 'hard';
  points: number; // この問題の点数
}

export interface PracticalExercise {
  id: string;
  title: string;
  description: string;
  objective: string; // 演習の目的
  scenarioDescription: string; // 演習のシナリオ説明
  steps?: { // 演習の手順（ある場合）
    stepNumber: number;
    description: string;
  }[];
  quiz: QuizQuestion[]; // 演習後の確認クイズ
  techniqueName: string; // 関連するテスト技法の名前
  techniqueId: string; // 関連するテスト技法のID
  categoryId: string; // 関連するカテゴリID
  passingScore: number; // 合格点
  totalPoints: number; // 総合点
  estimatedTime: string; // 推定所要時間（例: "15分"）
}

export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  score: number;
  answers: { questionId: string; selectedOptionId: string }[];
  completedDate?: string;
  attemptCount: number;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedDate: string;
  type: 'technique' | 'category' | 'achievement';
  relatedId?: string; // 技法IDまたはカテゴリID
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'technique' | 'category' | 'achievement';
  relatedId?: string;
  requirement: {
    type: 'exercise_completion' | 'category_mastery' | 'all_techniques';
    threshold?: number; // 必要なスコアまたは完了数
    exerciseIds?: string[]; // 特定の演習が必要な場合
  };
}