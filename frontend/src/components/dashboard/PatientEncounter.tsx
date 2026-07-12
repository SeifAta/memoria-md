import { motion } from 'motion/react';
import { Send, Mic, Stethoscope, Lightbulb, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DashboardView } from '../../types';

export function PatientEncounter({ onViewChange }: { onViewChange: (view: DashboardView) => void }) {
  const [patientCase, setPatientCase] = useState<any>(null);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);

  useEffect(() => {
    const savedCase = localStorage.getItem("patient_case");
    const savedSession = localStorage.getItem("session_id");
    if (savedSession) {

    setSessionId(savedSession);

}
    if (savedCase) {
      try {
        const parsed = JSON.parse(savedCase);
        setPatientCase(parsed);
        setMessages([
          { role: 'system', content: 'Simulation started. The patient is ready.' },
          { role: 'patient', content: parsed.history?.opening_statement || 'Hello doctor...' }
        ]);
      } catch (e) {
        console.error("Failed to parse patient case", e);
      }
    }
  }, []);

  if (!patientCase) {
    return (
      <div className="h-full flex flex-col items-center justify-center max-w-5xl mx-auto animate-in fade-in duration-700">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-text-main mb-2">No patient case loaded.</p>
          <p className="text-text-muted">Please upload a lecture first.</p>
          <button 
            onClick={() => onViewChange('home')}
            className="mt-6 px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Go back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSend = async (text: string) => {
    console.log("handleSend called");
    console.log("text:", text);
    console.log("sessionId:", sessionId);
    console.log("isTyping:", isTyping);
    
    if (
      !text.trim() ||
      isTyping ||
      !sessionId
    ) {
      console.log("Returning early");
      return;
    }
    
    console.log("Passed guard");
  
    setMessages(prev => [...prev, { role: 'student', content: text }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8000/patient-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          session_id: sessionId,
          question: text
        })
      });

      if (!res.ok) throw new Error("Backend Error");

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'patient', content: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'system', content: 'Connection to backend failed.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto animate-in fade-in duration-700 relative">
      {/* Patient Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-md relative">
            <img 
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=150&q=80" 
              alt="Patient"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-main">{patientCase.patient?.name || "Patient"}</h2>
            <p className="text-text-muted text-sm"> Clinical Encounter • {patientCase.metadata?.title} </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
  onClick={async () => {

    console.log("END ENCOUNTER CLICKED");

    const id = localStorage.getItem("session_id");

    console.log("USING SESSION:", id);


    if (!id) {
      alert("No session ID found");
      return;
    }


    try {

      const response = await fetch(
        "http://localhost:8000/end-encounter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: id,
          }),
        }
      );


      console.log(
        "STATUS:",
        response.status
      );


      const report = await response.json();


      console.log(
        "REPORT:",
        report
      );


      localStorage.setItem(
        "examiner_report",
        JSON.stringify(report)
      );


      onViewChange("report");


    } catch (error) {

      console.error(
        "EXAMINER ERROR:",
        error
      );

      alert(
        "Examiner request failed"
      );

    }

  }}
  className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors text-sm"
>
  End Encounter
</button>
            
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'student' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}>
              {msg.role === 'system' ? (
                <span className="text-xs font-medium text-text-muted bg-gray-100 px-3 py-1 rounded-full">
                  {msg.content}
                </span>
              ) : (
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'student' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'patient' ? 'bg-gray-200 overflow-hidden' : 'bg-primary text-white'}`}>
                    {msg.role === 'patient' ? (
                      <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=150&q=80" alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Stethoscope className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    msg.role === 'student' 
                      ? 'bg-primary text-white rounded-tr-sm shadow-md shadow-primary/10' 
                      : 'bg-white border border-gray-100 text-text-main rounded-tl-sm shadow-sm'
                  }`}>
                    <p className="text-[15px] leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=150&q=80" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-100 rounded-tl-sm shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setShowHintModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-accent-blue/10 text-primary hover:bg-accent-blue/20 rounded-full text-sm font-medium transition-colors border border-primary/10"
            >
              <Lightbulb className="w-4 h-4" />
              Hint
            </button>
          </div>
          
          <div className="flex items-end gap-3 relative">
            <div className="relative flex-1 group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                disabled={isTyping}
                placeholder="Ask the patient..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
                rows={1}
                style={{ minHeight: '56px', maxHeight: '120px' }}
              />
              <button 
                className="absolute right-3 bottom-3 p-2 text-gray-400 hover:text-primary transition-colors group"
                title="Coming Soon"
                disabled={isTyping}
              >
                <Mic className="w-5 h-5" />
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Voice Coming Soon
                </div>
              </button>
            </div>
            
            <button 
              onClick={() => {
                console.log("Button clicked");
                handleSend(input);
}}
              disabled={!input.trim() || isTyping}
              className="h-[56px] w-[56px] bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20 shrink-0"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-main/20 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full relative"
          >
            <button 
              onClick={() => setShowHintModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-text-main"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-accent-blue/10 text-primary rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text-main mb-2">Hint system coming soon.</h3>
            <p className="text-text-muted text-sm">
              This will use your examiner score and conversation history to provide adaptive hints.
            </p>
            <button 
              onClick={() => setShowHintModal(false)}
              className="w-full mt-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-text-main font-medium rounded-xl transition-colors"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
