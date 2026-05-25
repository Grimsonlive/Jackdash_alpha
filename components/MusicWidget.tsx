
import React, { useState } from 'react';
import { MusicProject, ProjectStatus } from '../types';
import { GoogleGenAI, Modality } from "@google/genai";

interface MusicWidgetProps {
  projects: MusicProject[];
}

const MusicWidget: React.FC<MusicWidgetProps> = ({ projects }) => {
  const [loading, setLoading] = useState(false);

  const handleSpeak = async (p: MusicProject) => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const text = `Update on ${p.name}. Currently in ${p.status} phase with ${p.progress} percent completion. Produced by ${p.producer || 'Standard AI'}.`;
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say naturally: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
      });
      
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) {
          channelData[i] = dataInt16[i] / 32768.0;
        }
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
      }
    } catch (e) {
      console.error("TTS Cluster failure", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {projects.map(p => (
        <div key={p.id} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex flex-col gap-3 group">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-black text-slate-200 uppercase tracking-tight">{p.name}</h4>
              <p className="text-[10px] text-slate-500 font-bold">{p.producer || 'Standard Mix'}</p>
            </div>
            <div className="flex gap-2">
                <button 
                  onClick={() => handleSpeak(p)}
                  disabled={loading}
                  className="p-1.5 bg-slate-800 hover:bg-cyan-500/20 rounded-md transition-all text-slate-500 hover:text-cyan-400 border border-slate-700"
                  title="Speak Status"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                </button>
            </div>
          </div>
          
          <div className="flex items-end gap-[2px] h-8 px-1">
             {[0.4, 0.7, 0.5, 0.9, 0.8, 0.6, 0.4, 0.7, 0.3, 0.5, 0.8, 0.6, 0.9, 0.4, 0.5].map((h, i) => (
                <div key={i} className="flex-1 bg-cyan-500/30 rounded-full" style={{ height: `${h * 100}%` }}></div>
             ))}
          </div>

          <div className="flex justify-between items-center text-[9px] mono uppercase">
            <span className="text-cyan-400 font-bold">{p.status}</span>
            <span className="text-slate-600">{p.progress}%</span>
          </div>
          
          <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full neon-glow-cyan shadow-sm transition-all" style={{ width: `${p.progress}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicWidget;
