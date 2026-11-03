interface DiffLine {
  type: 'add' | 'remove' | 'context';
  content: string;
  lineNumber: number;
}

export default function DiffView({ lines }: { lines: DiffLine[] }) {
  return (
    <div className="w-full font-mono text-[13px] leading-[1.4] bg-[#fcfcfc] border border-gray-300 rounded-md overflow-hidden my-2">
      {lines.map((line, i) => {
        const isAdd = line.type === 'add';
        const isRemove = line.type === 'remove';
        const bgColor = isAdd ? 'bg-[#e6ffec]' : isRemove ? 'bg-[#ffebe9]' : 'bg-transparent';
        const textColor = isAdd ? 'text-[#1a7f37]' : isRemove ? 'text-[#cf222e]' : 'text-[#1a1a1a]';
        const prefix = isAdd ? '+' : isRemove ? '-' : ' ';
        
        return (
          <div key={i} className={`flex w-full px-2 ${bgColor}`}>
            <span className="w-8 text-right text-gray-400 select-none mr-3 opacity-50">{line.lineNumber}</span>
            <span className={`${textColor} whitespace-pre`}>{prefix} {line.content}</span>
          </div>
        );
      })}
    </div>
  );
}
