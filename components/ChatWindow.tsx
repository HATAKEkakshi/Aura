
import React, { useRef, useEffect } from 'react';
import type { Message } from '../types';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  isSpeaking: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, isSpeaking }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  const filteredMessages = messages.filter(msg => msg.role !== 'system');

  return (
    <div className="space-y-4">
      {filteredMessages.map((msg, index) => (
        <MessageBubble key={index} message={msg} isSpeaking={isSpeaking && index === filteredMessages.length - 1} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 max-w-lg">
                <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};
