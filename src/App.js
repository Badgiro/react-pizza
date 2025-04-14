import { useState, createContext } from 'react'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import './scss/app.scss'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

export const SearchContext = createContext()

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
