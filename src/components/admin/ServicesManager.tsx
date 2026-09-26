import { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, ArrowUp, ArrowDown, Sparkles, Layers } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { ServiceItem } from '../../types';
import { getAssetUrl } from '../../utils/assetUrl';
import { ImageDualInput } from './ImageDualInput';

export function ServicesManager() {
  const { content, updateSection, isSaving } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form state for editing or creating
  const emptyService: ServiceItem = {
    id: '',
    num: String((content.services.length + 1)).padStart(2, '0'),
    name: '',
    badge: 'Exclusive Retainer',
    scopeLabel: 'Bespoke Package',
    tagline: '',
    description: '',
    deliverables: [''],
    image: '/images/workspace-travertine.jpg',
    caption: 'STUDIO ARCHIVE • EDITORIAL STRATEGY'
  };

  const [formData, setFormData] = useState<ServiceItem>(emptyService);

  const startEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setIsAddingNew(false);
    setFormData({
      ...service,
      deliverables: service.deliverables?.length ? [...service.deliverables] : ['']
    });
  };

  const startAddNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      ...emptyService,
      id: `srv-${Date.now()}`,
      num: String(content.services.length + 1).padStart(2, '0')
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setFormData(emptyService);
  };

  const handleDeliverableChange = (index: number, val: string) => {
    const list = [...formData.deliverables];
    list[index] = val;
    setFormData({ ...formData, deliverables: list });
  };

  const addDeliverableRow = () => {
    setFormData({
      ...formData,
      deliverables: [...formData.deliverables, '']
    });
  };

  const removeDeliverableRow = (index: number) => {
    const list = formData.deliverables.filter((_, i) => i !== index);
    setFormData({ ...formData, deliverables: list.length ? list : [''] });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Please provide a service title.');
      return;
    }

    const cleanedDeliverables = formData.deliverables
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const payload: ServiceItem = {
      ...formData,
      deliverables: cleanedDeliverables.length ? cleanedDeliverables : ['Custom bespoke deliverables']
    };

    let updatedList: ServiceItem[] = [];

    if (isAddingNew) {
      updatedList = [...content.services, payload];
    } else {
      updatedList = content.services.map((srv) => (srv.id === editingId ? payload : srv));
    }

    // Auto-normalize numbers (01, 02, etc.)
    const normalized = updatedList.map((srv, idx) => ({
      ...srv,
      num: String(idx + 1).padStart(2, '0')
    }));

    await updateSection('services', normalized);
    cancelEdit();
  };

  const handleDelete = async (id: string, name: string) => {
    if (content.services.length <= 1) {
      alert('You must have at least one active service on the website.');
      return;
    }

    const confirm = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirm) return;

    const filtered = content.services.filter((srv) => srv.id !== id);
    const normalized = filtered.map((srv, idx) => ({
      ...srv,
      num: String(idx + 1).padStart(2, '0')
    }));

    await updateSection('services', normalized);
    if (editingId === id) cancelEdit();
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= content.services.length) return;

    const list = [...content.services];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const normalized = list.map((srv, idx) => ({
      ...srv,
      num: String(idx + 1).padStart(2, '0')
    }));

    await updateSection('services', normalized);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#251D18]">
        <div>
          <h4 className="text-base sm:text-lg font-heading font-medium text-[#FAF8F5] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#A38468]" />
            <span>Studio Services & Packages ({content.services.length})</span>
          </h4>
          <p className="text-xs text-[#8E7158]">
            Full CRUD: Add new services, edit deliverables, reorder priority, or remove packages.
          </p>
        </div>

        {!isAddingNew && !editingId && (
          <button
            onClick={startAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Service</span>
          </button>
        )}
      </div>

      {/* CREATE / EDIT MODAL FORM */}
      {(isAddingNew || editingId) && (
        <div className="p-6 rounded-2xl border border-[#A38468]/50 bg-[#16100E] shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#2A201A] pb-3">
            <h5 className="text-sm font-heading font-medium text-[#FAF8F5] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A38468]" />
              <span>{isAddingNew ? 'Create New Service Package' : `Edit Service: ${formData.name}`}</span>
            </h5>
            <button
              onClick={cancelEdit}
              className="p-1.5 rounded-full text-[#8E7158] hover:text-[#FAF8F5] hover:bg-[#231A15] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#A38468] font-medium">
                Service Title *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. VIP Bespoke Creative Retainer"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Badge / Frequency Pill
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Monthly Retainer • 3 Slots Open"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Scope Label
              </label>
              <input
                type="text"
                value={formData.scopeLabel}
                onChange={(e) => setFormData({ ...formData, scopeLabel: e.target.value })}
                placeholder="e.g. Done-For-You Growth"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Tagline (Italic Under Title)
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. High-touch, complete social presence."
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
              Full Description Paragraph
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the scope, outcome, and who this package is for..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468] resize-none"
            />
          </div>

          {/* Deliverables Checklist Builder */}
          <div className="space-y-2 pt-2 border-t border-[#251D18]">
            <div className="flex items-center justify-between">
              <label className="text-[11px] uppercase tracking-wider text-[#A38468] font-medium">
                Key Inclusions & Deliverables ({formData.deliverables.length})
              </label>
              <button
                type="button"
                onClick={addDeliverableRow}
                className="text-[11px] uppercase tracking-wider text-[#FAF8F5] hover:text-[#A38468] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Deliverable</span>
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {formData.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs text-[#8E7158] w-4">{idx + 1}.</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleDeliverableChange(idx, e.target.value)}
                    placeholder={`Deliverable #${idx + 1}`}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-[#2D231E] bg-[#120D0B] text-xs sm:text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                  />
                  <button
                    type="button"
                    onClick={() => removeDeliverableRow(idx)}
                    className="p-1.5 text-[#8E7158] hover:text-red-400 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Archive Card Image & Caption */}
          <div className="space-y-4 pt-2 border-t border-[#251D18]">
            <ImageDualInput
              label="Service Archive Image"
              value={formData.image}
              onChange={(newImg) => setFormData({ ...formData, image: newImg })}
              maxWidth={900}
              maxHeight={700}
              quality={0.85}
              placeholder="/images/workspace-travertine.jpg or paste image URL"
              previewShape="rounded"
            />

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Card Image Caption
              </label>
              <input
                type="text"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                placeholder="STUDIO ARCHIVE • CURATION & PLANNING"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-xs text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#251D18]">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 rounded-full border border-[#3A2E28] text-xs text-[#8E7158] hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer shadow-md"
            >
              {isSaving ? 'Saving to Firestore...' : isAddingNew ? 'Create Service' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* SERVICES LIST */}
      <div className="space-y-4">
        {content.services.map((service, index) => (
          <div
            key={service.id}
            className={`p-5 rounded-2xl border transition-all ${
              editingId === service.id
                ? 'border-[#A38468] bg-[#1A1412]'
                : 'border-[#2D231E] bg-[#16110F] hover:border-[#3D3029]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-serif italic text-[#A38468]">
                    {service.num}
                  </span>
                  <h5 className="text-base font-heading font-medium text-[#FAF8F5] truncate">
                    {service.name}
                  </h5>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#3A2E28] bg-[#120D0B] text-[#C4B29E]">
                    {service.badge}
                  </span>
                </div>
                <p className="text-xs text-[#8E7158] line-clamp-1">
                  {service.tagline || service.description}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#A38468]/90">
                  <span>{service.deliverables?.length || 0} Deliverables included</span>
                  <span>•</span>
                  <span className="truncate max-w-xs">{service.caption}</span>
                </div>
              </div>

              {/* Action Buttons: Reorder, Edit, Delete */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                {/* Reorder Up */}
                <button
                  onClick={() => moveOrder(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg border border-[#2D231E] bg-[#120D0B] text-[#8E7158] hover:text-[#FAF8F5] hover:border-[#A38468] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                {/* Reorder Down */}
                <button
                  onClick={() => moveOrder(index, 'down')}
                  disabled={index === content.services.length - 1}
                  className="p-1.5 rounded-lg border border-[#2D231E] bg-[#120D0B] text-[#8E7158] hover:text-[#FAF8F5] hover:border-[#A38468] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => startEdit(service)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#3A2E28] bg-[#1E1714] text-xs text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-[#A38468]" />
                  <span>Edit</span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(service.id, service.name)}
                  className="p-1.5 rounded-lg text-[#8E7158] hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
