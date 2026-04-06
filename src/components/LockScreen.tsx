import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

interface LockScreenProps {
  correctCode: string;
  onUnlock: () => void;
  debugMode: boolean;
}

export function LockScreen({ correctCode, onUnlock, debugMode }: LockScreenProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    
    if (cleanCode === correctCode || (debugMode && cleanCode === 'TEST')) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setCode('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-ins-dark/80 p-6"
    >
      <motion.div 
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={cn(
          "bg-ins-panel border-2 p-8 rounded-xl w-full max-w-sm text-center shadow-2xl",
          error ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]" : "border-ins-neon glow-neon"
        )}
      >
        <div className="flex justify-center mb-6">
          {error ? (
            <AlertTriangle className="w-16 h-16 text-red-500" />
          ) : (
            <Lock className="w-16 h-16 text-ins-neon" />
          )}
        </div>
        
        <h2 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-widest">
          Terminal Bloqueada
        </h2>
        <p className="text-gray-400 font-mono text-sm mb-8">
          Esperando código de autorización del Director de Vuelo...
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="INGRESE CÓDIGO"
            className={cn(
              "w-full bg-ins-dark border-2 rounded-lg px-4 py-3 text-center font-mono text-xl tracking-[0.2em] text-white focus:outline-none transition-colors",
              error ? "border-red-500" : "border-gray-600 focus:border-ins-neon"
            )}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          
          <button
            type="submit"
            disabled={!code.trim()}
            className="w-full bg-ins-neon text-ins-dark font-bold py-3 rounded-lg uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ins-neon-hover transition-colors flex items-center justify-center gap-2"
          >
            <Unlock className="w-5 h-5" />
            Verificar
          </button>
        </form>
        
        {debugMode && (
          <p className="mt-4 text-xs text-gray-500 font-mono">
            DEBUG: Código es {correctCode} o TEST
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
