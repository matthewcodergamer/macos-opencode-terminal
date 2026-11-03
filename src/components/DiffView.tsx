import React from 'react';

interface DiffLine {
  type: 'add' | 'remove' | 'context';
  content: string;
  lineNumber: number;
}

export default function DiffView({ lines }: { lines: DiffLine[] }) {
  return (
    <div className="w-full font-mono text-[13px] leading-[1.4] bg-opencode-bg border border-opencode-border rounded-md overflow-hidden my-2">
      {lines.map((line, i) => {
        // Official OpenCode TUI diff color tokens
        const isAdd = line.type === 'add';
        const isRemove = line.type === 'remove';
        
        const bgColor = isAdd ? 'bg-[#1c2b21]' : isRemove ? 'bg-[#2d1c1c]' : 'bg-transparent';
        const textColor = isAdd ? 'text-[#7ee787]' : isRemove ? 'text-[#ff7b72]' : 'text-opencode-text';
        const prefix = isAdd ? '+' : isRemove ? '-' : ' ';

        return (
          <div key={i} className={`flex w-full px-2 ${bgColor}`}>
            <span className="w-8 text-right text-opencode-dim select-none mr-3 opacity-50">
              {line.lineNumber}
            </span>
            <span className={`${textColor} whitespace-pre`}>
              {prefix} {line.content}
            </span>
          </div>
        );
      })}
    </div>
  );
}
