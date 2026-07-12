import { motion } from 'motion/react';
import { ArrowRight, Play, Activity, FileText, User, BarChart, TrendingUp } from 'lucide-react';

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-main flex flex-col items-center justify-center pt-20 pb-20 px-6 sm:px-12 lg:px-24">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-teal/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Column: Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-text-main">Memoria<span className="text-primary">MD</span></span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-accent-blue font-medium tracking-wide text-sm uppercase mb-4">
              From Knowledge to Clinical Reasoning
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-text-main leading-[1.1] mb-6">
              Master Clinical Reasoning, <br/><span className="text-primary">Intelligently.</span>
            </h1>
            <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform medical lectures into adaptive AI-powered patient encounters that teach, assess, and strengthen real clinical decision-making through personalized feedback.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onStart}
                className="group relative px-8 py-4 bg-primary text-white font-medium rounded-2xl overflow-hidden transition-all hover:shadow-[0_8px_25px_-5px_rgba(47,93,159,0.4)] flex items-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Start Learning</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-white text-text-main font-medium rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
                <Play className="w-5 h-5 text-primary" fill="currentColor" />
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Illustration Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
        >
          <div className="relative w-full aspect-[4/3] rounded-[2.5rem] glass-card p-6 flex flex-col gap-4 overflow-hidden border border-white/60 bg-gradient-to-br from-white/80 to-white/30 shadow-2xl">
            {/* Soft background pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Mockup Header */}
            <div className="w-full flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <div className="relative z-10 flex gap-4 h-full">
              {/* Sidebar Mockup */}
              <div className="w-1/4 h-full rounded-xl bg-white/50 border border-white/50 flex flex-col p-3 space-y-2">
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
                <div className="w-full h-8 bg-primary/20 rounded-lg" />
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
                <div className="w-full h-8 bg-gray-100 rounded-lg" />
              </div>
              
              {/* Content Mockup */}
              <div className="flex-1 h-full flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-text-muted" />
                      <div className="w-16 h-3 bg-gray-200 rounded-full" />
                    </div>
                    <div className="w-24 h-4 bg-text-main rounded-full" />
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <div className="w-16 h-3 bg-gray-200 rounded-full" />
                    </div>
                    <div className="w-20 h-4 bg-text-main rounded-full" />
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative overflow-hidden flex flex-col">
                  <div className="w-full h-4 bg-gray-100 rounded-full mb-4 max-w-[50%]" />
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="w-[80%] h-12 bg-gray-50 rounded-r-2xl rounded-bl-2xl border border-gray-100 p-3 flex items-center">
                      <div className="w-full h-2 bg-gray-200 rounded-full" />
                    </div>
                    <div className="w-[80%] h-12 bg-primary text-white rounded-l-2xl rounded-br-2xl self-end p-3 flex items-center">
                      <div className="w-full h-2 bg-white/50 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vision Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full bg-text-main py-24 relative overflow-hidden mt-32 z-10"
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(94,224,216,0.2)_0%,transparent_70%)]" />
        
        {/* Soft neural network abstraction */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-96 h-96 border border-white/20 rounded-full animate-spin-slow" />
          <div className="w-64 h-64 border border-white/30 rounded-full absolute animate-spin-reverse-slow" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
          <p className="text-xl text-gray-300 leading-relaxed font-light">
            To transform medical education through personalized AI-powered clinical learning that develops not only knowledge, but true clinical reasoning. We envision a future where every medical student has an intelligent learning partner that adapts, teaches, challenges, evaluates, and grows with them throughout their medical journey.
          </p>
        </div>
      </motion.div>

      <footer className="w-full py-8 text-center border-t border-gray-100 mt-auto bg-white relative z-10">
        <div className="flex items-center justify-center gap-6 text-sm font-medium text-text-muted">
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}


