import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Header from './components/Header'
import LeftPanel from './components/LeftPanel'
import CenterContent from './components/CenterContent'
import RightPanel from './components/RightPanel'
import Footer from './components/Footer'
import './styles/globals.css'

function AppContent(): JSX.Element {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <LeftPanel />
        <CenterContent />
        <RightPanel />
      </div>
      <Footer />
    </div>
  )
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App