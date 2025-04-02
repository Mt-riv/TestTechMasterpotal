import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TutorialStep } from '../components/TutorialWalkthrough';

// Define tutorial steps
const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'テスト技法ライブラリへようこそ',
    description: 'このチュートリアルでは、ソフトウェアテスト技法ライブラリの使い方を説明します。ステップバイステップで進みますので、ぜひ最後までお付き合いください。',
    position: 'center',
    icon: 'info',
    route: '/',
    highlight: false
  },
  {
    id: 'explore-categories',
    title: 'カテゴリーを探る',
    description: 'テスト技法はカテゴリーに分類されています。それぞれのカテゴリーには異なるタイプのテスト技法が含まれています。',
    position: 'bottom',
    route: '/',
    icon: 'lightbulb',
    highlight: true,
    action: 'ホームページのカテゴリーカードを確認してみましょう。'
  },
  {
    id: 'select-category',
    title: 'カテゴリーを選択',
    description: 'カテゴリーをクリックすると、そのカテゴリーに含まれるテスト技法の一覧が表示されます。',
    element: '.category-card',
    position: 'bottom',
    icon: 'info',
    highlight: true,
    action: 'いずれかのカテゴリーカードをクリックしてみましょう。'
  },
  {
    id: 'browse-techniques',
    title: 'テスト技法を閲覧',
    description: 'カテゴリー内のテスト技法が一覧表示されます。各技法には効果と複雑度が表示されています。',
    route: '/category/blackbox',
    position: 'top',
    icon: 'info',
    highlight: false
  },
  {
    id: 'technique-details',
    title: 'テスト技法の詳細',
    description: 'テスト技法をクリックすると、その技法の詳細な説明、適用手順、メリット・デメリットなどが表示されます。',
    element: 'a[href^="/technique/"]',
    position: 'right',
    icon: 'info',
    highlight: true,
    action: 'いずれかのテスト技法をクリックしてみましょう。'
  },
  {
    id: 'search-function',
    title: '検索機能',
    description: 'ヘッダーの検索バーを使って、特定のテスト技法をキーワードで検索することができます。',
    element: 'input[type="search"]',
    position: 'bottom',
    icon: 'lightbulb',
    highlight: true,
    action: '検索バーに「境界値」などのキーワードを入力してみましょう。'
  },
  {
    id: 'tutorial-complete',
    title: 'チュートリアル完了！',
    description: 'おめでとうございます！これでチュートリアルは完了です。引き続きテスト技法ライブラリを自由に探索してください。',
    position: 'center',
    icon: 'check',
    highlight: false
  }
];

// Define the context type
interface TutorialContextType {
  isTutorialOpen: boolean;
  openTutorial: () => void;
  closeTutorial: () => void;
  completeTutorial: () => void;
  tutorialSteps: TutorialStep[];
  hasCompletedTutorial: boolean;
}

// Create context with default values
const TutorialContext = createContext<TutorialContextType>({
  isTutorialOpen: false,
  openTutorial: () => {},
  closeTutorial: () => {},
  completeTutorial: () => {},
  tutorialSteps: [],
  hasCompletedTutorial: false
});

// Custom hook to use the tutorial context
export const useTutorial = () => useContext(TutorialContext);

interface TutorialProviderProps {
  children: ReactNode;
}

// Provider component
export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(() => {
    // Check if the tutorial has been completed before
    return localStorage.getItem('tutorialCompleted') === 'true';
  });

  const openTutorial = () => {
    setIsTutorialOpen(true);
  };

  const closeTutorial = () => {
    setIsTutorialOpen(false);
  };

  const completeTutorial = () => {
    setIsTutorialOpen(false);
    setHasCompletedTutorial(true);
    localStorage.setItem('tutorialCompleted', 'true');
  };

  const value = {
    isTutorialOpen,
    openTutorial,
    closeTutorial,
    completeTutorial,
    tutorialSteps,
    hasCompletedTutorial
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};