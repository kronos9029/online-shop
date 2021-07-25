import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CustomerPage from './components/pages/CustomerPage';
import AdminPage from './components/pages/AdminPage';
import CreateCategories from './components/pages/admin/CreateCategories';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import CreateProduct from './components/pages/admin/CreateProduct';
import history from '../src/services/history';


function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={CustomerPage} />
          <Route path='/Admin' exact component={AdminPage} />
          <Route path='/login' exact component={Login} />
          <Route path='/createCate' exact component={CreateCategories} />
          <Route path='/register' exact component={Register} />
          <Route path='/createProduct' exact component={CreateProduct} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
