import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSiteData } from '../context/DataContext';
import Layout from '../components/layout/Layout';
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { caseStudies } = useSiteData();
  const navigate = useNavigate();
  const [showDetailed, setShowDetailed] = useState(false);

  const study = caseStudies.find(p => p.slug === slug);

  useEffect(() => {
    if (!study) {
      navigate('/');
    } else {
      window.scrollTo(0, 0);
    }
  }, [study, navigate]);

  if (!study) return null;

  return (
    <Layout title={study.title} description={study.problem}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto w-full"
      >
        {/* Back to Home */}
        <Link to="/#case-studies" className="inline-flex items-center gap-2 text-textMuted hover:text-accentPrimary mb-8 transition-colors group">
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2 gradient-text">{study.title}</h1>
        <p className="text-xl text-accentSecondary font-medium mb-8">Role: {study.role}</p>

        <AnimatePresence mode="wait">
          {!showDetailed ? (
            /* ─── OVERVIEW VIEW ─── */
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* TOP ROW: Image (left 2/3) + Buttons (right 1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Cover Image */}
                <div className="lg:col-span-2">
                  <img
                    src={study.cover}
                    alt={study.title}
                    className="w-full rounded-2xl border border-divider shadow-lg aspect-[21/9] object-cover"
                  />
                </div>

                {/* Action Buttons — sticky right panel */}
                <div className="lg:col-span-1">
                  <div className="glass-card p-5 rounded-2xl border border-divider sticky top-28 space-y-3">
                    {/* Detailed Case Study */}
                    {study.pdfUrl ? (
                      <a
                        href={study.pdfUrl}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-accentPrimary text-accentPrimary text-sm font-semibold hover:bg-accentPrimary hover:text-white transition-all duration-300"
                      >
                        <HiOutlineDocumentText size={16} />
                        Detailed Case Study
                      </a>
                    ) : (
                      <button
                        onClick={() => { setShowDetailed(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-accentPrimary text-accentPrimary text-sm font-semibold hover:bg-accentPrimary hover:text-white transition-all duration-300"
                      >
                        <HiOutlineDocumentText size={16} />
                        Detailed Case Study
                      </button>
                    )}

                    {/* View Prototype — always visible, active when figmaUrl is set */}
                    {study.figmaUrl ? (
                      <a
                        href={study.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-accentPrimary text-accentPrimary text-sm font-semibold hover:bg-accentPrimary hover:text-white transition-all duration-300"
                      >
                        <HiExternalLink size={16} />
                        View Prototype
                      </a>
                    ) : (
                      <span className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-divider text-textMuted text-sm font-semibold cursor-not-allowed opacity-50">
                        <HiExternalLink size={16} />
                        View Prototype
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* FULL WIDTH: Metrics + Problem / Approach / Result */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Metrics */}
                <div className="glass-card p-5 rounded-2xl border-t-4 border-t-accentPrimary md:col-span-1">
                  <h3 className="text-xs font-bold text-textMain uppercase tracking-wider mb-3">Metrics</h3>
                  <div className="flex flex-col gap-2">
                    {(study.metrics || []).map((metric, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-3 py-2 bg-success/10 text-success text-sm font-bold rounded-lg border border-success/20 text-center"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem / Approach / Result */}
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold font-heading mb-2 text-textMain">The Problem</h2>
                    <p className="text-textMuted leading-relaxed text-justify whitespace-pre-line">{study.problem}</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-heading mb-2 text-textMain">The Approach</h2>
                    <p className="text-textMuted leading-relaxed text-justify whitespace-pre-line">{study.approach}</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-heading mb-2 text-textMain">The Result</h2>
                    <p className="text-textMuted leading-relaxed text-justify whitespace-pre-line">{study.result}</p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              {study.gallery && study.gallery.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold font-heading mb-4 text-textMain">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {study.gallery.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${study.title} screenshot ${i + 1}`}
                        className="w-full rounded-xl border border-divider shadow-md"
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* ─── DETAILED VIEW ─── */
            <motion.div
              key="detailed"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Back to Overview button */}
              <button
                onClick={() => { setShowDetailed(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-textMuted hover:text-accentPrimary transition-colors group"
              >
                <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Overview
              </button>

              {/* Detailed content — placeholder, content to be added per case study */}
              {/* Detailed content */}
              <div className="glass-card p-8 md:p-12 rounded-2xl border border-divider space-y-10">
                {study.detailedSections && study.detailedSections.length > 0 ? (
                  study.detailedSections.map((section, idx) => (
                    <div key={idx}>
                      {section.heading && (
                        <h2 className="text-2xl font-bold font-heading mb-4 gradient-text inline-block">{section.heading}</h2>
                      )}
                      <div className="text-textMuted leading-relaxed text-justify prose prose-invert prose-headings:text-textMain prose-a:text-accentPrimary hover:prose-a:text-accentSecondary prose-strong:text-textMain max-w-none marker:text-accentPrimary">
                        <ReactMarkdown>{section.content}</ReactMarkdown>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 space-y-3">
                    <HiOutlineDocumentText size={48} className="text-textMuted mx-auto opacity-40" />
                    <p className="text-textMuted text-lg font-medium">Detailed case study coming soon.</p>
                    <p className="text-textMuted text-sm opacity-60">Full breakdown with process, research, and outcomes will be added here.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
}
