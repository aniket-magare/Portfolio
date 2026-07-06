import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSiteData } from '../context/DataContext';
import Layout from '../components/layout/Layout';
import { HiArrowLeft } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects } = useSiteData();
  const navigate = useNavigate();

  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    if (!project) {
      navigate('/');
    } else {
      window.scrollTo(0, 0);
    }
  }, [project, navigate]);

  if (!project) return null;

  return (
    <Layout title={project.title} description={project.summary}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto w-full"
      >
        <Link to="/#projects" className="inline-flex items-center gap-2 text-textMuted hover:text-accentPrimary mb-8 transition-colors">
          <HiArrowLeft /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 gradient-text">{project.title}</h1>
        <p className="text-xl text-textMuted mb-8">{project.summary}</p>
        <div className="flex flex-wrap gap-2 mb-12">
          {(project.tags || []).map((tag, tIdx) => (
            <span key={tIdx} className="px-3 py-1 bg-accentPrimary/10 text-accentPrimary text-sm font-medium rounded-md border border-accentPrimary/20">
              {tag}
            </span>
          ))}
        </div>
        <img src={project.image || project.thumbnail} alt={project.title} className="w-full rounded-2xl mb-12 border border-divider shadow-lg" />
        <div className="prose dark:prose-invert max-w-none text-textMuted mb-12 whitespace-pre-line text-lg leading-relaxed">
          {project.description}
        </div>
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold font-heading mb-6 text-textMain">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(project.gallery || []).map((img, i) => (
                <img key={i} src={img} alt={`${project.title} screenshot ${i+1}`} className="w-full rounded-xl border border-divider shadow-md" />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </Layout>
  );
}
