import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<About />} />
                </Routes>
            </main>
        </Router>
    )
}