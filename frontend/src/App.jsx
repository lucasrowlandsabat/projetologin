import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './routes/Login'
import Register from './routes/Register'
import Error from './routes/Error'
import Dashboard from './routes/Dashboard'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>   
    </Router>
  )
}

export default App
