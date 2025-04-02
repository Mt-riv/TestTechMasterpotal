import React, { useState, useEffect } from 'react';
import { getProgress, getUserBadges } from '../../services/ProgressService';
import { exercises } from '../../data/exercises';
import { techniques } from '../../data/techniques';
import { categories } from '../../data/categories';
import { UserBadge, ExerciseProgress } from '../../types/exercise';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BadgeDisplay } from './BadgeDisplay';
import { Award, BarChart3, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';
import { formatDate } from '../../lib/utils';

export const ProgressDashboard: React.FC = () => {
  const [progress, setProgress] = useState<ExerciseProgress[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [activeTab, setActiveTab] = useState<string>('summary');

  useEffect(() => {
    // 進捗とバッジの取得
    setProgress(getProgress());
    setBadges(getUserBadges());
  }, []);

  // カテゴリごとの進捗率を計算
  const getCategoryProgress = () => {
    const categoryProgress = categories.map(category => {
      const categoryExercises = exercises.filter(e => e.categoryId === category.id);
      const completedExercises = categoryExercises.filter(e => 
        progress.some(p => p.exerciseId === e.id && p.completed)
      );
      
      const progressPercentage = categoryExercises.length > 0
        ? (completedExercises.length / categoryExercises.length) * 100
        : 0;
        
      return {
        category,
        total: categoryExercises.length,
        completed: completedExercises.length,
        percentage: progressPercentage
      };
    });
    
    return categoryProgress;
  };

  // 最近完了した演習
  const getRecentCompletedExercises = () => {
    const completedProgress = progress
      .filter(p => p.completed && p.completedDate)
      .sort((a, b) => {
        if (!a.completedDate || !b.completedDate) return 0;
        return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
      })
      .slice(0, 5);
      
    return completedProgress.map(p => {
      const exercise = exercises.find(e => e.id === p.exerciseId);
      return {
        progress: p,
        exercise
      };
    }).filter(item => item.exercise); // exerciseが見つからない項目を除外
  };

  // バッジタイプごとにグループ化
  const groupBadgesByType = () => {
    const grouped: Record<string, UserBadge[]> = {
      technique: [],
      category: [],
      achievement: []
    };
    
    badges.forEach(badge => {
      if (grouped[badge.type]) {
        grouped[badge.type].push(badge);
      }
    });
    
    return grouped;
  };

  // 全体の進捗状況
  const getOverallProgress = () => {
    const totalExercises = exercises.length;
    const completedExercises = progress.filter(p => p.completed).length;
    const percentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
    
    return {
      total: totalExercises,
      completed: completedExercises,
      percentage
    };
  };

  // 各タブの内容を取得
  const renderSummaryTab = () => {
    const overallProgress = getOverallProgress();
    const recentCompleted = getRecentCompletedExercises();
    const categoryProgress = getCategoryProgress();
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              全体の進捗状況
            </CardTitle>
            <CardDescription>
              テスト技法学習の進捗
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between text-sm">
              <span>完了した演習</span>
              <span>{overallProgress.completed}/{overallProgress.total}</span>
            </div>
            <Progress value={overallProgress.percentage} className="h-2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-primary">
                  {overallProgress.completed}
                </div>
                <div className="text-sm mt-1">完了した演習</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {badges.length}
                </div>
                <div className="text-sm mt-1">獲得したバッジ</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {categoryProgress.filter(c => c.percentage === 100).length}
                </div>
                <div className="text-sm mt-1">習得したカテゴリ</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {recentCompleted.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                最近完了した演習
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCompleted.map(({ progress: p, exercise }) => exercise && (
                  <Link key={p.exerciseId} href={`/technique/${exercise.techniqueId}/exercise/${exercise.id}`} className="block no-underline">
                    <div className="flex items-center p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                      <div className="flex-shrink-0 mr-3">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{exercise.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="mr-3 flex items-center">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            スコア: {p.score}/{exercise.totalPoints}点
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {p.completedDate && formatDate(new Date(p.completedDate), 'yyyy年MM月dd日')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderCategoriesTab = () => {
    const categoryProgress = getCategoryProgress();
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>カテゴリごとの進捗</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {categoryProgress.map(({ category, total, completed, percentage }) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {completed}/{total} 完了
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  {percentage === 100 && (
                    <div className="text-right text-sm text-green-600 dark:text-green-400 flex items-center justify-end">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      習得済み
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderBadgesTab = () => {
    const groupedBadges = groupBadgesByType();
    
    return (
      <div className="space-y-6">
        {groupedBadges.achievement.length > 0 && (
          <BadgeDisplay
            badges={groupedBadges.achievement}
            title="実績バッジ"
            description="特別な実績を達成すると獲得できるバッジ"
            emptyMessage="まだ実績バッジを獲得していません。すべてのカテゴリを学習してバッジを獲得しましょう！"
          />
        )}
        
        <BadgeDisplay
          badges={groupedBadges.category}
          title="カテゴリバッジ"
          description="各カテゴリの習得で獲得できるバッジ"
          emptyMessage="まだカテゴリバッジを獲得していません。カテゴリのすべての演習を完了してバッジを獲得しましょう！"
        />
        
        <BadgeDisplay
          badges={groupedBadges.technique}
          title="技法バッジ"
          description="各テスト技法の習得で獲得できるバッジ"
          emptyMessage="まだ技法バッジを獲得していません。技法の演習を完了してバッジを獲得しましょう！"
        />
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return renderSummaryTab();
      case 'categories':
        return renderCategoriesTab();
      case 'badges':
        return renderBadgesTab();
      default:
        return renderSummaryTab();
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">学習の進捗</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="summary" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>概要</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>カテゴリ</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center">
            <Award className="h-4 w-4 mr-2" />
            <span>バッジ</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {renderTabContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};