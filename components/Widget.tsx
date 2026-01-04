
import React, { useState } from 'react';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  expandedContent?: React.ReactNode;
  icon?: React.ReactNode;
  statusColor?: string;
}

const Widget: React.FC<WidgetProps> = ({ title, children, expandedContent, icon, statusColor = 'bg-cyan-500' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md transition-all duration-300 hover:border-slate-700 ${isExpanded ? 'col-span-2 row-span-2' : ''} group overflow-hidden`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${statusColor} animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]`}></div>
          <span className="text-slate-400 p-1 group-hover:text-cyan-400 transition-colors">{icon}</span>
          <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-xs">{title}</h3>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-500 hover:text-white transition-colors text-xs font-medium px-2 py-1 rounded hover:bg-slate-800"
        >
          {isExpanded ? 'COMPACT' : 'EXPAND'}
        </button>
      </div>
      
      <div className="p-4 flex-1">
        {isExpanded && expandedContent ? expandedContent : children}
      </div>
    </div>
  );
};

export default Widget;
