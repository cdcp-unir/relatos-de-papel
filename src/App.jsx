import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SearchBar from './components/searchBar/searchBar'
import ViewPrincipal from './components/ViewPrincipal'
import ViewDetalleLibro from './components/ViewDetalleLibro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ViewDetalleLibro />
    </>
  )
}

export default App
