import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { DashboardView } from '../../types';
import { Activity, MessageSquare, BrainCircuit, AlertCircle, ChevronRight, ShieldCheck } from 'lucide-react';

export function ExaminerReport({ onViewChange }: { onViewChange: (view: DashboardView) => void }) {
    const [report, setReport] = useState<any>(null);

  useEffect(() => {

    const savedReport = localStorage.getItem(
      "examiner_report"
    );

    if (savedReport) {
      setReport(
        JSON.parse(savedReport)
      );
    }

  }, []);
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Header & Overall Score */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-[80px]" />
        
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-2">Performance Report</h1>
          <p className="text-text-muted text-lg max-w-xl">
            You performed well overall, but missed some critical questions to rule out life-threatening conditions.
          </p>
        </div>

        {/* Circular Gauge */}
        <div className="relative w-40 h-40 shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <path
              className="text-gray-100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <motion.path
              initial={{ strokeDasharray: "0, 100" }}
              animate={{
                strokeDasharray: `${report?.overall_score ?? 0}, 100`
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-success"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-text-main">
              {report?.overall_score ?? "--"}%
            </span>
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Overall</span>
          </div>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AssessmentCard 
          title="History Taking"
          score={`${report?.history_assessment?.score ?? "--"}%`}
          icon={<Activity className="w-5 h-5 text-accent-blue" />}
          strengths={report?.history_assessment?.asked_points ?? []}
          weaknesses={report?.history_assessment?.missed_points ?? []}
/>


        <AssessmentCard 
          title="Clinical Reasoning"
          score={`${report?.reasoning_assessment?.score ?? "--"}%`}
          icon={<BrainCircuit className="w-5 h-5 text-warning" />}
          strengths={report?.reasoning_assessment?.strengths ?? []}
          weaknesses={report?.reasoning_assessment?.weaknesses ?? []}
          isWarning
/>


        <AssessmentCard 
          title="Communication"
          score={`${report?.communication_assessment?.score ?? "--"}%`}
          icon={<MessageSquare className="w-5 h-5 text-success" />}
          strengths={report?.communication_assessment?.comments ?? []}
          weaknesses={[]}
          />
       
      </div>

      {/* Missed Clinical Points & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Missed Points */}
        <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-error" />
          <h3 className="font-semibold text-lg text-text-main mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-error" /> 
            Missed Critical Points
          </h3>
          <ul className="space-y-4">
            {report?.history_assessment?.missed_points?.map(
              (item:string, index:number)=>(
                <li 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <AlertCircle className="w-4 h-4 text-error mt-1"/>

                  <p className="text-sm text-text-muted">
                    {item}
                  </p>
                </li>
              )
            )}

          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-success" />
          <h3 className="font-semibold text-lg text-text-main mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-success" /> 
            Recommendations
          </h3>
          {report?.key_recommendations?.map(
            (item:string,index:number)=>(
              <li
                key={index}
                className="bg-green-50/50 p-4 rounded-xl border border-green-100"
              >
                <p className="font-medium text-text-main text-sm">
                  {item}
                </p>
              </li>
            )
          )}        </div>

      </div>

      {/* Generate Reinforcement CTA */}
      <div className="flex justify-end mt-8">
        <button 
          onClick={async () => {
          const sessionId = localStorage.getItem(
            "session_id"
          );
          
          const response = await fetch(
            "http://localhost:8000/generate-review",
            {
              method:"POST",
              headers:{
                "Content-Type":"application/json",
              },
              body:JSON.stringify({
                session_id: sessionId,
              }),
            }
          );


          const review = await response.json();

          localStorage.setItem(
              "review_session",
              JSON.stringify(review)
          );

          onViewChange("review");

          }}
          className="px-8 py-4 bg-text-main text-white font-medium rounded-2xl hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2 group"
        >
          Generate Review Session
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}

function AssessmentCard({ title, score, icon, strengths, weaknesses, isWarning = false }: any) {
  return (
    <div className={`bg-white rounded-2xl p-6 border ${isWarning ? 'border-warning/30 shadow-warning/5' : 'border-gray-100'} shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-semibold text-text-main">{title}</h3>
        </div>
        <span className={`font-bold text-lg ${isWarning ? 'text-warning' : 'text-text-main'}`}>{score}</span>
      </div>
      
      <div className="space-y-4 mt-6">
        {strengths.length > 0 && (
          <div>
            <p className="text-xs font-bold text-success uppercase tracking-wider mb-2">Strengths</p>
            <ul className="text-sm text-text-main space-y-1">
              {strengths.map((s: string, i: number) => (
                <li key={i} className="flex gap-2"><span className="text-success">✓</span> {s}</li>
              ))}
            </ul>
          </div>
        )}
        
        {weaknesses.length > 0 && (
          <div>
            <p className="text-xs font-bold text-error uppercase tracking-wider mb-2">Areas to Improve</p>
            <ul className="text-sm text-text-main space-y-1">
              {weaknesses.map((s: string, i: number) => (
                <li key={i} className="flex gap-2"><span className="text-error">!</span> {s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
