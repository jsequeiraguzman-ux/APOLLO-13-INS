import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Rocket, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { loadState, saveState, clearState, AppState } from './store';
import { Header } from './components/Header';
import { LockScreen } from './components/LockScreen';
import { TypewriterText } from './components/TypewriterText';
import { StorySlide } from './components/StorySlide';
import { playRadioVoice } from './lib/audio';
import { SEQUENCE, SequenceStep } from './data/sequence';
import { cn } from './lib/utils';

// CONFIGURACIÓN
const DEBUG_MODE = false;
const WEBHOOK_URL = "https://hook.us1.make.com/dummy-url-replace-me"; // Reemplazar con URL real de n8n/Google Sheets

interface ChallengeProps {
  key?: string | number;
  data: SequenceStep;
  isLocked: boolean;
  onAnswerSubmit: (answer: string, phaseKey: keyof AppState['answers']) => void;
  onUnlock: () => void;
  debugMode: boolean;
}

function ChallengeSlide({ data, isLocked, onAnswerSubmit, onUnlock, debugMode }: ChallengeProps) {
  const [localAnswer, setLocalAnswer] = useState('');

  return (
    <motion.div 
      key={data.id}
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="flex flex-col h-full max-w-md mx-auto w-full bg-ins-dark"
    >
      <div className="relative h-48 w-full shrink-0">
        <img src={data.bgImage} alt="Mission context" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ins-dark to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-ins-neon font-mono text-xs font-bold tracking-widest">{data.title}</span>
          <h2 className="text-2xl font-display font-bold text-white">{data.subtitle}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">
        <div className="space-y-4">
          <p className="font-medium text-white text-lg">{data.question}</p>
          
          {data.inputType === 'options' && data.options ? (
            <div className="space-y-3">
              {data.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => onAnswerSubmit(opt, data.answerKey!)}
                  className="w-full text-left p-4 rounded-lg border border-gray-700 bg-ins-panel hover:border-ins-neon hover:bg-ins-panel/80 transition-all active:scale-[0.98]"
                >
                  <span className="text-sm text-gray-200">{opt}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={localAnswer}
                onChange={(e) => setLocalAnswer(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full h-32 bg-ins-panel border border-gray-600 rounded-lg p-4 text-white focus:outline-none focus:border-ins-neon resize-none"
                required
              />
              <button
                onClick={() => onAnswerSubmit(localAnswer, data.answerKey!)}
                disabled={localAnswer.trim().length < 10}
                className="w-full bg-ins-neon text-ins-dark font-bold py-3 rounded-lg uppercase tracking-wider disabled:opacity-50 hover:bg-ins-neon-hover flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Enviar Reporte
              </button>
            </div>
          )}
        </div>
      </div>

      {isLocked && (
        <LockScreen 
          correctCode={data.lockCode!} 
          onUnlock={onUnlock} 
          debugMode={debugMode} 
        />
      )}
    </motion.div>
  );
}

export default function App() {
  const [state, setState] = useState<AppState>(loadState());
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webhookError, setWebhookError] = useState(false);

  const currentStep = SEQUENCE[state.currentIndex];

  // Persist state changes
  useEffect(() => {
    saveState(state);
    if (DEBUG_MODE) {
      console.log("[DEBUG] State Updated:", state);
    }
  }, [state]);

  // Trigger voice on slide change
  useEffect(() => {
    if (currentStep && currentStep.narrative && !state.isLocked) {
      playRadioVoice(currentStep.narrative);
    }
    
    if (currentStep?.type === 'success') {
      triggerConfetti();
      sendDataToWebhook();
    }
  }, [state.currentIndex, state.isLocked, currentStep]);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6B00', '#ffffff', '#0a192f']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF6B00', '#ffffff', '#0a192f']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const sendDataToWebhook = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        nombre: state.name,
        fase1_aprendizaje: state.answers.fase1_aprendizaje,
        fase2_comportamiento: state.answers.fase2_comportamiento,
        fase3_evaluacion: state.answers.fase3_evaluacion,
        timestamp: new Date().toISOString()
      };
      
      if (DEBUG_MODE) console.log("[DEBUG] Sending Payload:", payload);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Webhook failed');
      if (DEBUG_MODE) console.log("[DEBUG] Webhook Success");
    } catch (error) {
      console.error("Error enviando datos:", error);
      setWebhookError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setState(s => ({ ...s, name: inputValue.trim(), currentIndex: 1 }));
      setInputValue('');
    }
  };

  const handleNextSlide = () => {
    setState(s => ({ ...s, currentIndex: s.currentIndex + 1 }));
  };

  const handleAnswerSubmit = (answer: string, phaseKey: keyof AppState['answers']) => {
    setState(s => ({
      ...s,
      answers: { ...s.answers, [phaseKey]: answer },
      isLocked: true // Lock immediately after answering
    }));
  };

  const handleUnlock = () => {
    setState(s => ({
      ...s,
      isLocked: false,
      currentIndex: s.currentIndex + 1
    }));
  };

  // --- RENDER HELPERS ---

  const renderOnboarding = () => (
    <motion.div 
      key="onboarding"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center h-full max-w-md mx-auto px-6 text-center"
    >
      <div className="w-24 h-24 bg-ins-panel rounded-full flex items-center justify-center mb-8 border border-ins-neon glow-neon">
        <Rocket className="w-12 h-12 text-ins-neon" />
      </div>
      <h1 className="text-4xl font-display font-bold mb-4 text-white">MISIÓN APOLO 13</h1>
      <p className="text-gray-400 mb-8 font-mono text-sm">
        <TypewriterText text="> INICIANDO PROTOCOLO DE ENTRENAMIENTO INS // MÓDULO: ENFOQUE A RESULTADOS" speed={40} />
      </p>
      
      <form onSubmit={handleStart} className="w-full space-y-4">
        <div className="text-left">
          <label className="block text-xs font-mono text-ins-neon mb-2 uppercase">Identificación de Tripulante</label>
          <input
            type="text"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ingresa tu nombre..."
            className="w-full bg-ins-panel border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ins-neon transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="w-full bg-ins-neon text-ins-dark font-bold py-3 rounded-lg uppercase tracking-wider disabled:opacity-50 hover:bg-ins-neon-hover transition-colors glow-neon"
        >
          Iniciar Secuencia
        </button>
      </form>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div 
      key="success"
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full max-w-md mx-auto px-6 text-center"
    >
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      <h1 className="text-4xl font-display font-bold mb-2 text-white">MISIÓN CUMPLIDA</h1>
      <h2 className="text-xl text-ins-neon font-mono mb-8">EL PODER DEL ENFOQUE</h2>
      
      <div className="bg-ins-panel border border-gray-700 rounded-lg p-6 w-full text-left space-y-4">
        <p className="text-gray-300 text-sm">
          La cápsula ha tocado agua. Tres vidas salvadas porque un equipo decidió que el resultado era innegociable.
        </p>
        <div className="border-t border-gray-700 pt-4">
          <p className="font-mono text-xs text-gray-400 mb-1">TRIPULANTE:</p>
          <p className="font-bold text-white uppercase">{state.name}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-gray-400 mb-1">ESTADO DE TELEMETRÍA:</p>
          {isSubmitting ? (
            <p className="text-yellow-500 text-sm animate-pulse">Transmitiendo datos a Houston...</p>
          ) : webhookError ? (
            <p className="text-red-400 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4"/> Error de transmisión (Datos guardados localmente)</p>
          ) : (
            <p className="text-green-400 text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Transmisión Exitosa</p>
          )}
        </div>
      </div>

      <button 
        onClick={() => { clearState(); window.location.reload(); }}
        className="mt-8 text-gray-500 text-sm underline hover:text-white transition-colors"
      >
        Reiniciar Simulación
      </button>
    </motion.div>
  );

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden bg-ins-dark selection:bg-ins-neon selection:text-ins-dark">
      <Header />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep?.type === 'onboarding' && renderOnboarding()}
          
          {currentStep?.type === 'story' && (
            <StorySlide 
              key={currentStep.id} 
              data={currentStep} 
              onNext={handleNextSlide} 
            />
          )}

          {currentStep?.type === 'challenge' && (
            <ChallengeSlide
              key={currentStep.id}
              data={currentStep}
              isLocked={state.isLocked}
              onAnswerSubmit={handleAnswerSubmit}
              onUnlock={handleUnlock}
              debugMode={DEBUG_MODE}
            />
          )}

          {currentStep?.type === 'success' && renderSuccess()}
        </AnimatePresence>
      </main>
    </div>
  );
}
