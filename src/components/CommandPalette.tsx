import { useState } from 'react';

type MenuView = 'commands' | 'providers' | 'models' | 'variants';

interface CommandPaletteProps {
  onClose: () => void;
}

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const [view, setView] = useState<MenuView>('commands');
  const [search, setSearch] = useState('');

  // Navigation handlers
  const handleSelect = (action: string) => {
    if (action === '/connect') setView('providers');
    else if (action === '/model') setView('models');
    else if (action === 'OpenCode Zen (Recommended)') setView('models');
    else if (action === 'GPT-5 Codex') setView('variants');
    else onClose();
  };

  // Exact Data from your screenshots
  const commands = [
    { name: '/connect', desc: 'Connect provider', key: 'ctrl+a' },
    { name: '/model', desc: 'Switch model', key: 'ctrl+m' },
    { name: '/btw', desc: 'By the way...', key: '' },
    { name: '/editor', desc: 'Open editor', key: 'ctrl+e' },
    { name: '/init', desc: 'Initialize project', key: '' },
    { name: '/undo', desc: 'Undo last action', key: '' },
    { name: '/redo', desc: 'Redo last action', key: '' },
    { name: '/export', desc: 'Export session', key: '' },
    { name: '/exit', desc: 'Exit OpenCode', key: '' },
  ];

  const providers = [
    { name: 'OpenCode Zen (Recommended)', desc: '', key: '' },
    { name: 'OpenCode Go', desc: 'Low cost subscription for everyone', key: '' },
    { name: 'OpenAI', desc: '(ChatGPT Plus/Pro or API key)', key: '' },
    { name: 'GitHub Copilot', desc: '', key: '' },
    { name: 'Anthropic', desc: '(API key)', key: '' },
  ];

  const models = [
    { name: 'GPT-5.1 Codex', desc: '', key: '' },
    { name: 'GPT-5.1 Codex Max', desc: '', key: '' },
    { name: 'GPT-5.1 Codex Mini', desc: '', key: '' },
    { name: 'Big Pickle', desc: '', key: 'Free' },
    { name: 'Claude Haiku 4.5', desc: '', key: '' },
    { name: 'Claude Sonnet 4.5', desc: '', key: '' },
  ];

  const variants = [
    { name: 'Default', desc: '', key: '' },
    { name: 'high', desc: '', key: '' },
    { name: 'max', desc: '', key: '' },
  ];

  // Determine which list to show based on state
  const getList = () => {
    switch (view) {
      case 'providers': return providers;
      case 'models': return models;
      case 'variants': return variants;
      default: return commands;
    }
  };

  const getTitle = () => {
    switch (view) {
      case 'providers': return 'Connect a provider';
      case 'models': return 'OpenCode Zen';
      case 'variants': return 'Select variant';
      default: return 'Commands';
    }
  };

  const currentList = getList().filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="absolute inset-0 bg-black/40 flex items-start justify-center z-50 p-4 pt-16">
      <div className="bg-[#1a1a1a] text-[#e0e0e0] w-full max-w-[450px] border border-[#333] shadow-2xl rounded-md font-mono text-xs flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-[#222]">
          <span className="font-bold">{getTitle()}</span>
          <span className="opacity-50 cursor-pointer hover:opacity-100" onClick={onClose}>esc</span>
        </div>

        {/* Search Input */}
        <div className="px-4 py-2 border-b border-[#333] flex items-center gap-2">
          <span className="text-[#ff9f0a]">█</span>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search" 
            className="flex-1 bg-transparent outline-none placeholder-[#666] text-[#e0e0e0]"
            autoFocus
          />
        </div>

        {/* List Items */}
        <div className="max-h-[300px] overflow-y-auto py-2">
          {view === 'commands' && <div className="text-[#ff9f0a] px-4 py-1 text-[10px] uppercase tracking-wider">Suggested</div>}
          
          {currentList.map((item, i) => (
            <div 
              key={i} 
              onClick={() => handleSelect(item.name)}
              className={`flex justify-between items-center px-4 py-1.5 cursor-pointer ${i === 0 ? 'bg-[#ff9f0a] text-black' : 'hover:bg-[#333]'}`}
            >
              <div className="flex items-center gap-3">
                <span>{item.name}</span>
                {item.desc && <span className={`text-[10px] ${i === 0 ? 'text-black/70' : 'text-[#888]'}`}>{item.desc}</span>}
              </div>
              {item.key && (
                <span className={`text-[10px] font-bold ${i === 0 ? 'text-black/80' : 'text-[#888]'}`}>
                  {item.key}
                </span>
              )}
            </div>
          ))}

          {view === 'models' && (
            <div className="px-4 py-3 mt-2 border-t border-[#333] flex gap-4 text-[10px] text-[#888]">
              <span>Connect provider <span className="text-[#e0e0e0]">ctrl+a</span></span>
              <span>Favorite <span className="text-[#e0e0e0]">ctrl+f</span></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
