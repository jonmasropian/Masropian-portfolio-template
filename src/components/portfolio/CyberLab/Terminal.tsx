'use client';
import { useState, useRef, useEffect } from 'react';
import { terminalCommands } from '@/data/portfolio';

export default function Terminal() {
  const [history, setHistory] = useState<{ input: string; output: string }[]>([
    { input: '', output: '> VOID_OS v2.077 READY. Signal stable.\n> Operator: Jon Masropian // SECRET CLEARANCE ACTIVE\n> Type "help" for available commands.' },
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
      setHistory([{ input: '', output: '> Terminal cleared. Void persists.' }]);
    } else {
      setHistory((prev) => [...prev, { input: `VOID://> ${input}`, output: output! }]);
    }
    setInput('');
  };

  return (
    <div className="font-mono text-sm h-80 overflow-y-auto flex flex-col"
      style={{ background: '#000005', border: '1px solid rgba(0,229,255,0.2)', padding: '1rem' }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: '#ff4d6d' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#7b2fff' }} />
        <span className="ml-2 text-xs tracking-widest" style={{ color: 'rgba(123,47,255,0.5)' }}>
          MASROPIAN-VOID-TERMINAL v2.077
        </span>
      </div>

      {/* History */}
      <div className="flex-1 space-y-3">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.input && (
              <div style={{ color: '#c084fc' }}>{entry.input}</div>
            )}
            <pre className="whitespace-pre-wrap text-xs leading-relaxed" style={{ color: 'rgba(0,229,255,0.75)' }}>
              {entry.output}
            </pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 pt-2"
        style={{ borderTop: '1px solid rgba(0,229,255,0.1)' }}>
        <span style={{ color: '#c084fc' }}>VOID://&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm placeholder-gray-700"
          style={{ color: '#00e5ff' }}
          placeholder="enter command..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
