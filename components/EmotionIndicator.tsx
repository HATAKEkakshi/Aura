
import React from 'react';
import type { Emotion } from '../types';

interface EmotionIndicatorProps {
  emotion: Emotion;
  modelsLoaded: boolean;
  error: string | null;
}

const emotionMap: Record<Emotion, { emoji: string; label: string; color: string }> = {
  happy: { emoji: '😊', label: 'Happy', color: 'text-yellow-400' },
  sad: { emoji: '😢', label: 'Sad', color: 'text-blue-400' },
  angry: { emoji: '😠', label: 'Angry', color: 'text-red-400' },
  neutral: { emoji: '😐', label: 'Neutral', color: 'text-gray-400' },
  surprised: { emoji: '😲', label: 'Surprised', color: 'text-purple-400' },
  disgusted: { emoji: '🤢', label: 'Disgusted', color: 'text-green-500' },
  fearful: { emoji: '😨', label: 'Fearful', color: 'text-indigo-400' },
  loading: { emoji: '⌛', label: 'Loading...', color: 'text-gray-400' },
  error: { emoji: '⚠️', label: 'Error', color: 'text-red-400' },
  not_detected: { emoji: '🚫', label: 'No Face', color: 'text-gray-500' },
};

export const EmotionIndicator: React.FC<EmotionIndicatorProps> = ({ emotion, modelsLoaded, error }) => {
  let displayData;

  if (error) {
    displayData = { emoji: '⚠️', label: 'Webcam Error', color: 'text-red-400' };
  } else if (!modelsLoaded) {
    displayData = emotionMap.loading;
  } else {
    displayData = emotionMap[emotion] || emotionMap.not_detected;
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <span className={`text-xl ${displayData.color}`}>{displayData.emoji}</span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{displayData.label}</span>
    </div>
  );
};
