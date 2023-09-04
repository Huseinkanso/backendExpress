import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route element={<PrivateRoute/>}>
          <Route path='/new-ticket' element={<NewTicket/>}></Route>
          <Route path='/tickets' element={<Tickets/>}></Route>
          <Route path='/ticket/:ticketId' element={<Ticket/>}></Route>
          </Route>
        </Routes>  
        <ToastContainer/>
        </div>
      </Router>

    </>
  );
}

export default App;
