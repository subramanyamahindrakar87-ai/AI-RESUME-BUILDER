import React from 'react';
import { FolderGit2, Plus, Trash2, Globe, Github } from 'lucide-react';

export const StepProjects = ({ data, onChange }) => {
  const handleUpdate = (updatedProjects) => {
    onChange({
      ...data,
      projects: updatedProjects
    });
  };

  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "New Innovative Project",
      description: "A modern web application built to solve real-world workflow challenges.",
      techStack: ["React", "Node.js", "Tailwind CSS"],
      github: "https://github.com",
      liveDemo: "https://example.com"
    };
    handleUpdate([...data.projects, newProj]);
  };

  const removeProject = (id) => {
    handleUpdate(data.projects.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    handleUpdate(data.projects.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const updateTechStack = (id, stackStr) => {
    const tags = stackStr.split(',').map(s => s.trim()).filter(Boolean);
    updateItem(id, 'techStack', tags);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            Projects & Highlights
          </h3>
          <p className="text-xs text-slate-400">Showcase technical projects, open-source work, and live apps</p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {data.projects.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <p className="text-sm text-slate-400">No projects added yet.</p>
          <button
            onClick={addProject}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project Entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.projects.map((proj, pIdx) => (
            <div key={proj.id || pIdx} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                  Project #{pIdx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeProject(proj.id)}
                  className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={proj.title || ''}
                    onChange={(e) => updateItem(proj.id, 'title', e.target.value)}
                    placeholder="e.g. AI Workflow Platform"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={proj.description || ''}
                    onChange={(e) => updateItem(proj.id, 'description', e.target.value)}
                    placeholder="Summary of what the project does and key achievements..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={(proj.techStack || []).join(', ')}
                    onChange={(e) => updateTechStack(proj.id, e.target.value)}
                    placeholder="React, TypeScript, Node.js"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <Github className="w-3.5 h-3.5" /> GitHub Link
                    </label>
                    <input
                      type="text"
                      value={proj.github || ''}
                      onChange={(e) => updateItem(proj.id, 'github', e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> Live Demo Link
                    </label>
                    <input
                      type="text"
                      value={proj.liveDemo || ''}
                      onChange={(e) => updateItem(proj.id, 'liveDemo', e.target.value)}
                      placeholder="https://demo.app"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
