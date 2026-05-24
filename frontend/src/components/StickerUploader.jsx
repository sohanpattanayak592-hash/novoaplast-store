import React, { useState, useRef } from 'react'
import { Upload, X, FileImage, CheckCircle } from 'lucide-react'

export default function StickerUploader({ onFileSelect }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const acceptedTypes = ['image/jpeg', 'image/png', 'image/svg+xml']

  const handleFile = (f) => {
    if (!f) return
    if (!acceptedTypes.includes(f.type)) { alert('Upload JPG, PNG, or SVG only.'); return }
    if (f.size > 10 * 1024 * 1024) { alert('Max 10MB.'); return }
    setFile(f)
    onFileSelect?.(f)
    if (f.type !== 'image/svg+xml') {
      const r = new FileReader()
      r.onload = (e) => setPreview(e.target.result)
      r.readAsDataURL(f)
    } else setPreview(null)
  }

  const removeFile = () => { setFile(null); setPreview(null); onFileSelect?.(null) }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-display font-semibold text-neon-cyan mb-2">Upload Your Design</label>
      {!file ? (
        <div
          className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          id="sticker-upload-zone"
        >
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.svg" onChange={(e) => handleFile(e.target.files[0])} className="hidden" id="sticker-file-input" />
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-neon-cyan/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-neon-cyan/70" />
            </div>
            <p className="text-white/70 font-medium">Drag & drop your design here</p>
            <p className="text-white/40 text-sm">or <span className="text-neon-cyan underline underline-offset-4">browse files</span></p>
            <div className="flex items-center justify-center gap-3">
              {['JPG', 'PNG', 'SVG'].map((ext) => (<span key={ext} className="badge-neon text-[10px]">{ext}</span>))}
            </div>
            <p className="text-white/30 text-xs">Maximum file size: 10MB</p>
          </div>
        </div>
      ) : (
        <div className="glass-card glow-ring-neon p-5">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-xl bg-dark-700 border border-neon-cyan/20 overflow-hidden flex items-center justify-center flex-shrink-0">
              {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <FileImage className="w-8 h-8 text-neon-cyan/50" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" /><p className="text-white font-medium text-sm truncate">{file.name}</p></div>
              <p className="text-white/40 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB</p>
              <div className="mt-3 w-full h-1.5 rounded-full bg-dark-600 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple w-full" /></div>
              <p className="text-neon-green text-xs mt-1.5 font-medium">Upload complete</p>
            </div>
            <button onClick={removeFile} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" id="remove-uploaded-file"><X className="w-4 h-4 text-white/50" /></button>
          </div>
        </div>
      )}
    </div>
  )
}
