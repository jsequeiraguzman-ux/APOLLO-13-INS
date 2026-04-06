import { motion } from 'framer-motion';
import { TreePine } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full p-4 flex items-center justify-between border-b border-ins-neon/20 bg-ins-dark/50 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="bg-white p-1 rounded-sm">
          <TreePine className="w-6 h-6 text-ins-dark" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-white">INS</span>
        <span className="text-ins-neon font-mono text-xs ml-2 border border-ins-neon px-2 py-0.5 rounded">SKILLS LAB</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ins-neon opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-ins-neon"></span>
        </span>
        <span className="font-mono text-xs text-ins-neon">SYNC</span>
      </div>
    </header>
  );
}
