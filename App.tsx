import React, { useState } from 'react';
import { Camera, Film, Globe, ChevronRight, Play, BookOpen, GraduationCap, Music, Lock, LayoutDashboard, CheckSquare, Server, LogOut } from 'lucide-react';

const App = () => {
  const [activeSkaldvegTab, setActiveSkaldvegTab] = useState('sagaworks');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication State
  const [activeAdminPanel, setActiveAdminPanel] = useState('dashboard');

  const skaldvegContent = {
    sagaworks: {
      title: 'Sagaworks',
      description: 'The core of our narrative engine. We forge epic tales, drawing from historical depths and dark fantasy, crafting scripts and world-building bibles for our most ambitious visual projects.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1600&ar=16:9',
      icon: <BookOpen className="w-6 h-6" />
    },
    music: {
      title: 'Music',
      description: 'Authentic sonic landscapes. From visceral acoustic folk instruments to sweeping cinematic orchestral arrangements, we compose the lifeblood of the Skaldveg universe.',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1600&ar=16:9',
      icon: <Music className="w-6 h-6" />
    },
    edu: {
      title: 'EDU',
      description: 'Passing the torch. Masterclasses in historical research, narrative design, and cinematic production techniques tailored for the next generation of visual storytellers.',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1600&ar=16:9',
      icon: <GraduationCap className="w-6 h-6" />
    }
  };

  // --- INTERNAL CONTROL PANEL WING ---
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-[#A0A0A0] font-sans flex flex-col relative overflow-hidden selection:bg-[#E07D00] selection:text-black">
        {/* Architectural Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>
        
        {/* Top Navigation Bar - Minimalist HUD Style */}
        <nav className="relative z-10 w-full border-b border-white/10 bg-black/80 backdrop-blur-md flex items-center justify-between px-8 h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#E07D00] animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.3em] text-white">GGOS</span>
            </div>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="flex items-center gap-6">
              {[
                { id: 'dashboard', label: 'CMD CENTER' },
                { id: 'tasks', label: 'PRODUCTION' },
                { id: 'assets', label: 'VAULT' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveAdminPanel(item.id)}
                  className={`text-xs tracking-[0.2em] transition-colors ${
                    activeAdminPanel === item.id 
                    ? 'text-[#E07D00]' 
                    : 'text-[#606060] hover:text-[#C0C0C0]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-[10px] tracking-[0.2em] text-[#404040] uppercase hidden md:block">
              Auth: Workspace // SYS.NOMINAL
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 text-xs tracking-[0.2em] text-[#606060] hover:text-[#DA183F] transition-colors"
            >
              <span>TERMINATE</span>
              <LogOut size={14} />
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 p-8 md:p-16 overflow-y-auto">
          <header className="mb-16 flex justify-between items-end border-b border-white/10 pb-4">
            <div>
              <h1 className="text-3xl font-light tracking-[0.3em] text-white uppercase">
                {activeAdminPanel.replace('-', ' ')}
              </h1>
            </div>
            <div className="text-right text-xs tracking-[0.2em] text-[#606060]">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
            </div>
          </header>

          {activeAdminPanel === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
              {/* Cinematic Dash Cards - Zero Border Radius, Hairline separators */}
              <div className="bg-black p-8 relative group hover:bg-[#050505] transition-colors">
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#E07D00]"></div>
                <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#E07D00]"></div>
                <h3 className="text-[#606060] text-xs tracking-[0.2em] uppercase mb-6">Active Render Nodes</h3>
                <p className="text-5xl font-light text-[#C0C0C0]">03</p>
                <p className="text-[10px] tracking-widest text-green-500/70 mt-4 uppercase">Status: Optimal</p>
              </div>
              <div className="bg-black p-8 relative group hover:bg-[#050505] transition-colors">
                <h3 className="text-[#606060] text-xs tracking-[0.2em] uppercase mb-6">Pending Operations</h3>
                <p className="text-5xl font-light text-[#C0C0C0]">12</p>
                <p className="text-[10px] tracking-widest text-[#E07D00]/70 mt-4 uppercase">Requires Attention</p>
              </div>
              <div className="bg-black p-8 relative group hover:bg-[#050505] transition-colors">
                <h3 className="text-[#606060] text-xs tracking-[0.2em] uppercase mb-6">Vault Capacity</h3>
                <p className="text-5xl font-light text-[#C0C0C0]">74%</p>
                <p className="text-[10px] tracking-widest text-[#606060] mt-4 uppercase">8.2 TB Available</p>
              </div>
            </div>
          )}

          {activeAdminPanel !== 'dashboard' && (
            <div className="h-[400px] flex items-center justify-center border border-white/5 bg-black/50">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                  <div className="w-2 h-2 bg-[#E07D00]/50"></div>
                </div>
                <p className="text-[#404040] tracking-[0.3em] uppercase text-xs">
                  [ MODULE AWAITING REPLIT INTEGRATION ]
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // --- PUBLIC WING (Landing Page) ---
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-[#E07D00] selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-[#050B14]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Minimalist Logo Representation */}
            <div className="w-8 h-8 border border-[#C0C0C0] transform rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#C0C0C0]"></div>
            </div>
            <span className="text-xl font-bold tracking-[0.2em] text-[#C0C0C0]">GRIMSON</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm tracking-widest uppercase">
            <a href="#home" className="hover:text-[#E07D00] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#E07D00] transition-colors">About</a>
            <a href="#skaldveg" className="hover:text-[#8A111C] transition-colors">Skaldveg</a>
            <a href="#contact" className="hover:text-[#E07D00] transition-colors">Contact</a>
            
            {/* Portal Access Button */}
            <button 
              onClick={() => setIsAuthenticated(true)}
              className="flex items-center gap-2 ml-4 px-4 py-2 border border-white/10 hover:border-[#E07D00] hover:text-[#E07D00] transition-colors rounded-sm"
              title="Staff Portal Login"
            >
              <Lock size={14} />
              <span>Portal</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Grimson Productions */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618335835694-f06b4b04910e?auto=format&fit=crop&q=80&w=2560&ar=16:9" 
            alt="Futuristic studio setup" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B14]/80 to-[#050B14]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <h2 className="text-[#E07D00] tracking-[0.3em] text-sm md:text-base mb-6 uppercase">Optical Odyssey</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
            THE FUTURE OF <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-[#E07D00]">
              VISUAL STORYTELLING
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Experience pioneering immersive visual technology with unparalleled clarity. We do not just capture light; we architect realities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-8 py-4 bg-[#E07D00] text-[#050B14] font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" /> Watch Latest Reel
            </button>
            <button className="px-8 py-4 border border-[#C0C0C0]/30 text-[#C0C0C0] font-bold tracking-widest uppercase text-sm hover:border-[#C0C0C0] transition-colors">
              Explore Our Tech
            </button>
          </div>
        </div>
      </section>

      {/* Core Focus - Grimson */}
      <section id="about" className="py-24 relative bg-[#050B14]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Film className="w-8 h-8 text-[#C0C0C0]" />, title: "Cinematic Production", desc: "End-to-end production leveraging state-of-the-art volumetric capture and high-fidelity rendering." },
              { icon: <Camera className="w-8 h-8 text-[#C0C0C0]" />, title: "Visual Engineering", desc: "Custom lens matrices and lighting rigs designed in-house to achieve our signature optical depth." },
              { icon: <Globe className="w-8 h-8 text-[#C0C0C0]" />, title: "Immersive Worlds", desc: "Building living, breathing digital environments for cross-platform narrative experiences." }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skaldveg Subdivision Section */}
      <section id="skaldveg" className="relative py-32 bg-[#121110] border-t border-[#8A111C]/30">
        {/* Background Ambience for Skaldveg */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521105990264-cb4785db49b5?auto=format&fit=crop&q=80&w=2560&ar=16:9" 
            alt="Misty Nordic Fjord" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-[#121110]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-20 text-center">
            {/* Skaldveg Logo Element Placeholder */}
            <div className="w-16 h-16 rounded-full border-2 border-[#8A111C] flex items-center justify-center mb-6">
               <div className="w-8 h-8 rounded-full border border-[#D3C5B5] flex items-center justify-center">
                 <div className="w-2 h-2 bg-[#D3C5B5] rounded-full"></div>
               </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#D3C5B5] tracking-widest uppercase mb-4">
              SKALDVEG
            </h2>
            <p className="text-[#8B9B7B] tracking-widest uppercase text-sm mb-8">A Grimson Productions Original IP</p>
            <p className="max-w-3xl text-[#A09A90] leading-relaxed font-serif text-lg">
              The sages tell of brave hearts, epic voyages, and enduring prose. Skaldveg is our premier collective universe, built upon three foundational pillars: narrative forging, authentic sonic landscapes, and cinematic education.
            </p>
          </div>

          {/* Interactive Subdivisions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              {Object.keys(skaldvegContent).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveSkaldvegTab(key)}
                  className={`flex items-center justify-between p-6 w-full text-left transition-all border-l-4 ${
                    activeSkaldvegTab === key 
                    ? 'border-[#8A111C] bg-[#1C1C1C] text-[#D3C5B5]' 
                    : 'border-transparent bg-transparent text-[#6B655D] hover:text-[#D3C5B5] hover:bg-[#1C1C1C]/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {skaldvegContent[key as keyof typeof skaldvegContent].icon}
                    <span className="font-serif tracking-widest text-lg uppercase">{skaldvegContent[key as keyof typeof skaldvegContent].title}</span>
                  </div>
                  {activeSkaldvegTab === key && <ChevronRight className="w-5 h-5 text-[#8A111C]" />}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="lg:col-span-8">
              <div className="bg-[#1C1C1C] border border-white/5 p-2 rounded-sm shadow-2xl">
                <div className="relative aspect-video w-full overflow-hidden bg-black mb-8">
                  <img 
                    src={skaldvegContent[activeSkaldvegTab as keyof typeof skaldvegContent].image} 
                    alt={skaldvegContent[activeSkaldvegTab as keyof typeof skaldvegContent].title}
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                </div>
                <div className="px-8 pb-10">
                  <h3 className="text-3xl font-serif text-[#D3C5B5] uppercase tracking-widest mb-4">
                    {skaldvegContent[activeSkaldvegTab as keyof typeof skaldvegContent].title}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#8A111C] mb-6"></div>
                  <p className="text-[#A09A90] font-serif leading-relaxed text-lg max-w-2xl">
                    {skaldvegContent[activeSkaldvegTab as keyof typeof skaldvegContent].description}
                  </p>
                  <button className="mt-8 tracking-widest uppercase text-sm text-[#8B9B7B] hover:text-[#D3C5B5] transition-colors flex items-center gap-2">
                    Enter {skaldvegContent[activeSkaldvegTab as keyof typeof skaldvegContent].title} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
             <span className="text-lg font-bold tracking-[0.2em] text-[#555]">GRIMSON</span>
          </div>
          <div className="text-[#555] text-sm tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Grimson Productions. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
