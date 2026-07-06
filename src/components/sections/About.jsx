import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/DataContext';

export default function About() {
  const { profile } = useSiteData();

  return (
    <section id="about" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gradient-text inline-block">About Me</h2>
        <div className="glass-card p-8 md:p-12 rounded-3xl">
          <p className="text-lg md:text-xl leading-relaxed text-textMuted whitespace-pre-line">
            {profile.about}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
