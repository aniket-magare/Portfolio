import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/DataContext';

export default function Experience() {
  const { experience } = useSiteData();

  return (
    <section id="experience" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gradient-text inline-block">Experience</h2>
        <div className="relative border-l-2 border-divider ml-4 md:ml-0 md:pl-0">
          {experience.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="mb-10 ml-8 md:ml-12 relative"
            >
              <div className="absolute -left-10 md:-left-14 w-4 h-4 rounded-full bg-accentPrimary border-4 border-primary mt-1.5"></div>
              <div className="glass-card p-6 md:p-8 rounded-2xl glass-card-hover">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div className="flex items-center gap-4">
                    {exp.logo && <img src={exp.logo} alt={exp.company} className="w-12 h-12 rounded-lg object-contain bg-white" />}
                    <div>
                      <h3 className="text-xl font-bold font-heading text-textMain">{exp.role}</h3>
                      <p className="text-lg text-accentSecondary font-medium">{exp.company} <span className="text-textMuted text-sm font-normal">• {exp.location}</span></p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary border border-divider text-sm text-textMuted font-medium whitespace-nowrap">
                    {exp.start} — {exp.end}
                  </div>
                </div>
                <ul className="list-disc list-inside text-textMuted space-y-2 mt-4 ml-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
