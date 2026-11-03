import React from 'react';

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function MacWindow({ title, children, isDark, onToggleTheme }: MacWindowProps) {
  return (
    <div className={`w-full max-w-4xl h-[90vh] flex flex-col rounded-xl overflow-hidden shadow-2xl border ${isDark ? 'border-neutral-700 bg-neutral-800/90 backdrop-blur-xl' : 'border-gray-300 bg-white/90 backdrop-blur-xl'}`}>
      
      {/* Title Bar */}
      <div className={`flex items-center px-4 py-2 border-b select-none ${isDark ? 'border-neutral-700 bg-neutral-800/50' : 'border-gray-300 bg-gray-100/50'}`}>
        
        {/* Traffic Lights */}
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-mac-red hover:brightness-75 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-mac-yellow hover:brightness-75 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-mac-green hover:brightness-75 cursor-pointer" />
        </div>

        {/* Title */}
        <div className={`flex-1 text-center text-xs font-semibold font-mono ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}>
          {title}
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={onToggleTheme}
          className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
          {isDark ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 relative p-2">
        {children}
      </div>
    </div>
  );
}