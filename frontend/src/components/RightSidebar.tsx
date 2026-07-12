import { DashboardView } from '../types';
import { Lightbulb, Info } from 'lucide-react';

export function RightSidebar({ activeView }: { activeView: DashboardView }) {
  return (
    <div className="hidden lg:block w-80 bg-white border-l border-gray-100 p-6 z-10 shadow-sm">
      <h3 className="font-semibold text-text-main mb-8 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-accent-blue" />
        Learning Insights
      </h3>

      <div className="mt-8 flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
          <Info className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-text-main mb-2">No lectures uploaded yet.</p>
        <p className="text-xs text-text-muted">Upload your first lecture to begin personalized clinical training.</p>
      </div>
    </div>
  );
}
