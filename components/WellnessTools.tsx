
import React from 'react';
import { BrainCircuitIcon, WindIcon } from './Icons';

interface WellnessToolsProps {
  onBreathingClick: () => void;
  onAffirmationClick: () => void;
  disabled: boolean;
}

export const WellnessTools: React.FC<WellnessToolsProps> = ({ onBreathingClick, onAffirmationClick, disabled }) => {
  return (
    <div className="flex justify-center gap-2 mb-2">
      <button 
        onClick={onBreathingClick} 
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 dark:text-purple-300 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <WindIcon />
        Breathing Exercise
      </button>
      <button 
        onClick={onAffirmationClick} 
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <BrainCircuitIcon />
        Positive Affirmation
      </button>
    </div>
  );
};
