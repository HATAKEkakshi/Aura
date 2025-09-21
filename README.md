# Aura: Your Confidential AI Companion

Aura is a web-based, AI-powered mental wellness companion designed for Indian youth. It provides a confidential space using multi-modal technology to offer empathetic, personalized mental wellness support.

## ✨ Features

### 🎭 **Real-time Emotion Detection**
- Live facial emotion recognition using Face-API.js
- Detects 7 emotions: neutral, happy, sad, angry, surprised, disgusted, fearful
- Contextual responses based on detected emotions

### 🗣️ **Voice Interaction**
- Text-to-speech responses from Aura
- Natural conversation flow with voice feedback
- Accessibility-friendly audio interface

### 💬 **AI-Powered Chat**
- Powered by Google's Gemini AI
- Empathetic, non-judgmental responses
- Specialized prompts for mental wellness support
- Crisis intervention with helpline information

### 🧘 **Wellness Tools**
- **Breathing Exercises**: Guided breathing sessions for relaxation
- **Positive Affirmations**: AI-generated personalized affirmations
- Quick access wellness toolkit

### 🔒 **Privacy & Safety**
- Confidential conversations
- No data storage or tracking
- Built-in crisis support resources
- Clear privacy disclaimers

## 🚀 Getting Started

**Prerequisites:** Node.js (v18 or higher)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   Create `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```

4. **Grant camera permissions** when prompted for emotion detection

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **AI**: Google Gemini API
- **Emotion Detection**: Face-API.js
- **Speech**: Web Speech API
- **Styling**: Tailwind CSS

## 🎯 Target Audience

Designed specifically for Indian youth seeking:
- Mental wellness support
- Confidential space to express feelings
- Accessible mental health resources
- Crisis intervention guidance
