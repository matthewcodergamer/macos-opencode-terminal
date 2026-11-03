import { useState } from 'react';

export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState('');

  const commands = [
    { name: 'Switch session', key: 'ctrl+x l', section: 'Suggested' },
    { name: 'Switch model', key: 'ctrl+x m', section: 'Suggested' },
    { name: 'Connect provider', key: '', section: 'Suggested' },
    { name: 'Open editor', key: 'ctrl+x e', section: 'Session' },
    { name: 'Switch session', key: 'ctrl+x l', section: 'Session' },
    { name: 'New session', key: 'ctrl+x n', section: 'Session' },
    { name: 'Hide tips', key: 'ctrl+x h', section: 'System' },
    { name: 'Git status', key: 'ctrl+x g', section: 'System' },
    { name: 'Switch theme', key: 'ctrl+x t', section: 'System' },
  ];

  const filteredCommands = commands.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-[#fcfcfc] text-[#1a1a1a] w-full max-w-[400px] border border-gray-300 shadow-2xl rounded font-mono text-xs flex flex-col overflow-hidden">
        
        <div className="flex justify-between items-center p-3 border-b border-gray-200">
          <span className="font-bold">Commands</span>
          <span className="opacity-50 cursor-pointer hover:opacity-100" onClick={onClose}>esc</span>
        </div>

        <div className="p-3 border-b border-gray-200 flex items-center gap-2">
          <span className="text-blue-500">■</span>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search" 
            className="flex-1 bg-transparent outline-none placeholder-gray-400"
            autoFocus
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {['Suggested', 'Session', 'System'].map(section => {
            const sectionCmds = filteredCommands.filter(c => c.section === section);
            if (sectionCmds.length === 0) return null;

            return (
              <div key={section} className="mb-4">
                <div className="text-[#ff9f0a] font-bold px-2 py-1 mb-1">{section}</div>
                {sectionCmds.map((cmd, i) => (
                  <div 
                    key={i} 
                    className={`flex justify-between items-center px-2 py-1.5 rounded cursor-pointer ${section === 'Suggested' && i === 0 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                  >
                    <span>{cmd.name}</span>
                    <span className={section === 'Suggested' && i === 0 ? 'opacity-90' : 'opacity-50'}>{cmd.key}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
