import { useState, useEffect, useRef } from 'react';
import type { Emotion } from '../types';
import { MODEL_URL } from '../constants';

// This is to inform TypeScript about the faceapi object available globally
declare var faceapi: any;

export const useFaceApi = () => {
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [emotion, setEmotion] = useState<Emotion>('loading');
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // FIX: Changed NodeJS.Timeout to ReturnType<typeof setInterval> for browser compatibility.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (e) {
        console.error("Error loading face-api models:", e);
        setError("Could not load AI models for emotion detection.");
        setEmotion('error');
      }
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing webcam:", err);
        setError("Webcam access denied. Emotion detection is disabled.");
        setEmotion('error');
      });
  };

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
  }, [modelsLoaded]);

  useEffect(() => {
    const handleVideoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(async () => {
        if (videoRef.current && !videoRef.current.paused) {
          const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
          if (detections) {
            const expressions = detections.expressions;
            const primaryEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
            setEmotion(primaryEmotion as Emotion);
          } else {
             setEmotion('not_detected');
          }
        }
      }, 1500);
    };

    const currentVideo = videoRef.current;
    if (currentVideo) {
      currentVideo.addEventListener('play', handleVideoPlay);
    }

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener('play', handleVideoPlay);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
       // Stop camera stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [modelsLoaded]);

  return { videoRef, emotion, modelsLoaded, error };
};