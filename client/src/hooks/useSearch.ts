import { useMemo } from 'react';
import { Technique } from '../types';

/**
 * Filter techniques based on search query and category
 */
export function filterTechniques(
  techniques: Technique[], 
  searchQuery: string, 
  categoryFilter: string
): Technique[] {
  // If there's no search query and category is 'all', return all techniques
  if (!searchQuery && categoryFilter === 'all') {
    return techniques;
  }

  return techniques.filter(technique => {
    // Filter by category if not 'all'
    const matchesCategory = categoryFilter === 'all' || technique.category === categoryFilter;
    
    // If no search query, just filter by category
    if (!searchQuery) {
      return matchesCategory;
    }
    
    // Otherwise, filter by search query and category
    const normalizedQuery = searchQuery.toLowerCase();
    
    const matchesName = technique.name.toLowerCase().includes(normalizedQuery);
    const matchesDescription = technique.description.toLowerCase().includes(normalizedQuery);
    const matchesShortDescription = technique.shortDescription.toLowerCase().includes(normalizedQuery);
    
    // Add more fields to search if needed
    const matchesPrinciples = technique.principles.some(
      principle => principle.toLowerCase().includes(normalizedQuery)
    );
    
    return matchesCategory && (
      matchesName || 
      matchesDescription || 
      matchesShortDescription || 
      matchesPrinciples
    );
  });
}

/**
 * Hook to filter techniques based on search query and category
 */
export function useSearch(
  techniques: Technique[], 
  searchQuery: string, 
  categoryFilter: string
) {
  return useMemo(() => 
    filterTechniques(techniques, searchQuery, categoryFilter),
    [techniques, searchQuery, categoryFilter]
  );
}
