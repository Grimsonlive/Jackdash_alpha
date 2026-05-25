
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

interface SessionLog {
  id: string;
  timestamp: string;
  duration: number; // in seconds
  status: 'OK' | 'ERR';
}

const LiveAudioWidget: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState("Standby");
  const [history, setHistory] = useState<SessionLog[]>([]);
  const sessionStartRef = useRef<number | null>(null);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = async () => {
    setIsActive(true);
    setStatus("Connecting...");
    sessionStartRef.current = Date.now();
    
    try {
        // Minimal implementation for UI demo per guidelines
        // In a real scenario, this would initiate the WebRTC/WebSocket bridge
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        setStatus("Session Active: Listening");
    } catch (e) {
        setStatus("Error: Connection Failed");
        recordSession('ERR');
        setIsActive(false);
    }
  };

  const recordSession = (finalStatus: 'OK' | 'ERR') => {
    if (sessionStartRef.current) {
      const durationSeconds = Math.floor((Date.now() - sessionStartRef.current) / 1000);
      const newLog: SessionLog = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: durationSeconds,
        status: finalStatus
      };
      setHistory(prev => [newLog, ...prev].slice(0, 5)); // Keep last 5 sessions
      sessionStartRef.current = null;
    }
  };

  const stopSession = () => {
    recordSession('OK');
    setIsActive(false);
    setStatus("Standby");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
        {isActive && (
            <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
        )}
        
        <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-rose-500 animate-pulse' : 'bg-slate-700'}`}></div>
            <span className="text-[10px] mono text-slate-400 uppercase tracking-widest">{status}</span>
        </div>

        <button 
          onClick={isActive ? stopSession : startSession}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-rose-500 hover:bg-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 'bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_20px_rgba(77,235,255,0.4)]'}`}
        >
          {isActive ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
          ) : (
            <svg className="w-8 h-8 text-slate-900" fill="currentColor" viewBox="0 0 20 20"><path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z" /><path d="M3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM10 14a4.996 4.996 0 003.947-2H13a1 1 0 110-2h2a1 1 0 011 1v2a1 1 0 11-2 0v-1.294a6.994 6.994 0 01-11.947 0V13a1 1 0 11-2 0v-2a1 1 0 011-1h2a1 1 0 110 2h-.947A4.996 4.996 0 0010 14z" /></svg>
          )}
        </button>

        <p className="text-[10px] text-slate-500 text-center max-w-[200px] leading-relaxed">
            {isActive ? "Speak naturally. Gemini is processing your voice stream in real-time." : "Tap to initiate low-latency conversational bridge (MB2 Native Audio)."}
        </p>
      </div>

      {/* Session History Log */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg overflow-hidden">
        <div className="bg-slate-800/50 px-3 py-1.5 border-b border-slate-800 flex justify-between items-center">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Recent Logs</span>
            <span className="text-[8px] mono text-slate-600">MB2_DB_LINK</span>
        </div>
        <div className="max-h-24 overflow-y-auto scrollbar-hide">
            {history.length > 0 ? (
                history.map(log => (
                    <div key={log.id} className="px-3 py-2 border-b border-slate-800/50 flex justify-between items-center last:border-0 hover:bg-slate-800/20 transition-colors">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-slate-400 mono">{log.timestamp}</span>
                            <span className="text-[9px] font-bold text-slate-500">{formatDuration(log.duration)}</span>
                        </div>
                        <span className={`text-[9px] font-black mono ${log.status === 'OK' ? 'text-cyan-500' : 'text-rose-500'}`}>
                            {log.status}
                        </span>
                    </div>
                ))
            ) : (
                <div className="px-3 py-4 text-center">
                    <span className="text-[9px] text-slate-700 mono">NO RECENT ACTIVITY</span>
                </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
         <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 py-2 rounded text-[10px] font-bold text-slate-400 transition-colors uppercase">Full Archive</button>
         <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 py-2 rounded text-[10px] font-bold text-slate-400 transition-colors uppercase">Config Bridge</button>
      </div>
    </div>
  );
};

export default LiveAudioWidget;
