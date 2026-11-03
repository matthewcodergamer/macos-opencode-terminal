import { ReactNode } from 'react';

interface MacWindowProps {
  children: ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function MacWindow({ children, isDark, onToggleTheme }: MacWindowProps) {
  return (
    <div className={`flex flex-col w-full h-full ${isDark ? 'bg-[#201d1d] text-[#fdfcfc]' : 'bg-[#fcfcfc] text-[#1a1a1a]'}`}>
      
      {/* macOS Title Bar */}
      <div className={`drag-handle flex items-center justify-between px-4 py-2 border-b cursor-grab active:cursor-grabbing ${isDark ? 'border-[#3d3838] bg-[#2a2626]' : 'border-gray-300 bg-[#f0f0f0]'}`}>
        
        {/* Traffic Lights */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff3b30] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#ff9f0a] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#30d158] border border-black/20" />
        </div>

        {/* Exact Title from Screenshot */}
        <div className={`text-[11px] font-mono tracking-tight pointer-events-none ${isDark ? 'text-[#9a9898]' : 'text-gray-600'}`}>
          codebind — OC | Mac specifications request — opencode — 121x32
        </div>

        {/* Status Toggle */}
        <button 
          onClick={onToggleTheme}
          className={`text-[10px] font-mono flex items-center gap-2 ${isDark ? 'text-[#9a9898]' : 'text-gray-500'} hover:text-[#007aff] transition-colors`}
        >
          <span>● demo</span>
          <span>{isDark ? 'dark' : 'light'}</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
