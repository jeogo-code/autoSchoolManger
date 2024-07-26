import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RegisterNewClient from './pages/RegisterNewClient'
import ClientsList from './pages/ClientsList'
import Groups from './pages/Groups'
import Exams from './pages/Exams'
import TrafficLaws from './pages/TrafficLaws'
import DrivingSessions from './pages/DrivingSessions'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterNewClient />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/traffic-laws" element={<TrafficLaws />} />
        <Route path="/driving-sessions" element={<DrivingSessions />} />
      </Routes>
    </Router>
  )
}

export default App
