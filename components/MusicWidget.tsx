
import React, { useState } from 'react';
import { MusicProject, ProjectStatus } from '../types';
import { generateNextStep } from '../services/geminiService';

interface MusicWidgetProps {
  projects: MusicProject[];
}

const MusicWidget: React.FC<MusicWidgetProps> = ({ projects }) => {
  const [aiStep, setAiStep] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNextStep = async (p: MusicProject) => {
    setLoading(true);
    try {
      const step = await generateNextStep('Music Production', p.status);
      setAiStep(step);
    } catch (e) {
      setAiStep("Review current project files.");
    } finally {
      setLoading(false);
    }
  };

  const CompactView = () => (
    <div className="space-y-4">
      {projects.map(p => (
        <div key={p.id} className="bg-slate-800/30 p-3 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-200">{p.name}</span>
            <span className="text-[10px] text-cyan-400 mono">{p.status}</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-cyan-500 h-full rounded-full transition-all duration-500 animate-pulse-soft" 
              style={{ width: `${p.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ExpandedView = () => (
    <div className="space-y-6 h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p => (
          <div key={p.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-slate-100">{p.name}</h4>
              <p className="text-xs text-slate-400 mb-4">{p.album}</p>
              
              <div className="space-y-3">
                {['Recording', 'Mixing', 'Mastering'].map((stage, idx) => (
                  <div key={stage} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full border ${p.progress > (idx * 33) ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_5px_cyan]' : 'border-slate-600'}`}></div>
                    <span className={`text-xs ${p.progress > (idx * 33) ? 'text-slate-200' : 'text-slate-500'}`}>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-xs py-2 rounded font-medium transition-colors">
                OPEN CLICKUP
              </button>
              <button 
                onClick={() => handleNextStep(p)}
                disabled={loading}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs py-2 rounded font-bold transition-all disabled:opacity-50"
              >
                {loading ? 'THINKING...' : 'AI NEXT STEP'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {aiStep && (
        <div className="mt-auto p-4 bg-cyan-950/30 border border-cyan-900/50 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="text-[10px] uppercase text-cyan-400 font-bold mb-1 mono">Gemini MB2 Suggestions</p>
          <p className="text-sm text-cyan-100 italic">"{aiStep}"</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full">
      {/* We let the parent Widget handle the state, but we provide internal views */}
      {/* For this logic, we use props but could also use state if passed down */}
    </div>
  );
};

export default MusicWidget;
