import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { GalleryItem } from '../../types';

export function GalleryManager() {
  const { content, updateSection, isSaving } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const emptyItem: GalleryItem = {
    id: '',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    text: '',
    subtext: 'CAMPAIGN CAPTURE'
  };

  const [formData, setFormData] = useState<GalleryItem>(emptyItem);

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setIsAddingNew(false);
    setFormData({ ...item });
  };

  const startAddNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      ...emptyItem,
      id: `gal-${Date.now()}`
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setFormData(emptyItem);
  };

  const handleSave = async () => {
    if (!formData.text.trim()) {
      alert('Please provide a title for this portfolio showcase item.');
      return;
    }

    let updatedList: GalleryItem[] = [];

    if (isAddingNew) {
      updatedList = [...content.gallery.items, formData];
    } else {
      updatedList = content.gallery.items.map((item) =>
        item.id === editingId ? formData : item
      );
    }

    await updateSection('gallery', {
      ...content.gallery,
      items: updatedList
    });

    cancelEdit();
  };

  const handleDelete = async (id: string, text: string) => {
    if (content.gallery.items.length <= 1) {
      alert('You must have at least one portfolio showcase item.');
      return;
    }

    const confirm = window.confirm(`Are you sure you want to delete "${text}"?`);
    if (!confirm) return;

    const filtered = content.gallery.items.filter((item) => item.id !== id);

    await updateSection('gallery', {
      ...content.gallery,
      items: filtered
    });

    if (editingId === id) cancelEdit();
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= content.gallery.items.length) return;

    const list = [...content.gallery.items];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    await updateSection('gallery', {
      ...content.gallery,
      items: list
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#251D18]">
        <div>
          <h4 className="text-base sm:text-lg font-heading font-medium text-[#FAF8F5] flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#A38468]" />
            <span>Feed Showcase & Gallery ({content.gallery.items.length})</span>
          </h4>
          <p className="text-xs text-[#8E7158]">
            Full CRUD: Add portfolio feed posts, update image URLs and captions, or reorder showcase items.
          </p>
        </div>

        {!isAddingNew && !editingId && (
          <button
            onClick={startAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Showcase Item</span>
          </button>
        )}
      </div>

      {/* CREATE / EDIT FORM */}
      {(isAddingNew || editingId) && (
        <div className="p-6 rounded-2xl border border-[#A38468]/50 bg-[#16100E] shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#2A201A] pb-3">
            <h5 className="text-sm font-heading font-medium text-[#FAF8F5] uppercase tracking-wider">
              {isAddingNew ? 'Create New Showcase Item' : `Edit Showcase: ${formData.text}`}
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
                Title / Project Name *
              </label>
              <input
                type="text"
                required
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="e.g. Lumina Skin Clinic"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Subtitle / Category Tag
              </label>
              <input
                type="text"
                value={formData.subtext}
                onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
                placeholder="e.g. 4K REEL PRODUCTION • SYDNEY"
                className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
              Image URL (Unsplash or direct image link)
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#120D0B] border border-[#251D18]">
              <img
                src={formData.image}
                alt="Preview"
                className="w-16 h-20 object-cover rounded-lg border border-[#3A2E28]"
              />
              <div className="text-xs text-[#8E7158] space-y-1">
                <p className="text-[#FAF8F5] font-medium">{formData.text || 'Untitled'}</p>
                <p className="text-[10px] text-[#A38468] uppercase">{formData.subtext}</p>
                <p className="text-[10px]">Live preview on website will display in 4:5 aspect ratio.</p>
              </div>
            </div>
          )}

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
              {isSaving ? 'Saving...' : isAddingNew ? 'Add Showcase Item' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.gallery.items.map((item, index) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
              editingId === item.id
                ? 'border-[#A38468] bg-[#1A1412]'
                : 'border-[#2D231E] bg-[#16110F] hover:border-[#3D3029]'
            }`}
          >
            <div className="space-y-3">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#120D0B] border border-[#2A201A]">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <h5 className="text-sm font-heading font-medium text-[#FAF8F5] truncate">
                  {item.text}
                </h5>
                <p className="text-[11px] uppercase tracking-wider text-[#A38468] font-medium">
                  {item.subtext}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#251D18]">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveOrder(index, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded border border-[#2D231E] text-[#8E7158] hover:text-[#FAF8F5] disabled:opacity-30"
                  title="Move Left"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => moveOrder(index, 'down')}
                  disabled={index === content.gallery.items.length - 1}
                  className="p-1 rounded border border-[#2D231E] text-[#8E7158] hover:text-[#FAF8F5] disabled:opacity-30"
                  title="Move Right"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#3A2E28] bg-[#1E1714] text-[11px] text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468]"
                >
                  <Edit2 className="w-3 h-3 text-[#A38468]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.text)}
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
