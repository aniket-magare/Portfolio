import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/DataContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export default function Contact() {
  const { profile, siteConfig } = useSiteData();

  return (
    <section id="contact" className="scroll-mt-24 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-divider shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accentPrimary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accentSecondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 gradient-text">Let's connect</h2>
              <p className="text-lg text-textMuted mb-8 max-w-md mx-auto md:mx-0">
                I'm always open to discussing product design work or partnership opportunities. Let's build something amazing together.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-textMain hover:text-accentPrimary transition-colors group font-medium">
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-divider group-hover:border-accentPrimary transition-colors">
                    <HiOutlineMail size={20} />
                  </div>
                  {profile.email}
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-textMain hover:text-accentPrimary transition-colors group font-medium">
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-divider group-hover:border-accentPrimary transition-colors">
                    <FaLinkedin size={18} />
                  </div>
                  LinkedIn
                </a>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <form action={siteConfig.formspreeEndpoint} method="POST" className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm font-medium text-textMuted ml-1">Name</label>
                  <input type="text" name="name" id="name" required className="w-full bg-card border border-divider rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-accentPrimary focus:ring-1 focus:ring-accentPrimary transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-medium text-textMuted ml-1">Email</label>
                  <input type="email" name="email" id="email" required className="w-full bg-card border border-divider rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-accentPrimary focus:ring-1 focus:ring-accentPrimary transition-colors" placeholder="john@example.com" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-sm font-medium text-textMuted ml-1">Message</label>
                  <textarea name="message" id="message" rows="4" required className="w-full bg-card border border-divider rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-accentPrimary focus:ring-1 focus:ring-accentPrimary transition-colors resize-none" placeholder="Hello..."></textarea>
                </div>
                <button type="submit" className="mt-2 w-full py-3 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl font-medium transition-colors shadow-lg shadow-accentPrimary/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
