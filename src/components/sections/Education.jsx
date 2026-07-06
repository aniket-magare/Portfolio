import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/DataContext';

export default function Education() {
  const { education } = useSiteData();

  return (
    <section id="education" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gradient-text inline-block">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-card p-6 md:p-8 rounded-2xl border border-divider hover:border-accentSecondary transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4 gap-4 flex-col sm:flex-row">
                <div>
                  <h3 className="text-xl font-bold font-heading text-textMain">{edu.degree}</h3>
                  <p className="text-accentSecondary font-medium">{edu.institution}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary border border-divider text-sm text-textMuted font-medium whitespace-nowrap">
                  {edu.start} — {edu.end}
                </div>
              </div>
              <ul className="list-disc list-inside text-textMuted space-y-1 mt-4 ml-2">
                {edu.highlights.map((highlight, hIdx) => (
                  <li key={hIdx}>{highlight}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
