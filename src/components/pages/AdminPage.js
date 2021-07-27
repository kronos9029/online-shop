import AdminSearchBar from './admin/AdminSearchBar';
import ProductList from './admin/ProductList';
import Navbar from '../Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CategoryList from './admin/CategoryList';

function AdminPage() {
  return (
    <>
    <Navbar/>
    <AdminSearchBar/>
    <Router>
      <Switch>
        <Route path='/Admin/adminProduct' component={ProductList} />
        <Route path='/Admin/adminCate' component={CategoryList} />
      </Switch>
    </Router>
    </>
  );
}

export default AdminPage;
