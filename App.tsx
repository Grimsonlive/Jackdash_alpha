
import React, { useState, useEffect } from 'react';
import { WidgetType, MusicProject, ProjectStatus, ClickUpTask, HealthEntry, IntegrationStatus } from './types';
import Widget from './components/Widget';
import MusicWidget from './components/MusicWidget';
import ClickUpWidget from './components/ClickUpWidget';
import HealthWidget from './components/HealthWidget';
import KpiWidget from './components/KpiWidget';
import IntegrationWidget from './components/IntegrationWidget';
import { generateSunoPrompt } from './services/geminiService';

const INITIAL_MUSIC: MusicProject[] = [
  { id: '1', name: 'Sjóvíkingar', album: 'Skaldveg-DNA', status: ProjectStatus.MIXING, progress: 65 },
  { id: '2', name: 'Reidartýr', album: 'Skaldveg-DNA', status: ProjectStatus.RECORDING, progress: 20 },
  { id: '3', name: 'Eplegæta', album: 'Skaldveg-DNA', status: ProjectStatus.MASTERING, progress: 90 },
];

const INITIAL_TASKS: ClickUpTask[] = [
  { id: 't1', title: 'VEO shotlist generation', status: 'in-progress', due_at: '2023-11-20' },
  { id: 't2', title: 'ElevenLabs voice training', status: 'on-hold', due_at: '2023-11-22' },
  { id: 't3', title: 'YouTube thumbnail design', status: 'done', due_at: '2023-11-18' },
];

const INITIAL_HEALTH: HealthEntry[] = [
  { date: '2023-11-10', mood: 4, energy: 3, focus: 5 },
  { date: '2023-11-11', mood: 3, energy: 2, focus: 4 },
  { date: '2023-11-12', mood: 5, energy: 5, focus: 5 },
];

const INITIAL_INTEGRATIONS: IntegrationStatus[] = [
  { service: 'SUNO', status: 'OK', last_ok_at: '2m ago' },
  { service: 'CLICKUP', status: 'OK', last_ok_at: 'Now' },
  { service: 'GOOGLE DRIVE', status: 'WARN', last_ok_at: '1h ago' },
  { service: 'YOUTUBE', status: 'OK', last_ok_at: '5m ago' },
];

const App: React.FC = () => {
  const [music, setMusic] = useState(INITIAL_MUSIC);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [health, setHealth] = useState(INITIAL_HEALTH);
  const [integrations] = useState(INITIAL_INTEGRATIONS);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [skillOutput, setSkillOutput] = useState("");

  const runSkill = async (skillId: string) => {
    setActiveSkill(skillId);
    setSkillOutput("Running skill process...");
    
    if (skillId === 'FER_101') {
        const prompt = await generateSunoPrompt("Nordic Electronic", "Melancholy yet powerful");
        setSkillOutput(`Suno Prompt: ${prompt}`);
    } else {
        setTimeout(() => {
            setSkillOutput(`${skillId} execution recorded in MB3 log.`);
        }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Skills & MB-Kobling */}
      <aside className="w-full md:w-64 border-r border-slate-800 bg-slate-900/80 p-6 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-slate-900">MB</div>
            <h1 className="text-xl font-bold tracking-tighter text-white">SKALDVEG <span className="text-cyan-400">V1</span></h1>
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-4">MB2 Skills</h2>
              <div className="space-y-2">
                {[
                  { id: 'FER_101', name: 'Suno Prompting' },
                  { id: 'FER_103', name: 'Runway Gen4' },
                  { id: 'FER_104', name: 'Mastering SOP' },
                  { id: 'FER_105', name: 'Prompt-Bridge' }
                ].map(skill => (
                  <button 
                    key={skill.id}
                    onClick={() => runSkill(skill.id)}
                    className="w-full text-left p-2 rounded-md hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all group flex items-center justify-between"
                  >
                    <span className="text-xs text-slate-300 group-hover:text-cyan-400">{skill.name}</span>
                    <span className="text-[8px] text-slate-600 mono">{skill.id}</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-4">Gamification</h2>
              <div className="flex flex-wrap gap-2">
                <div className="w-10 h-10 rounded-full bg-cyan-900/20 border border-cyan-500/50 flex items-center justify-center text-lg grayscale-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]" title="Master of Music">🎵</div>
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg grayscale" title="Flow Keeper">🌊</div>
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg grayscale" title="Visual Creator">🎨</div>
              </div>
            </section>
          </div>
        </div>

        {activeSkill && (
            <div className="mt-auto p-3 bg-slate-950 rounded border border-slate-800 text-[10px] mono text-cyan-300">
                <p className="mb-2 text-slate-500">{activeSkill}_TERMINAL:</p>
                <p>{skillOutput}</p>
                <button onClick={() => setActiveSkill(null)} className="mt-2 text-slate-600 hover:text-white underline">CLOSE</button>
            </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Main Dashboard</h2>
            <p className="text-slate-500 text-sm">MB3 Reflection Cycle: <span className="text-cyan-400">29.09.2025</span></p>
          </div>
          <div className="flex gap-4">
             <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
                <span className="text-[10px] text-slate-500 block uppercase mono">Helse Puls</span>
                <span className="text-cyan-400 font-bold">Stable (84%)</span>
             </div>
             <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 rounded-lg font-bold text-sm shadow-lg shadow-cyan-900/20 transition-all">
                + NEW PROJECT
             </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Widget 
            title="Music Production" 
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>}
            expandedContent={<MusicWidget projects={music} />}
          >
            <MusicWidget projects={music} />
          </Widget>

          <Widget 
            title="ClickUp Tasks" 
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          >
            <ClickUpWidget 
              tasks={tasks} 
              onStatusChange={(id, status) => setTasks(tks => tks.map(t => t.id === id ? {...t, status} : t))} 
            />
          </Widget>

          <Widget 
            title="KPI / Economy" 
            statusColor="bg-emerald-400"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          >
            <KpiWidget />
          </Widget>

          <Widget 
            title="Mental Health" 
            statusColor="bg-purple-400"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
          >
            <HealthWidget 
              history={health} 
              onCheckIn={(e) => setHealth(prev => [...prev, e])} 
            />
          </Widget>

          <Widget 
            title="Integrations" 
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          >
            <IntegrationWidget integrations={integrations} />
          </Widget>

          <Widget 
            title="Creative Projects" 
            statusColor="bg-amber-400"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
          >
            <div className="space-y-4">
                <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-300 font-bold">Project: 3D Ring Design</span>
                    <div className="flex gap-2 mt-2">
                        <span className="bg-slate-900 text-[8px] px-2 py-0.5 rounded text-amber-400 border border-amber-900/50">Silver</span>
                        <span className="bg-slate-900 text-[8px] px-2 py-0.5 rounded text-amber-400 border border-amber-900/50">LoRA-Kit</span>
                    </div>
                </div>
                <button className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-[10px] py-2 rounded font-black border border-amber-500/30 transition-all uppercase tracking-widest">
                    GET AI INSPIRATION FEED
                </button>
            </div>
          </Widget>
        </div>
      </main>
    </div>
  );
};

export default App;
