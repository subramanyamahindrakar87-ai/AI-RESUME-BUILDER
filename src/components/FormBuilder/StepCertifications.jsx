import React from 'react';
import { Award, Plus, Trash2, Calendar, Link } from 'lucide-react';

export const StepCertifications = ({ data, onChange }) => {
  const handleUpdate = (updatedCerts) => {
    onChange({
      ...data,
      certifications: updatedCerts
    });
  };

  const addCert = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialUrl: "https://aws.amazon.com/certification"
    };
    handleUpdate([...data.certifications, newCert]);
  };

  const removeCert = (id) => {
    handleUpdate(data.certifications.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    handleUpdate(data.certifications.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            Certifications & Licenses
          </h3>
          <p className="text-xs text-slate-400">Professional credentials, badges, and verified achievements</p>
        </div>

        <button
          type="button"
          onClick={addCert}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Cert</span>
        </button>
      </div>

      {data.certifications.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <p className="text-sm text-slate-400">No certifications added yet.</p>
          <button
            onClick={addCert}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white"
          >
            <Plus className="w-3.5 h-3.5" /> Add Certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.certifications.map((cert, cIdx) => (
            <div key={cert.id || cIdx} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                  Credential #{cIdx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeCert(cert.id)}
                  className="text-slate-400 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Certification Name</label>
                  <input
                    type="text"
                    value={cert.title || ''}
                    onChange={(e) => updateItem(cert.id, 'title', e.target.value)}
                    placeholder="Google Cloud Architect"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.issuer || ''}
                    onChange={(e) => updateItem(cert.id, 'issuer', e.target.value)}
                    placeholder="Google Cloud"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Issue Year / Date</label>
                  <input
                    type="text"
                    value={cert.date || ''}
                    onChange={(e) => updateItem(cert.id, 'date', e.target.value)}
                    placeholder="2023"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Credential URL (Optional)</label>
                  <input
                    type="text"
                    value={cert.credentialUrl || ''}
                    onChange={(e) => updateItem(cert.id, 'credentialUrl', e.target.value)}
                    placeholder="https://..."
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
