import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CustomerPage from './components/pages/CustomerPage';
import AdminPage from './components/pages/AdminPage';
import CreateCategories from './admin/CreateCategories';
import Login from './components/pages/Login';


function App() {
  return (
    <>
    {/* <AdminPage/> */}
    {/* <CustomerPage/> */}
    <Login/>
      <Router>
      {/* <CreateCategories/> */}
        <Switch>
          <Route path='/' exact component={CustomerPage} />
          {/* <Route path='/products/' component={AdminProductList} />
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
