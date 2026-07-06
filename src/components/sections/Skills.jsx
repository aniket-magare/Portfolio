import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/DataContext';
import { renderIcon } from '../../utils/iconResolver';

export default function Skills() {
  const { skills } = useSiteData();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gradient-text inline-block">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skills.map((category, idx) => (
            <div key={idx} className="glass-card p-4 rounded-2xl">
              <h3 className="text-sm font-heading font-bold mb-3 text-textMain uppercase tracking-wider">{category.category}</h3>
              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2"
              >
                {category.items.map((skill, sIdx) => (
                  <motion.div key={sIdx} variants={item} className="flex flex-col items-center gap-1 group">
                    <div className="w-10 h-10 rounded-lg bg-primary border border-divider flex items-center justify-center group-hover:border-accentPrimary group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300">
                      {renderIcon(skill, "w-5 h-5 text-textMuted group-hover:text-accentPrimary transition-colors")}
                    </div>
                    <span className="text-[10px] text-center text-textMuted font-medium leading-tight">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
