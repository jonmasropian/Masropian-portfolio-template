'use client';
import { useState, useRef, useEffect } from 'react';
import { terminalCommands } from '@/data/portfolio';

export default function Terminal() {
  const [history, setHistory] = useState<{ input: string; output: string }[]>([
    { input: '', output: '> SYSTEM READY. Type "help" for available commands.\n> Operator: Jon Masropian // SECRET CLEARANCE ACTIVE' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const output = cmd === 'clear'
      ? null
      : terminalCommands[cmd] ?? `> Command not found: "${cmd}". Type "help" for options.`;

    if (cmd === 'clear') {
      setHistory([{ input: '', output: '> Terminal cleared.' }]);
    } else {
      setHistory((prev) => [...prev, { input: `$ ${input}`, output: output! }]);
    }
    setInput('');
  };

  return (
    <div className="font-mono text-sm h-80 overflow-y-auto flex flex-col"
      style={{ background: '#050505', border: '1px solid rgba(0,229,255,0.2)', padding: '1rem' }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-500 tracking-widest">MASROPIAN-TERMINAL v1.0</span>
      </div>

      {/* History */}
      <div className="flex-1 space-y-3">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.input && <div className="text-cyan-400">{entry.input}</div>}
            <pre className="text-gray-400 whitespace-pre-wrap text-xs leading-relaxed">{entry.output}</pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 pt-2"
        style={{ borderTop: '1px solid rgba(0,229,255,0.1)' }}>
        <span className="text-cyan-400">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-cyan-400 outline-none placeholder-gray-700 text-sm"
          placeholder="enter command..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
