import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductList from '../../admin/ProductList';
import Navbar from '../Navbar';

function AdminPage() {
  return (
    <>
    <Navbar/>
    <ProductList/>
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

export default AdminPage;
