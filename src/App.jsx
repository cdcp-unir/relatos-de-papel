import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SearchBar from './shared/components/SearchBar'
import ViewPrincipal from './components/ViewPrincipal'
import ViewDetalleLibro from './features/books-details/pages/BookDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ViewDetalleLibro />
    </>
  )
}

export default App
