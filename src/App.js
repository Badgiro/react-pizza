import { useState, createContext } from 'react'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import './scss/app.scss'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

export const SearchContext = createContext()

function App() {
  const [search, setSearch] = useState('')
  console.log(search)
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </SearchContext.Provider>
    </div>
  )
}

export default App
