import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import CompleteProfile from './pages/completeProfile'
import Home from './pages/home' 

function App() {
    return (
        <main>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path="/signup" element = {<Signup/>} />
                    <Route path="/signin" element = {<Signin/>} />
                    <Route path="/completeProfile" element = {<CompleteProfile/>} />
                </Routes>
            </Router>
        </main>
    )
}

export default App
