
import { Footer } from './components/Footer'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <>
      <div className='border '>
        <Navbar/>
        <AppRoutes/>
        <Footer />
      </div>
    </>
  )
}

export default App
