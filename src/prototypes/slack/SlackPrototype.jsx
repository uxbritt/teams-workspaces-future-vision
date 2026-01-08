import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Hash, ChevronDown, ChevronRight, Plus, Search, Bell, 
  MessageSquare, Bookmark, MoreVertical, Send, Paperclip,
  Smile, Image, Palette, Type, FileImage, Copy, Check,
  Building2, Users, Settings, HelpCircle, ArrowUpRight
} from 'lucide-react'
import { organization, brandAssets, subaccounts, formatDate, getTimeAgo } from '../../data/mockData'
import './slack.css'

export default function SlackPrototype() {
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [copyStep, setCopyStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [expandedChannels, setExpandedChannels] = useState(true)
  const [selectedAsset, setSelectedAsset] = useState(null)

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
    <div className="slack-prototype">
      {/* Workspace Sidebar */}
      <div className="workspace-bar">
        <div className="ws-icon active">
          <span>🌵</span>
        </div>
        <div className="ws-divider" />
        <button className="ws-add">
          <Plus size={18} />
        </button>
      </div>

      {/* Channel Sidebar */}
      <aside className="slack-sidebar">
        <div className="sidebar-header">
          <button className="workspace-button">
            <span className="ws-name">{organization.name}</span>
            <ChevronDown size={14} />
          </button>
          <button className="icon-btn">
            <Bell size={16} />
          </button>
        </div>

        <div className="quick-links">
          <a href="#" className="quick-link">
            <MessageSquare size={16} />
            <span>Threads</span>
          </a>
          <a href="#" className="quick-link">
            <Bookmark size={16} />
            <span>Saved</span>
          </a>
        </div>

        <div className="channels-section">
          <button 
            className="section-toggle"
            onClick={() => setExpandedChannels(!expandedChannels)}
          >
            {expandedChannels ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            <span>Channels</span>
          </button>
          
          <AnimatePresence>
            {expandedChannels && (
              <motion.div 
                className="channel-list"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <a href="#" className="channel-item active">
                  <Hash size={16} />
                  <span>brandkit</span>
                </a>
                <a href="#" className="channel-item">
                  <Hash size={16} />
                  <span>general</span>
                </a>
                <a href="#" className="channel-item">
                  <Hash size={16} />
                  <span>marketing</span>
                </a>
                <a href="#" className="channel-item">
                  <Hash size={16} />
                  <span>announcements</span>
                  <span className="unread">3</span>
                </a>
                <button className="add-channel">
                  <Plus size={14} />
                  <span>Add channels</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="locations-section">
          <div className="section-label">
            <Building2 size={14} />
            <span>Locations</span>
            <span className="count">{subaccounts.length}</span>
          </div>
          <div className="location-pills">
            {subaccounts.slice(0, 4).map(acc => (
              <div key={acc.id} className="location-pill">
                <span className={`dot ${acc.brandKitUpdated ? 'synced' : ''}`} />
                <span>{acc.name.split(' ')[0]}</span>
              </div>
            ))}
            <button className="more-pill">+{subaccounts.length - 4}</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="slack-main">
        {/* Channel Header */}
        <header className="channel-header">
          <div className="channel-info">
            <h1>
              <Hash size={18} />
              brandkit
            </h1>
            <span className="channel-desc">Your organization's brand assets and guidelines</span>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <Users size={16} />
              <span>{organization.memberCount}</span>
            </button>
            <button 
              className="action-btn primary"
              onClick={() => setShowCopyModal(true)}
            >
              <Copy size={14} />
              <span>Copy to Locations</span>
            </button>
          </div>
        </header>

        {/* Messages/Content Area */}
        <div className="channel-content">
          {/* Pinned Message - CTA */}
          <div className="pinned-message">
            <div className="pin-badge">📌 Pinned</div>
            <div className="pin-content">
              <strong>Share your brand assets</strong>
              <p>Copy your BrandKit to franchise locations to ensure consistent branding across all stores.</p>
              <button 
                className="pin-action"
                onClick={() => setShowCopyModal(true)}
              >
                Copy BrandKit
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Asset Cards as Messages */}
          <div className="message-group">
            <div className="message-header">
              <div className="avatar">🤖</div>
              <div className="sender-info">
                <span className="sender-name">BrandKit Bot</span>
                <span className="timestamp">Today at 9:00 AM</span>
              </div>
            </div>
            <div className="message-content">
              <p className="message-text">Here are your current brand assets:</p>
              
              {/* Logos Card */}
              <div className="asset-block">
                <div className="block-header">
                  <FileImage size={16} />
                  <span>Logos</span>
                  <span className="count">{brandAssets.logos.length} files</span>
                </div>
                <div className="logo-previews">
                  {brandAssets.logos.map((logo, i) => (
                    <motion.div 
                      key={logo.id}
                      className="logo-preview"
                      style={{ background: logo.color }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedAsset(logo)}
                    >
                      <span>🌵</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Colors Card */}
              <div className="asset-block">
                <div className="block-header">
                  <Palette size={16} />
                  <span>Brand Colors</span>
                </div>
                <div className="color-swatches">
                  {brandAssets.colors.map((color, i) => (
                    <motion.div 
                      key={color.id}
                      className="color-chip"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="chip-color" style={{ background: color.hex }} />
                      <div className="chip-info">
                        <span className="chip-name">{color.name}</span>
                        <code>{color.hex}</code>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Typography Card */}
              <div className="asset-block">
                <div className="block-header">
                  <Type size={16} />
                  <span>Typography</span>
                </div>
                <div className="font-samples">
                  {brandAssets.fonts.map((font, i) => (
                    <motion.div 
                      key={font.id}
                      className="font-sample"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="role">{font.name}</span>
                      <span 
                        className="preview"
                        style={{ fontFamily: font.family, fontWeight: font.weight }}
                      >
                        {font.family}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Images Card */}
              <div className="asset-block">
                <div className="block-header">
                  <Image size={16} />
                  <span>Images</span>
                  <span className="count">{brandAssets.images.length} files</span>
                </div>
                <div className="image-thumbnails">
                  {brandAssets.images.map((img, i) => (
                    <motion.div 
                      key={img.id}
                      className="image-thumb"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Image size={20} />
                      <span>{img.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Message */}
          <div className="message-group system">
            <div className="system-message">
              <Check size={14} />
              <span>BrandKit was last updated 2 days ago</span>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="message-input-area">
          <div className="input-container">
            <button className="input-action">
              <Plus size={18} />
            </button>
            <input 
              type="text" 
              placeholder="Message #brandkit" 
              disabled
            />
            <div className="input-tools">
              <button className="input-action">
                <Paperclip size={16} />
              </button>
              <button className="input-action">
                <Smile size={16} />
              </button>
              <button className="input-action send">
                <Send size={16} />
              </button>
            </div>
          </div>
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
              className="slack-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              {!copied ? (
                <>
                  <div className="modal-header">
                    <h2>Copy BrandKit to Locations</h2>
                    <button 
                      className="close-btn"
                      onClick={() => setShowCopyModal(false)}
                    >
                      ×
                    </button>
                  </div>

                  {copyStep === 1 && (
                    <>
                      <div className="modal-body">
                        <p className="modal-desc">
                          Select the franchise locations that will receive your brand assets.
                        </p>

                        <div className="search-box">
                          <Search size={16} />
                          <input type="text" placeholder="Search locations" />
                        </div>

                        <div className="location-grid">
                          {subaccounts.map((acc, i) => (
                            <motion.label 
                              key={acc.id}
                              className={`location-card ${selectedAccounts.includes(acc.id) ? 'selected' : ''}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.03 }}
                            >
                              <input 
                                type="checkbox"
                                checked={selectedAccounts.includes(acc.id)}
                                onChange={() => toggleAccount(acc.id)}
                              />
                              <div className="card-content">
                                <div className="card-header">
                                  <span className={`status ${acc.brandKitUpdated ? 'synced' : 'new'}`}>
                                    {acc.brandKitUpdated ? '✓' : '○'}
                                  </span>
                                  <span className="name">{acc.name}</span>
                                </div>
                                <div className="card-meta">
                                  <span>{acc.location}</span>
                                  {acc.brandKitUpdated && (
                                    <span className="last-sync">
                                      Synced {getTimeAgo(acc.brandKitUpdated)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.label>
                          ))}
                        </div>
                      </div>

                      <div className="modal-footer">
                        <div className="selection-summary">
                          <span className="count">{selectedAccounts.length}</span>
                          <span>location{selectedAccounts.length !== 1 ? 's' : ''} selected</span>
                        </div>
                        <button 
                          className="btn-primary"
                          disabled={selectedAccounts.length === 0}
                          onClick={() => setCopyStep(2)}
                        >
                          Review & Copy
                        </button>
                      </div>
                    </>
                  )}

                  {copyStep === 2 && (
                    <>
                      <div className="modal-body confirm">
                        <div className="confirm-section">
                          <h3>Assets to copy</h3>
                          <div className="asset-summary">
                            <div className="summary-item">
                              <FileImage size={16} />
                              <span>{brandAssets.logos.length} logos</span>
                            </div>
                            <div className="summary-item">
                              <Palette size={16} />
                              <span>{brandAssets.colors.length} colors</span>
                            </div>
                            <div className="summary-item">
                              <Type size={16} />
                              <span>{brandAssets.fonts.length} fonts</span>
                            </div>
                            <div className="summary-item">
                              <Image size={16} />
                              <span>{brandAssets.images.length} images</span>
                            </div>
                          </div>
                        </div>

                        <div className="confirm-section">
                          <h3>Copying to {selectedAccounts.length} locations</h3>
                          <div className="destination-list">
                            {selectedAccounts.map(id => {
                              const acc = subaccounts.find(a => a.id === id)
                              return (
                                <div key={id} className="destination-item">
                                  <Building2 size={14} />
                                  <span>{acc.name}</span>
                                </div>
                              )
                            })}
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
                          className="btn-primary green"
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon">
                    <Check size={32} />
                  </div>
                  <h2>BrandKit Copied! 🎉</h2>
                  <p>{selectedAccounts.length} locations have been updated</p>
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
            className="slack-toast"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div className="toast-icon">
              <Check size={16} />
            </div>
            <div className="toast-content">
              <strong>Success!</strong>
              <span>BrandKit copied to {selectedAccounts.length} locations</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

