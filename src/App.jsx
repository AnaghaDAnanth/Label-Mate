import './App.css'
import Title from './components/Title.jsx'
// import Labels from './components/Labels.jsx'
// import LabelSelector from './components/LabelSelector';
import LabelDropdown from './components/LabelDropdown';

function App() {
  return (
    <section className='p-3.5 h-80 w-80'>
      <Title/>
      <LabelDropdown/>
      {/* <LabelSelector labels={allLabels} onSelectionChange={handleLabelSelection} />
      <Labels/> */}
    </section>
  )
}

export default App
