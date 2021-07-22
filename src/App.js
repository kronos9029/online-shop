import './App.css';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import CustomerPage from './components/pages/CustomerPage';
import AdminPage from './components/pages/AdminPage';


function App() {
  return (
    <>
    {/* <AdminPage/> */}
    <CustomerPage/>
      <Router>
        <Switch>
          {/* <Route path='/' exact component={Home} />
          <Route path='/products/' component={AdminProductList} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/create' component={AdminCreateProduct} />
          <Route path='/cart' component={Cart} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
