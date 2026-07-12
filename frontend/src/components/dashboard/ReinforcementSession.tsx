import { motion } from 'motion/react';
import { Target, Zap, Clock, PlayCircle, Award } from 'lucide-react';

import { useEffect, useState } from "react";
import { useMemo } from "react";

import { DashboardView } from "../../types";

export function ReinforcementSession({
    onViewChange,
}:{
    onViewChange:(view:DashboardView)=>void;
}) {
  const review = useMemo(() => {

    const saved = localStorage.getItem(
        "review_session"
    );

    return saved
        ? JSON.parse(saved)
        : null;

}, []);

  const [report, setReport] = useState<any>(null);

  useEffect(() => {

    const savedReport = localStorage.getItem(
      "examiner_report"
    );

    if (savedReport) {
      setReport(JSON.parse(savedReport));
    }

  }, []);
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text-main mb-2">Personalized Learning Plan</h1>
        <p className="text-text-muted text-lg">
          Generated based on your recent performance in the Acute Chest Pain module.
        </p>
      </header>

      {/* Main Focus Card */}
      <div className="bg-primary text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl shadow-primary/20">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-[50px]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Today's Review
            </span>
            <span className="flex items-center gap-1 text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <Clock className="w-4 h-4" /> {review?.estimated_time_minutes} min
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {review?.session_title}
          </h2>

          <p className="text-primary-100 text-lg max-w-xl mb-8 opacity-90">
            {review?.why_this_session}
          </p>
          
          <button
            onClick={() => {
              onViewChange("review-mcq");
            }}
            className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-gray-50 transition-colors shadow-lg flex items-center gap-2"
          >
            <PlayCircle className="w-6 h-6" />
            Start Review Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Why This Matters */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-lg text-text-main mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent-blue" />
            Why This Matters
          </h3>
          <p className="text-text-muted leading-relaxed">
            {review?.why_this_session}
          </p>
        </div>

        {/* Rapid Fire Topics */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-lg text-text-main mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-warning" />
            Rapid Fire Preview
          </h3>
          <ul className="space-y-3">

          {review?.focus_topics?.map((topic: string, index: number) => (

          <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
              <span className="font-medium text-text-main text-sm">
                  {topic}
              </span>

          </li>

          ))}

          </ul>
        </div>
      </div>

      {/* Completion Goal */}
      <div className="bg-success/5 border border-success/20 rounded-2xl p-6 flex items-center gap-6">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center shrink-0">
          <Award className="w-8 h-8 text-success" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-text-main">Mini-Case Goal</h3>
          <p className="text-text-muted">Successfully identify the hidden Aortic Dissection in a 5-minute rapid patient encounter to earn the "Diagnostic Broadener" badge.</p>
        </div>
      </div>

    </div>
  );
}
