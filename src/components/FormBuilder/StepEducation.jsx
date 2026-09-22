import React from 'react';
import { GraduationCap, Plus, Trash2, Calendar, MapPin } from 'lucide-react';

export const StepEducation = ({ data, onChange }) => {
  const handleUpdate = (updatedList) => {
    onChange({
      ...data,
      education: updatedList
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: "B.S. in Computer Science",
      institution: "State University",
      location: "City, State",
      startDate: "2018",
      endDate: "2022",
      gpa: "3.8 / 4.0",
      honors: "Dean's List"
    };
    handleUpdate([...data.education, newEdu]);
  };

  const removeEducation = (id) => {
    handleUpdate(data.education.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    handleUpdate(data.education.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            Education & Academic History
          </h3>
          <p className="text-xs text-slate-400">Degrees, certifications, academic institutions, and honors</p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      {data.education.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <p className="text-sm text-slate-400">No education entries added yet.</p>
          <button
            onClick={addEducation}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white"
          >
            <Plus className="w-3.5 h-3.5" /> Add Degree
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.education.map((edu, idx) => (
            <div 
              key={edu.id || idx} 
              className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                  Education #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Certification</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => updateItem(edu.id, 'degree', e.target.value)}
                    placeholder="B.S. in Computer Science"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">University / School Name</label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => updateItem(edu.id, 'institution', e.target.value)}
                    placeholder="Stanford University"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => updateItem(edu.id, 'location', e.target.value)}
                    placeholder="Stanford, CA"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Start Year</label>
                    <input
                      type="text"
                      value={edu.startDate || ''}
                      onChange={(e) => updateItem(edu.id, 'startDate', e.target.value)}
                      placeholder="2018"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">End Year</label>
                    <input
                      type="text"
                      value={edu.endDate || ''}
                      onChange={(e) => updateItem(edu.id, 'endDate', e.target.value)}
                      placeholder="2022"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GPA / Score (Optional)</label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateItem(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8 / 4.0"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Honors / Achievements</label>
                  <input
                    type="text"
                    value={edu.honors || ''}
                    onChange={(e) => updateItem(edu.id, 'honors', e.target.value)}
                    placeholder="Magna Cum Laude"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
