
import React from 'react';
import type { Message } from '../types';
import { UserIcon, SparklesIcon } from './Icons';

interface MessageBubbleProps {
  message: Message;
  isSpeaking: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSpeaking }) => {
  const { role, content } = message;
  const isUser = role === 'user';
  const bubbleClasses = isUser
    ? 'bg-blue-500 text-white self-end'
    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-start';

  const wrapperClasses = isUser ? 'flex justify-end' : 'flex justify-start';

  const Icon = isUser ? UserIcon : SparklesIcon;
  const iconClasses = isUser ? 'text-blue-300' : 'text-purple-400';

  return (
    <div className={`${wrapperClasses} items-start gap-3`}>
       {!isUser && <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600 ${isSpeaking ? 'animate-pulse' : ''}`}><Icon className={iconClasses} /></div>}
        <div className={`rounded-xl p-3 max-w-lg shadow-md ${bubbleClasses}`} style={{ whiteSpace: 'pre-wrap' }}>
            {content}
        </div>
        {isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600"><Icon className={iconClasses}/></div>}
    </div>
  );
};
