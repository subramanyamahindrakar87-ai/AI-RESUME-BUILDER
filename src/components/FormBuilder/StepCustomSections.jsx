import React, { useState } from 'react';
import { Layers, Plus, Trash2, X } from 'lucide-react';

export const StepCustomSections = ({ data, onChange }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newItemText, setNewItemText] = useState({});

  const customSections = data.customSections || [];

  const handleUpdate = (updatedSections) => {
    onChange({
      ...data,
      customSections: updatedSections
    });
  };

  const addSection = () => {
    if (!newTitle.trim()) return;
    const newSec = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      items: ["Example item entry 1", "Example item entry 2"]
    };
    handleUpdate([...customSections, newSec]);
    setNewTitle('');
  };

  const removeSection = (secId) => {
    handleUpdate(customSections.filter(s => s.id !== secId));
  };

  const addItemToSection = (secId) => {
    const val = (newItemText[secId] || '').trim();
    if (!val) return;

    handleUpdate(customSections.map(sec => {
      if (sec.id === secId) {
        return { ...sec, items: [...sec.items, val] };
      }
      return sec;
    }));

    setNewItemText(prev => ({ ...prev, [secId]: '' }));
  };

  const removeItemFromSection = (secId, itemIdx) => {
    handleUpdate(customSections.map(sec => {
      if (sec.id === secId) {
        return { ...sec, items: sec.items.filter((_, idx) => idx !== itemIdx) };
      }
      return sec;
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Custom Resume Sections
          </h3>
          <p className="text-xs text-slate-400">Add custom sections like Languages Spoken, Speaking Engagements, Patents, or Volunteer Work</p>
        </div>
      </div>

      {/* Add New Custom Section Input */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New Section Title (e.g. Publications, Volunteer Work, Speaking Engagements)..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={addSection}
          disabled={!newTitle.trim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md disabled:opacity-40 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Section
        </button>
      </div>

      {/* List of Custom Sections */}
      {customSections.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <p className="text-xs text-slate-400">No custom sections added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {customSections.map((sec) => (
            <div key={sec.id} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-indigo-300">{sec.title}</h4>
                <button
                  onClick={() => removeSection(sec.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded-lg"
                  title="Remove Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-1.5">
                {sec.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                    <span>• {item}</span>
                    <button
                      type="button"
                      onClick={() => removeItemFromSection(sec.id, iIdx)}
                      className="text-slate-500 hover:text-rose-400 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Item Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder={`Add entry to ${sec.title}...`}
                  value={newItemText[sec.id] || ''}
                  onChange={(e) => setNewItemText(prev => ({ ...prev, [sec.id]: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItemToSection(sec.id); } }}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => addItemToSection(sec.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Add Entry
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
