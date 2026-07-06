import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSiteData } from '../../context/DataContext';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title, description }) {
  const { profile } = useSiteData();
  const pageTitle = title ? `${title} | ${profile.name}` : `${profile.name} - ${profile.roles[0]}`;

  return (
    <div className="min-h-screen flex flex-col bg-primary text-textMain transition-colors duration-300 overflow-x-hidden">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description || profile.tagline} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description || profile.tagline} />
        <meta property="og:image" content={profile.photo} />
      </Helmet>
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-32 pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
