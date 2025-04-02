export interface Technique {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  shortDescription: string;
  effectiveness: string;
  complexity: string;
  description: string;
  principles: string[];
  suitableCases: string[];
  history: string;
  examples: Example[];
  applicationSteps: ApplicationStep[];
  benefits: BenefitOrDrawback[];
  drawbacks: BenefitOrDrawback[];
  effectiveUsage: string[];
  relatedTechniques: RelatedTechnique[];
}

export interface Example {
  title: string;
  description: string;
  steps?: {
    title: string;
    items: {
      label: string;
      value: string;
    }[];
  };
  testCases?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
}

export interface ApplicationStep {
  title: string;
  description: string;
  example?: string;
}

export interface BenefitOrDrawback {
  title: string;
  description: string;
}

export interface RelatedTechnique {
  id: string;
  name: string;
  description: string;
}
