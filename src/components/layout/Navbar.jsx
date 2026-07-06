import React, { useState } from 'react';
import { useSiteData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';

export default function Navbar() {
  const { siteConfig, profile } = useSiteData();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!profile || !siteConfig) return null;

  const scrollToSection = (id) => {
    setIsOpen(false);
    const elementId = id.toLowerCase().replace(' ', '-');
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer font-heading font-bold text-xl text-accentPrimary" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {profile.name}
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {siteConfig.navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className="hover:text-accentPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link}
                </button>
              ))}
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-divider transition-colors">
                {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
              </button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-divider transition-colors">
              {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-divider focus:outline-none">
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-divider">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            {siteConfig.navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="block w-full text-left hover:text-accentPrimary px-3 py-2 rounded-md text-base font-medium"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
