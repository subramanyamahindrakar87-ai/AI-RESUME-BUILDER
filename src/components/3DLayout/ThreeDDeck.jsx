import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Layers, UserCheck, Sparkles, Globe, Edit3, Compass, Layout } from 'lucide-react';

export const ThreeDDeck = ({ activeView, setActiveView, children }) => {
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const views = [
    { id: 'portfolio', label: '1. Portfolio Webpage', icon: Globe, desc: 'Live 3D Personal Webpage' },
    { id: 'builder', label: '2. Resume Builder', icon: Edit3, desc: 'Interactive AI Form & Customizer' },
    { id: 'landing', label: '3. Feature Showcase', icon: Compass, desc: 'Full Platform Overview' }
  ];

  const currentIdx = views.findIndex(v => v.id === activeView);

  const handleNextSlide = () => {
    setDirection('next');
    const nextIdx = (currentIdx + 1) % views.length;
    setActiveView(views[nextIdx].id);
  };

  const handlePrevSlide = () => {
    setDirection('prev');
    const prevIdx = (currentIdx - 1 + views.length) % views.length;
    setActiveView(views[prevIdx].id);
  };

  // Parallax tilt tracking on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 8; // Max 8deg tilt
      const y = (e.clientY / innerHeight - 0.5) * -8;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard arrow keys navigation for 3D slides
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx]);

  return (
    <div className="relative min-h-screen cosmic-bg overflow-x-hidden text-slate-100 flex flex-col justify-between">
      
      {/* Background Ambient Glowing Lights & Floating 3D AI Badges */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-3xl" />

        {/* Floating Holographic AI Badges in 3D Space */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl glass-card border border-indigo-500/30 text-indigo-300 text-xs font-bold absolute top-24 left-12 animate-float-3d shadow-xl shadow-indigo-500/10">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>AI Assisted Layout</span>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl glass-card border border-pink-500/30 text-pink-300 text-xs font-bold absolute bottom-36 right-16 animate-float-delayed shadow-xl shadow-pink-500/10">
          <Layers className="w-4 h-4 text-pink-400" />
          <span>3D Slide Engine</span>
        </div>
      </div>

      {/* Main 3D Stage Container */}
      <div 
        className="relative z-10 flex-1 perspective-stage py-4 px-2 sm:px-6"
        style={{
          transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>

      {/* Floating 3D Bottom Slide Control Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl dock-glass flex items-center gap-4 shadow-2xl border border-slate-700/80 max-w-2xl w-[92vw] sm:w-auto justify-between sm:justify-center">
        
        {/* Slide Prev Button */}
        <button
          onClick={handlePrevSlide}
          className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-600/40 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500/50 transition-all hover:scale-110 active:scale-95 shadow-md flex items-center gap-1 text-xs font-bold"
          title="Previous 3D Slide (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* View Slide Selectors */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {views.map((v, idx) => {
            const Icon = v.icon;
            const isActive = v.id === activeView;

            return (
              <button
                key={v.id}
                onClick={() => {
                  setDirection(idx > currentIdx ? 'next' : 'prev');
                  setActiveView(v.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/40 scale-105 border border-indigo-400/50'
                    : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{v.label}</span>
                <span className="md:hidden">S{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Slide Next Button */}
        <button
          onClick={handleNextSlide}
          className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-600/40 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500/50 transition-all hover:scale-110 active:scale-95 shadow-md flex items-center gap-1 text-xs font-bold"
          title="Next 3D Slide (Right Arrow)"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
