import React from 'react';
import { useSiteData } from '../../context/DataContext';

export default function Footer() {
  const { profile } = useSiteData();
  
  return (
    <footer className="border-t border-divider mt-auto py-8 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-textMuted text-sm">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-accentPrimary transition-colors">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-accentPrimary transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
