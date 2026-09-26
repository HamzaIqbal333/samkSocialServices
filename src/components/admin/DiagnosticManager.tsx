import { useState } from 'react';
import { Plus, Edit2, Trash2, X, CheckSquare, ArrowUp, ArrowDown } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { DiagnosticItem } from '../../types';

export function DiagnosticManager() {
  const { content, updateSection, isSaving } = useContent();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const emptyItem: DiagnosticItem = {
    num: String(content.checklist.items.length + 1).padStart(2, '0'),
    title: '',
    desc: '',
    image: '/images/editorial-fashion-shoot.jpg',
    caption: 'EDITORIAL CAPTURE • POSITIONING',
    quote: ''
  };

  const [formData, setFormData] = useState<DiagnosticItem>(emptyItem);

  const startEdit = (item: DiagnosticItem, index: number) => {
    setEditingIndex(index);
    setIsAddingNew(false);
    setFormData({ ...item });
  };

  const startAddNew = () => {
    setIsAddingNew(true);
    setEditingIndex(null);
    setFormData({
      ...emptyItem,
      num: String(content.checklist.items.length + 1).padStart(2, '0')
    });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setIsAddingNew(false);
    setFormData(emptyItem);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('Please fill in the title.');
      return;
    }

    let updatedList: DiagnosticItem[] = [];

    if (isAddingNew) {
      updatedList = [...content.checklist.items, formData];
    } else if (editingIndex !== null) {
      updatedList = content.checklist.items.map((item, idx) =>
        idx === editingIndex ? formData : item
      );
    }

    // Auto-normalize numbers (01, 02, etc.)
    const normalized = updatedList.map((item, idx) => ({
      ...item,
      num: String(idx + 1).padStart(2, '0')
    }));

    await updateSection('checklist', {
      ...content.checklist,
      items: normalized
    });

    cancelEdit();
  };

  const handleDelete = async (index: number, title: string) => {
    if (content.checklist.items.length <= 1) {
      alert('You must have at least one diagnostic checklist item.');
      return;
    }

    const confirm = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirm) return;

    const filtered = content.checklist.items.filter((_, idx) => idx !== index);
    const normalized = filtered.map((item, idx) => ({
      ...item,
      num: String(idx + 1).padStart(2, '0')
    }));

    await updateSection('checklist', {
      ...content.checklist,
      items: normalized
    });

    if (editingIndex === index) cancelEdit();
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= content.checklist.items.length) return;

    const list = [...content.checklist.items];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const normalized = list.map((item, idx) => ({
      ...item,
      num: String(idx + 1).padStart(2, '0')
    }));

    await updateSection('checklist', {
      ...content.checklist,
      items: normalized
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#251D18]">
        <div>
          <h4 className="text-base sm:text-lg font-heading font-medium text-[#FAF8F5] flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#A38468]" />
            <span>Interactive Diagnostic Checklist ({content.checklist.items.length})</span>
          </h4>
          <p className="text-xs text-[#8E7158]">
            Full CRUD: Add strategic checklist diagnostic points, editorial insights, and paired visuals.
          </p>
        </div>

        {!isAddingNew && editingIndex === null && (
          <button
            onClick={startAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Checklist Item</span>
          </button>
        )}
      </div>

      {/* CREATE / EDIT FORM */}
      {(isAddingNew || editingIndex !== null) && (
        <div className="p-6 rounded-2xl border border-[#A38468]/50 bg-[#16100E] shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#2A201A] pb-3">
            <h5 className="text-sm font-heading font-medium text-[#FAF8F5] uppercase tracking-wider">
              {isAddingNew ? 'Create New Diagnostic Point' : `Edit Item #${formData.num}`}
            </h5>
            <button
              onClick={cancelEdit}
              className="p-1.5 rounded-full text-[#8E7158] hover:text-[#FAF8F5] hover:bg-[#231A15] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#A38468] font-medium">
              Checklist Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Visual Hierarchy & Aesthetic Distinction"
              className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
              Diagnostic Description
            </label>
            <textarea
              rows={3}
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              placeholder="Explain why this element matters for high-converting brand perception..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468] resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
              Founder Strategy Quote / Pro Tip
            </label>
            <input
              type="text"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="e.g. If your visual standards drop, so does your pricing authority."
              className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Visual Card Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/editorial-fashion-shoot.jpg"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Visual Card Caption
              </label>
              <input
                type="text"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                placeholder="EDITORIAL CAPTURE • VISUAL IDENTITY"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
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
              {isSaving ? 'Saving...' : isAddingNew ? 'Add Item' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* ITEMS LIST */}
      <div className="space-y-3">
        {content.checklist.items.map((item, index) => (
          <div
            key={item.num}
            className={`p-4 rounded-2xl border transition-all ${
              editingIndex === index
                ? 'border-[#A38468] bg-[#1A1412]'
                : 'border-[#2D231E] bg-[#16110F] hover:border-[#3D3029]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-serif italic text-[#A38468]">{item.num}</span>
                  <h5 className="text-sm font-heading font-medium text-[#FAF8F5] truncate">
                    {item.title}
                  </h5>
                </div>
                <p className="text-xs text-[#8E7158] line-clamp-1">{item.desc}</p>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button
                  onClick={() => moveOrder(index, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded border border-[#2D231E] text-[#8E7158] hover:text-[#FAF8F5] disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveOrder(index, 'down')}
                  disabled={index === content.checklist.items.length - 1}
                  className="p-1 rounded border border-[#2D231E] text-[#8E7158] hover:text-[#FAF8F5] disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => startEdit(item, index)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#3A2E28] bg-[#1E1714] text-xs text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468]"
                >
                  <Edit2 className="w-3 h-3 text-[#A38468]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(index, item.title)}
                  className="p-1.5 text-[#8E7158] hover:text-red-400 transition-colors"
                  title="Delete"
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
