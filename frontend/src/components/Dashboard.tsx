import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { DashboardView } from '../types';
import { Home } from './dashboard/Home';
import { LectureSummary } from './dashboard/LectureSummary';
import { PatientEncounter } from './dashboard/PatientEncounter';
import { ExaminerReport } from './dashboard/ExaminerReport';
import { ReinforcementSession } from './dashboard/ReinforcementSession';
import { FloatingStatus } from './FloatingStatus';
import { ReviewMCQ } from './dashboard/ReviewMCQ';
import { CustomStudy } from "./dashboard/CustomStudy";
import { Flashcards } from "./dashboard/Flashcards";
import { Progress } from "./dashboard/Progress";

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeView, setActiveView] = useState<DashboardView>('home');
  const [sessionState, setSessionState] = useState<'waiting' | 'analyzing' | 'preparing' | 'ready'>('waiting');

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FBFF]">
      {/* Left Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} onLogout={onLogout} />

      {/* Center Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative no-scrollbar">
        <main className="flex-1 p-8 pb-24">
          {activeView === 'home' && <Home onViewChange={setActiveView} sessionState={sessionState} setSessionState={setSessionState} />}
          {activeView === 'summary' && <LectureSummary />}
          {activeView === 'encounter' && <PatientEncounter onViewChange={setActiveView} />}
          {activeView === 'report' && <ExaminerReport onViewChange={setActiveView} />}
          {activeView === "flashcards" && (
              <Flashcards />
          )}
          {activeView === "custom-study" && (
              <CustomStudy
                  onViewChange={setActiveView}
               />
          )}
          {activeView === "progress" && (
              <Progress />
          )}
          {activeView === 'review' && (

              <ReinforcementSession
                  onViewChange={setActiveView}
              />

          )}

          {activeView === 'review-mcq' && (

              <ReviewMCQ
                  onViewChange={setActiveView}
              />

          )}
        </main>
        
        {/* Floating AI Status Card */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-80 z-50 mr-8">
          <FloatingStatus activeView={activeView} sessionState={sessionState} />
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar activeView={activeView} />
    </div>
  );
}
