import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Wand2, Loader2, Calendar, MapPin, Building } from 'lucide-react';
import { enhanceBulletPoint } from '../../services/aiService';

export const StepExperience = ({ data, onChange, apiKey }) => {
  const [loadingMap, setLoadingMap] = useState({});

  const handleUpdate = (updatedList) => {
    onChange({
      ...data,
      experience: updatedList
    });
  };

  const addExperience = () => {
    const newEntry = {
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ["Architected scalable solutions driving customer satisfaction and performance."]
    };
    handleUpdate([...data.experience, newEntry]);
  };

  const removeExperience = (id) => {
    handleUpdate(data.experience.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    handleUpdate(data.experience.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addBullet = (expId) => {
    handleUpdate(data.experience.map(item => {
      if (item.id === expId) {
        return { ...item, description: [...(item.description || []), ""] };
      }
      return item;
    }));
  };

  const updateBullet = (expId, bulletIndex, value) => {
    handleUpdate(data.experience.map(item => {
      if (item.id === expId) {
        const newDescs = [...item.description];
        newDescs[bulletIndex] = value;
        return { ...item, description: newDescs };
      }
      return item;
    }));
  };

  const removeBullet = (expId, bulletIndex) => {
    handleUpdate(data.experience.map(item => {
      if (item.id === expId) {
        return { ...item, description: item.description.filter((_, idx) => idx !== bulletIndex) };
      }
      return item;
    }));
  };

  const handleEnhanceBullet = async (expId, bulletIndex, currentText) => {
    const key = `${expId}-${bulletIndex}`;
    setLoadingMap(prev => ({ ...prev, [key]: true }));

    try {
      const enhanced = await enhanceBulletPoint(currentText, apiKey);
      updateBullet(expId, bulletIndex, enhanced);
    } catch (err) {
      console.error("Enhance error:", err);
    } finally {
      setLoadingMap(prev => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            Work Experience
          </h3>
          <p className="text-xs text-slate-400">Add your work history and highlight key accomplishments</p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {data.experience.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <p className="text-sm text-slate-400">No work experience added yet.</p>
          <button
            onClick={addExperience}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white"
          >
            <Plus className="w-3.5 h-3.5" /> Add Work Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.experience.map((exp, expIdx) => (
            <div 
              key={exp.id || expIdx} 
              className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                  Position #{expIdx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                  title="Remove Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Job Role / Title</label>
                  <input
                    type="text"
                    value={exp.role || ''}
                    onChange={(e) => updateItem(exp.id, 'role', e.target.value)}
                    placeholder="Senior Frontend Developer"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" /> Company Name
                  </label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => updateItem(exp.id, 'company', e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location
                  </label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => updateItem(exp.id, 'location', e.target.value)}
                    placeholder="New York, NY"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Start Date
                    </label>
                    <input
                      type="text"
                      value={exp.startDate || ''}
                      onChange={(e) => updateItem(exp.id, 'startDate', e.target.value)}
                      placeholder="Jan 2021"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? "Present" : (exp.endDate || '')}
                      onChange={(e) => updateItem(exp.id, 'endDate', e.target.value)}
                      placeholder="Present"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300">Bullet Points & Accomplishments</label>
                  <button
                    type="button"
                    onClick={() => addBullet(exp.id)}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Bullet
                  </button>
                </div>

                {exp.description && exp.description.map((bullet, bIdx) => {
                  const key = `${exp.id}-${bIdx}`;
                  const isEnhancing = loadingMap[key];

                  return (
                    <div key={bIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                        placeholder="Describe key achievement or responsibility..."
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
                      />

                      {/* AI Enhance Magic Button */}
                      <button
                        type="button"
                        onClick={() => handleEnhanceBullet(exp.id, bIdx, bullet)}
                        disabled={isEnhancing}
                        className="px-2.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-xs font-semibold flex items-center gap-1 shrink-0 transition-all disabled:opacity-50"
                        title="AI Rewrite & Enhance"
                      >
                        {isEnhancing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{isEnhancing ? "Polishing..." : "AI Polish"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => removeBullet(exp.id, bIdx)}
                        className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
