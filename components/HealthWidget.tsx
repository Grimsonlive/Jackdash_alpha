
import React, { useState } from 'react';
import { HealthEntry } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
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

  // Format history for the chart: ensure dates are readable and take the last 7 entries
  const chartData = history.slice(-7).map(entry => ({
    ...entry,
    // Just use a short date format if not already short
    displayDate: entry.date.length > 6 ? new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : entry.date
  }));

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 mb-1 font-bold uppercase tracking-widest">Mood</span>
            <div className="flex gap-1">
                {[1,2,3,4,5].map(v => (
                    <button 
                        key={v}
                        onClick={() => setMood(v)}
                        className={`w-6 h-6 rounded text-[10px] transition-all ${mood === v ? 'bg-cyan-500 text-white shadow-[0_0_8px_rgba(77,235,255,0.4)]' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                    >
                        {v}
                    </button>
                ))}
            </div>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 mb-1 font-bold uppercase tracking-widest">Energy</span>
            <div className="flex gap-1">
                {[1,2,3,4,5].map(v => (
                    <button 
                        key={v}
                        onClick={() => setEnergy(v)}
                        className={`w-6 h-6 rounded text-[10px] transition-all ${energy === v ? 'bg-purple-500 text-white shadow-[0_0_8px_rgba(168,85,247,0.4)]' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                    >
                        {v}
                    </button>
                ))}
            </div>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 mb-1 font-bold uppercase tracking-widest">Focus</span>
            <div className="flex gap-1">
                {[1,2,3,4,5].map(v => (
                    <button 
                        key={v}
                        onClick={() => setFocus(v)}
                        className={`w-6 h-6 rounded text-[10px] transition-all ${focus === v ? 'bg-emerald-500 text-white shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                    >
                        {v}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <button 
        onClick={handleSubmit}
        className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg py-2.5 text-[10px] font-black text-slate-200 transition-all active:scale-[0.98] uppercase tracking-[0.2em]"
      >
        Sync Biometrics {getEmoji(mood)}
      </button>

      <div className="flex-1 min-h-[160px] mt-2 flex flex-col">
         <h4 className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] mb-4">Neural Trends (7D)</h4>
         <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="displayDate" 
                  stroke="#475569" 
                  fontSize={8} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10}
                />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 3, 5]} 
                  stroke="#475569" 
                  fontSize={8} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px', color: '#f8fafc' }}
                  itemStyle={{ fontSize: '10px', padding: '2px 0' }}
                />
                <Legend 
                  iconType="circle" 
                  verticalAlign="top" 
                  align="right" 
                  wrapperStyle={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '1px', paddingBottom: '10px' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#22d3ee" 
                  strokeWidth={2} 
                  dot={{ fill: '#22d3ee', r: 2 }} 
                  activeDot={{ r: 4, stroke: '#22d3ee', strokeWidth: 2 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#a855f7" 
                  strokeWidth={2} 
                  dot={{ fill: '#a855f7', r: 2 }} 
                  activeDot={{ r: 4, stroke: '#a855f7', strokeWidth: 2 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="focus" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={{ fill: '#10b981', r: 2 }} 
                  activeDot={{ r: 4, stroke: '#10b981', strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
};

export default HealthWidget;
