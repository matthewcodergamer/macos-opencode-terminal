import { ReactNode } from 'react';

interface MacWindowProps {
  children: ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function MacWindow({ children, isDark, onToggleTheme }: MacWindowProps) {
  return (
    <div className={`flex flex-col w-full h-full ${isDark ? 'bg-opencode-bg text-opencode-text' : 'bg-[#fdfcfc] text-[#201d1d]'}`}>
      
      <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? 'border-opencode-border' : 'border-gray-300'}`}>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-opencode-red border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-opencode-yellow border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-opencode-green border border-black/20" />
        </div>

        <div className={`text-[10px] sm:text-xs font-mono tracking-tight ${isDark ? 'text-opencode-dim' : 'text-gray-500'}`}>
          sollomzi2017 — OpenCode — opencode — Start_Secure.command
        </div>

        <button 
          onClick={onToggleTheme}
          className={`text-[10px] sm:text-xs font-mono flex items-center gap-2 ${isDark ? 'text-opencode-dim' : 'text-gray-500'} hover:text-opencode-blue transition-colors`}
        >
          <span>● demo</span>
          <span>{isDark ? 'dark' : 'light'}</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
