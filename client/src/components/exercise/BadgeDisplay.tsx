import React from 'react';
import { UserBadge } from '../../types/exercise';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate } from '../../lib/utils';
import { Award, Calendar } from 'lucide-react';

interface BadgeDisplayProps {
  badges: UserBadge[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  maxHeight?: string;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badges,
  title = 'バッジ',
  description = '獲得したバッジ一覧',
  emptyMessage = 'まだバッジを獲得していません。演習を完了してバッジを獲得しましょう！',
  maxHeight = '400px'
}) => {
  const getBadgeColorClass = (type: string) => {
    switch (type) {
      case 'technique':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'category':
        return 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800';
      case 'achievement':
        return 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-700';
    }
  };

  const getBadgeTypeLabel = (type: string) => {
    switch (type) {
      case 'technique':
        return '技法';
      case 'category':
        return 'カテゴリ';
      case 'achievement':
        return '達成';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {badges.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <Award className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <ScrollArea className={`max-h-[${maxHeight}]`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badges.map(badge => (
                <TooltipProvider key={badge.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`rounded-lg border p-4 flex items-center space-x-4 hover:shadow-md transition-shadow ${getBadgeColorClass(badge.type)}`}>
                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                          <img src={badge.imageUrl} alt={badge.name} className="h-8 w-8" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{badge.name}</p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span className="px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mr-2">
                              {getBadgeTypeLabel(badge.type)}
                            </span>
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{formatDate(new Date(badge.earnedDate), 'yyyy年MM月dd日')}</span>
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="max-w-xs">
                        <p className="font-semibold">{badge.name}</p>
                        <p className="text-sm">{badge.description}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};