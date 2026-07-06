import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/DataContext';
import FileUpload from '../components/admin/FileUpload';

export default function Admin() {
  const data = useSiteData();
  const [activeTab, setActiveTab] = useState('profile');
  const [editorMode, setEditorMode] = useState('form'); // 'form' or 'json'
  const [stateData, setStateData] = useState({});
  const [jsonString, setJsonString] = useState('');

  // Sync state data when tab changes or default data loaded
  useEffect(() => {
    if (data && data[activeTab]) {
      // Deep clone to avoid direct mutation
      const cloned = JSON.parse(JSON.stringify(data[activeTab]));
      setStateData(cloned);
      setJsonString(JSON.stringify(cloned, null, 2));
    }
  }, [activeTab, data]);

  const handleStateChange = (newData) => {
    setStateData(newData);
    setJsonString(JSON.stringify(newData, null, 2));
  };

  const handleJsonChange = (val) => {
    setJsonString(val);
    try {
      const parsed = JSON.parse(val);
      setStateData(parsed);
    } catch (e) {
      // Don't sync invalid JSON to stateData, just let user keep typing
    }
  };

  const handleSaveDisk = async () => {
    try {
      const finalData = editorMode === 'json' ? JSON.parse(jsonString) : stateData;
      const res = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, data: finalData }),
      });
      if (res.ok) {
        alert('Data successfully written to your local file system!');
      } else {
        const err = await res.json();
        alert('Failed to save data: ' + err.error);
      }
    } catch (e) {
      alert('Error communicating with Vite dev server: ' + e.message);
    }
  };

  // Rendering Helper Components for each JSON type
  const renderFormContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileEditor data={stateData} onChange={handleStateChange} />;
      case 'skills':
        return <SkillsEditor data={stateData} onChange={handleStateChange} />;
      case 'experience':
        return <TimelineEditor data={stateData} onChange={handleStateChange} type="experience" />;
      case 'education':
        return <TimelineEditor data={stateData} onChange={handleStateChange} type="education" />;
      case 'projects':
        return <ProjectsEditor data={stateData} onChange={handleStateChange} />;
      case 'caseStudies':
        return <CaseStudiesEditor data={stateData} onChange={handleStateChange} />;
      case 'certifications':
        return <CertificationsEditor data={stateData} onChange={handleStateChange} />;
      case 'siteConfig':
        return <SiteConfigEditor data={stateData} onChange={handleStateChange} />;
      default:
        return <p>Select a valid section to edit.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-primary text-textMain p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-divider gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading gradient-text">Local Portfolio Admin</h1>
            <p className="text-sm text-textMuted mt-1">Changes are saved directly to your workspace JSON files and public directories.</p>
          </div>
          <div className="flex gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-divider rounded-lg hover:border-accentPrimary transition-colors text-sm font-medium">
              View Live Site ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Tabs Sidebar */}
          <div className="w-full md:w-56 flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-3 md:pb-0 scrollbar-none">
            {Object.keys(data).map(key => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`text-left px-4 py-3 rounded-xl whitespace-nowrap transition-colors font-medium text-sm border ${
                  activeTab === key
                    ? 'bg-accentPrimary/10 text-accentPrimary border-accentPrimary/30'
                    : 'bg-card border-divider/60 hover:border-accentSecondary text-textMuted hover:text-textMain'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Editor Workspace */}
          <div className="flex-1 w-full flex flex-col gap-4">
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-divider p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditorMode('form')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${editorMode === 'form' ? 'bg-accentPrimary text-white' : 'bg-primary border border-divider hover:bg-card text-textMuted'}`}
                >
                  Visual Form
                </button>
                <button
                  onClick={() => setEditorMode('json')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${editorMode === 'json' ? 'bg-accentPrimary text-white' : 'bg-primary border border-divider hover:bg-card text-textMuted'}`}
                >
                  Raw JSON
                </button>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button onClick={handleSaveDisk} className="px-4 py-2 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-lg text-xs font-bold transition-colors shadow-md shadow-accentPrimary/10">
                  Save to Disk (Files)
                </button>
              </div>
            </div>

            {/* Editing Panel */}
            <div className="w-full">
              {editorMode === 'json' ? (
                <div className="relative">
                  <textarea
                    value={jsonString}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    className="w-full h-[60vh] bg-[#0d1117] text-[#c9d1d9] border border-divider rounded-2xl p-6 font-mono text-sm focus:outline-none focus:border-accentPrimary focus:ring-1 focus:ring-accentPrimary transition-colors shadow-inner"
                    spellCheck={false}
                  />
                  {jsonString && (() => {
                    try { JSON.parse(jsonString); return null; }
                    catch (e) {
                      return (
                        <div className="absolute bottom-4 right-4 bg-red-500/90 text-white text-xs px-3 py-1.5 rounded-md font-medium">
                          Invalid JSON format
                        </div>
                      );
                    }
                  })()}
                </div>
              ) : (
                <div className="flex flex-col gap-4">{renderFormContent()}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   SUB-EDITOR COMPONENTS
   ========================================== */

function ProfileEditor({ data = {}, onChange }) {
  const updateField = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  const handleRolesChange = (e) => {
    const rolesArray = e.target.value.split(',').map(r => r.trim());
    updateField('roles', rolesArray);
  };

  return (
    <div className="bg-card border border-divider p-6 rounded-2xl flex flex-col gap-5">
      <h3 className="text-lg font-bold font-heading border-b border-divider pb-2">Profile Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Full Name</label>
          <input
            type="text"
            className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
            value={data.name || ''}
            onChange={e => updateField('name', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Roles / Titles (comma separated)</label>
          <input
            type="text"
            className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
            value={data.roles ? data.roles.join(', ') : ''}
            onChange={handleRolesChange}
            placeholder="e.g. Software Engineer, Tech Lead, Product Manager"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Tagline</label>
        <input
          type="text"
          className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
          value={data.tagline || ''}
          onChange={e => updateField('tagline', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Bio / About Me</label>
        <textarea
          rows={4}
          className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
          value={data.bio || ''}
          onChange={e => updateField('bio', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">GitHub Link</label>
          <input
            type="text"
            className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
            value={data.github || ''}
            onChange={e => updateField('github', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">LinkedIn Link</label>
          <input
            type="text"
            className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
            value={data.linkedin || ''}
            onChange={e => updateField('linkedin', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Email</label>
          <input
            type="text"
            className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
            value={data.email || ''}
            onChange={e => updateField('email', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-divider pt-4">
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-2">Profile Photo</label>
          <FileUpload
            folder="profile"
            value={data.photo}
            onChange={val => updateField('photo', val)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-2">Resume PDF</label>
          <FileUpload
            folder="resumes"
            value={data.resume}
            onChange={val => updateField('resume', val)}
            accept="application/pdf"
          />
        </div>
      </div>
    </div>
  );
}

function SkillsEditor({ data = [], onChange }) {
  const addCategory = () => {
    onChange([...data, { category: 'New Category', items: [] }]);
  };

  const deleteCategory = (catIdx) => {
    const copy = [...data];
    copy.splice(catIdx, 1);
    onChange(copy);
  };

  const updateCategoryName = (catIdx, name) => {
    const copy = [...data];
    copy[catIdx].category = name;
    onChange(copy);
  };

  const addSkill = (catIdx) => {
    const copy = [...data];
    copy[catIdx].items.push({ name: 'New Skill', iconMode: 'auto' });
    onChange(copy);
  };

  const deleteSkill = (catIdx, skillIdx) => {
    const copy = [...data];
    copy[catIdx].items.splice(skillIdx, 1);
    onChange(copy);
  };

  const updateSkill = (catIdx, skillIdx, field, val) => {
    const copy = [...data];
    copy[catIdx].items[skillIdx] = { ...copy[catIdx].items[skillIdx], [field]: val };
    onChange(copy);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card border border-divider p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold font-heading">Technical Skills Sections</h3>
          <p className="text-xs text-textMuted">Divide your skills into logical buckets.</p>
        </div>
        <button onClick={addCategory} className="px-4 py-2 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl text-xs font-bold transition-all">
          + Add Category
        </button>
      </div>

      {data.map((cat, catIdx) => (
        <div key={catIdx} className="bg-card border border-divider p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-divider pb-3">
            <input
              type="text"
              className="bg-primary border border-divider rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-accentPrimary text-textMain w-64"
              value={cat.category}
              onChange={e => updateCategoryName(catIdx, e.target.value)}
            />
            <button onClick={() => deleteCategory(catIdx)} className="text-xs text-red-500 hover:underline">
              Delete Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cat.items.map((skill, skillIdx) => (
              <div key={skillIdx} className="bg-primary/40 border border-divider/60 p-4 rounded-xl flex flex-col gap-3 relative">
                <button
                  onClick={() => deleteSkill(catIdx, skillIdx)}
                  className="absolute top-3 right-3 text-textMuted hover:text-red-500 text-xs font-bold"
                >
                  ✕ Remove
                </button>

                <div className="w-5/6">
                  <label className="block text-xxs font-semibold text-textMuted uppercase mb-0.5">Skill Name</label>
                  <input
                    type="text"
                    className="w-full bg-card border border-divider rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-accentPrimary text-textMain"
                    value={skill.name}
                    onChange={e => updateSkill(catIdx, skillIdx, 'name', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xxs font-semibold text-textMuted uppercase mb-0.5">Icon Mode</label>
                    <select
                      className="w-full bg-card border border-divider rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-accentPrimary text-textMain"
                      value={skill.iconMode || 'auto'}
                      onChange={e => updateSkill(catIdx, skillIdx, 'iconMode', e.target.value)}
                    >
                      <option value="auto">Auto (React Icon)</option>
                      <option value="manual">Manual Icon Name</option>
                      <option value="custom">Custom File Upload</option>
                    </select>
                  </div>

                  {skill.iconMode === 'manual' && (
                    <div>
                      <label className="block text-xxs font-semibold text-textMuted uppercase mb-0.5">Icon Key</label>
                      <input
                        type="text"
                        className="w-full bg-card border border-divider rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-accentPrimary text-textMain"
                        value={skill.iconKey || ''}
                        onChange={e => updateSkill(catIdx, skillIdx, 'iconKey', e.target.value)}
                        placeholder="e.g. SiPython"
                      />
                    </div>
                  )}
                </div>

                {skill.iconMode === 'custom' && (
                  <div className="border-t border-divider/40 pt-2 mt-1">
                    <label className="block text-xxs font-semibold text-textMuted uppercase mb-1">Custom Icon Upload</label>
                    <FileUpload
                      folder="skills"
                      value={skill.customImage}
                      onChange={val => updateSkill(catIdx, skillIdx, 'customImage', val)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => addSkill(catIdx)} className="mt-2 py-2 border border-dashed border-divider hover:border-accentPrimary/50 hover:bg-accentPrimary/5 rounded-xl text-xs text-textMuted hover:text-accentPrimary transition-all text-center">
            + Add Skill to "{cat.category}"
          </button>
        </div>
      ))}
    </div>
  );
}

function TimelineEditor({ data = [], onChange, type }) {
  const addItem = () => {
    const newItem = type === 'experience'
      ? { role: 'New Job', company: 'New Company', location: 'Location', start: '', end: 'Present', bullets: [] }
      : { degree: 'New Degree', institution: 'New Institution', start: '', end: '', highlights: [] };
    onChange([newItem, ...data]);
  };

  const deleteItem = (idx) => {
    if (confirm('Delete this item?')) {
      const copy = [...data];
      copy.splice(idx, 1);
      onChange(copy);
    }
  };

  const moveItem = (idx, direction) => {
    const copy = [...data];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= copy.length) return;
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;
    onChange(copy);
  };

  const updateItemField = (idx, field, val) => {
    const copy = [...data];
    copy[idx] = { ...copy[idx], [field]: val };
    onChange(copy);
  };

  // Bullets/Highlights helpers
  const handleBulletChange = (idx, listField, bulletIdx, val) => {
    const copy = [...data];
    const listCopy = [...(copy[idx][listField] || [])];
    listCopy[bulletIdx] = val;
    copy[idx][listField] = listCopy;
    onChange(copy);
  };

  const addBullet = (idx, listField) => {
    const copy = [...data];
    const listCopy = [...(copy[idx][listField] || [])];
    listCopy.push('New bullet point');
    copy[idx][listField] = listCopy;
    onChange(copy);
  };

  const deleteBullet = (idx, listField, bulletIdx) => {
    const copy = [...data];
    const listCopy = [...(copy[idx][listField] || [])];
    listCopy.splice(bulletIdx, 1);
    copy[idx][listField] = listCopy;
    onChange(copy);
  };

  const listField = type === 'experience' ? 'bullets' : 'highlights';

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card border border-divider p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold font-heading">{type === 'experience' ? 'Work Experience' : 'Education History'}</h3>
          <p className="text-xs text-textMuted">Drag and drop reordering isn't native, but you can use the Up/Down arrows.</p>
        </div>
        <button onClick={addItem} className="px-4 py-2 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl text-xs font-bold transition-all">
          + Add Entry
        </button>
      </div>

      {data.map((item, idx) => (
        <div key={idx} className="bg-card border border-divider p-6 rounded-2xl flex flex-col gap-4 relative">
          {/* Top Actions */}
          <div className="flex justify-between items-center border-b border-divider pb-3">
            <h4 className="text-sm font-bold text-accentSecondary font-heading">
              Entry #{idx + 1}: {type === 'experience' ? (item.role || 'New Job') : (item.degree || 'New Degree')}
            </h4>
            <div className="flex items-center gap-3">
              <button disabled={idx === 0} onClick={() => moveItem(idx, -1)} className="text-xs hover:text-accentPrimary disabled:opacity-30">
                ↑ Move Up
              </button>
              <button disabled={idx === data.length - 1} onClick={() => moveItem(idx, 1)} className="text-xs hover:text-accentPrimary disabled:opacity-30">
                ↓ Move Down
              </button>
              <button onClick={() => deleteItem(idx)} className="text-xs text-red-500 hover:underline pl-3 border-l border-divider">
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {type === 'experience' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Role / Title</label>
                  <input
                    type="text"
                    className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                    value={item.role || ''}
                    onChange={e => updateItemField(idx, 'role', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                    value={item.company || ''}
                    onChange={e => updateItemField(idx, 'company', e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Degree / Course</label>
                  <input
                    type="text"
                    className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                    value={item.degree || ''}
                    onChange={e => updateItemField(idx, 'degree', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Institution</label>
                  <input
                    type="text"
                    className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                    value={item.institution || ''}
                    onChange={e => updateItemField(idx, 'institution', e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Start Date / Year</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.start || ''}
                onChange={e => updateItemField(idx, 'start', e.target.value)}
                placeholder="e.g. 2021-06 or 2018"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">End Date / Year</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.end || ''}
                onChange={e => updateItemField(idx, 'end', e.target.value)}
                placeholder="e.g. Present or 2022"
              />
            </div>

            {type === 'experience' && (
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Location</label>
                <input
                  type="text"
                  className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                  value={item.location || ''}
                  onChange={e => updateItemField(idx, 'location', e.target.value)}
                  placeholder="e.g. San Francisco, CA or Remote"
                />
              </div>
            )}
          </div>

          {/* Timeline Bullets / Highlights list */}
          <div className="border-t border-divider pt-3 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-textMuted uppercase">
                {type === 'experience' ? 'Key Contributions (Bullets)' : 'Highlights / GPA / Projects'}
              </label>
              <button
                onClick={() => addBullet(idx, listField)}
                className="text-xxs text-accentPrimary font-bold hover:underline"
              >
                + Add Bullet
              </button>
            </div>

            {(item[listField] || []).map((bullet, bulletIdx) => (
              <div key={bulletIdx} className="flex gap-2 items-center">
                <span className="text-textMuted text-xs font-bold">{bulletIdx + 1}.</span>
                <input
                  type="text"
                  className="flex-1 bg-primary border border-divider rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accentPrimary text-textMain"
                  value={bullet}
                  onChange={e => handleBulletChange(idx, listField, bulletIdx, e.target.value)}
                />
                <button
                  onClick={() => deleteBullet(idx, listField, bulletIdx)}
                  className="text-xs text-red-500 hover:text-red-600 px-1 font-bold"
                  title="Delete bullet"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsEditor({ data = [], onChange }) {
  const addItem = () => {
    const newItem = {
      title: 'New Project',
      slug: 'new-project',
      summary: 'A short overview of your project.',
      description: 'Full rich description of the project...',
      image: '',
      githubUrl: '',
      liveUrl: '',
      tags: ['React', 'Tailwind']
    };
    onChange([newItem, ...data]);
  };

  const deleteItem = (idx) => {
    if (confirm('Delete this project?')) {
      const copy = [...data];
      copy.splice(idx, 1);
      onChange(copy);
    }
  };

  const moveItem = (idx, direction) => {
    const copy = [...data];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= copy.length) return;
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;
    onChange(copy);
  };

  const updateItemField = (idx, field, val) => {
    const copy = [...data];
    copy[idx] = { ...copy[idx], [field]: val };
    onChange(copy);
  };

  const handleTagsChange = (idx, value) => {
    const tagsArray = value.split(',').map(t => t.trim());
    updateItemField(idx, 'tags', tagsArray);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card border border-divider p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold font-heading">Featured Projects</h3>
          <p className="text-xs text-textMuted">Visual CRUD form with direct image uploads.</p>
        </div>
        <button onClick={addItem} className="px-4 py-2 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl text-xs font-bold transition-all">
          + Add Project
        </button>
      </div>

      {data.map((item, idx) => (
        <div key={idx} className="bg-card border border-divider p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-divider pb-3">
            <h4 className="text-sm font-bold text-accentSecondary font-heading">
              Project: {item.title || 'New Project'}
            </h4>
            <div className="flex items-center gap-3">
              <button disabled={idx === 0} onClick={() => moveItem(idx, -1)} className="text-xs hover:text-accentPrimary disabled:opacity-30">
                ↑ Move Up
              </button>
              <button disabled={idx === data.length - 1} onClick={() => moveItem(idx, 1)} className="text-xs hover:text-accentPrimary disabled:opacity-30">
                ↓ Move Down
              </button>
              <button onClick={() => deleteItem(idx)} className="text-xs text-red-500 hover:underline pl-3 border-l border-divider">
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Project Title</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.title || ''}
                onChange={e => {
                  updateItemField(idx, 'title', e.target.value);
                  updateItemField(idx, 'slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Slug (auto-generated)</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain font-mono text-xs"
                value={item.slug || ''}
                disabled
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Short Summary</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.summary || ''}
                onChange={e => updateItemField(idx, 'summary', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Full Description</label>
              <textarea
                rows={3}
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.description || ''}
                onChange={e => updateItemField(idx, 'description', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">GitHub Repository Link</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.githubUrl || ''}
                onChange={e => updateItemField(idx, 'githubUrl', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Live URL Link</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.liveUrl || ''}
                onChange={e => updateItemField(idx, 'liveUrl', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Tags (comma separated)</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.tags ? item.tags.join(', ') : ''}
                onChange={e => handleTagsChange(idx, e.target.value)}
                placeholder="e.g. React, Node.js, GraphQL, PostgreSQL"
              />
            </div>
          </div>

          <div className="border-t border-divider pt-3">
            <label className="block text-xs font-semibold text-textMuted uppercase mb-2">Project Image</label>
            <FileUpload
              folder="projects"
              value={item.image}
              onChange={val => updateItemField(idx, 'image', val)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CaseStudiesEditor({ data = [], onChange }) {
  const addItem = () => {
    const newItem = {
      title: 'New Case Study',
      slug: 'new-case-study',
      cover: '',
      role: 'Lead Project Manager',
      problem: 'What was the problem?',
      approach: 'Execution approach / strategy.',
      result: 'Key numbers, outcomes, and business impact.',
      metrics: [],
      gallery: []
    };
    onChange([newItem, ...data]);
  };

  const deleteItem = (idx) => {
    if (confirm('Delete this case study?')) {
      const copy = [...data];
      copy.splice(idx, 1);
      onChange(copy);
    }
  };

  const updateItemField = (idx, field, val) => {
    const copy = [...data];
    copy[idx] = { ...copy[idx], [field]: val };
    onChange(copy);
  };

  const handleArrayChange = (idx, field, rawValue) => {
    const arr = rawValue.split(',').map(v => v.trim()).filter(Boolean);
    updateItemField(idx, field, arr);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card border border-divider p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold font-heading">Case Studies</h3>
          <p className="text-xs text-textMuted">In-depth reviews of your PM or engineering highlights.</p>
        </div>
        <button onClick={addItem} className="px-4 py-2 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl text-xs font-bold transition-all">
          + Add Case Study
        </button>
      </div>

      {data.map((item, idx) => (
        <div key={idx} className="bg-card border border-divider p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-divider pb-3">
            <h4 className="text-sm font-bold text-accentSecondary font-heading">
              Case Study: {item.title || 'New Case Study'}
            </h4>
            <button onClick={() => deleteItem(idx)} className="text-xs text-red-500 hover:underline">
              Delete Case Study
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Title</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.title || ''}
                onChange={e => {
                  updateItemField(idx, 'title', e.target.value);
                  updateItemField(idx, 'slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Your Role</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.role || ''}
                onChange={e => updateItemField(idx, 'role', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">The Problem</label>
              <textarea
                rows={2}
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.problem || ''}
                onChange={e => updateItemField(idx, 'problem', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">The Approach</label>
              <textarea
                rows={2}
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.approach || ''}
                onChange={e => updateItemField(idx, 'approach', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">The Result</label>
              <textarea
                rows={2}
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.result || ''}
                onChange={e => updateItemField(idx, 'result', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Metrics (comma separated)</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.metrics ? item.metrics.join(', ') : ''}
                onChange={e => handleArrayChange(idx, 'metrics', e.target.value)}
                placeholder="e.g. +40% efficiency, 0 data loss"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Gallery Image Paths (comma separated)</label>
              <input
                type="text"
                className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                value={item.gallery ? item.gallery.join(', ') : ''}
                onChange={e => handleArrayChange(idx, 'gallery', e.target.value)}
                placeholder="e.g. /images/case-studies/screen1.png, /images/case-studies/screen2.png"
              />
            </div>
          </div>

          <div className="border-t border-divider pt-3">
            <label className="block text-xs font-semibold text-textMuted uppercase mb-2">Cover Image</label>
            <FileUpload
              folder="case-studies"
              value={item.cover}
              onChange={val => updateItemField(idx, 'cover', val)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CertificationsEditor({ data = [], onChange }) {
  const addItem = () => {
    const newItem = {
      title: 'New Certification',
      issuer: 'Issuer',
      date: '2024-01',
      image: '',
      credentialUrl: ''
    };
    onChange([newItem, ...data]);
  };

  const deleteItem = (idx) => {
    if (confirm('Delete this certification?')) {
      const copy = [...data];
      copy.splice(idx, 1);
      onChange(copy);
    }
  };

  const updateItemField = (idx, field, val) => {
    const copy = [...data];
    copy[idx] = { ...copy[idx], [field]: val };
    onChange(copy);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card border border-divider p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold font-heading">Certifications & Badges</h3>
          <p className="text-xs text-textMuted">Display awards, courses, and certifications.</p>
        </div>
        <button onClick={addItem} className="px-4 py-2 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl text-xs font-bold transition-all">
          + Add Award
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data.map((item, idx) => (
          <div key={idx} className="bg-card border border-divider p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-divider pb-3">
              <h4 className="text-sm font-bold text-accentSecondary font-heading">
                Award #{idx + 1}: {item.title || 'New Certification'}
              </h4>
              <button onClick={() => deleteItem(idx)} className="text-xs text-red-500 hover:underline">
                Delete
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Certification Name</label>
                <input
                  type="text"
                  className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                  value={item.title || ''}
                  onChange={e => updateItemField(idx, 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Issuer / Organization</label>
                <input
                  type="text"
                  className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                  value={item.issuer || ''}
                  onChange={e => updateItemField(idx, 'issuer', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Date Issued</label>
                <input
                  type="text"
                  className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                  value={item.date || ''}
                  onChange={e => updateItemField(idx, 'date', e.target.value)}
                  placeholder="e.g. 2024-03"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Verification Link</label>
                <input
                  type="text"
                  className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
                  value={item.credentialUrl || ''}
                  onChange={e => updateItemField(idx, 'credentialUrl', e.target.value)}
                />
              </div>
            </div>

            <div className="border-t border-divider pt-3">
              <label className="block text-xs font-semibold text-textMuted uppercase mb-2">Badge Image</label>
              <FileUpload
                folder="certifications"
                value={item.image}
                onChange={val => updateItemField(idx, 'image', val)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SiteConfigEditor({ data = {}, onChange }) {
  const updateField = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  const handleLinksChange = (e) => {
    const list = e.target.value.split(',').map(l => l.trim());
    updateField('navLinks', list);
  };

  return (
    <div className="bg-card border border-divider p-6 rounded-2xl flex flex-col gap-5">
      <h3 className="text-lg font-bold font-heading border-b border-divider pb-2">Global Site Configuration</h3>

      <div>
        <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Navbar Section Links (comma separated)</label>
        <input
          type="text"
          className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain font-mono text-xs"
          value={data.navLinks ? data.navLinks.join(', ') : ''}
          onChange={handleLinksChange}
        />
        <p className="text-xxs text-textMuted mt-1">Make sure the sections match the lowercase IDs on the homepage (e.g. About, Skills, Experience, Projects).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Default Color Theme</label>
          <select
            className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
            value={data.defaultTheme || 'dark'}
            onChange={e => updateField('defaultTheme', e.target.value)}
          >
            <option value="dark">Dark Mode</option>
            <option value="light">Light Mode</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Formspree Endpoint ID (Contact Form)</label>
          <input
            type="text"
            className="w-full bg-primary border border-divider rounded-xl p-3 text-sm focus:outline-none focus:border-accentPrimary text-textMain"
            value={data.formspreeEndpoint || ''}
            onChange={e => updateField('formspreeEndpoint', e.target.value)}
            placeholder="e.g. https://formspree.io/f/xyzkjkl"
          />
        </div>
      </div>
    </div>
  );
}

