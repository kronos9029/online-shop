import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import CustomerPage from './components/pages/CustomerPage';
import AdminPage from './components/pages/AdminPage';
import CreateCategories from './components/pages/admin/CreateCategories';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import CreateProduct from './components/pages/admin/CreateProduct';
import history from '../src/services/history';
import UpdateProduct from './components/pages/admin/UpdateProduct';
import UpdateCategory from './components/pages/admin/UpdateCategory';


function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home/main" />
          </Route>
          <Route path='/home' component={CustomerPage} />
          <Route path='/Admin' component={AdminPage} />
          <Route path='/login' exact component={Login} />
          <Route path='/createCate' exact component={CreateCategories} />
          <Route path='/register' exact component={Register} />
          <Route path='/createProduct' exact component={CreateProduct} />
          <Route path='/updateProduct/:id' exact component={UpdateProduct} />
          <Route path='/updateCate/:id' exact component={UpdateCategory} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
