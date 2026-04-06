import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { SequenceStep } from '../data/sequence';
import { cn } from '../lib/utils';

interface StorySlideProps {
  key?: string | number;
  data: SequenceStep;
  onNext: () => void;
}

export function StorySlide({ data, onNext }: StorySlideProps) {
  const renderBullets = (bullets?: string[]) => {
    if (!bullets || bullets.length === 0) return null;
    return (
      <ul className="mt-6 space-y-4 text-left">
        {bullets.map((bullet, idx) => (
          <motion.li 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + (idx * 0.5) }}
            className="flex items-start gap-3 text-gray-200 text-sm font-sans"
          >
            <CheckCircle2 className="w-5 h-5 text-ins-neon shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>
    );
  };

  return (
    <motion.div 
      key={data.id}
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col h-full w-full max-w-md mx-auto overflow-hidden bg-ins-dark"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={data.bgImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ins-dark/80 via-transparent to-ins-dark/90" />
      </div>

      {/* Content Layouts */}
      <div className={cn(
        "relative z-10 flex flex-col h-full p-6",
        data.layout === 'center' && "justify-center items-center text-center",
        data.layout === 'bottom' && "justify-end pb-24",
        data.layout === 'split' && "justify-between py-12"
      )}>
        
        {data.layout === 'center' && (
          <div className="bg-ins-panel/80 backdrop-blur-md border border-ins-neon/50 p-8 rounded-2xl shadow-2xl w-full">
            <h2 className="text-ins-neon font-mono text-sm font-bold tracking-widest mb-2 uppercase">
              {data.title}
            </h2>
            <h1 className="text-3xl font-display font-bold text-white mb-6">
              {data.subtitle}
            </h1>
            <div className="text-gray-300 text-sm leading-relaxed font-sans border-t border-gray-700 pt-4">
              <TypewriterText text={data.content || ''} speed={30} />
            </div>
            {renderBullets(data.bullets)}
          </div>
        )}

        {data.layout === 'bottom' && (
          <div className="space-y-6">
            <div className="inline-block bg-ins-neon/10 border-l-4 border-ins-neon px-4 py-2 backdrop-blur-sm">
              <h2 className="text-ins-neon font-mono text-xs font-bold tracking-widest uppercase">
                {data.title}
              </h2>
              <h1 className="text-2xl font-display font-bold text-white">
                {data.subtitle}
              </h1>
            </div>
            
            <div className="bg-ins-panel/90 backdrop-blur-md border border-gray-700 p-6 rounded-xl shadow-xl">
              <p className="text-gray-300 text-sm leading-relaxed font-sans">
                <TypewriterText text={data.content || ''} speed={20} />
              </p>
              {renderBullets(data.bullets)}
            </div>
          </div>
        )}

        {data.layout === 'split' && (
          <>
            <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-xl backdrop-blur-sm">
              <h2 className="text-red-400 font-mono text-sm font-bold tracking-widest mb-2 uppercase">
                {data.title}
              </h2>
              <h1 className="text-2xl font-display font-bold text-white">
                {data.subtitle}
              </h1>
            </div>
            
            <div className="bg-ins-panel/90 backdrop-blur-md border border-ins-neon/50 p-6 rounded-xl shadow-xl mt-8">
              <p className="text-gray-300 text-sm leading-relaxed font-sans">
                <TypewriterText text={data.content || ''} speed={20} />
              </p>
              {renderBullets(data.bullets)}
            </div>
          </>
        )}

      </div>

      {/* Next Button */}
      <div className="absolute bottom-6 left-6 right-6 z-20">
        <button
          onClick={onNext}
          className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-4 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
        >
          Continuar
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
