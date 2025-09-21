
export interface Message {
  role: 'user' | 'aura' | 'system';
  content: string;
}

export type Emotion = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'disgusted' | 'fearful' | 'loading' | 'error' | 'not_detected';
