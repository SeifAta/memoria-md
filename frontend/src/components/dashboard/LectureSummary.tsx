import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { FileText, Target, AlertTriangle, Pill, Stethoscope, ChevronDown } from 'lucide-react';

export function LectureSummary() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-accent-blue/10 p-2 rounded-xl text-accent-blue">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-text-main">Lecture Summary</h1>
        </div>
        <p className="text-text-muted text-lg pl-11">
          Extracted from: <span className="font-medium text-text-main">heart_failure.pdf - Acute Chest Pain.pdf</span>
        </p>
      </header>

      <div className="space-y-4">
        <BlueprintCard 
          title="Learning Objectives" 
          icon={<Target className="w-5 h-5 text-primary" />}
          defaultOpen={true}
        >
          <ul className="list-disc pl-5 space-y-2 text-text-main">
            <li>Differentiate between life-threatening and benign causes of chest pain.</li>
            <li>Understand the pathophysiology of acute coronary syndrome (ACS).</li>
            <li>Identify key red flag symptoms requiring immediate intervention.</li>
            <li>Determine appropriate initial investigations for suspected ACS.</li>
          </ul>
        </BlueprintCard>

        <BlueprintCard 
          title="Red Flags (Critical)" 
          icon={<AlertTriangle className="w-5 h-5 text-error" />}
          defaultOpen={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-error/5 border border-error/20 p-4 rounded-xl">
              <h4 className="font-bold text-error mb-1">Tearing pain radiating to back</h4>
              <p className="text-sm text-text-muted">High suspicion for Aortic Dissection.</p>
            </div>
            <div className="bg-error/5 border border-error/20 p-4 rounded-xl">
              <h4 className="font-bold text-error mb-1">Associated Syncope</h4>
              <p className="text-sm text-text-muted">Consider massive PE or severe Arrhythmia.</p>
            </div>
            <div className="bg-error/5 border border-error/20 p-4 rounded-xl">
              <h4 className="font-bold text-error mb-1">Diaphoresis & Nausea</h4>
              <p className="text-sm text-text-muted">Classic sympathetic activation in ACS.</p>
            </div>
          </div>
        </BlueprintCard>

        <BlueprintCard 
          title="Clinical Reasoning Points" 
          icon={<Stethoscope className="w-5 h-5 text-accent-teal" />}
        >
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm font-medium text-primary mb-1">Key Differentiation</p>
              <p className="text-text-main">Pleuritic pain (worse with inspiration) leans away from cardiac ischemia and towards pericarditis, PE, or pneumothorax.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm font-medium text-primary mb-1">Atypical Presentations</p>
              <p className="text-text-main">Women, elderly, and diabetic patients may present without classic "crushing" chest pain; consider dyspnea or profound fatigue as ACS equivalents.</p>
            </div>
          </div>
        </BlueprintCard>

        <BlueprintCard 
          title="Management & Medications" 
          icon={<Pill className="w-5 h-5 text-warning" />}
        >
          <ul className="list-disc pl-5 space-y-2 text-text-main">
            <li>Immediate ECG within 10 minutes of arrival.</li>
            <li>Aspirin 300mg chewed immediately (unless contraindicated).</li>
            <li>Sublingual GTN for symptomatic relief (caution if hypotensive).</li>
            <li>Oxygen only if SpO2 {'<'} 94%.</li>
          </ul>
        </BlueprintCard>
      </div>
    </div>
  );
}

function BlueprintCard({ title, icon, children, defaultOpen = false }: { title: string, icon: React.ReactNode, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all hover:border-gray-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white focus:outline-none"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-semibold text-text-main text-lg">{title}</h3>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-gray-100 mt-2 bg-white">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
