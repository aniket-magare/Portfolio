import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/DataContext';

export default function Hero() {
  const { profile } = useSiteData();

  if (!profile) return null;

  return (
    <section id="hero" className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight">
          Hi, I'm <span style={{background: 'linear-gradient(135deg, #6366f1, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{profile.name}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-textMuted">
          {profile.roles.join(' · ')}
        </h2>
        <p className="text-lg md:text-xl text-textMuted max-w-2xl">
          {profile.tagline}
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
          <a href="#contact" className="px-8 py-3 rounded-full bg-accentPrimary hover:bg-accentPrimary/90 text-white font-medium transition-all shadow-lg hover:shadow-accentPrimary/50">
            Get in touch
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full glass-card hover:bg-card/100 font-medium transition-all text-textMain border border-divider hover:border-accentSecondary">
            View Resume
          </a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-shrink-0 relative"
      >
        <div className="w-64 md:w-80 aspect-[4/5] rounded-3xl overflow-hidden border-2 border-divider shadow-2xl relative z-10">
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accentPrimary/20 to-accentSecondary/20 blur-xl z-0 animate-pulse"></div>
      </motion.div>
    </section>
  );
}
