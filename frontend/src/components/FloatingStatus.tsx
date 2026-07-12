import { motion } from 'motion/react';
import { DashboardView } from '../types';
import { Bot } from 'lucide-react';

export function FloatingStatus({ activeView, sessionState = 'waiting' }: { activeView: DashboardView, sessionState?: 'waiting' | 'analyzing' | 'preparing' | 'ready' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 shadow-lg border border-white/60 w-64 backdrop-blur-xl bg-white/80"
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
        <Bot className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold text-text-main uppercase tracking-wider">AI Assistant</span>
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-text-main">
            {sessionState === 'waiting' && 'Waiting for lecture'}
            {sessionState === 'analyzing' && 'Analyzing lecture'}
            {sessionState === 'preparing' && 'Preparing session'}
            {sessionState === 'ready' && 'Ready'}
          </span>
          <div>
            {sessionState === 'ready' && <span className="text-success text-xs">✓</span>}
            {(sessionState === 'analyzing' || sessionState === 'preparing') && (
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            {sessionState === 'waiting' && (
              <span className="text-[10px] text-gray-400">Standby</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
