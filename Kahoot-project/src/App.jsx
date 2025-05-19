import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import HomePage from './pages'
import ExamPage from './pages/examPage'
import SignupPage from './pages/signup'
import LoginPage from './pages/login'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/exam'  element={<ExamPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
