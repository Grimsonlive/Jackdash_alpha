
import React from 'react';
import { ClickUpTask } from '../types';

interface ClickUpWidgetProps {
  tasks: ClickUpTask[];
  onStatusChange: (id: string, status: ClickUpTask['status']) => void;
}

const ClickUpWidget: React.FC<ClickUpWidgetProps> = ({ tasks, onStatusChange }) => {
  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <div key={task.id} className="flex items-center justify-between p-3 bg-slate-800/20 rounded-lg border border-slate-800/50 hover:bg-slate-800/40 transition-colors">
          <div className="flex flex-col">
            <span className="text-sm text-slate-200 font-medium">{task.title}</span>
            <span className="text-[10px] text-slate-500 mono">DUE: {task.due_at}</span>
          </div>
          <div className="flex gap-2">
            <select 
              value={task.status} 
              onChange={(e) => onStatusChange(task.id, e.target.value as any)}
              className="bg-slate-900 text-[10px] text-slate-300 border border-slate-700 rounded px-1 py-0.5 outline-none focus:border-cyan-500"
            >
              <option value="in-progress">PROG</option>
              <option value="on-hold">HOLD</option>
              <option value="done">DONE</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClickUpWidget;
