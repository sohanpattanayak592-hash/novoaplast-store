import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Maximize2, Minimize2, Camera, Info } from 'lucide-react'

// You can replace these with actual placeholder aesthetic rooms if available
const PRESET_ROOMS = [
  { id: 'room1', name: 'Living Room', url: '/room-preset-1.jpg' },
  { id: 'room2', name: 'Minimal Workspace', url: '/room-preset-2.jpg' },
  { id: 'room3', name: 'Cozy Bedroom', url: '/room-preset-3.jpg' },
  { id: 'hostel1', name: 'Hostel (Single)', url: '/hostel-single.jpg' },
  { id: 'hostel2', name: 'Hostel (Double)', url: '/hostel-double.jpg' },
  { id: 'hostel3', name: 'Hostel (Triple)', url: '/hostel-triple.jpg' }
]

export default function RoomVisualizerModal({ isOpen, onClose, posterImage }) {
  const [bgImage, setBgImage] = useState(null)
  const [scale, setScale] = useState(1)
  const fileInputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Try to load a preset if none selected yet
      if (!bgImage) {
        setBgImage(PRESET_ROOMS[0].url)
      }
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [isOpen, bgImage])

  if (!isOpen) return null

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setBgImage(url)
    }
  }

  const zoomIn = () => setScale(s => Math.min(s + 0.1, 3))
  const zoomOut = () => setScale(s => Math.max(s - 0.1, 0.3))

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-8">
      <div className="absolute inset-0 bg-dark-950/90 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full h-full max-h-[90vh] glass-card border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl bg-dark-900"
      >
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-novo-600 hover:bg-novo-500 text-white rounded-full font-semibold transition-colors shadow-lg"
            >
              <Camera className="w-4 h-4" /> Upload Your Wall
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          
          <button 
            onClick={onClose} 
            className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-white/10 text-white backdrop-blur transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visualizer Area */}
        <div 
          ref={containerRef}
          className="flex-1 relative w-full h-full overflow-hidden bg-dark-800 flex items-center justify-center"
        >
          {bgImage ? (
            <img 
              src={bgImage} 
              alt="Room Background" 
              className="absolute inset-0 w-full h-full object-cover select-none"
              draggable={false}
              onError={(e) => {
                // Fallback if preset images are missing
                e.target.src = ''
                e.target.className = 'absolute inset-0 w-full h-full bg-gradient-to-br from-dark-800 to-dark-900'
              }}
            />
          ) : (
            <div className="text-white/30 flex flex-col items-center">
              <Upload className="w-12 h-12 mb-4 opacity-50" />
              <p>Upload a photo of your room</p>
            </div>
          )}

          {/* Draggable Poster Overlay */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragMomentum={false}
            className="absolute z-10 cursor-move"
            style={{ scale }}
          >
            <div className="relative group">
              <img 
                src={posterImage} 
                alt="Poster Preview" 
                className="w-48 md:w-64 aspect-[2/3] object-cover shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-[3px] border-black/80 pointer-events-none rounded-sm"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
              
              {/* Resize Hint */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white/80 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pointer-events-none">
                <Info className="w-3 h-3" /> Drag to move
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 bg-black/50 backdrop-blur-md p-2 rounded-2xl border border-white/10 overflow-x-auto scrollbar-hide max-w-full w-full md:w-auto shrink-0">
            {PRESET_ROOMS.map(room => (
              <button
                key={room.id}
                onClick={() => setBgImage(room.url)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  bgImage === room.url 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>

          <div className="pointer-events-auto flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <span className="text-white/60 text-xs font-medium mr-2">Poster Size</span>
            <button onClick={zoomOut} className="p-1.5 hover:bg-white/10 rounded-full text-white transition-colors">
              <Minimize2 className="w-4 h-4" />
            </button>
            <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-novo-500" style={{ width: `${(scale / 3) * 100}%` }} />
            </div>
            <button onClick={zoomIn} className="p-1.5 hover:bg-white/10 rounded-full text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
