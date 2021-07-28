import AdminSearchBar from './admin/AdminSearchBar';
import ProductList from './admin/ProductList';
import Navbar from '../Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CategoryList from './admin/CategoryList';
import ResultList from './admin/ResultList';
import CreateProduct from './admin/CreateProduct';
import CreateCategories from './admin/CreateCategories';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';

function AdminPage() {
  let role = sessionStorage.getItem('roleCheck');
  if(role === "ROLE_ADMIN"){
    return (
      <>
      <Navbar/>
      <AdminSearchBar/>
      <Router>
        <Switch>
          <Route path='/Admin/adminProduct' component={ProductList} />
          <Route path='/Admin/adminCate' component={CategoryList} />
          <Route path='/Admin/result' component={ResultList} />
          <Route path='/Admin/createProduct' component={CreateProduct} />
          <Route path='/Admin/createCate' component={CreateCategories} />
          <Route path='/Admin/updateProduct/:id' exact component={UpdateProduct} />
          <Route path='/Admin/updateCate/:id' exact component={UpdateCategory} />
        </Switch>
      </Router>
      </>
    );
  } else {
    return (
      // <div><img src="https://media4.giphy.com/media/8abAbOrQ9rvLG/giphy.gif?cid=ecf05e47756235qk977sbdv687mp2n4vfo7ozowhgx9xbv7o&rid=giphy.gif&ct=g"></img></div>
      <Redirect to="/home/main" />
    );
  }

}

export default AdminPage;
