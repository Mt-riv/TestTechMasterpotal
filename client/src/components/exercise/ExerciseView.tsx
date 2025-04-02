import React, { useState, useEffect } from 'react';
import { PracticalExercise, ExerciseProgress } from '../../types/exercise';
import { QuizQuestion } from './QuizQuestion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Clock, Award, CheckCircle, ArrowLeft, Info, AlignJustify, List, BarChart3 } from 'lucide-react';
import { getExerciseProgress, saveProgress } from '../../services/ProgressService';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

interface ExerciseViewProps {
  exercise: PracticalExercise;
  goBack?: () => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({ exercise, goBack }) => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [progress, setProgress] = useState<ExerciseProgress | null>(null);

  useEffect(() => {
    // 進捗状況を取得
    const savedProgress = getExerciseProgress(exercise.id);
    if (savedProgress) {
      setProgress(savedProgress);
      
      // 回答済みの場合は答えを設定
      if (savedProgress.answers.length > 0) {
        const savedAnswers: Record<string, string> = {};
        savedProgress.answers.forEach(a => {
          savedAnswers[a.questionId] = a.selectedOptionId;
        });
        setAnswers(savedAnswers);
      }
      
      // 完了済みの場合は結果を表示
      if (savedProgress.completed) {
        setScore(savedProgress.score);
        setIsCompleted(true);
        setShowResults(true);
      }
    }
  }, [exercise.id]);

  const handleAnswer = (questionId: string, selectedOptionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptionId
    }));
  };

  const handleSubmit = () => {
    // すべての問題に回答されているか確認
    const allAnswered = exercise.quiz.every(q => answers[q.id]);
    if (!allAnswered) {
      toast({
        title: '全ての問題に回答してください',
        description: 'すべての問題に回答してから提出してください。',
        variant: 'destructive'
      });
      return;
    }

    // スコアの計算
    let totalScore = 0;
    exercise.quiz.forEach(question => {
      const selectedOptionId = answers[question.id];
      const selectedOption = question.options.find(o => o.id === selectedOptionId);
      if (selectedOption?.isCorrect) {
        totalScore += question.points;
      }
    });

    setScore(totalScore);
    setShowResults(true);
    
    // 合格判定
    const isPassed = totalScore >= exercise.passingScore;
    setIsCompleted(isPassed);
    
    // 進捗情報の保存
    const answersList = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
      questionId,
      selectedOptionId
    }));
    
    const newProgress: ExerciseProgress = {
      exerciseId: exercise.id,
      completed: isPassed,
      score: totalScore,
      answers: answersList,
      completedDate: isPassed ? new Date().toISOString() : undefined,
      attemptCount: (progress?.attemptCount || 0) + 1
    };
    
    saveProgress(newProgress);
    setProgress(newProgress);
    
    // 結果の通知
    toast({
      title: isPassed ? '演習完了！' : '演習結果',
      description: isPassed 
        ? `おめでとうございます！${totalScore}/${exercise.totalPoints}点を獲得しました。` 
        : `スコア: ${totalScore}/${exercise.totalPoints}点。合格には${exercise.passingScore}点以上が必要です。`,
      variant: isPassed ? 'default' : 'destructive'
    });
  };

  const handleRetry = () => {
    setShowResults(false);
    setAnswers({});
    setActiveTab('quiz');
  };

  const handleGoBack = () => {
    if (goBack) {
      goBack();
    } else {
      navigate('/');
    }
  };

  const renderStatusBadge = () => {
    if (!progress) {
      return (
        <Badge variant="outline" className="ml-2">
          未挑戦
        </Badge>
      );
    }
    
    if (progress.completed) {
      return (
        <Badge variant="default" className="ml-2 bg-green-600">
          完了
        </Badge>
      );
    }
    
    return (
      <Badge variant="secondary" className="ml-2">
        進行中
      </Badge>
    );
  };

  const calculateProgressPercentage = () => {
    if (!progress) return 0;
    return Math.floor((progress.score / exercise.totalPoints) * 100);
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleGoBack}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          戻る
        </Button>
        <h1 className="text-2xl font-bold">
          {exercise.title}
          {renderStatusBadge()}
        </h1>
      </div>

      {progress && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>進捗状況</span>
            <span>{progress.score}/{exercise.totalPoints}点</span>
          </div>
          <Progress value={calculateProgressPercentage()} className="h-2" />
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            <span>概要</span>
          </TabsTrigger>
          <TabsTrigger value="scenario" className="flex items-center">
            <AlignJustify className="h-4 w-4 mr-2" />
            <span>シナリオ</span>
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>確認クイズ</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                演習の概要
              </CardTitle>
              <CardDescription>{exercise.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">目的</h3>
                <p>{exercise.objective}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500" />
                  <span>推定所要時間: {exercise.estimatedTime}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-gray-500" />
                  <span>合格点: {exercise.passingScore}/{exercise.totalPoints}点</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setActiveTab('scenario')}>
                シナリオを確認
              </Button>
            </CardFooter>
          </Card>
          
          {isCompleted && (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>完了済み</AlertTitle>
              <AlertDescription>
                この演習は完了しています。スコア: {progress?.score}/{exercise.totalPoints}点
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="scenario" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlignJustify className="h-5 w-5 mr-2" />
                演習シナリオ
              </CardTitle>
              <CardDescription>この演習で取り組むシナリオです</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <p>{exercise.scenarioDescription}</p>
                
                {exercise.steps && exercise.steps.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <List className="h-5 w-5 mr-2" />
                      手順
                    </h3>
                    <ol className="pl-5 space-y-2">
                      {exercise.steps.map(step => (
                        <li key={step.stepNumber} className="pl-2">
                          <span className="font-medium">ステップ {step.stepNumber}:</span> {step.description}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setActiveTab('quiz')}>
                クイズに回答する
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                確認クイズ
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                合格点: {exercise.passingScore}/{exercise.totalPoints}点
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {exercise.quiz.map((question, index) => (
              <QuizQuestion
                key={question.id}
                question={question}
                onAnswer={handleAnswer}
                userAnswer={answers[question.id]}
                showResult={showResults}
                questionNumber={index + 1}
              />
            ))}
            
            {!showResults ? (
              <div className="flex justify-end mt-6">
                <Button onClick={handleSubmit}>
                  回答を提出する
                </Button>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mt-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold">結果</h3>
                  <p className="text-lg">
                    スコア: <span className={score >= exercise.passingScore ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      {score}/{exercise.totalPoints}点
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {score >= exercise.passingScore
                      ? 'おめでとうございます！演習を完了しました。'
                      : `合格には${exercise.passingScore}点以上が必要です。`}
                  </p>
                </div>
                
                <div className="flex justify-center space-x-4">
                  {score < exercise.passingScore && (
                    <Button onClick={handleRetry}>
                      もう一度挑戦する
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleGoBack}>
                    テスト技法一覧に戻る
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};