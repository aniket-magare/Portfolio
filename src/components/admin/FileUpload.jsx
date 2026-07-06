import React, { useState } from 'react';

export default function FileUpload({ folder, value, onChange, accept = "image/*" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: file.name,
            fileData: base64Data,
            folder: folder,
          }),
        });

        const data = await res.json();
        if (res.ok && data.path) {
          onChange(data.path);
        } else {
          setError(data.error || 'Upload failed');
        }
      } catch (err) {
        setError(err.message || 'Upload failed');
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const input = document.createElement('input');
      input.type = 'file';
      input.files = e.dataTransfer.files;
      handleFileChange({ target: input });
    }
  };

  return (
    <div className="w-full">
      <div 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-divider hover:border-accentPrimary rounded-xl p-4 bg-card/50 flex flex-col items-center justify-center transition-colors cursor-pointer relative"
      >
        <input 
          type="file" 
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accentPrimary mx-auto mb-2"></div>
            <p className="text-sm text-textMuted">Uploading file...</p>
          </div>
        ) : (
          <div className="text-center p-2">
            <p className="text-sm font-medium text-textMain">Drag and drop file here, or click to browse</p>
            <p className="text-xs text-textMuted mt-1">Supports images (JPG, PNG, SVG) or PDF for resumes</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
      )}

      {value && (
        <div className="mt-3 flex items-center gap-4 bg-card/30 p-2 rounded-lg border border-divider">
          {accept.includes("image") && value.startsWith("/") ? (
            <img src={value} alt="Preview" className="w-12 h-12 rounded object-contain border border-divider bg-primary" />
          ) : (
            <div className="w-12 h-12 rounded bg-card border border-divider flex items-center justify-center text-xs font-bold text-accentPrimary">
              DOC
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-textMuted font-mono truncate">{value}</p>
            <p className="text-xs text-success font-medium">Uploaded Successfully</p>
          </div>
          <button 
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-500 hover:underline font-medium"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
