import React, { useState } from 'react'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Confirmation from './pages/Confirmation'
import Reservations from './pages/Reservations'
import Publish from './pages/Publish'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import MapView from './pages/MapView'
import Navbar from './components/ui/Navbar'
import BottomNav from './components/ui/BottomNav'
import { AnimatePresence, motion } from 'framer-motion'
import { properties } from './data/mockData'

const AnimatedPage = motion.div

const VIEWS = {
  HOME: 'home',
  DETAIL: 'detail',
  CONFIRMATION: 'confirmation',
  RESERVATIONS: 'reservations',
  PUBLISH: 'publish',
  MESSAGES: 'messages',
  PROFILE: 'profile',
  MAP: 'map'
}

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [activeChat, setActiveChat] = useState(null)

  const handleNavigate = (view) => {
    setCurrentView(view)
    window.scrollTo(0, 0)
  }

  const handleSelectProperty = (property) => {
    setSelectedProperty(property)
    handleNavigate(VIEWS.DETAIL)
  }

  const handleBackToHome = () => handleNavigate(VIEWS.HOME)
  const handleGoToConfirmation = () => handleNavigate(VIEWS.CONFIRMATION)
  const handleBackToDetail = () => handleNavigate(VIEWS.DETAIL)

  // Views that should show the persistent Navbars
  const showNavBars = ![
    VIEWS.DETAIL, VIEWS.CONFIRMATION, VIEWS.MAP
  ].includes(currentView) && !activeChat;

  const renderContent = () => {
    switch (currentView) {
      case VIEWS.HOME:
        return <Home onSelectProperty={handleSelectProperty} onNavigate={handleNavigate} />
      case VIEWS.DETAIL:
        return (
            <Detail 
              property={selectedProperty} 
              onBack={handleBackToHome} 
              onReserve={handleGoToConfirmation}
            />
        )
      case VIEWS.CONFIRMATION:
        return (
            <Confirmation 
              property={selectedProperty} 
              onBack={handleBackToDetail}
              onFinish={() => {
                handleNavigate(VIEWS.RESERVATIONS);
              }}
            />
        )
      case VIEWS.RESERVATIONS:
        return <Reservations />
      case VIEWS.PUBLISH:
        return <Publish />
      case VIEWS.MESSAGES:
        return <Messages activeChat={activeChat} setActiveChat={setActiveChat} />
      case VIEWS.PROFILE:
        return <Profile />
      case VIEWS.MAP:
        return (
            <MapView 
                properties={properties}
                onBack={handleBackToHome}
                onSelectProperty={handleSelectProperty}
            />
        )
      default:
        return <Home onSelectProperty={handleSelectProperty} onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="bg-[#fdfbf7] min-h-screen">
      {showNavBars && <Navbar onNavigate={handleNavigate} currentView={currentView} />}
      
      <AnimatePresence mode="wait">
        <AnimatedPage
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={currentView === VIEWS.MAP ? { position: 'fixed', inset: 0 } : {}}
        >
          {renderContent()}
        </AnimatedPage>
      </AnimatePresence>

      {showNavBars && <BottomNav onNavigate={handleNavigate} currentView={currentView} />}
    </div>
  )
}

export default App
