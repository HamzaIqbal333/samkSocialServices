import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Quote, ArrowUp, ArrowDown, Star } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { TestimonialItem } from '../../types';
import { getAssetUrl } from '../../utils/assetUrl';
import { ImageDualInput } from './ImageDualInput';

export function TestimonialsManager() {
  const { content, updateSection, isSaving } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const emptyTestimonial: TestimonialItem = {
    id: '',
    name: '',
    role: '',
    quote: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  };

  const [formData, setFormData] = useState<TestimonialItem>(emptyTestimonial);

  const startEdit = (item: TestimonialItem) => {
    setEditingId(item.id);
    setIsAddingNew(false);
    setFormData({ ...item });
  };

  const startAddNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      ...emptyTestimonial,
      id: `test-${Date.now()}`
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setFormData(emptyTestimonial);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.quote.trim()) {
      alert('Please fill in both the client name and testimonial quote.');
      return;
    }

    let updatedList: TestimonialItem[] = [];

    if (isAddingNew) {
      updatedList = [...content.testimonials, formData];
    } else {
      updatedList = content.testimonials.map((item) =>
        item.id === editingId ? formData : item
      );
    }

    await updateSection('testimonials', updatedList);
    cancelEdit();
  };

  const handleDelete = async (id: string, name: string) => {
    if (content.testimonials.length <= 1) {
      alert('You must have at least one client testimonial.');
      return;
    }

    const confirm = window.confirm(`Are you sure you want to delete the testimonial from "${name}"?`);
    if (!confirm) return;

    const filtered = content.testimonials.filter((item) => item.id !== id);
    await updateSection('testimonials', filtered);

    if (editingId === id) cancelEdit();
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= content.testimonials.length) return;

    const list = [...content.testimonials];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    await updateSection('testimonials', list);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#251D18]">
        <div>
          <h4 className="text-base sm:text-lg font-heading font-medium text-[#FAF8F5] flex items-center gap-2">
            <Quote className="w-4 h-4 text-[#A38468]" />
            <span>Client Testimonials & Quotes ({content.testimonials.length})</span>
          </h4>
          <p className="text-xs text-[#8E7158]">
            Full CRUD: Add new founder quotes, edit reviews, update headshots, or change marquee flow order.
          </p>
        </div>

        {!isAddingNew && !editingId && (
          <button
            onClick={startAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Testimonial</span>
          </button>
        )}
      </div>

      {/* CREATE / EDIT FORM */}
      {(isAddingNew || editingId) && (
        <div className="p-6 rounded-2xl border border-[#A38468]/50 bg-[#16100E] shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#2A201A] pb-3">
            <h5 className="text-sm font-heading font-medium text-[#FAF8F5] uppercase tracking-wider">
              {isAddingNew ? 'Create New Client Testimonial' : `Edit Review: ${formData.name}`}
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
                Founder / Client Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Natasha Vance"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Role & Studio / Brand Name
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Founder, Maison Solène Sydney"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>
          </div>

          {/* Client Headshot Dual Input (Option 1: Upload from Computer, Option 2: Image URL) */}
          <ImageDualInput
            label="Client Headshot Photo"
            value={formData.image}
            onChange={(newImage) => setFormData({ ...formData, image: newImage })}
            maxWidth={400}
            maxHeight={400}
            quality={0.85}
            placeholder="https://images.unsplash.com/... or paste image URL"
            previewShape="circle"
          />

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#A38468] font-medium">
              Client Quote / Review *
            </label>
            <textarea
              rows={3}
              required
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="Handing our social presence over to Sam K. Socials was the single highest-ROI decision we made this year..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468] resize-none"
            />
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
              {isSaving ? 'Saving...' : isAddingNew ? 'Add Testimonial' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* TESTIMONIALS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.testimonials.map((test, index) => (
          <div
            key={test.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              editingId === test.id
                ? 'border-[#A38468] bg-[#1A1412]'
                : 'border-[#2D231E] bg-[#16110F] hover:border-[#3D3029]'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Quote className="w-5 h-5 text-[#A38468]" />
                <div className="flex items-center gap-0.5 text-[#A38468]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#A38468]" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-serif italic text-[#FAF8F5] leading-relaxed line-clamp-3">
                "{test.quote}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#251D18]">
              <div className="flex items-center gap-3">
                <img
                  src={getAssetUrl(test.image)}
                  alt={test.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#A38468]/50"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-xs font-heading font-medium text-[#FAF8F5]">{test.name}</h6>
                  <p className="text-[10px] text-[#8E7158]">{test.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => moveOrder(index, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded border border-[#2D231E] text-[#8E7158] hover:text-[#FAF8F5] disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => moveOrder(index, 'down')}
                  disabled={index === content.testimonials.length - 1}
                  className="p-1 rounded border border-[#2D231E] text-[#8E7158] hover:text-[#FAF8F5] disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>

                <button
                  onClick={() => startEdit(test)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#3A2E28] bg-[#1E1714] text-[11px] text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468]"
                >
                  <Edit2 className="w-3 h-3 text-[#A38468]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(test.id, test.name)}
                  className="p-1 text-[#8E7158] hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
