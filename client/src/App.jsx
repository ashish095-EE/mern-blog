import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'


export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route element={<PrivateRoute/>} >

          <Route path='/dashboard' element={<Dashboard/>} />


        
        </Route>
        <Route path='/projects' element={<Projects/>} />
      </Routes>
      <Footer/>

      
      
    </BrowserRouter>
  )
}