import React, { useState, useRef } from 'react'
import { Upload, X, FileImage, CheckCircle } from 'lucide-react'

export default function StickerUploader({ onFileSelect, variant = 'neon' }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const isNeon = variant === 'neon'
  const titleColor = isNeon ? 'text-neon-cyan' : 'text-white'
  const iconBoxClass = isNeon ? 'bg-neon-cyan/10' : 'bg-white/10'
  const iconColor = isNeon ? 'text-neon-cyan/70' : 'text-white/70'
  const linkColor = isNeon ? 'text-neon-cyan' : 'text-white'
  const glowClass = isNeon ? 'glow-ring-neon' : 'glow-ring-gold'
  const borderClass = isNeon ? 'border-neon-cyan/20' : 'border-white/20'
  const progressBg = isNeon ? 'from-neon-cyan to-neon-purple' : 'from-white/40 to-white/80'
  const successColor = isNeon ? 'text-neon-green' : 'text-green-400'
  const badgeClass = isNeon ? 'badge-neon text-[10px]' : 'bg-white/10 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider'

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
      <label className={`block text-sm font-display font-semibold ${titleColor} mb-2`}>Upload Your Design</label>
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
            <div className={`w-16 h-16 mx-auto rounded-2xl ${iconBoxClass} flex items-center justify-center`}>
              <Upload className={`w-8 h-8 ${iconColor}`} />
            </div>
            <p className="text-white/70 font-medium">Drag & drop your design here</p>
            <p className="text-white/40 text-sm">or <span className={`${linkColor} underline underline-offset-4`}>browse files</span></p>
            <div className="flex items-center justify-center gap-3">
              {['JPG', 'PNG', 'SVG'].map((ext) => (<span key={ext} className={badgeClass}>{ext}</span>))}
            </div>
            <p className="text-white/30 text-xs">Maximum file size: 10MB</p>
          </div>
        </div>
      ) : (
        <div className={`glass-card ${glowClass} p-5`}>
          <div className="flex items-start gap-4">
            <div className={`w-20 h-20 rounded-xl bg-dark-700 border ${borderClass} overflow-hidden flex items-center justify-center flex-shrink-0`}>
              {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <FileImage className={`w-8 h-8 ${iconColor}`} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2"><CheckCircle className={`w-4 h-4 ${successColor} flex-shrink-0`} /><p className="text-white font-medium text-sm truncate">{file.name}</p></div>
              <p className="text-white/40 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB</p>
              <div className="mt-3 w-full h-1.5 rounded-full bg-dark-600 overflow-hidden"><div className={`h-full rounded-full bg-gradient-to-r ${progressBg} w-full`} /></div>
              <p className={`${successColor} text-xs mt-1.5 font-medium`}>Upload complete</p>
            </div>
            <button onClick={removeFile} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" id="remove-uploaded-file"><X className="w-4 h-4 text-white/50" /></button>
          </div>
        </div>
      )}
    </div>
  )
}
