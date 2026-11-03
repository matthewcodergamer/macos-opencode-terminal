import { useState } from 'react';

export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('Suggested');

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

  return (
    <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-[#fcfcfc] text-[#1a1a1a] w-[400px] border border-gray-300 shadow-2xl rounded font-mono text-xs flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200">
          <span className="font-bold">Commands</span>
          <span className="opacity-50 cursor-pointer" onClick={onClose}>esc</span>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-gray-200 flex items-center gap-2">
          <span className="text-blue-500">■</span>
          <input 
            type="text" 
            placeholder="Search" 
            className="flex-1 bg-transparent outline-none placeholder-gray-400"
            autoFocus
          />
        </div>

        {/* Command List */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          
          <div className="text-[#ff9f0a] font-bold px-2 py-1 mb-1">Suggested</div>
          {commands.filter(c => c.section === 'Suggested').map((cmd, i) => (
            <div key={i} className="flex justify-between items-center px-2 py-1 bg-blue-500 text-white rounded cursor-pointer">
              <span>{cmd.name}</span>
              <span className="opacity-70">{cmd.key}</span>
            </div>
          ))}

          <div className="text-[#ff9f0a] font-bold px-2 py-1 mb-1 mt-4">Session</div>
          {commands.filter(c => c.section === 'Session').map((cmd, i) => (
            <div key={i} className="flex justify-between items-center px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">
              <span>{cmd.name}</span>
              <span className="opacity-50">{cmd.key}</span>
            </div>
          ))}

          <div className="text-[#ff9f0a] font-bold px-2 py-1 mb-1 mt-4">System</div>
          {commands.filter(c => c.section === 'System').map((cmd, i) => (
            <div key={i} className="flex justify-between items-center px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">
              <span>{cmd.name}</span>
              <span className="opacity-50">{cmd.key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
