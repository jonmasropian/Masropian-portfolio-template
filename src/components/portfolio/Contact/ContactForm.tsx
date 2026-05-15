'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormData = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    // Simulate sending — wire up to an email API (e.g. Resend, nodemailer) later
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('sent');
    setForm(empty);
  };

  const field = (key: keyof FormData, label: string, tag: 'input' | 'textarea' = 'input', rows?: number) => (
    <div>
      <label className="block text-xs font-mono text-gray-500 tracking-widest mb-2">{label}</label>
      {tag === 'input' ? (
        <input
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full bg-transparent text-white text-sm font-mono py-3 px-4 outline-none transition-colors placeholder-gray-700"
          style={{ border: `1px solid ${errors[key] ? '#EF4444' : 'rgba(123,47,255,0.25)'}` }}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      ) : (
        <textarea
          rows={rows ?? 5}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full bg-transparent text-white text-sm font-mono py-3 px-4 outline-none resize-none transition-colors placeholder-gray-700"
          style={{ border: `1px solid ${errors[key] ? '#EF4444' : 'rgba(123,47,255,0.25)'}` }}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      )}
      {errors[key] && <p className="text-red-400 text-xs font-mono mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {status === 'sent' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <CheckCircle size={48} className="text-cyan-400 mb-4" style={{ filter: 'drop-shadow(0 0 16px rgba(0,229,255,0.6))' }} />
          <h3 className="text-white font-bold text-xl mb-2">Message Received</h3>
          <p className="text-gray-500 font-mono text-sm">I'll get back to you ASAP. Stand by.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 text-xs font-mono hover:underline"
            style={{ color: '#c084fc' }}
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            {field('name', 'NAME')}
            {field('email', 'EMAIL')}
          </div>
          {field('subject', 'SUBJECT')}
          {field('message', 'MESSAGE', 'textarea', 6)}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex items-center gap-3 px-8 py-3 font-mono text-sm tracking-widest font-bold disabled:opacity-50 transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(123,47,255,0.8)', color: '#e9d5ff', boxShadow: '0 0 25px rgba(123,47,255,0.3)', border: '1px solid rgba(123,47,255,0.6)' }}
          >
            {status === 'sending' ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-t-transparent rounded-full" style={{ borderColor: '#c084fc', borderTopColor: 'transparent' }} />
                TRANSMITTING...
              </>
            ) : (
              <><Send size={16} /> TRANSMIT</>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
