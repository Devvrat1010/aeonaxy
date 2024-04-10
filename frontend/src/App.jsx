import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'

function App() {
    return (
        <main>
            <Router>
                <Routes>
                    <Route path="/" element = {<Signup/>} />
                    <Route path="/signin" element = {<Signin/>} />
                </Routes>
            </Router>
        </main>
    )
}

export default App
