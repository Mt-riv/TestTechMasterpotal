import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  CheckCircle, 
  Lightbulb
} from 'lucide-react';
import { cva } from 'class-variance-authority';

// Tutorial step interface
export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  element?: string; // CSS selector for the element to highlight
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  action?: string; // What action the user should take
  highlight?: boolean; // Whether to highlight the element
  route?: string; // Route to navigate to for this step
  icon?: 'info' | 'check' | 'lightbulb';
}

interface TutorialPopupProps {
  step: TutorialStep;
  totalSteps: number;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const popupVariants = cva(
  "fixed z-50 bg-white rounded-lg shadow-lg p-5 border border-gray-200 max-w-sm transition-all duration-300 ease-in-out",
  {
    variants: {
      position: {
        top: "left-1/2 transform -translate-x-1/2 top-24",
        right: "right-4 top-1/2 transform -translate-y-1/2",
        bottom: "left-1/2 transform -translate-x-1/2 bottom-4",
        left: "left-4 top-1/2 transform -translate-y-1/2",
        center: "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      }
    },
    defaultVariants: {
      position: "center"
    }
  }
);

// Popup component for each tutorial step
const TutorialPopup: React.FC<TutorialPopupProps> = ({ 
  step, 
  totalSteps, 
  currentStep,
  onNext, 
  onPrev, 
  onClose 
}) => {
  const renderIcon = () => {
    switch(step.icon) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'check':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'lightbulb':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={popupVariants({ position: step.position })}>
      <button 
        onClick={onClose}
        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        aria-label="チュートリアルを閉じる"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-center mb-3">
        {renderIcon()}
        <h3 className="text-lg font-bold ml-2">{step.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{step.description}</p>
      
      {step.action && (
        <div className="bg-gray-50 p-2 rounded-md mb-4 text-sm border-l-2 border-primary">
          <span className="font-medium">アクション:</span> {step.action}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          ステップ {currentStep} / {totalSteps}
        </div>
        <div className="flex space-x-2">
          {currentStep > 1 && (
            <button 
              onClick={onPrev}
              className="flex items-center text-gray-600 hover:text-primary px-3 py-1 rounded"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> 前へ
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button 
              onClick={onNext}
              className="flex items-center bg-primary text-white px-3 py-1 rounded hover:bg-primary/90"
            >
              次へ <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="flex items-center bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              完了 <CheckCircle className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface HighlightOverlayProps {
  selector?: string;
  active: boolean;
}

// Overlay to highlight a specific element
const HighlightOverlay: React.FC<HighlightOverlayProps> = ({ selector, active }) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  
  useEffect(() => {
    if (selector && active) {
      const element = document.querySelector(selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
        
        // Scroll element into view if needed
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selector, active]);
  
  if (!active || !selector) return null;
  
  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 pointer-events-none" />
      
      {/* Highlight cutout */}
      <div
        className="absolute z-40 border-2 border-primary animate-pulse rounded pointer-events-none"
        style={{
          top: position.top - 4,
          left: position.left - 4,
          width: position.width + 8,
          height: position.height + 8
        }}
      />
    </>
  );
};

interface TutorialWalkthroughProps {
  steps: TutorialStep[];
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
}

// Main tutorial walkthrough component
const TutorialWalkthrough: React.FC<TutorialWalkthroughProps> = ({
  steps,
  isOpen,
  onComplete,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [_, setLocation] = useLocation();

  // Get current step data
  const step = steps[currentStep - 1];

  useEffect(() => {
    // Navigate to the specified route if needed
    if (isOpen && step && step.route) {
      setLocation(step.route);
    }
  }, [currentStep, isOpen, step]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <HighlightOverlay selector={step.element} active={isOpen && !!step.highlight} />
      <TutorialPopup
        step={step}
        totalSteps={steps.length}
        currentStep={currentStep}
        onNext={handleNext}
        onPrev={handlePrev}
        onClose={handleClose}
      />
    </>
  );
};

export default TutorialWalkthrough;