
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const VisionWidget: React.FC = () => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async (file: File) => {
    setLoading(true);
    setAnalysis("Initiating Gemini 3 Pro Vision Protocol...");
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: {
            parts: [
              { inlineData: { data: base64Data, mimeType: file.type } },
              { text: "Analyze this asset for creative potential, technical errors, and metadata tags." }
            ]
          }
        });
        setAnalysis(response.text || "Analysis complete. No significant anomalies detected.");
      } catch (e) {
        setAnalysis("Connection to Vision Cluster failed.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      handleAnalyze(file);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full aspect-video bg-slate-900/50 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group"
      >
        {preview ? (
          <img src={preview} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-slate-700 group-hover:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Upload Asset (IMG/VID)</span>
          </div>
        )}
        <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept="image/*,video/*" />
      </div>

      <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg min-h-[100px] flex flex-col">
        <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-black text-cyan-400 tracking-widest uppercase">Analysis Log</span>
            {loading && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>}
        </div>
        <p className="text-[10px] text-slate-300 mono leading-relaxed">
            {analysis || "Awaiting target input..."}
        </p>
      </div>
    </div>
  );
};

export default VisionWidget;
