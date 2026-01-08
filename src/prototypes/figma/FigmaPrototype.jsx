import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Folder, FileImage, Palette, Type, Copy, Check, 
  ChevronDown, ChevronRight, Search, Plus, Grid3X3, List,
  MoreHorizontal, Share2, Users, Settings
} from 'lucide-react'
import { organization, brandAssets, subaccounts, formatDate } from '../../data/mockData'
import './figma.css'

export default function FigmaPrototype() {
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [copyStep, setCopyStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    logos: true,
    colors: true,
    fonts: false,
    images: false
  })
  const [viewMode, setViewMode] = useState('grid')

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
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
    <div className="figma-prototype">
      {/* Toolbar */}
      <div className="figma-toolbar">
        <div className="toolbar-left">
          <div className="breadcrumb">
            <span className="org-badge">{organization.logo}</span>
            <span className="org-name">{organization.name}</span>
            <ChevronRight size={14} />
            <span className="current">BrandKit</span>
          </div>
        </div>
        <div className="toolbar-center">
          <div className="search-bar">
            <Search size={14} />
            <input type="text" placeholder="Search assets..." />
          </div>
        </div>
        <div className="toolbar-right">
          <button className="icon-btn">
            <Users size={16} />
          </button>
          <button 
            className="copy-btn primary"
            onClick={() => setShowCopyModal(true)}
          >
            <Share2 size={14} />
            Copy to Locations
          </button>
        </div>
      </div>

      <div className="figma-layout">
        {/* Left Sidebar - File Tree */}
        <aside className="figma-sidebar">
          <div className="sidebar-header">
            <span>Assets</span>
            <button className="icon-btn-sm">
              <Plus size={14} />
            </button>
          </div>
          
          <nav className="file-tree">
            {Object.entries({
              logos: { icon: FileImage, label: 'Logos', count: brandAssets.logos.length },
              colors: { icon: Palette, label: 'Colors', count: brandAssets.colors.length },
              fonts: { icon: Type, label: 'Typography', count: brandAssets.fonts.length },
              images: { icon: FileImage, label: 'Images', count: brandAssets.images.length }
            }).map(([key, { icon: Icon, label, count }]) => (
              <button 
                key={key}
                className={`tree-item ${expandedSections[key] ? 'active' : ''}`}
                onClick={() => toggleSection(key)}
              >
                {expandedSections[key] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                <Icon size={14} />
                <span>{label}</span>
                <span className="count">{count}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-divider" />
          
          <div className="locations-section">
            <div className="section-header">
              <Folder size={14} />
              <span>Locations</span>
              <span className="count">{subaccounts.length}</span>
            </div>
            <div className="location-list">
              {subaccounts.slice(0, 5).map(acc => (
                <div key={acc.id} className="location-item">
                  <span className="dot" style={{ 
                    background: acc.brandKitUpdated ? '#30A46C' : '#71717A' 
                  }} />
                  <span>{acc.name}</span>
                </div>
              ))}
              <button className="view-all">View all locations</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="figma-main">
          <div className="content-header">
            <div className="view-toggle">
              <button 
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 size={14} />
              </button>
              <button 
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
              >
                <List size={14} />
              </button>
            </div>
          </div>

          {/* Logos Section */}
          <AnimatePresence>
            {expandedSections.logos && (
              <motion.section 
                className="asset-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h3>Logos</h3>
                <div className={`asset-grid ${viewMode}`}>
                  {brandAssets.logos.map((logo, i) => (
                    <motion.div 
                      key={logo.id}
                      className="asset-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="asset-preview" style={{ background: logo.color }}>
                        <span className="logo-placeholder">🌵</span>
                      </div>
                      <div className="asset-meta">
                        <span className="asset-name">{logo.name}</span>
                        <span className="asset-type">{logo.type}</span>
                      </div>
                      <button className="asset-menu">
                        <MoreHorizontal size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Colors Section */}
          <AnimatePresence>
            {expandedSections.colors && (
              <motion.section 
                className="asset-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h3>Colors</h3>
                <div className="color-grid">
                  {brandAssets.colors.map((color, i) => (
                    <motion.div 
                      key={color.id}
                      className="color-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div 
                        className="color-swatch" 
                        style={{ background: color.hex }}
                      />
                      <div className="color-info">
                        <span className="color-name">{color.name}</span>
                        <span className="color-hex">{color.hex}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Fonts Section */}
          <AnimatePresence>
            {expandedSections.fonts && (
              <motion.section 
                className="asset-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h3>Typography</h3>
                <div className="font-list">
                  {brandAssets.fonts.map(font => (
                    <div key={font.id} className="font-card">
                      <span 
                        className="font-preview" 
                        style={{ fontFamily: font.family, fontWeight: font.weight }}
                      >
                        Aa
                      </span>
                      <div className="font-info">
                        <span className="font-name">{font.name}</span>
                        <span className="font-family">{font.family} • {font.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Images Section */}
          <AnimatePresence>
            {expandedSections.images && (
              <motion.section 
                className="asset-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h3>Images</h3>
                <div className={`asset-grid ${viewMode}`}>
                  {brandAssets.images.map((img, i) => (
                    <motion.div 
                      key={img.id}
                      className="asset-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="asset-preview img-placeholder">
                        <FileImage size={24} />
                      </div>
                      <div className="asset-meta">
                        <span className="asset-name">{img.name}</span>
                        <span className="asset-type">{img.type}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Copy Modal */}
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
              className="figma-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {!copied ? (
                <>
                  <div className="modal-header">
                    <h2>
                      <Share2 size={18} />
                      Copy BrandKit to Locations
                    </h2>
                    <p>Select franchise locations to receive your brand assets</p>
                  </div>

                  {copyStep === 1 && (
                    <>
                      <div className="modal-search">
                        <Search size={14} />
                        <input type="text" placeholder="Search locations..." />
                      </div>

                      <div className="account-list">
                        {subaccounts.map(acc => (
                          <label 
                            key={acc.id} 
                            className={`account-row ${selectedAccounts.includes(acc.id) ? 'selected' : ''}`}
                          >
                            <input 
                              type="checkbox"
                              checked={selectedAccounts.includes(acc.id)}
                              onChange={() => toggleAccount(acc.id)}
                            />
                            <div className="account-info">
                              <span className="account-name">{acc.name}</span>
                              <span className="account-location">{acc.location}</span>
                            </div>
                            <div className="account-status">
                              <span className={`badge ${acc.updatedBy || 'never'}`}>
                                {acc.updatedBy === 'organization' ? 'Org' : 
                                 acc.updatedBy === 'subaccount' ? 'Local' : 'New'}
                              </span>
                              <span className="last-updated">
                                {formatDate(acc.brandKitUpdated)}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="modal-footer">
                        <span className="selected-count">
                          {selectedAccounts.length} selected
                        </span>
                        <div className="footer-actions">
                          <button 
                            className="btn-secondary"
                            onClick={() => setShowCopyModal(false)}
                          >
                            Cancel
                          </button>
                          <button 
                            className="btn-primary"
                            disabled={selectedAccounts.length === 0}
                            onClick={() => setCopyStep(2)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {copyStep === 2 && (
                    <>
                      <div className="confirm-step">
                        <div className="confirm-summary">
                          <h3>Confirm Copy</h3>
                          <p>You're about to copy your BrandKit to:</p>
                          
                          <div className="confirm-list">
                            {selectedAccounts.map(id => {
                              const acc = subaccounts.find(a => a.id === id)
                              return (
                                <div key={id} className="confirm-item">
                                  <Check size={14} />
                                  <span>{acc.name}</span>
                                </div>
                              )
                            })}
                          </div>

                          <div className="assets-summary">
                            <h4>Assets to be copied:</h4>
                            <ul>
                              <li>{brandAssets.logos.length} logos</li>
                              <li>{brandAssets.colors.length} colors</li>
                              <li>{brandAssets.fonts.length} fonts</li>
                              <li>{brandAssets.images.length} images</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button 
                          className="btn-secondary"
                          onClick={() => setCopyStep(1)}
                        >
                          Back
                        </button>
                        <button 
                          className="btn-primary"
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
                  className="success-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon">
                    <Check size={32} />
                  </div>
                  <h2>BrandKit Copied!</h2>
                  <p>{selectedAccounts.length} locations updated successfully</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {copied && !showCopyModal && (
          <motion.div 
            className="toast success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Check size={16} />
            <span>BrandKit copied to {selectedAccounts.length} locations</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

