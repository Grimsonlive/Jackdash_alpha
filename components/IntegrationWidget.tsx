
import React, { useState } from 'react';
import { IntegrationStatus } from '../types';

interface IntegrationWidgetProps {
  integrations: IntegrationStatus[];
}

const IntegrationWidget: React.FC<IntegrationWidgetProps> = ({ integrations }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatusColor = (s: string) => {
    switch(s) {
        case 'OK': return 'bg-emerald-500 shadow-[0_0_8px_#10b981]';
        case 'WARN': return 'bg-amber-500 shadow-[0_0_8px_#f59e0b]';
        case 'ISSUE': return 'bg-rose-500 shadow-[0_0_8px_#f43f5e]';
        default: return 'bg-slate-500';
    }
  }

  const getErrorStyle = (s: string) => {
    switch(s) {
        case 'ISSUE': return 'border-rose-500/50 bg-rose-500/10 text-rose-200';
        case 'WARN': return 'border-amber-500/50 bg-amber-500/10 text-amber-200';
        default: return 'border-slate-700 bg-slate-950 text-slate-300';
    }
  }

  const getIconColor = (s: string) => {
    switch(s) {
        case 'ISSUE': return 'text-rose-400 hover:text-rose-300';
        case 'WARN': return 'text-amber-400 hover:text-amber-300';
        default: return 'text-slate-500 hover:text-cyan-400';
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {integrations.map(int => (
          <div key={int.service} className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 flex flex-col gap-1 relative group transition-all hover:bg-slate-900/60">
              <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">{int.service}</span>
                  <div className="flex items-center gap-2">
                    {(int.status === 'WARN' || int.status === 'ISSUE') && (
                      <button 
                        onClick={() => setExpandedId(expandedId === int.service ? null : int.service)}
                        className={`transition-all transform hover:scale-110 active:scale-95 ${getIconColor(int.status)}`}
                        title="View Status Details"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(int.status)} transition-all duration-500`}></div>
                  </div>
              </div>
              <span className="text-[8px] text-slate-500 mono font-medium">LAST SYNC: {int.last_ok_at}</span>
              
              {expandedId === int.service && int.error_message && (
                <div className={`absolute top-full left-0 right-0 z-30 mt-2 p-3 rounded-lg border shadow-2xl animate-in fade-in slide-in-from-top-1 duration-200 backdrop-blur-md ${getErrorStyle(int.status)}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-70">Diagnostic Note</span>
                    <button onClick={() => setExpandedId(null)} className="opacity-50 hover:opacity-100">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <p className="text-[10px] mono leading-snug font-medium italic">
                    "{int.error_message}"
                  </p>
                </div>
              )}
          </div>
        ))}
      </div>
      <button className="w-full mt-2 bg-slate-800/50 hover:bg-slate-700 text-[10px] py-2.5 rounded-lg text-slate-400 font-black tracking-[0.2em] border border-slate-700 transition-all uppercase active:scale-95">
        Run System Diagnostic
      </button>
    </div>
  );
};

export default IntegrationWidget;
