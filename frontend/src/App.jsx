import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import CompleteProfile from './pages/completeProfile'
import Home from './pages/home' 
import UserSurvey from './pages/userSurvey'
import ConfirmedEmail from './pages/confirmedEmail'

function App() {
    return (
        <main>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path="/signup" element = {<Signup/>} />
                    <Route path="/signin" element = {<Signin/>} />
                    <Route path="/completeProfile" element = {<CompleteProfile/>} />
                    <Route path='userSurvey' element = {<UserSurvey/>}/>
                    <Route path='confirmedEmail' element = {<ConfirmedEmail/>}/>
                </Routes>
            </Router>
        </main>
    )
}

export default App
