import React, { useState } from 'react';
import { QuizQuestion as QuizQuestionType, QuizOption } from '../../types/exercise';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (questionId: string, selectedOptionId: string) => void;
  userAnswer?: string;
  showResult?: boolean;
  questionNumber: number;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  userAnswer,
  showResult = false,
  questionNumber,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(userAnswer);
  const [error, setError] = useState<string | null>(null);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setError(null);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setError('回答を選択してください');
      return;
    }

    onAnswer(question.id, selectedOption);
  };

  const isCorrect = () => {
    if (!selectedOption || !showResult) return false;
    const option = question.options.find(o => o.id === selectedOption);
    return option?.isCorrect || false;
  };

  const getCorrectOption = () => {
    return question.options.find(o => o.isCorrect);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 bg-primary/10 dark:bg-primary/20 w-8 h-8 flex items-center justify-center rounded-full mr-3">
          <span className="text-primary font-semibold">{questionNumber}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {question.questionText}
        </h3>
      </div>

      <div className="mt-4 space-y-3">
        <RadioGroup 
          value={selectedOption} 
          onValueChange={handleOptionSelect}
          disabled={showResult}
        >
          {question.options.map((option) => (
            <div 
              key={option.id}
              className={`p-3 rounded-md transition-colors
                ${
                  selectedOption === option.id
                    ? showResult
                      ? option.isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                      : 'bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30'
                    : 'bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800/80 border border-gray-200 dark:border-gray-700'
                }`}
            >
              <div className="flex items-start">
                <RadioGroupItem 
                  value={option.id} 
                  id={`option-${question.id}-${option.id}`} 
                  disabled={showResult}
                  className="mt-1"
                />
                <div className="ml-3 flex-1">
                  <Label 
                    htmlFor={`option-${question.id}-${option.id}`}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {option.text}
                  </Label>
                  
                  {showResult && selectedOption === option.id && option.explanation && (
                    <div className={`mt-2 text-sm ${option.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {option.explanation}
                    </div>
                  )}
                </div>
                {showResult && selectedOption === option.id && (
                  <div className="ml-2 flex-shrink-0">
                    {option.isCorrect ? 
                      <CheckCircle className="w-5 h-5 text-green-500" /> : 
                      <XCircle className="w-5 h-5 text-red-500" />
                    }
                  </div>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {showResult && question.explanation && (
        <Alert className="mt-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">
          <HelpCircle className="h-4 w-4" />
          <AlertTitle>解説</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            {question.explanation}
          </AlertDescription>
        </Alert>
      )}

      {showResult && !isCorrect() && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            正解: {getCorrectOption()?.text}
          </p>
          {getCorrectOption()?.explanation && (
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
              {getCorrectOption()?.explanation}
            </p>
          )}
        </div>
      )}

      {!showResult && (
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmit} disabled={!selectedOption}>
            回答する
          </Button>
        </div>
      )}
      
      {showResult && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm font-medium">
            {isCorrect() ? (
              <span className="text-green-600 dark:text-green-400 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" /> 正解！ +{question.points}ポイント
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400 flex items-center">
                <XCircle className="w-4 h-4 mr-1" /> 不正解
              </span>
            )}
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            難易度: {
              question.difficulty === 'easy' ? '初級' :
              question.difficulty === 'medium' ? '中級' : '上級'
            } ({question.points}ポイント)
          </div>
        </div>
      )}
    </div>
  );
};