import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Contact Us
      </motion.h2>

      {!sent ? (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Name</label>
            <input className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input type="email" className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Message</label>
            <textarea rows={4} className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 outline-none focus:border-brand-500" />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2 rounded bg-brand-500 hover:bg-brand-600"
          >
            Send
          </motion.button>
        </motion.form>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded bg-green-500/10 border border-green-600/40">
          Thanks! We received your message.
        </motion.div>
      )}
    </div>
  );
}
