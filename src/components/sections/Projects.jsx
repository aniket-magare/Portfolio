import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

export default function Projects() {
  const { projects } = useSiteData();

  return (
    <section id="projects" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gradient-text inline-block">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col glass-card-hover group"
            >
              <Link to={`/projects/${project.slug}`} className="block relative overflow-hidden aspect-video">
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold font-heading text-textMain mb-2">
                  <Link to={`/projects/${project.slug}`} className="hover:text-accentPrimary transition-colors">{project.title}</Link>
                </h3>
                <p className="text-textMuted mb-4 flex-1">{project.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-1 bg-accentPrimary/10 text-accentPrimary text-xs font-medium rounded-md border border-accentPrimary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-divider">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-textMain transition-colors" title="View Source">
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-textMain transition-colors" title="View Live">
                      <HiOutlineExternalLink size={22} />
                    </a>
                  )}
                  <Link to={`/projects/${project.slug}`} className="ml-auto text-sm font-medium text-accentSecondary hover:text-accentPrimary transition-colors">
                    View Details →
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
