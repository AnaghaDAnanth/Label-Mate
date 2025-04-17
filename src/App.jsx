import { useState } from 'react'
import './App.css'
import Title from './components/Title.jsx'
import Labels from './components/Labels.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className='p-3 h-80 w-80'>
      <Title/>
      <Labels/>
    </section>
  )
}

export default App
