import React, { createContext, useContext } from 'react';
import profileData from '../data/profile.json';
import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';
import caseStudiesData from '../data/caseStudies.json';
import certificationsData from '../data/certifications.json';
import siteConfigData from '../data/siteConfig.json';

// Static data object — always sourced directly from JSON files in /src/data/.
// No localStorage, no drafts, no overrides. Edit the JSON files to make changes.
const staticData = {
  profile: profileData,
  experience: experienceData,
  education: educationData,
  skills: skillsData,
  projects: projectsData,
  caseStudies: caseStudiesData,
  certifications: certificationsData,
  siteConfig: siteConfigData,
};

const DataContext = createContext(staticData);

export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={staticData}>
      {children}
    </DataContext.Provider>
  );
};

export const useSiteData = () => useContext(DataContext);
