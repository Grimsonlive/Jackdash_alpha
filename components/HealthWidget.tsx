
import React, { useState } from 'react';
import { HealthEntry } from '../types';

interface HealthWidgetProps {
  history: HealthEntry[];
  onCheckIn: (entry: HealthEntry) => void;
}

const HealthWidget: React.FC<HealthWidgetProps> = ({ history, onCheckIn }) => {
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [focus, setFocus] = useState(3);

  const handleSubmit = () => {
    onCheckIn({
      date: new Date().toISOString().split('T')[0],
      mood,
      energy,
      focus
    });
  };

  const getEmoji = (m: number) => {
    if (m === 1) return '🌑';
    if (m === 2) return '☁️';
    if (m === 3) return '⛅';
    if (m === 4) return '☀️';
    return '🔥';
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 mb-1">MOOD</span>
            <div className="flex gap-1">
                {[1,2,3,4,5].map(v => (
                    <button 
                        key={v}
                        onClick={() => setMood(v)}
                        className={`w-6 h-6 rounded text-xs transition-colors ${mood === v ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                    >
                        {v}
                    </button>
                ))}
            </div>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 mb-1">ENERGY</span>
            <div className="flex gap-1">
                {[1,2,3,4,5].map(v => (
                    <button 
                        key={v}
                        onClick={() => setEnergy(v)}
                        className={`w-6 h-6 rounded text-xs transition-colors ${energy === v ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                    >
                        {v}
                    </button>
                ))}
            </div>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 mb-1">FOCUS</span>
            <div className="flex gap-1">
                {[1,2,3,4,5].map(v => (
                    <button 
                        key={v}
                        onClick={() => setFocus(v)}
                        className={`w-6 h-6 rounded text-xs transition-colors ${focus === v ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                    >
                        {v}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <button 
        onClick={handleSubmit}
        className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg py-2 text-xs font-bold text-slate-200 transition-all active:scale-[0.98]"
      >
        CHECK-IN {getEmoji(mood)}
      </button>

      <div className="mt-4 pt-4 border-t border-slate-800">
         <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Weekly Pulse</h4>
         <div className="flex items-end gap-1 h-12">
            {history.slice(-7).map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-0.5">
                    <div className="bg-cyan-500/40 rounded-t w-full" style={{ height: `${h.mood * 20}%` }}></div>
                    <div className="bg-purple-500/40 w-full" style={{ height: `${h.energy * 20}%` }}></div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default HealthWidget;
