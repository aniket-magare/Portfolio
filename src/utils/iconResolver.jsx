import React from 'react';
import * as SiIcons from 'react-icons/si';

export const getAutoIconKey = (skillName) => {
  const normalized = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const exactMatch = `Si${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`;
  
  if (SiIcons[exactMatch]) {
    return exactMatch;
  }
  
  const keys = Object.keys(SiIcons);
  const found = keys.find(key => key.toLowerCase() === `si${normalized}`);
  if (found) return found;

  const looseFound = keys.find(key => key.toLowerCase().includes(normalized));
  return looseFound || null;
};

export const renderIcon = (skill, className = "w-8 h-8") => {
  if (skill.iconMode === 'custom' && skill.customImage) {
    return <img src={skill.customImage} alt={skill.name} className={`${className} object-contain`} />;
  }

  let iconKey = skill.iconKey;

  if (skill.iconMode === 'auto' || !iconKey) {
    iconKey = getAutoIconKey(skill.name);
  }

  if (iconKey && SiIcons[iconKey]) {
    const IconComponent = SiIcons[iconKey];
    return <IconComponent className={className} />;
  }

  // Fallback
  return (
    <div className={`${className} bg-divider/50 rounded flex items-center justify-center text-xs font-bold text-textMuted`}>
      {skill.name.charAt(0)}
    </div>
  );
};
