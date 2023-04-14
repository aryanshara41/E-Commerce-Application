import './App.css';
import HomeScreen from './screens/HomeScreen';
import Cart from './screens/Cart';
import Header from './components/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductDetails from './screens/ProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

// const tokenContext = createContext()

function App() {

  // const [token, setToken] = useState({
  //   login: true,
  //   register: true,
  //   logout: true
  // });

  // if (localStorage.getItem('token')) setToken({ login: false, register: false, logout: true });

  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path='/' Component={HomeScreen} />

          <Route Component={PrivateRoute}  >
            <Route path='/cart' Component={Cart} />
          </Route>


          <Route path='/product/:id' Component={ProductDetails} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
