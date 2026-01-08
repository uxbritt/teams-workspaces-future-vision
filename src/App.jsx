import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import FigmaPrototype from './prototypes/figma/FigmaPrototype'
import NotionPrototype from './prototypes/notion/NotionPrototype'
import LinearPrototype from './prototypes/linear/LinearPrototype'
import SlackPrototype from './prototypes/slack/SlackPrototype'

const designSystems = [
  {
    id: 'figma',
    name: 'Figma',
    tagline: 'Collaborative canvas workspaces',
    color: '#A259FF',
    description: 'Team-based organization with file browser metaphor'
  },
  {
    id: 'notion',
    name: 'Notion',
    tagline: 'Block-based workspace pages',
    color: '#E16259',
    description: 'Hierarchical pages with toggleable sections'
  },
  {
    id: 'linear',
    name: 'Linear',
    tagline: 'Keyboard-first project spaces',
    color: '#5E6AD2',
    description: 'Dense, efficient UI with command palette'
  },
  {
    id: 'slack',
    name: 'Slack',
    tagline: 'Channel-based team hubs',
    color: '#4A154B',
    description: 'Conversational workspace with sidebar channels'
  }
]

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          BrandKit Workspace Prototypes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore different design languages for managing organization workspaces
        </motion.p>
      </div>
      
      <div className="prototype-grid">
        {designSystems.map((system, index) => (
          <motion.div
            key={system.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link to={`/${system.id}`} className="prototype-card">
              <div 
                className="card-accent" 
                style={{ background: system.color }}
              />
              <div className="card-content">
                <h2>{system.name}</h2>
                <span className="tagline">{system.tagline}</span>
                <p>{system.description}</p>
                <div className="card-cta">
                  <span>View Prototype</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="context-box">
        <h3>Testing Context</h3>
        <p>
          You are an admin for <strong>Cactus Garden USA</strong>, a franchise organization 
          with multiple locations (subaccounts). You've set up brand assets in your BrandKit 
          and need to share them with franchise locations.
        </p>
      </div>
    </div>
  )
}

function PrototypeNav() {
  const location = useLocation()
  const currentPath = location.pathname.split('/')[1]
  
  if (currentPath === '') return null
  
  return (
    <nav className="prototype-nav">
      <Link to="/" className="back-link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        All Prototypes
      </Link>
      <div className="nav-tabs">
        {designSystems.map(system => (
          <Link 
            key={system.id}
            to={`/${system.id}`}
            className={`nav-tab ${currentPath === system.id ? 'active' : ''}`}
            style={{ '--accent': system.color }}
          >
            {system.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  
  return (
    <div className="app">
      {!isHome && <PrototypeNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/figma/*" element={<FigmaPrototype />} />
        <Route path="/notion/*" element={<NotionPrototype />} />
        <Route path="/linear/*" element={<LinearPrototype />} />
        <Route path="/slack/*" element={<SlackPrototype />} />
      </Routes>
    </div>
  )
}

