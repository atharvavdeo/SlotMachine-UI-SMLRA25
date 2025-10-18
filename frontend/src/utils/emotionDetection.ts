// Simple mock emotion detection
// In a production app, you would use a library like face-api.js or TensorFlow.js

export type Emotion = 'happy' | 'sad' | 'angry' | 'surprised' | 'neutral';

export function detectEmotion(imageData?: ImageData): Emotion {
  // Mock implementation - randomly select an emotion
  const emotions: Emotion[] = ['happy', 'sad', 'angry', 'surprised', 'neutral'];
  const randomIndex = Math.floor(Math.random() * emotions.length);
  return emotions[randomIndex];
}

// Helper to capture canvas frame
export function captureFrame(video: HTMLVideoElement): ImageData | null {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return null;
  
  ctx.drawImage(video, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
