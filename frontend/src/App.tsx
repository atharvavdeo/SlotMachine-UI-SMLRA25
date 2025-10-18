import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { CasinoBackground } from './components/CasinoBackground';
import { FallingCoins } from './components/FallingCoins';
import { GameUIOverlay } from './components/GameUIOverlay';
import { PixelSlotMachine } from './components/PixelSlotMachine';
import { CRTScreen } from './components/CRTScreen';
import { PixelLever } from './components/PixelLever';
import { PixelButtonPanel } from './components/PixelButtonPanel';
import { CoinSlot } from './components/CoinSlot';
import { EmotionMeme } from './components/EmotionMeme';
import { SocialShareButtons } from './components/SocialShareButtons';
import { detectEmotion, type Emotion } from './utils/emotionDetection';
import { Camera, Coins } from 'lucide-react';

type GameState = 'pre-game' | 'ready' | 'spinning' | 'result';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('pre-game');
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [credits, setCredits] = useState(0);
  const [wins, setWins] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion>('neutral');
  const [frozenFrame, setFrozenFrame] = useState<string | null>(null);
  const [leverPulled, setLeverPulled] = useState(false);
  const [memeImageUrl, setMemeImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const API_URL = 'http://localhost:8000';
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Enable camera
  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Ensure video plays
        try {
          await videoRef.current.play();
          console.log('Camera started successfully');
        } catch (playError) {
          console.error('Error playing video:', playError);
        }
      }
      
      setCameraEnabled(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions and ensure you are using HTTPS or localhost.');
    }
  };

  // Insert coin
  const handleCoinInsert = () => {
    setCredits(prev => prev + 1);
    if (gameState === 'pre-game' && cameraEnabled) {
      setGameState('ready');
    }
  };

  // Pull lever and start spin
  const handleLeverPull = async () => {
    if (gameState !== 'ready' || credits < 1 || isProcessing) return;
    
    setCredits(prev => prev - 1);
    setLeverPulled(true);
    setGameState('spinning');
    setIsProcessing(true);

    // Capture the current frame
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const frameData = canvas.toDataURL('image/png');
        setFrozenFrame(frameData);
        
        try {
          // Convert base64 to blob
          const blob = await fetch(frameData).then(r => r.blob());
          
          // Create form data
          const formData = new FormData();
          formData.append('file', blob, 'capture.png');
          
          // Send to backend with timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
          
          const response = await fetch(`${API_URL}/api/process-image`, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
          }
          
          // Get emotion from headers
          const emotion = response.headers.get('X-Detected-Emotion') || 'neutral';
          console.log('Detected emotion:', emotion);
          
          // Get meme image as blob and create URL
          const memeBlob = await response.blob();
          const memeUrl = URL.createObjectURL(memeBlob);
          console.log('Meme received, size:', memeBlob.size);
          
          // Show result after spin animation
          setTimeout(() => {
            setDetectedEmotion(emotion as Emotion);
            setMemeImageUrl(memeUrl);
            setGameState('result');
            setLeverPulled(false);
            setIsProcessing(false);
            const newWins = wins + 1;
            setWins(newWins);
            
            // Update high score
            if (newWins > highScore) {
              setHighScore(newWins);
            }
          }, 1000); // Reduced from 2500 since backend already took time
          
        } catch (error) {
          console.error('Error processing image:', error);
          
          let errorMessage = 'Failed to process image. ';
          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              errorMessage += 'Request timed out. The backend is taking too long (processing on CPU).';
            } else {
              errorMessage += error.message;
            }
          }
          errorMessage += '\n\nMake sure the backend is running on port 8000.';
          
          alert(errorMessage);
          
          // Fallback to mock emotion
          const emotion = detectEmotion();
          setTimeout(() => {
            setDetectedEmotion(emotion);
            setGameState('result');
            setLeverPulled(false);
            setIsProcessing(false);
            const newWins = wins + 1;
            setWins(newWins);
            
            if (newWins > highScore) {
              setHighScore(newWins);
            }
          }, 1000);
        }
      }
    }
  };

  // Play again
  const handlePlayAgain = () => {
    if (credits < 1) {
      alert('Insert a coin to play again!');
      return;
    }
    setGameState('ready');
    setFrozenFrame(null);
    setDetectedEmotion('neutral');
    
    // Clean up previous meme URL
    if (memeImageUrl) {
      URL.revokeObjectURL(memeImageUrl);
      setMemeImageUrl(null);
    }
  };

  // Cash out (reset)
  const handleCashOut = () => {
    setCredits(0);
    setWins(0);
    setGameState(cameraEnabled ? 'pre-game' : 'pre-game');
    setFrozenFrame(null);
    
    // Clean up meme URL
    if (memeImageUrl) {
      URL.revokeObjectURL(memeImageUrl);
      setMemeImageUrl(null);
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Update game state when camera is enabled
  useEffect(() => {
    if (cameraEnabled && credits > 0 && gameState === 'pre-game') {
      setGameState('ready');
    }
  }, [cameraEnabled, credits, gameState]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Casino background environment */}
      <CasinoBackground />
      
      {/* Falling coins effect */}
      <FallingCoins isActive={gameState === 'result'} />
      
      {/* Game UI overlay (HIGH SCORE, CREDITS, etc.) */}
      <GameUIOverlay highScore={highScore} credits={credits} level={wins} />
      
      {/* Main content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-7xl">
          {/* Glowing title sign */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <motion.h1
              className="text-[#ffd700] mb-4"
              animate={{
                textShadow: [
                  '0 0 10px #ffd700, 0 0 20px #ff6b35',
                  '0 0 20px #ffd700, 0 0 40px #ff6b35, 0 0 60px #ff9066',
                  '0 0 10px #ffd700, 0 0 20px #ff6b35',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              EMOTIONAL JACKPOT
            </motion.h1>
            <div className="text-[#ff6b35] text-[10px] flex items-center justify-center gap-4">
              <span>★</span>
              <span>BET YOUR FACE</span>
              <span>•</span>
              <span>WIN A MEME</span>
              <span>★</span>
            </div>
          </motion.div>

          {/* Main slot machine */}
          <PixelSlotMachine>
            <div className="flex gap-8 items-start justify-center">
              {/* Left side - Dual screens stacked */}
              <div className="flex-1 flex flex-col gap-6 max-w-2xl">
                {/* Top screen - Webcam/Face */}
                <div className="w-full aspect-video">
                  <CRTScreen isActive={cameraEnabled}>
                    {!cameraEnabled ? (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8">
                        <Camera className="w-20 h-20 text-[#1a2942]" />
                        <button
                          onClick={enableCamera}
                          className="px-8 py-4 border-4 pixel-orange-glow border-[#e85525] text-[#0a0e1a]"
                          style={{ boxShadow: '0 4px 0 #e85525, 0 0 20px #ff6b35' }}
                        >
                          ENABLE CAMERA
                        </button>
                        <p className="text-[#1a2942] text-[8px] text-center">
                          Camera required to play
                        </p>
                      </div>
                    ) : !frozenFrame ? (
                      <div className="relative w-full h-full bg-black">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          autoPlay
                          playsInline
                          muted
                          style={{ transform: 'scaleX(-1)' }}
                        />
                        {/* Debug indicator */}
                        <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-[8px] rounded">
                          LIVE
                        </div>
                        {gameState === 'ready' && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#00ff88] border-2 border-[#00cc66] text-[#0a0e1a] text-[8px]">
                            READY TO PLAY!
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <img 
                          src={frozenFrame} 
                          alt="Captured face" 
                          className="w-full h-full object-cover"
                        />
                        {gameState === 'spinning' && (
                          <motion.div
                            className="absolute inset-0 border-8 border-[#ffd700]"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                          />
                        )}
                      </div>
                    )}
                  </CRTScreen>
                </div>

                {/* Bottom screen - Meme result */}
                <div className="w-full aspect-video">
                  <CRTScreen isActive={gameState === 'spinning' || gameState === 'result'}>
                    {gameState === 'pre-game' || !cameraEnabled ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <motion.div
                          className="text-[#1a2942] text-center text-[12px]"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          INSERT COIN<br/>TO BEGIN
                        </motion.div>
                      </div>
                    ) : gameState === 'ready' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <motion.div
                          className="text-8xl mb-4"
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          ❓
                        </motion.div>
                        <div className="text-[#1a2942] text-[12px]">MYSTERY MEME</div>
                      </div>
                    ) : gameState === 'spinning' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <EmotionMeme emotion={detectedEmotion} isSpinning />
                        {isProcessing && (
                          <motion.div
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#ffd700] border-4 border-[#ff6b35] text-[#0a0e1a] text-[10px] font-bold"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            🧠 ANALYZING EMOTION... PLEASE WAIT 20-30 SEC
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <EmotionMeme emotion={detectedEmotion} memeImageUrl={memeImageUrl} />
                        
                        {/* Winner banner */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 left-1/2 -translate-x-1/2 px-8 py-3 bg-[#ffd700] border-4 border-[#ff6b35]"
                          style={{
                            boxShadow: '0 0 30px #ffd700, 0 0 50px #ff6b35'
                          }}
                        >
                          <div className="text-[#0a0e1a]">★ JACKPOT! ★</div>
                        </motion.div>
                      </div>
                    )}
                  </CRTScreen>
                </div>
              </div>

              {/* Right side - Lever */}
              <div className="flex items-center pt-12">
                <PixelLever
                  isActive={gameState === 'ready' && credits > 0}
                  isPulled={leverPulled}
                  onPull={handleLeverPull}
                  disabled={gameState !== 'ready' || credits < 1}
                />
              </div>
            </div>

            {/* Control panel at bottom */}
            <div className="mt-8 pt-6 border-t-4 border-[#ff6b35]">
              <div className="flex items-center justify-between gap-8">
                {/* Coin slot */}
                <div className="flex-1">
                  <CoinSlot 
                    onCoinInsert={handleCoinInsert}
                    disabled={gameState === 'spinning'}
                  />
                </div>

                {/* Button panel */}
                <div className="flex-1">
                  {gameState === 'result' ? (
                    <div className="flex flex-col gap-4">
                      <PixelButtonPanel
                        buttons={[
                          {
                            label: 'PLAY AGAIN',
                            onClick: handlePlayAgain,
                            disabled: credits < 1,
                            color: 'green'
                          },
                          {
                            label: 'CASH OUT',
                            onClick: handleCashOut,
                            disabled: credits === 0,
                            color: 'red'
                          }
                        ]}
                      />
                      <div className="mt-2">
                        <SocialShareButtons show={true} />
                      </div>
                    </div>
                  ) : (
                    <PixelButtonPanel
                      buttons={[
                        {
                          label: 'CASH OUT',
                          onClick: handleCashOut,
                          disabled: credits === 0,
                          color: 'red'
                        },
                        {
                          label: '+5 COINS',
                          onClick: () => setCredits(prev => prev + 5),
                          color: 'gold'
                        }
                      ]}
                    />
                  )}
                </div>

                {/* Status display */}
                <div className="flex-1 flex justify-end">
                  <div className="bg-[#0a0e1a] border-4 border-[#ff6b35] px-6 py-4">
                    <div className="text-[#ffd700] text-[8px] mb-2">STATUS</div>
                    <motion.div
                      className="text-[#00ff88] text-[10px] text-center"
                      animate={gameState === 'ready' ? {
                        opacity: [0.6, 1, 0.6],
                      } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {gameState === 'pre-game' && 'INSERT COIN'}
                      {gameState === 'ready' && 'PULL LEVER!'}
                      {gameState === 'spinning' && 'SPINNING...'}
                      {gameState === 'result' && 'WINNER!'}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </PixelSlotMachine>

          {/* Bottom coin tray */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-[#1a2942] border-4 border-[#ff6b35] py-3 text-center"
            style={{
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.3), inset 0 4px 8px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div className="flex items-center justify-center gap-2 text-[#ffd700] text-[8px]">
              <Coins className="w-4 h-4" />
              <span>COIN RETURN TRAY</span>
              <Coins className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 text-[#8ba7c7] text-[8px]"
          >
            <p>© 2025 PIXEL ARCADE • 16-BIT MASTERPIECE • FOR ENTERTAINMENT ONLY</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
