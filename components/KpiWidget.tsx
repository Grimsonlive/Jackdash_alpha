
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', revenue: 400, ctr: 4.5 },
  { name: 'Tue', revenue: 300, ctr: 3.2 },
  { name: 'Wed', revenue: 600, ctr: 5.1 },
  { name: 'Thu', revenue: 800, ctr: 7.3 },
  { name: 'Fri', revenue: 500, ctr: 4.8 },
  { name: 'Sat', revenue: 900, ctr: 8.2 },
  { name: 'Sun', revenue: 1100, ctr: 9.5 },
];

const KpiWidget: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase mono">Revenue (7d)</p>
            <p className="text-xl font-bold text-emerald-400">$4,600</p>
        </div>
        <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase mono">Avg CTR</p>
            <p className="text-xl font-bold text-cyan-400">6.1%</p>
        </div>
      </div>
      
      <div className="flex-1 min-h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '10px' }}
              itemStyle={{ color: '#22d3ee' }}
            />
            <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.revenue > 700 ? '#22d3ee' : '#1e293b'} className="hover:fill-cyan-400 transition-colors" />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KpiWidget;
