
import React, { useState, useCallback, useEffect } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { WellnessTools } from './components/WellnessTools';
import { EmotionIndicator } from './components/EmotionIndicator';
import { BreathingExercise } from './components/BreathingExercise';
import { PrivacyDisclaimer } from './components/PrivacyDisclaimer';
import { useFaceApi } from './hooks/useFaceApi';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { getAuraResponse, getPositiveAffirmation } from './services/geminiService';
import type { Message, Emotion } from './types';
import { SYSTEM_PROMPT } from './constants';
import { Logo } from './components/Logo';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'aura', content: "Hello, I'm Aura, your confidential AI companion. How are you feeling today?" }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState<boolean>(false);
  
  const { videoRef, emotion, modelsLoaded, error: faceApiError } = useFaceApi();
  const { speak, isSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    // Initial greeting speech
    speak("Hello, I'm Aura, your confidential AI companion. How are you feeling today?");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleSendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    addMessage({ role: 'user', content: userMessage });
    setIsLoading(true);

    try {
      const auraResponse = await getAuraResponse(userMessage, emotion as Emotion, messages);
      addMessage({ role: 'aura', content: auraResponse });
      speak(auraResponse);
    } catch (error) {
      console.error("Error getting response from Gemini:", error);
      const errorMessage = "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment.";
      addMessage({ role: 'aura', content: errorMessage });
      speak(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, emotion, messages, addMessage, speak]);

  const handleGetAffirmation = useCallback(async () => {
    setIsLoading(true);
    addMessage({ role: 'user', content: "Give me a positive affirmation."});
    try {
      const affirmation = await getPositiveAffirmation();
      addMessage({ role: 'aura', content: affirmation });
      speak(affirmation);
    } catch (error) {
      console.error("Error getting affirmation from Gemini:", error);
      const errorMessage = "I couldn't fetch an affirmation right now. Remember, you are capable and strong.";
      addMessage({ role: 'aura', content: errorMessage });
      speak(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, speak]);

  return (
    <div className="flex h-screen w-screen flex-col font-sans text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Aura</h1>
        </div>
        <EmotionIndicator emotion={emotion} modelsLoaded={modelsLoaded} error={faceApiError} />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <ChatWindow messages={messages} isLoading={isLoading} isSpeaking={isSpeaking} />
      </main>
      
      <video ref={videoRef} autoPlay muted playsInline className="absolute top-0 left-0 w-32 h-24 opacity-0 -z-10"></video>
      
      {showBreathingExercise && <BreathingExercise onClose={() => setShowBreathingExercise(false)} />}
      
      <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <WellnessTools 
          onBreathingClick={() => setShowBreathingExercise(true)}
          onAffirmationClick={handleGetAffirmation}
          disabled={isLoading}
        />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        <PrivacyDisclaimer />
      </footer>
    </div>
  );
};

export default App;
