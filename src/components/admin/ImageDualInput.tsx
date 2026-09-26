import React, { useState, useRef } from 'react';
import { Upload, Link2, Image as ImageIcon, CheckCircle, RefreshCw } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';
import { fileToOptimizedDataUrl } from '../../utils/imageUpload';

interface ImageDualInputProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  placeholder?: string;
  previewShape?: 'circle' | 'rounded';
}

export function ImageDualInput({
  label,
  value,
  onChange,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.82,
  placeholder = 'https://... or select file from computer',
  previewShape = 'rounded'
}: ImageDualInputProps) {
  const [activeMode, setActiveMode] = useState<'upload' | 'url'>(
    value.startsWith('data:image') ? 'upload' : 'url'
  );
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const dataUrl = await fileToOptimizedDataUrl(file, maxWidth, maxHeight, quality);
      onChange(dataUrl);
      setActiveMode('upload');
    } catch (err: any) {
      alert(err.message || 'Could not process image file');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2.5 p-3.5 rounded-2xl border border-[#2D231E] bg-[#140E0C]">
      {/* Label & Method Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="text-[11px] uppercase tracking-wider text-[#C4B29E] font-medium flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#A38468]" />
          <span>{label}</span>
        </label>

        {/* 2 Clear Options Toggle */}
        <div className="inline-flex p-0.5 rounded-lg bg-[#1B1411] border border-[#2D231E]">
          <button
            type="button"
            onClick={() => {
              setActiveMode('upload');
              fileInputRef.current?.click();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-[#A38468] text-[#130E0C] shadow-sm'
                : 'text-[#8E7158] hover:text-[#FAF8F5]'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Option 1: Upload from Computer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeMode === 'url'
                ? 'bg-[#A38468] text-[#130E0C] shadow-sm'
                : 'text-[#8E7158] hover:text-[#FAF8F5]'
            }`}
          >
            <Link2 className="w-3 h-3" />
            <span>Option 2: Image URL</span>
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Input Row */}
      <div className="flex items-center gap-3">
        {/* Method 1: Upload File Action Trigger */}
        {activeMode === 'upload' && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isCompressing}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#A38468]/60 bg-[#1A1310] hover:bg-[#251A15] hover:border-[#A38468] text-xs text-[#FAF8F5] transition-all cursor-pointer group"
          >
            {isCompressing ? (
              <>
                <RefreshCw className="w-4 h-4 text-[#A38468] animate-spin" />
                <span>Optimizing & Compressing Image...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-[#A38468] group-hover:scale-110 transition-transform" />
                <span className="font-medium">
                  {value.startsWith('data:image')
                    ? 'Replace Uploaded Image from Computer'
                    : 'Click to Browse & Select Image from Computer'}
                </span>
              </>
            )}
          </button>
        )}

        {/* Method 2: Direct URL Input Field */}
        {activeMode === 'url' && (
          <div className="flex-1 relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D231E] bg-[#100B09] text-xs sm:text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
            />
          </div>
        )}

        {/* Live Preview Thumbnail */}
        {value && (
          <div
            className={`relative shrink-0 overflow-hidden border border-[#A38468]/60 bg-[#181210] shadow-md ${
              previewShape === 'circle'
                ? 'w-12 h-12 rounded-full'
                : 'w-14 h-12 rounded-xl'
            }`}
          >
            <img
              src={getAssetUrl(value)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Helper Context Badge */}
      <div className="flex items-center justify-between text-[10px] text-[#8E7158] pt-0.5">
        {value.startsWith('data:image') ? (
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Option 1 Active: Compressed directly into this Firebase record (No external host needed).
          </span>
        ) : value.startsWith('http') ? (
          <span className="text-[#A38468] flex items-center gap-1">
            <Link2 className="w-3 h-3" />
            Option 2 Active: Web link will load from remote URL.
          </span>
        ) : (
          <span>Select an image file or switch to URL link above.</span>
        )}
      </div>
    </div>
  );
}
