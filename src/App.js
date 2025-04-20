import { useState, createContext } from 'react'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import './scss/app.scss'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Pizza from './pages/Pizza'
import MainLayout from './layouts/MainLayout'

export const SearchContext = createContext()

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<Pizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        
      </Routes>
    </div>
  )
}

export default App
