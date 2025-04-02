import { ExerciseProgress, UserBadge, BadgeDefinition } from "../types/exercise";
import { exercises, badges } from "../data/exercises";

// LocalStorageのキー
const PROGRESS_KEY = 'exercise_progress';
const BADGES_KEY = 'user_badges';

// 進捗情報の取得
export function getProgress(): ExerciseProgress[] {
  try {
    const storedProgress = localStorage.getItem(PROGRESS_KEY);
    if (!storedProgress) return [];
    return JSON.parse(storedProgress);
  } catch (error) {
    console.error('進捗情報の取得に失敗しました:', error);
    return [];
  }
}

// 特定の演習の進捗情報を取得
export function getExerciseProgress(exerciseId: string): ExerciseProgress | null {
  const progressList = getProgress();
  return progressList.find(p => p.exerciseId === exerciseId) || null;
}

// 進捗情報の保存
export function saveProgress(progress: ExerciseProgress): void {
  try {
    const currentProgress = getProgress();
    
    // 既存の進捗情報を更新または新規追加
    const existingIndex = currentProgress.findIndex(p => p.exerciseId === progress.exerciseId);
    
    if (existingIndex >= 0) {
      currentProgress[existingIndex] = progress;
    } else {
      currentProgress.push(progress);
    }
    
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(currentProgress));
    
    // バッジの確認と更新
    checkAndUpdateBadges();
  } catch (error) {
    console.error('進捗情報の保存に失敗しました:', error);
  }
}

// バッジの取得
export function getUserBadges(): UserBadge[] {
  try {
    const storedBadges = localStorage.getItem(BADGES_KEY);
    if (!storedBadges) return [];
    return JSON.parse(storedBadges);
  } catch (error) {
    console.error('バッジ情報の取得に失敗しました:', error);
    return [];
  }
}

// バッジの保存
function saveUserBadges(userBadges: UserBadge[]): void {
  try {
    localStorage.setItem(BADGES_KEY, JSON.stringify(userBadges));
  } catch (error) {
    console.error('バッジ情報の保存に失敗しました:', error);
  }
}

// バッジ獲得の確認と更新（戻り値：新たに獲得したバッジの配列）
export function checkAndUpdateBadges(): UserBadge[] {
  const progressList = getProgress();
  const currentBadges = getUserBadges();
  const newBadges: UserBadge[] = [];
  
  // 各バッジ定義をチェック
  badges.forEach(badgeDef => {
    // 既に獲得済みの場合はスキップ
    if (currentBadges.some(b => b.id === badgeDef.id)) return;
    
    // バッジ獲得条件の確認
    const earned = checkBadgeRequirement(badgeDef, progressList);
    
    if (earned) {
      const badgeType = badgeDef.type as 'technique' | 'category' | 'achievement';
      const newBadge: UserBadge = {
        id: badgeDef.id,
        name: badgeDef.name,
        description: badgeDef.description,
        imageUrl: badgeDef.imageUrl,
        earnedDate: new Date().toISOString(),
        type: badgeType,
        relatedId: badgeDef.relatedId
      };
      
      newBadges.push(newBadge);
      
      // バッジ獲得のログ（デバッグ用）
      console.log(`バッジ獲得: ${newBadge.name}`);
    }
  });
  
  // 新しいバッジがあれば保存
  if (newBadges.length > 0) {
    const updatedBadges = [...currentBadges, ...newBadges];
    saveUserBadges(updatedBadges);
    return newBadges;
  }
  
  return [];
}

// バッジ獲得条件の確認
function checkBadgeRequirement(
  badge: BadgeDefinition, 
  progressList: ExerciseProgress[]
): boolean {
  const { requirement } = badge;
  
  switch (requirement.type) {
    case 'exercise_completion': {
      // 特定の演習の完了を確認
      if (!requirement.exerciseIds || requirement.exerciseIds.length === 0) return false;
      
      const exerciseProgress = progressList.filter(p => 
        requirement.exerciseIds!.includes(p.exerciseId) && p.completed
      );
      
      // すべての必要な演習が完了しているか確認
      if (exerciseProgress.length !== requirement.exerciseIds.length) return false;
      
      // スコアのしきい値を確認
      if (requirement.threshold) {
        // 各演習のスコア率を計算して平均を取る
        const scoreRates = exerciseProgress.map(p => {
          const exercise = exercises.find(e => e.id === p.exerciseId);
          if (!exercise) return 0;
          return p.score / exercise.totalPoints;
        });
        
        const averageScoreRate = scoreRates.reduce((sum, rate) => sum + rate, 0) / scoreRates.length;
        return averageScoreRate >= requirement.threshold;
      }
      
      return true;
    }
    
    case 'category_mastery': {
      // カテゴリの習熟度を確認
      if (!badge.relatedId) return false;
      
      // カテゴリに属する演習を見つける
      const categoryExercises = exercises.filter(e => e.categoryId === badge.relatedId);
      if (categoryExercises.length === 0) return false;
      
      // カテゴリの演習の進捗を確認
      const categoryProgress = progressList.filter(p => 
        categoryExercises.some(e => e.id === p.exerciseId) && p.completed
      );
      
      // すべての演習が完了しているか確認
      if (categoryProgress.length !== categoryExercises.length) return false;
      
      // スコアのしきい値を確認
      if (requirement.threshold) {
        // 各演習のスコア率を計算して平均を取る
        const scoreRates = categoryProgress.map(p => {
          const exercise = exercises.find(e => e.id === p.exerciseId);
          if (!exercise) return 0;
          return p.score / exercise.totalPoints;
        });
        
        const averageScoreRate = scoreRates.reduce((sum, rate) => sum + rate, 0) / scoreRates.length;
        return averageScoreRate >= requirement.threshold;
      }
      
      return true;
    }
    
    case 'all_techniques': {
      // すべてのカテゴリの演習が完了しているか確認
      const categoryIds = exercises.map(e => e.categoryId);
      const uniqueCategories = categoryIds.filter((value, index, self) => self.indexOf(value) === index);
      
      // 各カテゴリの演習がすべて完了しているか確認
      for (const categoryId of uniqueCategories) {
        const categoryExercises = exercises.filter(e => e.categoryId === categoryId);
        const categoryProgress = progressList.filter(p => 
          categoryExercises.some(e => e.id === p.exerciseId) && p.completed
        );
        
        // カテゴリの演習がすべて完了していない場合
        if (categoryProgress.length !== categoryExercises.length) return false;
      }
      
      return true;
    }
    
    default:
      return false;
  }
}