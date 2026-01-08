import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, ChevronDown, Plus, MoreHorizontal, Search,
  FileImage, Palette, Type, Image, Copy, Check, Hash,
  Settings, Users, Sparkles, ArrowUpRight
} from 'lucide-react'
import { organization, brandAssets, subaccounts, formatDate } from '../../data/mockData'
import './notion.css'

export default function NotionPrototype() {
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [copyStep, setCopyStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [expandedBlocks, setExpandedBlocks] = useState({
    logos: true,
    colors: true,
    fonts: true,
    images: false
  })

  const toggleBlock = (block) => {
    setExpandedBlocks(prev => ({ ...prev, [block]: !prev[block] }))
  }

  const toggleAccount = (id) => {
    setSelectedAccounts(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => {
      setShowCopyModal(false)
      setCopyStep(1)
      setSelectedAccounts([])
      setTimeout(() => setCopied(false), 2000)
    }, 1500)
  }

  return (
    <div className="notion-prototype">
      {/* Sidebar */}
      <aside className="notion-sidebar">
        <div className="workspace-switcher">
          <div className="workspace-icon">🌵</div>
          <div className="workspace-info">
            <span className="workspace-name">{organization.name}</span>
            <span className="workspace-plan">{organization.plan}</span>
          </div>
          <ChevronDown size={14} />
        </div>

        <div className="sidebar-search">
          <Search size={14} />
          <span>Search</span>
          <kbd>⌘K</kbd>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <a href="#" className="nav-item active">
              <Sparkles size={16} />
              <span>BrandKit</span>
            </a>
            <a href="#" className="nav-item">
              <Users size={16} />
              <span>Locations</span>
              <span className="badge">{subaccounts.length}</span>
            </a>
            <a href="#" className="nav-item">
              <Settings size={16} />
              <span>Settings</span>
            </a>
          </div>

          <div className="nav-section">
            <div className="section-label">
              <span>Franchise Locations</span>
              <button className="add-btn"><Plus size={12} /></button>
            </div>
            {subaccounts.slice(0, 6).map(acc => (
              <a key={acc.id} href="#" className="nav-item sub">
                <Hash size={14} />
                <span>{acc.name.split(' ')[0]}</span>
                {!acc.brandKitUpdated && <span className="dot new" />}
              </a>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="notion-main">
        <header className="page-header">
          <div className="breadcrumb-trail">
            <span>{organization.name}</span>
            <ChevronRight size={12} />
            <span>BrandKit</span>
          </div>
          <div className="header-actions">
            <button className="action-btn">Share</button>
            <button className="action-btn icon"><MoreHorizontal size={16} /></button>
          </div>
        </header>

        <article className="page-content">
          <div className="page-icon">🎨</div>
          <h1 className="page-title">BrandKit</h1>
          <p className="page-description">
            Your organization's brand assets. Colors, logos, typography, and images 
            that define the Cactus Garden USA visual identity.
          </p>

          {/* Copy CTA Card */}
          <div className="callout-card">
            <div className="callout-icon">
              <Copy size={20} />
            </div>
            <div className="callout-content">
              <h3>Share with Locations</h3>
              <p>Copy your brand assets to franchise locations to ensure consistent branding.</p>
            </div>
            <button 
              className="callout-btn"
              onClick={() => setShowCopyModal(true)}
            >
              Copy BrandKit
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Logos Block */}
          <div className="toggle-block">
            <button 
              className="toggle-header"
              onClick={() => toggleBlock('logos')}
            >
              {expandedBlocks.logos ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <FileImage size={16} />
              <span>Logos</span>
              <span className="count">{brandAssets.logos.length} items</span>
            </button>
            <AnimatePresence>
              {expandedBlocks.logos && (
                <motion.div 
                  className="toggle-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="gallery-grid">
                    {brandAssets.logos.map((logo, i) => (
                      <motion.div 
                        key={logo.id}
                        className="gallery-item"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="gallery-preview" style={{ background: logo.color }}>
                          <span>🌵</span>
                        </div>
                        <span className="gallery-label">{logo.name}</span>
                      </motion.div>
                    ))}
                    <button className="add-item">
                      <Plus size={20} />
                      <span>Add logo</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Colors Block */}
          <div className="toggle-block">
            <button 
              className="toggle-header"
              onClick={() => toggleBlock('colors')}
            >
              {expandedBlocks.colors ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Palette size={16} />
              <span>Brand Colors</span>
              <span className="count">{brandAssets.colors.length} items</span>
            </button>
            <AnimatePresence>
              {expandedBlocks.colors && (
                <motion.div 
                  className="toggle-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="color-table">
                    <div className="table-header">
                      <span>Color</span>
                      <span>Name</span>
                      <span>Hex</span>
                    </div>
                    {brandAssets.colors.map((color, i) => (
                      <motion.div 
                        key={color.id}
                        className="table-row"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="color-chip" style={{ background: color.hex }} />
                        <span className="color-name">{color.name}</span>
                        <code className="color-code">{color.hex}</code>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fonts Block */}
          <div className="toggle-block">
            <button 
              className="toggle-header"
              onClick={() => toggleBlock('fonts')}
            >
              {expandedBlocks.fonts ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Type size={16} />
              <span>Typography</span>
              <span className="count">{brandAssets.fonts.length} items</span>
            </button>
            <AnimatePresence>
              {expandedBlocks.fonts && (
                <motion.div 
                  className="toggle-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="font-cards">
                    {brandAssets.fonts.map((font, i) => (
                      <motion.div 
                        key={font.id}
                        className="font-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="font-label">{font.name}</div>
                        <div 
                          className="font-sample"
                          style={{ fontFamily: font.family, fontWeight: font.weight }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </div>
                        <div className="font-meta">
                          {font.family} • {font.weight}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Images Block */}
          <div className="toggle-block">
            <button 
              className="toggle-header"
              onClick={() => toggleBlock('images')}
            >
              {expandedBlocks.images ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Image size={16} />
              <span>Images</span>
              <span className="count">{brandAssets.images.length} items</span>
            </button>
            <AnimatePresence>
              {expandedBlocks.images && (
                <motion.div 
                  className="toggle-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="gallery-grid wide">
                    {brandAssets.images.map((img, i) => (
                      <motion.div 
                        key={img.id}
                        className="gallery-item wide"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="gallery-preview placeholder">
                          <Image size={24} />
                        </div>
                        <span className="gallery-label">{img.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </article>
      </main>

      {/* Copy Modal - Notion style */}
      <AnimatePresence>
        {showCopyModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !copied && setShowCopyModal(false)}
          >
            <motion.div 
              className="notion-modal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {!copied ? (
                <>
                  <div className="modal-header">
                    <div className="modal-icon">📤</div>
                    <h2>Copy BrandKit to Locations</h2>
                  </div>

                  {copyStep === 1 && (
                    <>
                      <div className="modal-section">
                        <p className="section-desc">
                          Select the franchise locations that should receive your brand assets.
                        </p>
                        
                        <div className="search-input">
                          <Search size={14} />
                          <input type="text" placeholder="Search locations..." />
                        </div>
                      </div>

                      <div className="location-list">
                        {subaccounts.map(acc => (
                          <label 
                            key={acc.id}
                            className={`location-row ${selectedAccounts.includes(acc.id) ? 'selected' : ''}`}
                          >
                            <input 
                              type="checkbox"
                              checked={selectedAccounts.includes(acc.id)}
                              onChange={() => toggleAccount(acc.id)}
                            />
                            <Hash size={14} className="location-icon" />
                            <div className="location-info">
                              <span className="name">{acc.name}</span>
                              <span className="meta">{acc.location}</span>
                            </div>
                            <div className="location-status">
                              {acc.brandKitUpdated ? (
                                <span className="updated">
                                  Updated {formatDate(acc.brandKitUpdated)}
                                </span>
                              ) : (
                                <span className="tag new">New</span>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="modal-footer">
                        <div className="selection-info">
                          {selectedAccounts.length} location{selectedAccounts.length !== 1 ? 's' : ''} selected
                        </div>
                        <div className="footer-btns">
                          <button 
                            className="btn-ghost"
                            onClick={() => setShowCopyModal(false)}
                          >
                            Cancel
                          </button>
                          <button 
                            className="btn-primary"
                            disabled={selectedAccounts.length === 0}
                            onClick={() => setCopyStep(2)}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {copyStep === 2 && (
                    <>
                      <div className="modal-section confirm">
                        <div className="confirm-header">
                          <h3>Ready to copy</h3>
                          <p>The following assets will be copied to {selectedAccounts.length} locations:</p>
                        </div>

                        <div className="assets-list">
                          <div className="asset-row">
                            <FileImage size={14} />
                            <span>{brandAssets.logos.length} logos</span>
                          </div>
                          <div className="asset-row">
                            <Palette size={14} />
                            <span>{brandAssets.colors.length} colors</span>
                          </div>
                          <div className="asset-row">
                            <Type size={14} />
                            <span>{brandAssets.fonts.length} fonts</span>
                          </div>
                          <div className="asset-row">
                            <Image size={14} />
                            <span>{brandAssets.images.length} images</span>
                          </div>
                        </div>

                        <div className="destinations">
                          <span className="label">To:</span>
                          <div className="destination-tags">
                            {selectedAccounts.map(id => {
                              const acc = subaccounts.find(a => a.id === id)
                              return (
                                <span key={id} className="destination-tag">
                                  <Hash size={12} />
                                  {acc.name}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button 
                          className="btn-ghost"
                          onClick={() => setCopyStep(1)}
                        >
                          Back
                        </button>
                        <button 
                          className="btn-primary accent"
                          onClick={handleCopy}
                        >
                          <Copy size={14} />
                          Copy BrandKit
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <motion.div 
                  className="success-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon">
                    <Check size={32} />
                  </div>
                  <h2>Done!</h2>
                  <p>BrandKit copied to {selectedAccounts.length} locations</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {copied && !showCopyModal && (
          <motion.div 
            className="notion-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Check size={16} />
            BrandKit copied successfully
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

