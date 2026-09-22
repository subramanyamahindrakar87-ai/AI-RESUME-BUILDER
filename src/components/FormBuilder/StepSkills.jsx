import React, { useState } from 'react';
import { Cpu, Plus, X, Tag } from 'lucide-react';

export const StepSkills = ({ data, onChange }) => {
  const [newSkillText, setNewSkillText] = useState({});

  const handleUpdate = (updatedSkills) => {
    onChange({
      ...data,
      skills: updatedSkills
    });
  };

  const addCategory = () => {
    const newCat = {
      category: "New Skill Group",
      items: ["Skill 1", "Skill 2"]
    };
    handleUpdate([...data.skills, newCat]);
  };

  const removeCategory = (catIdx) => {
    handleUpdate(data.skills.filter((_, idx) => idx !== catIdx));
  };

  const updateCategoryTitle = (catIdx, title) => {
    handleUpdate(data.skills.map((cat, idx) => idx === catIdx ? { ...cat, category: title } : cat));
  };

  const addSkillItem = (catIdx) => {
    const val = (newSkillText[catIdx] || '').trim();
    if (!val) return;

    handleUpdate(data.skills.map((cat, idx) => {
      if (idx === catIdx) {
        return { ...cat, items: [...cat.items, val] };
      }
      return cat;
    }));

    setNewSkillText(prev => ({ ...prev, [catIdx]: '' }));
  };

  const removeSkillItem = (catIdx, itemIdx) => {
    handleUpdate(data.skills.map((cat, idx) => {
      if (idx === catIdx) {
        return { ...cat, items: cat.items.filter((_, i) => i !== itemIdx) };
      }
      return cat;
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            Skills & Competencies
          </h3>
          <p className="text-xs text-slate-400">Group your skills by category for ATS readability</p>
        </div>

        <button
          type="button"
          onClick={addCategory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Group</span>
        </button>
      </div>

      <div className="space-y-4">
        {data.skills.map((cat, catIdx) => (
          <div key={catIdx} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={cat.category}
                onChange={(e) => updateCategoryTitle(catIdx, e.target.value)}
                className="bg-transparent text-sm font-bold text-indigo-300 border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1 py-0.5 transition-all"
                placeholder="Category Name"
              />

              <button
                onClick={() => removeCategory(catIdx)}
                className="text-xs text-slate-500 hover:text-rose-400 p-1"
                title="Remove Category"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {cat.items.map((item, iIdx) => (
                <span
                  key={iIdx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs font-medium group"
                >
                  {item}
                  <button
                    onClick={() => removeSkillItem(catIdx, iIdx)}
                    className="text-indigo-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Skill Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Type a skill and press enter..."
                value={newSkillText[catIdx] || ''}
                onChange={(e) => setNewSkillText(prev => ({ ...prev, [catIdx]: e.target.value }))}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkillItem(catIdx); } }}
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => addSkillItem(catIdx)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Add Skill
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
