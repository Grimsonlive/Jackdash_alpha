
import React from 'react';
import { IntegrationStatus } from '../types';

interface IntegrationWidgetProps {
  integrations: IntegrationStatus[];
}

const IntegrationWidget: React.FC<IntegrationWidgetProps> = ({ integrations }) => {
  const getStatusColor = (s: string) => {
    switch(s) {
        case 'OK': return 'bg-emerald-500 shadow-[0_0_8px_#10b981]';
        case 'WARN': return 'bg-amber-500 shadow-[0_0_8px_#f59e0b]';
        case 'ISSUE': return 'bg-rose-500 shadow-[0_0_8px_#f43f5e]';
        default: return 'bg-slate-500';
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {integrations.map(int => (
        <div key={int.service} className="bg-slate-800/20 p-2 rounded-lg border border-slate-800/50 flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-300 font-bold uppercase">{int.service}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(int.status)}`}></div>
            </div>
            <span className="text-[8px] text-slate-500 mono">LAST OK: {int.last_ok_at}</span>
        </div>
      ))}
      <button className="col-span-2 mt-2 bg-slate-800 hover:bg-slate-700 text-[10px] py-1.5 rounded text-slate-400 font-bold tracking-widest border border-slate-700 transition-all">
        RUN SYSTEM DIAGNOSTIC (MB3)
      </button>
    </div>
  );
};

export default IntegrationWidget;
