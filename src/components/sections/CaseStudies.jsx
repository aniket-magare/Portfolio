import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

export default function CaseStudies() {
  const { caseStudies } = useSiteData();

  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section id="case-studies" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gradient-text inline-block">Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group glass-card-hover"
            >
              <Link to={`/case-studies/${study.slug}`} className="block relative overflow-hidden aspect-[21/9]">
                <img src={study.cover} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-2xl font-bold font-heading text-white drop-shadow-md">{study.title}</h3>
                  <p className="text-white/80 font-medium text-sm">{study.role}</p>
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-textMain uppercase tracking-wider mb-1">The Problem</h4>
                  <p className="text-textMuted text-sm line-clamp-2 text-justify">{study.problem}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-divider">
                  {(study.metrics || []).map((metric, mIdx) => (
                    <span key={mIdx} className="px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-full border border-success/20">
                      {metric}
                    </span>
                  ))}
                  <Link to={`/case-studies/${study.slug}`} className="ml-auto text-sm font-medium text-accentSecondary hover:text-accentPrimary transition-colors self-center">
                    Read Study →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
