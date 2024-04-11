import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './components/menu'
import Admin from './pages/admin'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Papers from './pages/papers'
import New_paper from './pages/new_paper'


function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Papers />} /> {/* Маршрут для корневого пути */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/new_paper" element={<New_paper />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App