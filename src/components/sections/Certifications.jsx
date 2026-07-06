import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/DataContext';
import { HiOutlineExternalLink } from 'react-icons/hi';

export default function Certifications() {
  const { certifications } = useSiteData();

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gradient-text inline-block">Certifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <motion.a 
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-4 group border border-divider hover:border-accentSecondary transition-all duration-300"
            >
              <div className="w-24 h-24 rounded-full bg-white p-2 flex items-center justify-center shadow-inner">
                <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold font-heading text-textMain text-sm leading-tight mb-1 group-hover:text-accentPrimary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-textMuted">{cert.issuer}</p>
                <p className="text-xs text-textMuted mt-1">{cert.date}</p>
              </div>
              <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <HiOutlineExternalLink className="text-accentSecondary" size={20} />
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
