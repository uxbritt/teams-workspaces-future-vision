import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Command, Search, ChevronRight, Layers, Palette, Type, 
  Image, Copy, Check, Plus, MoreHorizontal, ArrowRight,
  Building2, MapPin, Clock, Zap
} from 'lucide-react'
import { organization, brandAssets, subaccounts, formatDate, getTimeAgo } from '../../data/mockData'
import './linear.css'

export default function LinearPrototype() {
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('assets')

  const toggleAccount = (id) => {
    setSelectedAccounts(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedAccounts.length === subaccounts.length) {
      setSelectedAccounts([])
    } else {
      setSelectedAccounts(subaccounts.map(a => a.id))
    }
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => {
      setShowCopyModal(false)
      setSelectedAccounts([])
      setTimeout(() => setCopied(false), 2000)
    }, 1200)
  }

  return (
    <div className="linear-prototype">
      {/* Sidebar */}
      <aside className="linear-sidebar">
        <div className="sidebar-header">
          <div className="workspace-badge">
            <span className="ws-icon">🌵</span>
            <span className="ws-name">{organization.name.split(' ')[0]}</span>
          </div>
        </div>

        <button 
          className="command-trigger"
          onClick={() => setShowCommandPalette(true)}
        >
          <Search size={14} />
          <span>Search...</span>
          <kbd>⌘K</kbd>
        </button>

        <nav className="sidebar-nav">
          <a href="#" className="nav-link">
            <Zap size={15} />
            <span>Inbox</span>
            <span className="count">3</span>
          </a>
          <a href="#" className="nav-link active">
            <Layers size={15} />
            <span>BrandKit</span>
          </a>
          <a href="#" className="nav-link">
            <Building2 size={15} />
            <span>Locations</span>
            <span className="count">{subaccounts.length}</span>
          </a>
        </nav>

        <div className="sidebar-section">
          <div className="section-title">
            <span>Recent Locations</span>
          </div>
          {subaccounts.slice(0, 4).map(acc => (
            <a key={acc.id} href="#" className="location-link">
              <span className={`status-dot ${acc.brandKitUpdated ? 'synced' : 'pending'}`} />
              <span className="loc-name">{acc.name}</span>
            </a>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="linear-main">
        {/* Header */}
        <header className="linear-header">
          <div className="header-left">
            <h1>BrandKit</h1>
            <span className="asset-count">{
              brandAssets.logos.length + 
              brandAssets.colors.length + 
              brandAssets.fonts.length + 
              brandAssets.images.length
            } assets</span>
          </div>
          <div className="header-right">
            <button 
              className="btn-action"
              onClick={() => setShowCopyModal(true)}
            >
              <Copy size={14} />
              Copy to Locations
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="tab-bar">
          <button 
            className={`tab ${activeTab === 'assets' ? 'active' : ''}`}
            onClick={() => setActiveTab('assets')}
          >
            Assets
          </button>
          <button 
            className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button 
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="linear-content">
          {activeTab === 'assets' && (
            <div className="assets-view">
              {/* Logos */}
              <section className="asset-section">
                <div className="section-header">
                  <div className="section-title">
                    <Layers size={14} />
                    <span>Logos</span>
                    <span className="count">{brandAssets.logos.length}</span>
                  </div>
                  <button className="btn-icon"><Plus size={14} /></button>
                </div>
                <div className="asset-row-list">
                  {brandAssets.logos.map((logo, i) => (
                    <motion.div 
                      key={logo.id}
                      className="asset-row"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <div className="asset-icon" style={{ background: logo.color }}>
                        🌵
                      </div>
                      <div className="asset-info">
                        <span className="asset-name">{logo.name}</span>
                        <span className="asset-type">{logo.type}</span>
                      </div>
                      <button className="btn-icon-sm"><MoreHorizontal size={14} /></button>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Colors */}
              <section className="asset-section">
                <div className="section-header">
                  <div className="section-title">
                    <Palette size={14} />
                    <span>Colors</span>
                    <span className="count">{brandAssets.colors.length}</span>
                  </div>
                  <button className="btn-icon"><Plus size={14} /></button>
                </div>
                <div className="color-row-list">
                  {brandAssets.colors.map((color, i) => (
                    <motion.div 
                      key={color.id}
                      className="color-row"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <div className="color-swatch" style={{ background: color.hex }} />
                      <span className="color-name">{color.name}</span>
                      <code className="color-hex">{color.hex}</code>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Typography */}
              <section className="asset-section">
                <div className="section-header">
                  <div className="section-title">
                    <Type size={14} />
                    <span>Typography</span>
                    <span className="count">{brandAssets.fonts.length}</span>
                  </div>
                </div>
                <div className="font-row-list">
                  {brandAssets.fonts.map((font, i) => (
                    <motion.div 
                      key={font.id}
                      className="font-row"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <div className="font-preview" style={{ fontFamily: font.family }}>
                        Aa
                      </div>
                      <div className="font-info">
                        <span className="font-role">{font.name}</span>
                        <span className="font-meta">{font.family} • {font.weight}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Images */}
              <section className="asset-section">
                <div className="section-header">
                  <div className="section-title">
                    <Image size={14} />
                    <span>Images</span>
                    <span className="count">{brandAssets.images.length}</span>
                  </div>
                  <button className="btn-icon"><Plus size={14} /></button>
                </div>
                <div className="image-grid">
                  {brandAssets.images.map((img, i) => (
                    <motion.div 
                      key={img.id}
                      className="image-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="image-preview">
                        <Image size={20} />
                      </div>
                      <span className="image-name">{img.name}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

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
              className="linear-modal"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={e => e.stopPropagation()}
            >
              {!copied ? (
                <>
                  <div className="modal-header">
                    <Copy size={16} />
                    <h2>Copy BrandKit</h2>
                  </div>

                  <div className="modal-body">
                    <div className="search-row">
                      <Search size={14} />
                      <input type="text" placeholder="Filter locations..." autoFocus />
                    </div>

                    <div className="list-header">
                      <label className="select-all">
                        <input 
                          type="checkbox"
                          checked={selectedAccounts.length === subaccounts.length}
                          onChange={selectAll}
                        />
                        <span>Select all</span>
                      </label>
                      <span className="selected-count">
                        {selectedAccounts.length}/{subaccounts.length}
                      </span>
                    </div>

                    <div className="location-list">
                      {subaccounts.map((acc, i) => (
                        <motion.label 
                          key={acc.id}
                          className={`location-row ${selectedAccounts.includes(acc.id) ? 'selected' : ''}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.02 }}
                        >
                          <input 
                            type="checkbox"
                            checked={selectedAccounts.includes(acc.id)}
                            onChange={() => toggleAccount(acc.id)}
                          />
                          <span className={`status-indicator ${acc.brandKitUpdated ? 'synced' : 'new'}`} />
                          <div className="loc-info">
                            <span className="loc-name">{acc.name}</span>
                            <span className="loc-location">
                              <MapPin size={10} />
                              {acc.location}
                            </span>
                          </div>
                          <div className="loc-meta">
                            {acc.brandKitUpdated ? (
                              <span className="sync-time">
                                <Clock size={10} />
                                {getTimeAgo(acc.brandKitUpdated)}
                              </span>
                            ) : (
                              <span className="badge-new">New</span>
                            )}
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <div className="modal-footer">
                    <div className="asset-summary">
                      <span>{brandAssets.logos.length + brandAssets.colors.length + brandAssets.fonts.length + brandAssets.images.length} assets</span>
                      <ArrowRight size={12} />
                      <span>{selectedAccounts.length} locations</span>
                    </div>
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
                        onClick={handleCopy}
                      >
                        Copy
                        <kbd>⏎</kbd>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div 
                  className="success-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="success-icon">
                    <Check size={24} />
                  </div>
                  <span>Copied to {selectedAccounts.length} locations</span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <AnimatePresence>
        {showCommandPalette && (
          <motion.div 
            className="command-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCommandPalette(false)}
          >
            <motion.div 
              className="command-palette"
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="command-input">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Type a command or search..." 
                  autoFocus 
                />
              </div>
              <div className="command-list">
                <div className="command-group">
                  <span className="group-label">Actions</span>
                  <button 
                    className="command-item"
                    onClick={() => {
                      setShowCommandPalette(false)
                      setShowCopyModal(true)
                    }}
                  >
                    <Copy size={14} />
                    <span>Copy BrandKit to locations</span>
                    <kbd>C</kbd>
                  </button>
                  <button className="command-item">
                    <Plus size={14} />
                    <span>Add new asset</span>
                    <kbd>N</kbd>
                  </button>
                </div>
                <div className="command-group">
                  <span className="group-label">Navigation</span>
                  <button className="command-item">
                    <Layers size={14} />
                    <span>Go to BrandKit</span>
                  </button>
                  <button className="command-item">
                    <Building2 size={14} />
                    <span>Go to Locations</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {copied && !showCopyModal && (
          <motion.div 
            className="linear-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Check size={14} />
            <span>BrandKit copied successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

