
import React from 'react';
import { LockIcon } from './Icons';

export const PrivacyDisclaimer: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-3 text-xs text-gray-500 dark:text-gray-400">
      <LockIcon className="w-3 h-3 mr-1.5" />
      <span>Your privacy is protected. All processing is done in your browser and is not saved.</span>
    </div>
  );
};
