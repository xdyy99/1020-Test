import ReactDOM from 'react-dom/client'
import './app.scss'

// Import components
import Slider from './components/Slider'
// Import data
import TEAM from './constant'

const App = () => {
  return <Slider slides={TEAM} />
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App />)
