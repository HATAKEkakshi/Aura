import React, { useState, useEffect } from 'react';

interface BreathingExerciseProps {
  onClose: () => void;
}

const steps = [
  { text: 'Breathe In...', duration: 4000 },
  { text: 'Hold', duration: 4000 },
  { text: 'Breathe Out...', duration: 6000 },
];

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStepIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, steps[stepIndex].duration);

    return () => clearTimeout(timer);
  }, [stepIndex]);

  const currentStep = steps[stepIndex];
  
  const getAnimationClass = () => {
    switch(stepIndex) {
      case 0: return 'animate-inhale';
      case 1: return 'animate-hold';
      case 2: return 'animate-exhale';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 backdrop-blur-sm" onClick={onClose}>
        <style>{`
            @keyframes inhale {
                0% { transform: scale(0.5); }
                100% { transform: scale(1); }
            }
            @keyframes hold {
                0%, 100% { transform: scale(1); }
            }
            @keyframes exhale {
                0% { transform: scale(1); }
                100% { transform: scale(0.5); }
            }
            .animate-inhale { animation: inhale 4s ease-in-out forwards; }
            .animate-hold { animation: hold 4s ease-in-out forwards; }
            .animate-exhale { animation: exhale 6s ease-in-out forwards; }
        `}</style>
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className={`absolute w-full h-full bg-blue-400 rounded-full opacity-30 ${getAnimationClass()}`}></div>
        {/* FIX: Corrected typo from getAnimation-class to getAnimationClass */}
        <div className={`absolute w-2/3 h-2/3 bg-blue-500 rounded-full opacity-50 ${getAnimationClass()}`} style={{animationDelay: '100ms'}}></div>
        <div className={`w-1/2 h-1/2 bg-blue-600 rounded-full ${getAnimationClass()}`}></div>
      </div>

      <p className="mt-12 text-3xl font-semibold text-white tracking-wider">{currentStep.text}</p>
      
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl font-bold">&times;</button>
      <p className="absolute bottom-4 text-white text-sm">Click anywhere to close</p>
    </div>
  );
};